import React,{Component} from "react";
import {Card, Table, Button, Skeleton, message,Pagination} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import LinkButton from "../../components/LinkButton/LinkButton";
import "./CargoCategoryManagement.less"
import {reqCargoCategoryList} from "../../api";
export default class CargoCategoryManagement extends Component{

  state = {
    loading:false,
    cargoCategoryList:[],
    pagination:{},
  }

  /**
   * 初始化Table列
   */
  initColumns = () =>{
    this.columns =[
      {
        title:"分类名称",
        dataIndex:"cargoCategoryName",
        key:"cargoCategoryName"
      },
      {
        title:"操作",
        width:300,
        render:()=>(
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    ];
  }
  getCargoCategoryList = async () =>{
    this.setState({loading:true});
    const request = await reqCargoCategoryList(0);
    if (request.code===200){
      const cargoCategoryList = request.data
      const pagination={defaultPageSize: 5, showQuickJumper: true}
      /**
       * 配置分页器
       */
      this.setState({pagination});
      /**
       * 数据处理
       */
      this.setState({cargoCategoryList});
      /**
       * 取消骨架屏
       */
      this.setState({loading:false});

    }else {
      message.error("获取分类列表失败");
      this.setState({loading:false});
    }
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCargoCategoryList();
  }

  render() {
    const {loading,cargoCategoryList,pagination} = this.state;
    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>
          添加
      </Button>
    );
    return (
      <Card className="CargoCategoryManagement" extra={extra}>
        <Skeleton paragraph={{ rows: 10 }} loading={loading} active>
          <Table
            rowKey='cargoCategoryId'
            dataSource={cargoCategoryList}
            pagination={pagination}
            columns={this.columns}/>
        </Skeleton>
      </Card>
    );
  }
}