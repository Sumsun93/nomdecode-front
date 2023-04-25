import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Button, Divider, Form, Input, Layout, Modal, Typography} from 'antd';
import {Content, Header} from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Message from '../components/Message/index';

import {setCurrentUsername} from '../slices/chatSlice';
import {SocketContext} from '../context/socket';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';

interface MessageObj {
    user: string;
    content: string;
    lobbyId: number;
}

const Lobby = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const params = useParams();
    const [form] = Form.useForm();
    const [isChoosingName, setIsChoosingName] = useState(true);
    const currentUsername = useSelector<RootState>(
        (state) => state.chat.currentUsername,
    );
    const [messages, setMessages] = useState<Array<MessageObj>>([]); // REVOIR LE TYPE?
    const [messageInput, setMessageInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');

    // receiving a message (including own)
    useEffect(() => {
        if (socket) {
            socket.on('chat', (message) => {
                // console.log('Received a message'); // ! Log plusieurs fois ?
                setMessages([...messages, message]);
            });
        }
    }, [socket, messages]);

    // joining the lobby
    const handleSubmit = () => {
        socket.emit('joinLobby', params.lobbyId);
        dispatch(setCurrentUsername(usernameInput));
        setIsChoosingName(false);
        setUsernameInput('');
    };

    // sending a message
    const handleSubmitMessage = () => {
        // console.log('Message Submitted', {
        //     user: currentUsername,
        //     content: messageInput,
        // });
        if (messageInput !== '') {
            socket.emit('chat', {
                user: currentUsername,
                content: messageInput,
                lobbyId: params.lobbyId,
            });
            setMessageInput('');
        }
    };

    const listOfMessages = messages.map((message) => (
        <Message
            key={self.crypto.randomUUID()}
            username={message.user}
            content={message.content}
        />
    ));

    return (
        <Layout
            style={{
                height: '100vh',
            }}
        >
            <Header
                style={{
                    textAlign: 'center',
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

                    <Message username={'Proutman'} content={'Prout Prout'} />
                    <Message username={'Testman'} content={'Test Test'} />
                    <Message username={'Helloman'} content={'Hello Hello'} />
                    <Message username={'azeaezman'} content={'Azeaea Azeaea'} />

                    {listOfMessages}

                    <Divider />

                    <Form onFinish={handleSubmitMessage} style={{}}>
                        <Input
                            type="textarea"
                            placeholder="New Message ..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            bordered={false}
                            style={{
                                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                            }}
                        />
                        <Button type="text" htmlType="submit" block>
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
                        <Input
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Lobby;
