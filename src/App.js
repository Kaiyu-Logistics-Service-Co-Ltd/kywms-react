import React,{Component} from "react";
import {connect} from "react-redux"
import 'antd/dist/antd.css';
import '@ant-design/pro-layout'
import {Route,Switch} from "react-router-dom";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import './App.css'

class App extends Component{

  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    );
  }
}
export default connect(
  state =>({comments:state.comments}), //state就是一个comments数组
  {}
)(App);