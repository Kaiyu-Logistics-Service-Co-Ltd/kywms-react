import {combineReducers} from "redux"
/*
 * 包含N个reducer函数的模块
 * ###以下自我见解###
 * 以这种形式一般用于全局状态。每个组件都这样用可能会影响性能
 * 函数名返回对应的状态值
 * dispatch会搜索全部函数....效率低下?
 */
import {SOME_STR} from "./action-types"

const initComments=[];
function comments(state = initComments,action) {
  console.log("1")
  switch (action.type) {
    // case ADD_COMMENT: {
    //   console.log("2")
    //   return [action.data, ...state];
    // }
    // case DELETE_COMMENT:{
    //   console.log("3")
    //   return state.filter((comment,index) => index!==action.data);
    // }
    // case RECEIVE_COMMENTS:{
    //   return action.data;
    // }
    default:
      console.log("0")
      return state;
  }
}
function count(state = 0 ,action) {
  switch (action.type) {
    // case INCREMENT: {
    //   return state + action.data;
    // }
    // case DECREMENT: {
    //   return state - action.data;
    // }
    default:
      return state;
  }
}
export default combineReducers({
  comments, //指定reducer对应的属性
  count
});