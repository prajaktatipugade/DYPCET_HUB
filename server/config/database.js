const mongoose = require("mongoose");

async function dbconnect() {
    await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Database Connected!!!"))
        .catch((error) => {
            console.log(error.message)
            process.exit(1);
        });
}

module.exports = dbconnect;