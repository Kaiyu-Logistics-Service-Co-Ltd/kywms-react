import React,{Component} from "react";
import Icon from '@ant-design/icons';
import {connect} from "react-redux"
import { Layout, Menu } from 'antd';
import PubSub from 'pubsub-js';
import CompanyName from "../components/companyName";
import 'antd/dist/antd.css';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import '@ant-design/pro-layout'

import './app.css'

const { Header, Sider, Content } = Layout;
class App extends Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        PubSub.publish("justLogo",this.state.collapsed);
    };

    render() {
        const {collapsed}=this.state;
        return (
          <Layout className="ant-layout">
              <Sider  trigger={null} collapsible collapsed={collapsed}>
                  <div id="logo" className="ant-pro-sider-logo">
                      <a>
                          <img src={require("../static/logo/logo_tinycirclex.png")} />
                          <CompanyName/>
                      </a>
                  </div>
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                      <Menu.Item key="1" icon={<UserOutlined />}>
                          nav 1
                      </Menu.Item>
                      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                          nav 2
                      </Menu.Item>
                      <Menu.Item key="3" icon={<UploadOutlined />}>
                          nav 3
                      </Menu.Item>
                  </Menu>
              </Sider>
              <Layout className="site-layout">
                  <Header className="site-layout-background" style={{ padding: 0 }}>
                      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: this.toggle,
                      })}
                  </Header>
                  <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                  >
                      Content
                  </Content>
              </Layout>
          </Layout>
        );
    }
}
export default connect(
  state =>({comments:state.comments}), //state就是一个comments数组
  {}
)(App);