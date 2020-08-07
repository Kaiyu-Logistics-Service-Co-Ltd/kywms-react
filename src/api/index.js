/* 包含 n 个接口请求函数的模块
 * 每个函数返回 promise
 */
import ajax from './ajax'
// 登陆
export const reqLogin = (userCode,userPassword) => ajax('/user/login',{userCode,userPassword},'POST');
export const reqAddUser = (userRoleId,user) => ajax('/user/addUser',{userRoleId,user},'POST');
export const reqCompanyList = ()=>ajax('/company/query',null,'GET');