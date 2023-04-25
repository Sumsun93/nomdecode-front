import {Typography} from 'antd';

interface MessageProps {
    username: string;
    content: string;
}

function Message({username, content}: MessageProps) {
    return (
        <Typography.Paragraph
            style={{
                padding: '0.5rem 1rem',
                margin: '0',
            }}
        >
            <span>{username} :</span> <span>{content}</span>
        </Typography.Paragraph>
    );
}

export default Message;
