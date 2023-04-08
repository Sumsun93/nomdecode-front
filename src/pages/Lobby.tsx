import {useState} from 'react';
import {Layout, Modal} from 'antd';

const Lobby = () => {
    const [choosingName, setChoosingName] = useState(true);

    return (
        <Layout>
            <Modal
                title="Choisissez un pseudo"
                open={choosingName}
                onOk={() => setChoosingName(false)}
                onCancel={() => setChoosingName(false)}
            >
                <p>Content</p>
            </Modal>
        </Layout>
    );
};

export default Lobby;
