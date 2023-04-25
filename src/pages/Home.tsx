import {Button, Form, Layout, Typography} from 'antd';
import {useContext} from 'react';
import {SocketContext} from '../context/socket';
import {useNavigate} from 'react-router-dom';

function Home() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    const handleClick = () => {
        socket.on('lobbyCreated', (lobbyId) => {
            navigate(`/lobby/${lobbyId}`);
        });

        socket.emit('createLobby');
    };

    return (
        <Layout
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography.Title> Codenames </Typography.Title>

            <Form
                name="create-lobby"
                onFinish={handleClick}
                style={{
                    padding: '20px',
                }}
            >
                <Form.Item
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Créer une partie
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
}

export default Home;
