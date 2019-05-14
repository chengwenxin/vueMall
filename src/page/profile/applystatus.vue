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
            <cwx-audit-table :formdata="formdata" ></cwx-audit-table>
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
