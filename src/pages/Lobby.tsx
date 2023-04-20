import {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Button, Divider, Form, Input, Layout, Modal, Typography} from 'antd';
import {Content, Header} from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Message from '../components/Message/index';

import {SocketContext} from '../context/socket';

const Lobby = () => {
    const [isChoosingName, setIsChoosingName] = useState(true);
    const socket = useContext(SocketContext);
    const params = useParams();
    const [form] = Form.useForm();

    console.log(socket);

    const handleSubmit = () => {
        socket.emit('joinLobby', params.lobbyId);
        setIsChoosingName(false);
    };

    return (
        <Layout
            style={{
                height: '100vh',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
            }}
        >
            <Header
                style={{
                    textAlign: 'center',
                    // backgroundColor: 'transparent',
                    backgroundColor: 'rgba(50, 50, 50, 0.2)',
                }}
            >
                <Typography.Title> Lobby {params.lobbyId} </Typography.Title>
            </Header>

            <Divider style={{margin: '0'}} />

            <Layout>
                <Content>
                    <Typography.Paragraph> Main content </Typography.Paragraph>
                </Content>

                <Sider
                    width="25%"
                    style={{
                        backgroundColor: 'rgba(50, 50, 50, 0.2)',
                    }}
                >
                    <Typography.Title style={{textAlign: 'center'}}>
                        CHAT
                    </Typography.Title>

                    <Divider />

                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />

                    <Divider />

                    <Form style={{}}>
                        <Input
                            type="textarea"
                            placeholder="New Message ..."
                            bordered={false}
                            style={{
                                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                            }}
                        />
                        <Button type="text" block>
                            Send
                        </Button>
                    </Form>
                </Sider>
            </Layout>

            <Modal
                title="Choisissez un pseudo"
                open={isChoosingName}
                onOk={() => form.submit()}
                maskClosable={false}
                cancelButtonProps={{style: {display: 'none'}}}
            >
                <Form
                    name="select-username"
                    form={form}
                    onFinish={handleSubmit}
                    style={{
                        padding: '20px',
                    }}
                >
                    <Form.Item
                        label="Pseudo"
                        name="pseudo"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez prouter un pseudo',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Lobby;
