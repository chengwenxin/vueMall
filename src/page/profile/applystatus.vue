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
              <el-table-column     type="selection" width="55"></el-table-column>
              <el-table-column     align="center" prop="number" label="序号">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column     align="center" prop="category" label="资助项目"></el-table-column>
              <el-table-column     align="center" prop="number" label="申请学号"></el-table-column>
              <el-table-column     align="center" prop="name" label="申请人"></el-table-column>
              <el-table-column   sortable  align="center" prop="applyDate" label="申请时间" min-width="200">
              </el-table-column>
              <el-table-column   sortable  align="center" prop="firstAuditStatus" label="初核状态"></el-table-column>
              <el-table-column   sortable  align="center" prop="firstAudit" label="初审人"></el-table-column>
              <el-table-column   sortable  align="center" prop="firstResponse" label="初审回复" show-overflow-tooltip></el-table-column>
              <el-table-column   sortable  align="center" prop="firstAuditDate" label="初审时间" min-width="200"></el-table-column>
                 <el-table-column   sortable  align="center" prop="secondAuditStatus" label="复核状态"></el-table-column>
              <el-table-column   sortable  align="center" prop="secondAudit" label="复审人"></el-table-column>
              <el-table-column   sortable  align="center" prop="secondResponse" label="复审回复" show-overflow-tooltip></el-table-column>
              <el-table-column   sortable  align="center" prop="secondAuditDate" label="复审时间" min-width="200"></el-table-column>
              <el-table-column     align="center" label="操作" fixed="right">
                <el-button type="text" >撤销</el-button>
              </el-table-column>
            </el-table>
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
import { auditList } from "../../api/scholar";
import formatDate from '../../utils/formatDate'
import mixins from './mixins'
export default {
  mixins:[mixins],
  mounted() {
    this.getList();
  },
  methods: {
    //格式化申请日期
    // formateDate(applyDate){
    //   let date = new Date(applyDate)
    //   return date.toLocaleString()
    // },
    getList() {
      auditList({role:'0'})
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
      formdata: [],
      formatDate:formatDate
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
