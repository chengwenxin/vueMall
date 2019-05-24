<template>
  <div>
    <el-table :data="formdata" border stripe >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" prop="number" label="序号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="category"
        label="资助项目"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column align="center" prop="number" label="申请学号" min-width="110" sortable></el-table-column>
      <el-table-column align="center" prop="name" label="申请人" min-width="110" sortable></el-table-column>
      <el-table-column align="center" prop="college" label="学院" min-width="110" sortable></el-table-column>
      <el-table-column align="center" prop="major" label="专业" min-width="110" sortable></el-table-column>
      <el-table-column align="center" prop="grade" label="班级" min-width="110" sortable></el-table-column>
      <el-table-column sortable align="center" prop="applyDate" label="申请时间" min-width="200"></el-table-column>
      <el-table-column sortable align="center" prop="firstAuditStatus" label="初审状态" min-width="110">
        <template slot-scope="scope">
          <div v-if="scope.row.firstAuditStatus.includes('驳回')">
            <el-button type="text">
              <span style="color:red;">{{scope.row.firstAuditStatus}}</span>
            </el-button>
          </div>
          <div v-else>
            <el-button type="text">
              <span style="color:#438F49;">{{scope.row.firstAuditStatus}}</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="firstAudit" min-width="100" label="初审人"></el-table-column>
      <el-table-column
        sortable
        align="center"
        prop="firstResponse"
        label="初审回复"
        show-overflow-tooltip
        min-width="110"
      ></el-table-column>
      <el-table-column sortable align="center" prop="firstAuditDate" label="初审时间" min-width="200"></el-table-column>
      <el-table-column sortable align="center" prop="secondAuditStatus" label="复审状态" min-width="110">
        <template slot-scope="scope">
          <div v-if="scope.row.secondAuditStatus.includes('驳回')">
            <el-button type="text">
              <span style="color:red;">{{scope.row.secondAuditStatus}}</span>
            </el-button>
          </div>
          <div v-else>
            <el-button type="text">
              <span style="color:#438F49;">{{scope.row.secondAuditStatus}}</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="secondAudit" label="复审人" min-width="110"></el-table-column>
      <el-table-column
        sortable
        align="center"
        prop="secondResponse"
        label="复审回复"
        show-overflow-tooltip
        min-width="110"
      ></el-table-column>
      <el-table-column sortable align="center" prop="secondAuditDate" label="复审时间" min-width="200"></el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <div v-if="type === 'firstAudit'">
            <el-button type="text" @click="getDetail(scope.row.number,scope.row.category)">申请书</el-button>
            <el-button type="text" @click="submitClick(scope.row)">初审</el-button>
          </div>
          <div v-else-if="type === 'secondAudit'">
            <el-button type="text" @click="getDetail(scope.row.number,scope.row.category)">申请书</el-button>
            <el-button type="text" @click="submitClick(scope.row)">复审</el-button>
          </div>
          <div v-else>
            <el-button type="text" @click="getDetail(scope.row.number,scope.row.category)">申请书</el-button>
            <el-button type="text">撤销</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="visible">
      <el-dialog width="70%" :visible.sync="visible" center>
        <div slot="title">
          <span style="color:#fff;font-weight:bold;font-size:24px;">申 请 书</span>
        </div>
        <div>
          <!-- 基本信息 -->
          <div style="margin-bottom:10px;">
            <el-card>
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">基本信息</h1>
              </div>
              <br>
              <el-form
                label-width="100px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';height:300px"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学号：" prop="sno">{{formData.sno}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份：">学生</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学院：" prop="college">{{formData.college}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业：" prop="major">{{formData.major}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级：" prop="grade">{{formData.grade}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="性别：" prop="gender">{{formData.gender}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族：" prop="nation">{{formData.nation}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="年龄：" prop="age">{{formData.age}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期：" prop="birthday">{{formData.birthday}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="银行卡号：" prop="bankCard">{{formData.bankCard}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份证号：" prop="cardId">{{formData.cardId}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话：" prop="phone">{{formData.phone}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱：" prop="mail">{{formData.mail}}</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </div>

          <!-- 诚信问题 -->
          <div style="margin-bottom:10px;">
            <el-card>
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">诚信记录</h1>
                <div style="padding-left:500px; display:inline-block" v-if="role!=='学生'">
                  <el-button type="success" @click="edit = true">编辑</el-button>
                  <el-button type="success" @click="handleTrust">保存</el-button>
                </div>
              </div>
              <br>
              <div v-if="edit">
                <el-form
                  label-width="120px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="credibility">
                        <h4>申请资助过程中弄虚作假：</h4>
                        <el-input
                          v-model="formData.credibility"
                          :autosize="{ minRows: 2}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="cheat">
                        <h4>考试作弊记录：</h4>
                        <el-input
                          v-model="formData.cheat"
                          :autosize="{ minRows: 2}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="rent">
                        <h4>校外租住情况：</h4>
                        <el-input v-model="formData.rent" :autosize="{ minRows: 2}" type="textarea"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="breach">
                        <h4>其他诚信问题：</h4>
                        <el-input
                          v-model="formData.breach"
                          :autosize="{ minRows: 2}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div v-else>
                <el-form
                  label-width="120px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="credibility">
                        <h4>申请资助过程中弄虚作假：</h4>
                        {{formData.credibility}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="cheat">
                        <h4>考试作弊记录：</h4>
                        {{formData.cheat}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="rent">
                        <h4>校外租住情况：</h4>
                        {{formData.rent}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="breach">
                        <h4>其他诚信问题：</h4>
                        {{formData.breach}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-card>
          </div>
          <!-- 学习信息 -->
          <div style="margin-bottom:10px;">
            <el-card>
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">学习信息</h1>
              </div>
              <br>
              <div>
                <el-form
                  label-width="140px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="政治面貌：" prop="political">{{formData.political}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="类别：" prop="studentType">{{formData.studentType}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="外语语种：" prop="foreignLang">{{formData.foreignLang}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="外语水平：" prop="foreignLevel">{{formData.foreignLevel}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="外语分数：" prop="foreignGrade">{{formData.foreignGrade}}</el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        label="学制："
                        prop="educationalSystem"
                      >{{formData.educationalSystem}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="学历："
                        prop="educationalBackground"
                      >{{formData.educationalBackground}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="民族：" prop="nation">{{formData.nation}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="入学时间：" prop="enrolmentTime">{{formData.enrolmentTime}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="毕业时间：" prop="graduationTime">{{formData.graduationTime}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="学分成绩：" prop="creditScore">{{formData.creditScore}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="学分班级排名："
                        prop="creditClassRanking"
                      >{{formData.creditClassRanking}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="学分年级排名："
                        prop="creditGradeRanking"
                      >{{formData.creditGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        label="综合成绩："
                        prop="comprehensiveResult"
                      >{{formData.comprehensiveResult}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="综合班级排名："
                        prop="comprehensiveClassRanking"
                      >{{formData.comprehensiveClassRanking}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="综合年级排名："
                        prop="comprehensiveGradeRanking"
                      >{{formData.comprehensiveGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item label="挂科情况：" prop="failureCourse">
                        <el-input
                          disabled
                          v-model="formData.failureCourse"
                          :autosize="{ minRows: 3}"
                          type="textarea"
                        ></el-input>
                        <!-- {{formData.failureCourse}} -->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="result" label="科研成果：">
                        <el-input
                          disabled
                          v-model="formData.result"
                          :autosize="{ minRows: 3}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-card>
          </div>
          <!-- 家庭信息 -->
          <div style="margin-bottom:10px;">
            <el-card>
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">家庭信息</h1>
              </div>
              <el-form
                label-width="0"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:300px;margin-top:20px;padding:10px 100px ;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="1.8">
                    <h4 style="line-height:2">籍贯：</h4>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="home">
                      <h4 style="line-height:2">{{formData.home}}</h4>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <h4>家庭详细地址：</h4>
                    <el-form-item prop="address" label-width="0">
                      <el-input
                        disabled
                        v-model="formData.address"
                        :autosize="{ minRows: 3}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5.2">
                    <h4 style="line-height:2">是否为建档贫困生：</h4>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="isPoor">{{formData.isPoor}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <h4>家庭详细情况描述：</h4>
                    <el-form-item prop="family" label-width="0">
                      <el-input
                        disabled
                        v-model="formData.family"
                        :autosize="{ minRows: 3}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { applyDetail, applyAdd } from "../api";
export default {
  props: ["formdata", "type"],
  data() {
    return {
      visible: false,
      formData: {},
      edit: false
    };
  },
  computed: {
    role() {
      return this.$store.state.role;
    }
  },
  methods: {
    handleTrust() {
      this.edit = false;
      applyAdd(Object.assign({}, this.formData, { isAdmin: true })).then(
        data => {
          this.$message.success("诚信记录保存成功！");
          //   this.visible = false
        }
      );
    },
    submitClick(data) {
      this.$emit(this.type, data);
    },
    getDetail(sno, category) {
      this.visible = true;
      applyDetail({ sno, category }).then(data => {
        this.formData = data.content;
      });
    }
  }
};
</script>