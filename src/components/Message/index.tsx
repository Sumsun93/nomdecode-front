import {Typography} from 'antd';

function Message() {
    return (
        <div>
            <Typography.Paragraph
                style={{
                    padding: '1rem',
                }}
            >
                User : Content
            </Typography.Paragraph>
        </div>
    );
}

export default Message;
