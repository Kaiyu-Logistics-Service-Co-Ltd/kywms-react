import React,{Component} from "react";
import {Switch,Route,Redirect} from "react-router-dom"
import {Col, Menu, message, Row} from "antd";
import "./UserSetting.less"
import UserInfoModify from "../../components/User/userInfoModify";
import Empty from "../../components/User/Empty";
export default class UserSetting extends Component{

  state = {

  }
  onOpenChange = () =>{
    message.info("onOpenChange");
    this.setState({menuMode:!this.state.menuMode});
  }
  render() {
    return (
        <Row className="userSetting-main">
          <Col className="userSetting-menu" xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Row>
              <Col className="userSetting-menu-horizontal-" xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                <Menu mode={"horizontal"}>
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu>
              </Col>
              <Col className="userSetting-menu-vertical" xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                <Menu mode={"vertical"}>
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Col>
          <Col className="userSetting-content" xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
            <Switch>
              <Route path="/user/setting/info" component={UserInfoModify}></Route>
              <Route path="/user/setting/empty" component={Empty}></Route>
              <Redirect to="/user/setting/info"/>
            </Switch>
          </Col>
        </Row>
    );
  }
}