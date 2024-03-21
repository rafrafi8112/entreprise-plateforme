
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Space, Avatar } from 'antd';
import UserTaskes from '../Projectviews/UserTaskes';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { Navigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const EmployerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setkey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const handleMenuClick =(e)=> {
    setkey(e?.key ?? '1')
}

const switchPage = () => {
    switch (key) {
        case '1':
          return (<UserTaskes/>);
        case '2':
          return (<h1>item2</h1>);
        default:
          break;
       }
}

const { user, token, setUser, setToken } = useStateContext();

if (!token) {
  return <Navigate to="/login" />;
}

const onLogout = () => {
  axiosClient.post('/logout').then(() => {
      setUser({});    
      setToken(null); 
  });
};

const items = [

  {
    label: (
      <span >
      Profile
  </span>
    ),
    key: '0',
  },

  {
    label: (
      <span onClick={onLogout} >
      Logout
  </span>
    ),
    key: '1',
  },

];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
        >

<Menu.Item 
 key="1"
 onClick={(e)=>handleMenuClick(e)}
 >
          <UserOutlined type="user" />
          <span>Dash</span>
</Menu.Item>

<Menu.Item 
 key="2"
 onClick={(e)=>handleMenuClick(e)}
 >
          <UserOutlined type="user" />
          <span>Task Users</span>
</Menu.Item>



        </Menu>
      </Sider>
      <Layout>

        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >

          <div  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    margin: "10 auto",
                    
                   
                }}>

           <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />  

<Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
    <Avatar style={{
         marginRight:10
            }}  size={30} icon={<UserOutlined />} />

    </a>
  </Dropdown>


          </div>
         
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            {switchPage()}
          
        </Content>
      </Layout>
    </Layout>
  );
};
export default EmployerLayout;