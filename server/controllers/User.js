const Signup = require('../models/signup.js');
const ClubReqForm = require('../models/RequestForm.js');
const AddAbout = require('../models/AddAboutUs.js');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const mailSender = require('../config/mailSender.js');
const AddEvents = require('../models/AddEvents.js');
const AddGallery = require('../models/AddGallery.js');
const addMembers = require('../models/AddMembers.js');
const AddLiveEvents = require('../models/AddLiveEvents.js');
const RequestForm = require('../models/RequestForm.js');

exports.adminAuthentication = async(req, res)=> {
    try {
        const { username, code } = req.body;
        const existingUser = await Signup.findOne({ username, password: code });
        if (!existingUser)
        {
            return res.status(500).json("Invalid Code...");
        }
        return res.status(200).json(existingUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.subAdminLogin = async(req, res)=> {
  try {
      const { email, password } = req.body;
      const existingUser = await ClubReqForm.findOne({ Email: email, password: password, status: true });
      if (!existingUser)
      {
          return res.status(500).json("Club Request Not Accepted !!");
      }
      return res.status(200).json(existingUser);
  }
  catch (error) {
      return res.status(500).json(error);
  }
}


exports.clubReqForm = async(req, res)=> {
    try {
        const { Name, Email, ClubName, ClubMotive,department,working } = req.body;
        const response = await ClubReqForm.create({ Name, Email, ClubName, ClubMotive,department,working });
        return res.status(200).json({status: true, message: "Data uploaded successfully!!",response});
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.readClubReqForm = async(req,res)=> {
    try {
        const response = await ClubReqForm.find();
        return res.status(200).json({status: true, message: "Data read successfully!!",response});
    }
    catch (error) {
        return res.status(500).json(error);
    }
}


exports.transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


exports.acceptClubReqForm = async (req, res) => {
  try {
    const { id } = req.body;
    await RequestForm.findOneAndUpdate({ _id: id}, { status: true });
      // const existingContent = await AddLiveEvents.find();
    return res.status(200).json({
      status: true,
      message: "Accepted"
      });
  }
  catch (error) {
    console.log(error);
      return res.status(500).json(error);
  }
}

exports.send_club_acceptance_email = async (req, res) => {

  const { email } = req.body; // Assuming you receive the club request form ID
  console.log(email);
  try {
    // Fetch club request form details from MongoDB
    const clubReqForm = await ClubReqForm.findOne({ Email: email });

    if (!clubReqForm) {
      return res.status(404).json({ message: 'Club request form not found' });
    }

    // Update MongoDB to mark acceptance (replace with your logic)
    clubReqForm.accepted = true; // Assuming an "accepted" flag
    await clubReqForm.save();

    // Extract only necessary data to avoid circular references
    const emailData = {
      name: clubReqForm.Name,
      email: clubReqForm.Email,
      clubName: clubReqForm.ClubName,
    };

    try {
      const mailResponse = await mailSender(emailData.email, "Your Club Request Form is Accepted!", 
      `<div>Hi ${emailData.name},\nYour request to create the ${emailData.clubName} club has been accepted! </div><div>Your secret key for login to subadmin is admin123</div>`);
    }
    catch (error) {
      console.log("Error Occured while sending Mails: ", error);
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

exports.send_club_reject_email = async (req, res) => {

  const { email } = req.body; // Assuming you receive the club request form ID
  console.log(email);
  try {
    // Fetch club request form details from MongoDB
    const clubReqForm = await ClubReqForm.findOne({ Email: email });

    if (!clubReqForm) {
      return res.status(404).json({ message: 'Club request form not found' });
    }

    // Update MongoDB to mark acceptance (replace with your logic)
    clubReqForm.accepted = true; // Assuming an "accepted" flag
    await clubReqForm.save();

    // Extract only necessary data to avoid circular references
    const emailData = {
      name: clubReqForm.Name,
      email: clubReqForm.Email,
      clubName: clubReqForm.ClubName,
    };

    try {
      const mailResponse = await mailSender(emailData.email, "Your Club Request Form is Rejected!", 
      `<div>Hi ${emailData.name},\nYour request to create the ${emailData.clubName} club has been rejected!</div>`);
    }
    catch (error) {
      console.log("Error Occured while sending Mails: ", error);
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}


exports.uploadAboutUs = async (req, res) => {
  try {
    const {email, logoImage, aboutInfo, mission, vision } = req.body;
    const res1 = await AddAbout.findOne({email});
    if(res1){
      const response = await AddAbout.findOneAndUpdate({email}, {email, logoImage, aboutInfo, mission, vision });
      return res.json(response);
    }
    const response = await AddAbout.create({email, logoImage, aboutInfo, mission, vision });
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


exports.readAboutUs = async (req, res) => {
  try {
    const { email } = req.body;
    const existingContent = await AddAbout.find({email});
      return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}



exports.uploadEvents = async (req, res) => {
  try {
    const {email, image,heading,description } = req.body;
    const response = await AddEvents.create({email, image, heading, description });
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


exports.readEvents = async (req, res) => {
  try {
    const { email } = req.body;
    const existingContent = await AddEvents.find({email});
      return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}



exports.uploadGallery = async (req, res) => {
  try {
    const { email, image } = req.body;
    const response = await AddGallery.create({ email, image });
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


exports.readGallery = async (req, res) => {
  try {
    
    const { email } = req.body;
    const existingContent = await AddGallery.find({email});
      return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}


exports.uploadMembers = async (req, res) => {
  try {
    const { email, image, name, position, linkedlnLink, instaLink } = req.body;
    const response = await addMembers.create({ email, image, name, position, linkedlnLink, instaLink });
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


exports.readMembers = async (req, res) => {
  try {
    const { email } = req.body;
    const existingContent = await addMembers.find({email});
      return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}

exports.uploadLiveEvents = async (req, res) => {
  try {
    const {email, image,eventType,start,heading,description,date,fees } = req.body;
    const response = await AddLiveEvents.create({email, image,eventType ,start, heading, description ,date,fees});
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


exports.readLiveEvents = async (req, res) => {
  try {
    const { email } = req.body;
     
      const existingContent = await AddLiveEvents.find({email});
      return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}

exports.acceptLiveEvents = async (req, res) => {
  try {
    const { id } = req.body;
    await AddLiveEvents.findOneAndUpdate({ _id: id}, { status: true });
      // const existingContent = await AddLiveEvents.find();
    return res.status(200).json({
      status: true,
      message: "Accepted"
      });
  }
  catch (error) {
    console.log(error);
      return res.status(500).json(error);
  }
}



exports.StopLiveEvents = async (req, res) => {
  try {
    const { id } = req.body;
    await AddLiveEvents.findOneAndUpdate({ _id: id}, { status: false });
      // const existingContent = await AddLiveEvents.find();
    return res.status(200).json({
      status: true,
      message: "Stpped Displaying..!!"
      });
  }
  catch (error) {
    console.log(error);
      return res.status(500).json(error);
  }
}



// exports.verify_email = async(req, res)=> {
//   try {
//       const { email} = req.body;
//       const existingUser = await ClubReqForm.findOne({ Email: email,  status: true });
//       if (!existingUser)
//       {
//           return res.status(500).json("Email Not registerd !!");
//     }
//     existingUser.accepted = true; // Assuming an "accepted" flag
//     await existingUser.save();
//     const token = jwt.sign({ id: existingUser._id }, "jwt_secret_key", {expiresIn:"id"})
    
//     await mailSender(existingUser.Email, 'http://localhost:3000/ForgotPassSub/${existingUser._id}/${token}');
//     return res.status(200).json(existingUser);
//   }
//   catch (error) {
//       return res.status(500).json(error);
//   }
// }


exports.verify_email = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await ClubReqForm.findOne({ Email: email, status: true });

    if (!existingUser) {
      return res.status(404).json({ error: "Email Not registered !!" });
    }

    existingUser.accepted = true;
    await existingUser.save();

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const emailLink = `http://localhost:3000/ForgotPassSub/${existingUser._id}/${token}`;
await mailSender(existingUser.Email, "  Reset Password Link..!!",`<div>${emailLink}</div>`);

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Function to validate email format
function isValidEmail(email) {
  // Use regex or any email validation library
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// exports.reset_pass =async (req, res) => {
//   const { id, token } = req.params;
//   const { pass } = req.body;

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.json({Status:"Error with token"})
//     }
//     else {
//       becrypt.hash(pass, 10)
//         .then(hash => {
//           ClubReqForm.findByIdAndUpdate({ _id: id }, { password: pass })
//             .then(u => res.send({ Status: "Success" }))
//             .catch(err => res.send({ Status: err }))
          
//         })
//         .catch(err=> res.send({Status: err}))
//     }
//   })

// }

exports.reset_pass = async (req, res) => {
  try {
  const { id, token } = req.params;
    const { pass } = req.body;
    await ClubReqForm.findByIdAndUpdate({ _id: id }, { password: pass })
      // const existingContent = await AddLiveEvents.find();
    return res.status(200).json({
      status: true,
      message: "Success..!!"
      });
  }
  catch (error) {
    console.log(error);
      return res.status(500).json(error);
  }
}


exports.getAllClubs = async (req, res) => {
  try{
      const existingContent = await RequestForm.find({status: true});
      return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}


exports.getClubDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const existingContent = await RequestForm.findById({ _id: id });
    return res.status(200).json(existingContent);
  }
  catch(error){
      return res.status(500).json(error);
  }
}
