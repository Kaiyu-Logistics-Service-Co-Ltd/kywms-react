import React,{Component} from "react";
import {Row, Col, Menu, Modal, message} from "antd"
import {ExportOutlined} from "@ant-design/icons"
import "./RightHeader.less"
import {NavLink,withRouter} from "react-router-dom";
import {userMenuList} from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {reqLogout} from "../../api";
const { SubMenu } = Menu;
class RightHeader extends Component{

  getMenuNodes= (userMenuList) =>{
    return userMenuList.reduce((pre,item)=>{
      /**
       * 向pre添加<Menu.Item>
       */
      if (!item.children){
        if (item.group==="logout"){
          pre.push((
            <Menu.Divider key="Divider"/>
          ));
          pre.push((
            <Menu.Item key={item.key} icon={item.icon}>
              <span onClick={this.handleLogOutClick}>{item.title}</span>
            </Menu.Item>
          ));
        }else {
          pre.push((
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.key}>
                <span>{item.title}</span>
              </NavLink>
            </Menu.Item>
          ));
        }
      }else {
        pre.push((
          <SubMenu
            key={item.key}
            icon={item.icon}
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ));
      }
      return pre
    },[]);
  }
  handleLogOutClick = ()=>{
    Modal.confirm({
      title:"确定退出吗?",
      icon:<ExportOutlined/>,
      onOk:async ()=>{
        console.log(this);
        const request = await reqLogout();
        if (request.code===200){
          message.info(request.message)
          storageUtils.removeUser();
          memoryUtils.user_key={};
          this.props.history.replace('/login');
        }else if (request.code===401){
          message.error(request.message);
          console.log(request.data)
        }else if (request.code===404){
          message.error(request.message);
        }else {
          message.error(request.message);
        }
      },
    });
  };
  render() {
    return (
      <div className="right-header-content-main">
        <Row>
          <Col span={20}>
          </Col>
          <Col span={4}>
            <Menu className="user-menu" mode="horizontal">
              {
                this.getMenuNodes(userMenuList)
              }
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(RightHeader)
