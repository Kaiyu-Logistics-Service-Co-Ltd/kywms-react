import {combineReducers} from "redux"
/*
 * 包含N个reducer函数的模块
 * ###以下自我见解###
 * 以这种形式一般用于全局状态。每个组件都这样用可能会影响性能
 * 函数名返回对应的状态值
 * dispatch会搜索全部函数....效率低下?
 */
import {
  ADD_PageNum,
  Reduce_PageNum,
  Change_ParentId,
  Reset_ParentId,
  Change_ParentName,
  Reset_ParentName
} from "./action-types"

function currentCargoCategoryPageNum(state =1,action) {
  switch (action.type) {
    case ADD_PageNum: {
      return state+1;
    }
    case Reduce_PageNum:{
      return state-1;
    }
    default:
      return state;
  }
}
function currentCargoCategoryParentId(state = 0,action) {
  switch (action.type) {
    case Change_ParentId: {
      return action.data;
    }
    case Reset_ParentId:{
      return 0;
    }
    default:
      return state;
  }
}
function currentCargoCategoryParentName(state ="",action) {
  switch (action.type) {
    case Change_ParentName: {
      return action.data;
    }
    case Reset_ParentName:{
      return "";
    }
    default:
      return state;
  }
}

export default combineReducers({
  currentCargoCategoryPageNum, //指定reducer对应的属性
  currentCargoCategoryParentId,
  currentCargoCategoryParentName
});