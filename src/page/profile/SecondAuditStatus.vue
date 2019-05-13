<template>
  <div class="profile">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="个人中心"></cwx-sort-main>
        <cwx-sort-left :menu="menu"></cwx-sort-left>
        <cwx-sort-right>
          <div>
            <el-table :data="formdata" border stripe mutiple>
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column align="center" prop="number" label="序号">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column align="center" prop="category" label="资助项目"></el-table-column>
              <el-table-column align="center" prop="number" label="申请学号"></el-table-column>
              <el-table-column align="center" prop="name" label="申请人"></el-table-column>
              <el-table-column align="center" prop="applyDate" label="申请时间" min-width="200">
               <template slot-scope="scope">
                   {{formateDate(scope.row.applyDate)}}
               </template>
              </el-table-column>
              <el-table-column align="center" prop="firstAuditStatus" label="初核状态"></el-table-column>
              <el-table-column align="center" prop="firstAudit" label="初审人"></el-table-column>
              <el-table-column align="center" prop="firstResponse" label="初审回复" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="firstAuditDate" label="初审时间">
              </el-table-column>
                 <el-table-column align="center" prop="secondAuditStatus" label="复核状态"></el-table-column>
              <el-table-column align="center" prop="secondAudit" label="复审人"></el-table-column>
              <el-table-column align="center" prop="secondResponse" label="复审回复" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="secondAuditDate" label="复审时间"></el-table-column>
              <el-table-column align="center" label="操作">
               <template slot-scope="scope">
                 <el-button type="text" @click="firstAudit(scope.row)" >初审</el-button>
               </template>
              </el-table-column>
            </el-table>
         <div v-if="firstVisible">
              <el-dialog
            :visible.sync="firstVisible"
            title="初审"
            width="50%"
            :close-on-click-modal='false'
            >
              <el-form :model="params" label-width="140px">
              <el-form-item  prop="firstAuditStatus" label="初审状态:">
                <el-select v-model="params.firstAuditStatus" >
                  <el-option v-for="item in ['暂无审核','申请通过','申请驳回']" :key="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="firstResponse" label="初审回复:" show-overflow-tooltip>
                <el-input v-model="params.firstResponse" type="textarea" :autosize="{minRows:3}"></el-input>
              </el-form-item>
              </el-form>
               <span slot="footer" class="dialog-footer">
    <el-button @click="firstVisible = false">取 消</el-button>
    <el-button type="success" @click="firstAuditSubmit">确 定</el-button>
  </span>
            </el-dialog>
         </div>
          </div>
        </cwx-sort-right>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { auditList,firstAuditReplace } from "../../api/scholar";
import formatDate from '../../utils/formatDate'
import mixins from './mixins'
export default {
  mixins:[mixins],
  mounted() {
    this.getList();
  },
  methods: {

firstAuditSubmit(){
  let firstAuditDate = new Date()
  firstAuditDate = formatDate(firstAuditDate)
this.params = Object.assign({},this.params,{firstAuditDate})
  firstAuditReplace(this.params).then(data => {
    this.getList()
    this.firstVisible=false
          this.$message.success('复审完成')
        })
        .catch(err => {
          console.log(err);
        });
},
    //弹窗
    firstAudit(val){
      this.firstVisible = true
      this.params = val
    },
    //格式化申请日期
    formateDate(applyDate){
      let date = new Date(applyDate)
      return date.toLocaleString()
    },
    getList() {
      auditList({role:'1'})
        .then(data => {
          if(data.status === '1'){
          this.formdata = data.content;
          }else {
            this.$message.error(data.msg)
            this.$router.push('/login')
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data: function() {
    return {
      firstVisible:false,
      params:{},
      formdata: [],
    };
  }
};
</script>
<style lang="scss" >
body .el-table th.gutter {
  display: table-cell !important;
}
.profile {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    .header,
    .main {
      position: relative;
    }
  }
}

</style>
<style>
.el-dialog__header{
  background:#67C23A;
  color:#FFFFFF;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 20px;
    color: #ffffff;
}
</style>