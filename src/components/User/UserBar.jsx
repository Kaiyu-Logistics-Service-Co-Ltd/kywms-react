import React,{Component} from "react";
import {Avatar, Col, Row} from "antd";
import memoryUtils from "../../utils/memoryUtils";

export default class UserBar extends Component{

  render() {
    const user = memoryUtils.user_key.user;
    console.log(user)
    return (
      <div className="userBar-main">
        <Row>
          <Col>
            <Avatar size={"large"} src="http://localhost:10086/resources/target.jpg"/>
          </Col>
          <Col>
            &nbsp;&nbsp;&nbsp;{user.userName}
          </Col>
        </Row>
      </div>
    );
  }
}