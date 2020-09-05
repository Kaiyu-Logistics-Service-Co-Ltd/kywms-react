/* 包含 n 个接口请求函数的模块
 * 每个函数返回 promise
 */
import ajax from './ajax'
// 登陆
export const ping = () => ajax('/user/ping',null,"GET");
export const reqLogin = (userCode,userPassword) => ajax('/user/login',{userCode,userPassword},"POST");
export const reqLogout = () => ajax('/user/removeSession',null,"POST");
export const reqCheckIfTheUserCodeExists = (userCode) => ajax('user/checkIfTheUserCodeExists',{userCode},"GET");

export const reqAddUser = (userCode,userPassword,userName,userRoleId,departmentId) => ajax('/user/addUser', {userCode,userPassword,userName,userRoleId,departmentId},'POST');
export const reqUserPasswordEncryption = (userPassword) => ajax('user/userPasswordEncryption',userPassword,"POST");
export const reqCompanyList = ()=>ajax('/company/query',null);
export const reqUserRoleList = ()=>ajax('/rwa/showAllRoles',null);
export const reqDepartmentList = () => ajax('/rwa/showAllDepartments',null);
/**
 * 货物分类管理接口
 */
export const reqCargoCategoryList = (pn,cargoCategoryParentId) => ajax('/cargo/getCategoryByParentId', {pn,cargoCategoryParentId},"GET");
export const reqAddCargoCategory = (cargoCategoryName,cargoCategoryParentId) => ajax('/cargo/addCategory', {cargoCategoryName,cargoCategoryParentId},"POST");
export const reqUpdateCargoCategory = (cargoCategoryId) => ajax('/cargo/deleteCategory', {cargoCategoryId},"POST");
export const reqDeleteCargoCategory = (cargoCategoryId,cargoCategoryName) => ajax('/cargo/updateCategory',{cargoCategoryId,cargoCategoryName},"POST");

