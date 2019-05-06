<template>
  <div>
    <!-- <el-button size="small" type="success">创建</el-button>
    <el-button size="small" type="danger" >删除</el-button>-->
    <el-table :data="formdata" border stripe>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="type" label="类型" width="80"></el-table-column> -->
      <el-table-column align="center" prop="title" label="标题" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column align="center" prop="author" label="作者" width="80"></el-table-column>
      <template v-if="type === '资助政策'">
         <el-table-column align="center" prop="isApply" label="申请状态" width="80"></el-table-column>
      </template>
      <el-table-column align="center" prop="detailDate" label="发布日期" width="120"></el-table-column>
      <el-table-column prop="content" label="发布内容" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="handleContent(scope.row.content)">发布详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <!-- <el-popover placement="top" width="200" v-model="visible" trigger="click">
            <p>确定删除这条记录吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancel">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" size="small" type="danger">删除</el-button>
          </el-popover>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="totalCount"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="total,sizes, prev, pager, next ,jumper"
    ></el-pagination>

    <div v-if="dialogVisible">
      <el-dialog center :visible.sync="dialogVisible" width="1200">
        <div slot="title" style="font-size:18px;font-weight:bold;color:#007536">发布内容详情</div>
        <div v-html="content"></div>
      </el-dialog>
    </div>
    <div v-if="editVisible">
      <el-dialog :visible.sync="editVisible" width="1300px">
        <cwx-ue :formParam="formParam" :type="type" @closeDialog="closeDialog" @refresh="refresh"></cwx-ue>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getScholarList,
  getAnnouncementList,
  getWorkingtList,
  getIntroductionDetail,
  deletePolicy,
  deleteWorking,
  deleteAnnouncement
} from "../api/scholar";
export default {
  props: ["type"],
  data() {
    return {
      formParam:{},
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      formdata: [],
      dialogVisible: false,
      content: "",
      visible: false,
      editVisible: false
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    //切换分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.query();
    },
    sizeChange(val){
      this.pageSize = val
      this.query()
    },
    query() {
      if (this.type === "资助政策") {
        getScholarList({
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }).then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
            this.totalCount = data.totalCount;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        });
      } else if (this.type === "通知公告") {
        getAnnouncementList({
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }).then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
            this.totalCount = data.totalCount;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        });
      } else if (this.type === "工作动态") {
        getWorkingtList({
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }).then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
            this.totalCount = data.totalCount;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        });
      } else if (this.type === "中心简介") {
        getIntroductionDetail().then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
            this.totalCount = data.content.length;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        });
      }
    },
    // 刷新
    refresh() {
       this.query()
    },
    closeDialog() {
      this.editVisible = false;
    },
    cancel() {
      this.visible = false;
    },
    //显示内容详情
    handleContent(val) {
      this.content = val;
      this.dialogVisible = true;
    },
    //删除
    handleDelete(id) {
      // this.visible = false;
      if (this.type === "资助政策") {
        deletePolicy({ id })
          .then(data => {
            this.refresh()
            this.$emit("closeDialog");
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      } else if (this.type === "通知公告") {
        deleteAnnouncement({ id })
          .then(data => {
            this.refresh()
            this.$emit("closeDialog");
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      } else if (this.type === "工作动态") {
        deleteWorking({ id })
          .then(data => {
            this.refresh()
            this.$emit("closeDialog");
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      }
    },
    //编辑
    handleEdit(val) {
      this.editVisible = true;
      this.formParam = val;
    }
  }
};
</script>