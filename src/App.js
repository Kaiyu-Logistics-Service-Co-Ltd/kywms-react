import React,{Component} from "react";
import {connect} from "react-redux"
import 'antd/dist/antd.css';
import '@ant-design/pro-layout'
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";

import Login from "./pages/Login/Login";
import Reg from "./pages/Reg/Reg";
import Admin from "./pages/Admin/Admin";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";
//读取本地user存储
const user_key = storageUtils.getUser();
memoryUtils.user_key = user_key;
class App extends Component{

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/reg' component={Reg}/>
          <Route path='/admin' component={Admin}/>
          <Redirect to="/admin" />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default connect(
  state =>({comments:state.comments}), //state就是一个comments数组
  {}
)(App);