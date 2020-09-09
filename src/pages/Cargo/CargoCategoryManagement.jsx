import React,{Component} from "react";
import PropType from "prop-types"
import {Card, Table, Button, message, Modal} from "antd"
import {PlusOutlined, SwapRightOutlined} from "@ant-design/icons"
import LinkButton from "../../components/LinkButton/LinkButton";
import "./CargoCategoryManagement.less"
import {connect} from "react-redux"
import {addPageNum,reducePageNum,changeParentId,resetParentId,changeParentName,resetParentName} from "../../redux/actions"
import {reqCargoCategoryList} from "../../api";
import AddCargoCategory from "../../components/AddCargoCategory/AddCargoCategory";
class CargoCategoryManagement extends Component{

  static propTypes = {
    currentCargoCategoryPageNum: PropType.number.isRequired,
    addPageNum: PropType.func.isRequired,
    reducePageNum: PropType.func.isRequired,
    currentCargoCategoryParentId: PropType.number.isRequired,
    changeParentId: PropType.func.isRequired,
    resetParentId: PropType.func.isRequired,
    currentCargoCategoryParentName: PropType.string.isRequired,
    changeParentName: PropType.func.isRequired,
    resetParentName: PropType.func.isRequired,
  }

  state = {
    loading:false,
    cargoCategoryList:[], //一级分类列表
    subCategoryList: [], // 二级分类列表
    pagination:{},
    parentId: 0,
    parentName:'',
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }

  /**
   * 初始化Table列
   */
  initColumns = () =>{
    const {parentId} = this.state;
    this.columns =[
      {
        title:"分类名称",
        dataIndex:"cargoCategoryName",
        key:"cargoCategoryName"
      },
      {
        title:"操作",
        width:300,
        render:(category)=>{
          if (parentId===0){
            return(
              <span>
                <LinkButton>修改分类</LinkButton>
                {/*
                  如何向事件回调函数传递参数:
                    先定义一个匿名函数，
                    在函数调用处理的函数并传入数据
                */}
                <LinkButton onClick={()=>{this.showSubCategoryList(category)}}>查看子分类</LinkButton>
              </span>
            )
          }else {
            return(
              <span>
                <LinkButton>修改分类</LinkButton>
              </span>
            )
          }
        }
      }
    ];
  }
  getCargoCategoryList = async () =>{
    const {currentCargoCategoryPageNum,currentCargoCategoryParentId,currentCargoCategoryParentName} = this.props;
    const {parentId} = this.state;
    console.log(parentId,currentCargoCategoryParentId,currentCargoCategoryParentName);
    this.setState({loading:true});
    const request = await reqCargoCategoryList(currentCargoCategoryPageNum,parentId);
    if (request.code===200){
      const {pageNum,total,list,pageSize} = request.data;
      const pagination={current:pageNum,showQuickJumper: true,total,pageSize,onChange:this.onHandlePageChange}
      /**
       * 配置分页器
       */
      this.setState({pagination});
      /**
       * 数据处理
       */
      if (parentId===0){
        this.setState({cargoCategoryList:list});
      }else {
        this.setState({subCategoryList:list});
      }
      /**
       * 取消骨架屏
       */
      this.setState({loading:false});
      console.log(request.data)
    }else {
      message.error("获取分类列表失败");
      this.setState({loading:false});
    }
  }

  /*
   *  显示指定一级分类对象的二级子列表
   */
  showSubCategoryList = (category) =>{
    /**
     * 更新状态
     */
    this.setState({
      parentId:category.cargoCategoryId,
      parentName:category.cargoCategoryName,
    },()=>{//在状态更新且render后执行
      this.props.changeParentId(category.cargoCategoryId);
      this.props.changeParentName(category.cargoCategoryName);
      console.log(this.state.parentId);
      console.log(this.state.parentName);
      console.log(category);
      this.getCargoCategoryList();
      this.initColumns();
    });
  }

  onHandlePageChange = async (page,pageSize)=>{
    this.setState({loading:true});
    const {currentCargoCategoryPageNum} = this.props;
    const request = await reqCargoCategoryList(page,0);
    if (request.code===200){
      const {pageNum,total,list,pageSize} = request.data;
      const pagination={current:pageNum,showQuickJumper: true,total,pageSize,onChange:this.onHandlePageChange}
      /**
       * 配置分页器
       */
      if (currentCargoCategoryPageNum<page){
        this.props.addPageNum();
      }else {
        this.props.reducePageNum();
      }
      this.setState({pagination});
      /**
       * 数据处理
       */
      this.setState({cargoCategoryList:list});
      /**
       * 取消骨架屏
       */
      this.setState({loading:false});
    }else {
      message.error("获取分类列表失败");
      this.setState({loading:false});
    }
  }
  showCategoryList = () =>{
    /**
     * 更新状态
     */
    this.setState({
      parentId:0,
      parentName:"",
    },()=>{//在状态更新且render后执行
      this.props.changeParentId(0);
      this.props.changeParentName("");
      this.getCargoCategoryList();
      this.initColumns();
    });
  }

  showAddModal= () =>{
    this.setState({showStatus:1});
  }

  handleModalCancel=()=>{
    this.setState({showStatus:0})
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCargoCategoryList();
  }

  render() {
    const {showStatus,parentId,parentName,loading,cargoCategoryList,subCategoryList,pagination} = this.state;
    const title = parentId === 0 ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategoryList}>一级分类列表</LinkButton>
        <SwapRightOutlined />
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button onClick={this.showAddModal} type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
    );
    return (
      <Card
        className="CargoCategoryManagement"
        title={title}
        extra={extra}
      >
        <Table
          rowKey='cargoCategoryId'
          dataSource={parentId ===0 ? cargoCategoryList:subCategoryList}
          pagination={pagination}
          bordered
          loading={loading}
          columns={this.columns}/>
        <Modal
          title="添加分类"
          visible={showStatus===1}
          centered={true}
          onCancel={this.handleModalCancel}
          footer={null}
        >
          <AddCargoCategory/>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          centered={true}
          onCancel={this.handleModalCancel}
          footer={null}
        >
          <AddCargoCategory/>
        </Modal>
      </Card>
    );
  }
}
export default connect(
  state =>({
    currentCargoCategoryPageNum:state.currentCargoCategoryPageNum,
    currentCargoCategoryParentId:state.currentCargoCategoryParentId,
    currentCargoCategoryParentName:state.currentCargoCategoryParentName,
  }), //state就是一个comments数组
  {addPageNum,reducePageNum,changeParentId,resetParentId,changeParentName,resetParentName}
)(CargoCategoryManagement);