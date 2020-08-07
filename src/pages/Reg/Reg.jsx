import React,{Component} from "react";
import {Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined,BarcodeOutlined } from '@ant-design/icons';
import "./Reg.less"
import logo from "./images/logo_tinycirclex.png"
import {reqAddUser} from "../../api/";

/**
 * 添加用户路由组件
 */


export default class Reg extends Component{

  state = {
    userCode:"",
    userPassword:"",
    userRepeatPassword:"",
    userName:"",
    userCodeItem:{},
    userPasswordItem:{},
    userRepeatPasswordItem:{},
    userNameItem:{
      validateStatus:"validating",
      tip:""
    },
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
    const {userCode,userName,userPassword,userRepeatPassword} = values

    // reqAddUser()
  };
  onFormFieldsChange = (changedFields,allFields)=> {
    // console.log(allFields);
    // let userCodeItem,userPasswordItem,userRepeatPasswordItem,userNameItem;
    // allFields.map((field,index)=>{
    //   if (index===0&&field.name[0]==="userCode"&&field.touched===true){
    //     console.log(field,index);
    //   }
    // })
  }

  onUserCodeChange=(event)=>{
    // console.log(event.target.value);
    const value = event.target.value;
    this.setState({userName:event.target.value})
    if(value.length<=1){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须大于1位!"
        }
      });
    }else if(value.length>=24){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名不能超过24位!"
        }
      });
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须为字母、数字、下划线或中文汉字组成!"
        }
      });
    }
    else {
      this.setState({userNameItem:{validateStatus:"validating"}});
    }
  }
  onUserPasswordChange=(event)=>{
    // console.log(event.target.value);
    const value = event.target.value;
    this.setState({userName:event.target.value})
    if(value.length<=1){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须大于1位!"
        }
      });
    }else if(value.length>=24){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名不能超过24位!"
        }
      });
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须为字母、数字、下划线或中文汉字组成!"
        }
      });
    }
    else {
      this.setState({userNameItem:{validateStatus:"validating"}});
    }
  }
  onuserRepeatPasswordChange=(event)=>{
    // console.log(event.target.value);
    const value = event.target.value;
    this.setState({userName:event.target.value})
    if(value.length<=1){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须大于1位!"
        }
      });
    }else if(value.length>=24){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名不能超过24位!"
        }
      });
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须为字母、数字、下划线或中文汉字组成!"
        }
      });
    }
    else {
      this.setState({userNameItem:{validateStatus:"validating"}});
    }
  }
  onUserNameChange=(event)=>{
    // console.log(event.target.value);
    const value = event.target.value;
    this.setState({userName:event.target.value})
    if(value.length<=1){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须大于1位!"
        }
      });
    }else if(value.length>=24){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名不能超过24位!"
        }
      });
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      this.setState({
        userNameItem:{
          validateStatus:"error",
          tip:"姓名必须为字母、数字、下划线或中文汉字组成!"
        }
      });
    }
    else {
      this.setState({userNameItem:{validateStatus:"validating"}});
    }
  }

  render() {
    const {userCode,userPassword,userRepeatPassword,userName} = this.state
    const {userCodeItem,userPasswordItem,userRepeatPasswordItem,userNameItem} = this.state
    return (
      <div className="reg">
        <header className="reg-header">
          <img src={logo} alt="logo"/>
          <h1>KYWMS</h1>
        </header>
        <section className="reg-content">
          <h2>用户注册</h2>
          <Form
            name="normal_reg"
            className="reg-content-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            // onFieldsChange={(changedFields, allFields) => this.onFormFieldsChange(changedFields,allFields)}
          >
            <Form.Item
              name="userCode"
              rules={[
              { required: true, message: '请输入您的用户名!' },
              { min: 4, message: '用户名至少4位!' },
              { max: 16, message: '用户名至多16位!' },
              { pattern: /[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
              { whitespace: true, message: '不允许空格' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
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
              />
            </Form.Item>
            <Form.Item
              name="userRepeatPassword"
              rules={[
                { required: true, message: '请重复输入您的密码!' },
                { whitespace: true, message: '不允许空格' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="重复密码"
              />
            </Form.Item>
            <Form.Item
              name="userName"
              rules={[
                { required: true, message: '请输入您的姓名!' },
                { whitespace: true, message: '不允许空格' },
              ]}
              validateStatus={userNameItem.validateStatus}
              help={userNameItem.tip}
            >
              <Input
                prefix={<BarcodeOutlined className="site-form-item-icon"/>}
                placeholder="姓名"
                value={userName}
                onChange={this.onUserNameChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="reg-content-form-button">
                注册
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
/*
 * 收集输入数据
 */
// const [form] = Form.useForm();

// React.useEffect(() => {
//   form.setFieldsValue({
//     username: 'Bamboo',
//   });
// }, []);