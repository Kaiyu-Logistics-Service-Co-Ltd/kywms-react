/* 包含 n 个接口请求函数的模块
 * 每个函数返回 promise
 */
import ajax from './ajax'
// 登陆
export const reqLogin = (userCode,userPassword) => ajax('/user/login',{userCode,userPassword},'POST');

export const reqCheckIfTheUserCodeExists = (userCode) => ajax('user/checkIfTheUserCodeExists',{userCode},"GET");

export const reqAddUser = (userCode,userPassword,userName,userRoleId,departmentId) => ajax('/user/addUser', {userCode,userPassword,userName,userRoleId,departmentId},'POST');
export const reqUserPasswordEncryption = (userPassword) => ajax('user/userPasswordEncryption',userPassword,"POST");
export const reqCompanyList = ()=>ajax('/company/query',null);
export const reqUserRoleList = ()=>ajax('/rwa/showAllRoles',null);
export const reqDepartmentList = () => ajax('/rwa/showAllDepartments',null);