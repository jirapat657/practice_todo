import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css'; // สำหรับ Ant Design v5+
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <ConfigProvider
    theme={{
      token: {
        // colorPrimary: '#ffffff', //สีPrimary ของ element ต่างๆ
        // colorTextLightSolid: '#ffffff', //สีตัวอักษรบนปุ่ม
        // colorBorder: '#ffffff', // เปลี่ยนสีขอบ
      },
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
