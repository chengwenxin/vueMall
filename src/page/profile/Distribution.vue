<template>
  <div class="profile">
    <div class="container">
      <div class="header">
        <cwx-header :menu="menuc"></cwx-header>
      </div>
      <div class="main">
        <!-- <cwx-sort-main title="个人中心"></cwx-sort-main> -->
        <!-- <cwx-sort-left :menu="menu"></cwx-sort-left> -->
        <cwx-sort-right width="width:1198px;border-left:1px dashed #438F48;">
          <div>
            <div style="margin:5px;">
              <el-form
                :inline="true"
                :model="queryData"
                class="demo-form-inline"
                style="margin-left:40px;"
              >
                <el-form-item label="院系：">
                  <el-select v-model="queryData.region" placeholder="请选择院系">
                    <el-option label="信息工程学院" value="shanghai"></el-option>
                    <el-option label="动物科技学院" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名：">
                  <el-input v-model="queryData.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="success"
                    @click="handleEdit({number:'',name:'',role:'',college:'',grade:''})"
                  >创建</el-button>
                  <el-popover placement="top" width="300" v-model="visible2">
                    <i class="el-icon-warning" style="color:red;font-size:20px;"></i>
                    <span style="font-size:20px;">确定删除这些账户吗？</span>
                    <div style="text-align: right; margin-top:20px;">
                      <el-button size="mini" @click="visible2 = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="handleDelete">确定</el-button>
                    </div>
                    <el-button
                      type="danger"
                      slot="reference"
                      :disabled="ids.length<1"
                    >删除</el-button>
                  </el-popover>
                </el-form-item>
              </el-form>
            </div>

            <el-table :data="formdata" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column align="center" label="序号" width="50">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column sortable align="center" prop="role" label="账户类型" width="120"></el-table-column>
              <el-table-column align="center" prop="number" label="账户" width="80"></el-table-column>
              <el-table-column align="center" prop="password" label="密码" width="80"></el-table-column>
              <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column sortable align="center" prop="college" label="学院" width="160"></el-table-column>
              <el-table-column sortable align="center" prop="grade" label="年级" width="80"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
              <el-dialog :visible.sync="dialogVisible" width="1200">
                <div slot="title" style="font-size:20px;color:#fff">账户分配</div>
                <div>
                  <el-form
                    label-width="100px"
                    :rules="rules"
                    :model="modifyData"
                    ref="registerref"
                    inline
                  >
                    <el-form-item label="学 院" prop="college">
                      <el-select
                        v-model="modifyData.college"
                        placeholder="请选择学院"
                        style="width:200px"
                      >
                        <el-option v-for="(item,index) in collegeList" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="年 级" prop="grade">
                      <el-select v-model="modifyData.grade" placeholder="年级" style="width:200px">
                        <el-option
                          v-for="(item,index) in ['14','15','16','17','18']"
                          :key="index"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="账 户" prop="number">
                      <el-input
                        v-model.trim="modifyData.number"
                        placeholder="学号/职工号"
                        style="width:200px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="姓 名" prop="name">
                      <el-input
                        v-model.trim="modifyData.name"
                        placeholder="学号/职工号"
                        style="width:200px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="密 码" prop="password">
                      <el-input
                        v-model.trim="modifyData.password"
                        placeholder="请输入密码"
                        style="width:200px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="账户类型" prop="role">
                      <el-select
                        v-model="modifyData.role"
                        placeholder="请选择账户类型"
                        style="width:200px"
                      >
                        <el-option v-for="(item,index) in roleList" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="success" @click="onSubmit">保存</el-button>
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
import mixins from "./mixins";
import { userList, userDelete, userUpdate, getCollegeList } from "../../api";
export default {
  mixins: [mixins],
  mounted() {
    this.query();
    this.getList();
  },
  methods: {
    getList() {
      getCollegeList().then(data => {
        let collegeList = [];
        let majorList = [];
        let gradeList = [];
        this.allCollegeList = data.content;
        data.content.forEach(item => {
          collegeList.push(item.college);
          majorList.push(item.major);
          gradeList.push(item.grade);
        });
        this.collegeList = Array.from(new Set(collegeList));
        this.majorList = Array.from(new Set(majorList));
        this.gradeList = Array.from(new Set(gradeList));
      });
    },
    handleEdit(val) {
      this.dialogVisible = true;
      this.modifyData = val;
      console.log(this.modifyData);
    },
    //切换分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.query();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    query() {
      userList({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(data => {
        this.formdata = data.content;
        this.totalCount = data.totalCount;
      });
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    handleDelete() {
      let temp = this.ids;
      let ids = [];
      temp.forEach(item => {
        ids.push(item.id);
      });
      userDelete({ ids }).then(data => {
        this.$message.success("删除成功！");
        this.visible2 = false;
        this.query();
      });
    },
    update() {
      userUpdate(this.modifyData).then(data => {
        this.dialogVisible = false;
        this.$message.success("保存成功！");
        this.query();
      });
    },
    resetForm() {
      this.$refs["registerref"].resetFields();
    },
    onSubmit() {
      this.$refs["registerref"].validate(valid => {
        if (valid) {
          this.update();
        } else {
          return false;
        }
      });
    }
  },
  data: function() {
    return {
      queryData: {},
      ids: [],
      visible2: false,
      formdata: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      modifyData: {},
      rules: {
        // college: [
        //   {
        //     message: "请选择学院",
        //     required: true
        //   }
        // ],
        name: [
          {
            message: "请输入姓名",
            required: true
          }
        ],
        number: [
          {
            message: "请输入账号",
            required: true
          }
        ],
        // grade: [
        //   {
        //     message: "请选择年级",
        //     required: true
        //   }
        // ],

        role: [
          {
            message: "请选择账户类型",
            required: true
          }
        ],
        password: [
          {
            message: "请输入密码",
            required: true
          }
        ]
      },
      collegeList: [],
      gradeList: [],
      majorList: [],
      roleList: ["学生", "辅导员", "学生处"]
    };
  }
};
</script>

