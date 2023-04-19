import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import 'antd/dist/reset.css';
import {ConfigProvider, theme} from 'antd';
import {socket, SocketContext} from './context/socket';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#774778',
                },
            }}
        >
            <SocketContext.Provider value={socket}>
                <RouterProvider router={router} />
            </SocketContext.Provider>
        </ConfigProvider>
    </React.StrictMode>,
);
