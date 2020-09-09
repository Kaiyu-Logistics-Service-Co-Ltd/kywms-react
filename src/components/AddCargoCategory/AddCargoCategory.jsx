import React,{Component} from "react";
import {Form, Input,Select} from "antd"
import MyIcon from "../../assets/icon/myIcon";
import {reqFirstCategoryList} from "../../api";

const { Option } = Select;
export default class AddCargoCategory extends Component{
  state = {
    cargoCategoryNameItem:{
      value:"",
      validateStatus:"validating",
      hasFeedback: false,
    },
    CargoCategoryList: [
      {
        cargoCategoryId:0,
        cargoCategoryName:"一级分类",
        cargoCategoryParentId:0
      },
    ],
  }

  onCargoCategoryNameChange=(event)=>{
    const value = event.target.value;
    this.cargoCategoryNameValidate(value);
  }
  cargoCategoryNameValidate = (value)=>{
    let validateStatus,help,hasFeedback=true;
    if (!value){
      validateStatus="error"
      help="请输入分类名!"
    }else if(value.length<=1){
      validateStatus="error"
      help="分类名必须大于1位!"
    }else if(value.length>16){
      validateStatus="error"
      help="分类名不能超过16位!"
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      validateStatus="error"
      help="分类名必须为字母、数字、下划线或中文汉字组成!"
    }
    else {
      validateStatus="success";
    }
    this.setState({cargoCategoryNameItem:{value,validateStatus,help,hasFeedback}});
  }

  onFinish = async values => {
    console.log(values)
  };

  async componentDidMount() {
    const requestCargoCategoryList = await reqFirstCategoryList();
    if (requestCargoCategoryList.code===200){
      const cargoCategoryList = requestCargoCategoryList.data;
      this.setState({CargoCategoryList:[...this.state.CargoCategoryList,...cargoCategoryList]});
    }else if (requestCargoCategoryList.code===404){
      this.setState({CargoCategoryList: [{cargoCategoryId:0,cargoCategoryName:requestCargoCategoryList.message},]});
    }else {
      this.setState({CargoCategoryList: [{cargoCategoryId:0,cargoCategoryName:requestCargoCategoryList.message},]});
    }
  }
  render() {
    const {cargoCategoryNameItem,CargoCategoryList} = this.state;
    console.log(CargoCategoryList)
    return (
      <Form
        name="add-cargoCategory-from"
        onFinish={this.onFinish}>
        <Form.Item
          className="add-cargoCategory-from-cargoCategoryItem"
          name="cargoCategoryId"
          initialValue={CargoCategoryList[0].cargoCategoryId}>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              CargoCategoryList.map((value,index) => (
                <Option className="reg-content-form-departmentSelectItem" value={value.cargoCategoryId} key={index}>{value.cargoCategoryName}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          className="reg-content-form-userNameItem"
          name="cargoCategoryName"
          {...cargoCategoryNameItem}
        >
          <Input
            className="reg-content-form-userNameInput"
            prefix={<MyIcon type="categorySvg" />}
            placeholder="分类名"
            value={cargoCategoryNameItem.value}
            onChange={this.onCargoCategoryNameChange}
          />
        </Form.Item>
      </Form>
    );
  }
}