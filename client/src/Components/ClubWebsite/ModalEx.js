import React, { useState } from 'react';
import { Button, Modal, Flex, Col, Row } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const ModalEx = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button onClick={showModal} bordered={false}>
                <EllipsisOutlined />
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Flex wrap="wrap" gap="small">

                    <Row gutter={8}>
                        <Col bordered >
                            GFG
                        </Col>
                        <Col bordered>
                            LeetCode
                        </Col>
                        <Col bordered>
                            CodingNinjas
                        </Col>
                    </Row>


                </Flex>
            </Modal>
        </>
    );
};

export default ModalEx;
