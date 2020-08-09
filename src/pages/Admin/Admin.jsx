import React,{Component} from "react";
import {connect} from "react-redux"
import {Layout, Menu, message, Button, Modal, Form, Input} from 'antd';
import {Link,Redirect} from "react-router-dom";
// import {NavLink,Link,Switch,Route,Redirect} from "react-router-dom";
import PubSub from 'pubsub-js';
import CompanyName from "../../components/ConpanyName/CompanyName";
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, LockOutlined,
} from '@ant-design/icons';
import '@ant-design/pro-layout'
import memoryUtils from "../../utils/memoryUtils";

import './Admin.less'
import moment from "moment";
import storageUtils from "../../utils/storageUtils";
import {reqLogin, reqUserPasswordEncryption} from "../../api";

const { Header, Sider, Content } = Layout;

class Admin extends Component{

  state = {
    collapsed: false,
    visible: true,
    confirmModalLoading: false,
    userPassword:"",
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    PubSub.publish("justLogo",this.state.collapsed);
  };

  handleModalChange=(event)=>{
    this.setState({userPassword:event.target.value});
  }
  handleModalOK = async () => {
    const {userPassword} = this.state;
    this.setState({confirmModalLoading:true});
    const request = await reqLogin(memoryUtils.user_key.user.userCode,userPassword);
    if (request.code===200) {
      const currentUser = request.data;
      if (currentUser){
        storageUtils.saveUser(currentUser);
          setTimeout(() => {
            this.setState({
              confirmModalLoading: false,
              visible: false
            });
          }, 1500);
      }else {
        message.error("验证用户失败");
        this.setState({
          confirmModalLoading: false
        });
      }
    }else {
      message.error("验证用户失败");
      this.setState({
        confirmModalLoading: false
      });
    }
  };
  render() {
    const {collapsed,visible,confirmModalLoading,userPassword} = this.state;
    const user_key = memoryUtils.user_key;
    const {user,date} = user_key;
    let modal;
    // 内存没有存储user
    if (!user||!user.userId){
      return <Redirect to="/login"/>
    }
    // 超过一小时未操作。需要验证登录
    if ((moment().unix()-date)>=3600){
      modal = (
        <Modal
          title="确认用户登录"
          visible={visible}
          closable={false}
          centered={true}
          footer={
            <Button type="primary" className="ant-btn ant-btn-primary" loading={confirmModalLoading} onClick={this.handleModalOK}>
              <span>OK</span>
            </Button>
          }
        >
          <Form
            name="normal_checkUser"
            className="checkUser-form"
          >
            <Form.Item
              name="userPassword"
              rules={[
                { required: true, message: '请输入您的密码!' },
                { whitespace: true, message: '不允许空格' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                value={userPassword}
                onChange={this.handleModalChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    }else {
      //刷新登录信息
      storageUtils.update();
    }
    if ((moment().unix()-date)>=259200){
      return <Redirect to="/login"/>
    }
    return (
      <Layout className="ant-layout">
        <Sider  trigger={null} collapsible collapsed={collapsed}>
          <div id="logo" className="">
            <Link to="/admin">
              <img alt="" src={require("../../assets/logo/logo_tinycirclex.png")} />
              <CompanyName/>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/*<NavLink>*/}
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            {/*</NavLink>*/}
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
            ##############
          </Content>
        </Layout>
        {modal}
      </Layout>
    );
  }
}
export default connect(
  state =>({comments:state.comments}), //state就是一个comments数组
  {}
)(Admin);