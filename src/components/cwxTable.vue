<template>
  <div>
    <el-table :data="formdata" border stripe>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="type" label="类型" width="80"></el-table-column> -->
      <el-table-column align="center" prop="title" label="标题" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column align="center" prop="author" label="作者" width="80"></el-table-column>
      <el-table-column align="center" prop="isApply" label="申请状态" width="80"></el-table-column>
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
          </el-popover> -->
        </template>
      </el-table-column>
    </el-table>
    <div v-if="dialogVisible">
      <el-dialog center :visible.sync="dialogVisible" width="1200">
        <div slot="title" style="font-size:18px;font-weight:bold;color:#007536">发布内容详情</div>
        <div v-html="content"></div>
      </el-dialog>
    </div>
    <div v-if="editVisible" >
       <el-dialog :visible.sync="editVisible" width="1300px">
          <cwx-ue :fromParam='formData' :type="type" @closeDialog="closeDialog" @refresh="refresh"></cwx-ue>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  deletePolicy,
  deleteWorking,
  deleteAnnouncement
} from "../api/scholar";
export default {
  props: ["formdata", "type"],
  data() {
    return {
      formData: {
        type: "",
        author: "",
        title: "",
        update_date: "",
        detailDate: "",
        content: "",
        isApply: ""
      },
      dialogVisible: false,
      content: "",
      visible: false,
      editVisible:false
    };
  },
  methods: {
    refresh(){
      this.$emit('refresh')
    },
    closeDialog(){
      this.editVisible = false
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
            this.$emit("refresh");  
            this.$emit('closeDialog')
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      } else if (this.type === "通知公告") {
        deleteAnnouncement({ id })
          .then(data => {
            this.$emit("refresh");
            this.$emit('closeDialog')
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      } else if (this.type === "工作动态") {
        deleteWorking({ id })
          .then(data => {
            this.$emit("refresh");
            this.$emit('closeDialog')
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      } 
    },
    //编辑
    handleEdit(val) {
      console.log(val)
      this.editVisible = true
      this.formData = val
    }
  }
};
</script>