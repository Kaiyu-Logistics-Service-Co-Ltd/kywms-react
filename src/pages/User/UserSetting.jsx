import React,{Component} from "react";
import {Col, Menu, message, Row} from "antd";
import "./UserSetting.less"
export default class UserSetting extends Component{

  state = {
    menuMode:true, //horizontal inline vertical

  }
  onOpenChange = () =>{
    message.info("onOpenChange");
    this.setState({menuMode:!this.state.menuMode});
  }
  render() {
    const {menuMode} = this.state;
    let mode = "inline";
    if (menuMode===true){
      mode = "vertical";
    }else {
      mode = "horizontal"
    }
    return (
      <div>
        <Row>
          <Col className="userSetting-menu" xs={24} sm={24} md={24} lg={6} xl={4} xxl={4}>
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
          <Col className="userSetting-menu" xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
            aaa
          </Col>
        </Row>
      </div>
    );
  }
}