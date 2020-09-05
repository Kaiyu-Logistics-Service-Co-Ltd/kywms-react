/*
 * 包含所有action creator 的工厂函数
 *
 * 同步的action都返回的是一个对象
 * 异步的action都返回的是一个函数
 */
import {
  ADD_PageNum,
  Reduce_PageNum,
  Change_ParentId,
  Reset_ParentId,
  Change_ParentName,
  Reset_ParentName
} from "./action-types"

export const addPageNum = () => ({type:ADD_PageNum,data:null});
export const reducePageNum = () => ({type:Reduce_PageNum,data:null});
export const changeParentId = (parentId) => ({type:Change_ParentId,data:parentId});
export const resetParentId = () => ({type:Reset_ParentId,data:null});
export const changeParentName = (parentName) => ({type:Change_ParentName,data:parentName});
export const resetParentName = () => ({type:Reset_ParentName,data:null});


// //同步接收comments
// const receiveComments = (comments) => ({type:SOME_STR,data:comments});
// //异步获取后台数据
// export const getComments = () =>{
//   return dispatch => {
//     //模拟ajax
//     setTimeout(()=>{
//       const comments=[
//         {username:'Tom',content:'React挺好的!'},
//         {username:'Jack',content:'React太难了!'},
//         {username:'Merry',content:'React嗯嗯嗯!'},
//         {username:'Rose',content:'React是什么!'}
//       ];
//       //分发同步的action
//       dispatch(receiveComments(comments));
//     },1000)
//   }
// }