import React from "react";
import {UserOutlined,HomeOutlined} from "@ant-design/icons";
import MyIcon from "../assets/icon/myIcon";

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: <HomeOutlined />, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '运单管理',
    key: '/waybillManagement',
    icon: <MyIcon type="waybillSvg"/>,
  },
  {
    title: '货物',
    key: '/cargo',
    icon: <MyIcon type="cargoSvg"/>,
    children: [
      {
        title: '货物管理',
        key: '/cargo/management',
        icon: <MyIcon type="cargoManagementSvg"/>
      },
      {
        title: '品类管理',
        key: '/cargo/category',
        icon: <MyIcon type="cargoCategorySvg"/>
      },
    ]
  },

  {
    title: '用户管理',
    key: '/userManagement',
    icon: <UserOutlined/>,
  },
  {
    title: '角色管理',
    key: '/authorityManagement',
    icon: <MyIcon type="authoritySvg"/>,
  },

]

export default menuList