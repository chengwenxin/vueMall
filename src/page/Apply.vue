<template>
  <div class="policy">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="学生资助"></cwx-sort-main>
        <div style="float:left;width:100%;min-height:645px;">
          <div style="width:90%;margin:0 auto;padding-top:20px;">
            <el-steps :active="active" finish-status="success" align-center>
              <el-step title="基本信息"></el-step>
              <el-step title="诚信记录"></el-step>
              <el-step title="学习信息"></el-step>
              <el-step title="家庭信息"></el-step>
              <el-step title="申请理由"></el-step>
              <el-step title="其他信息"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
            <!-- 基本信息 -->
            <div v-if="active === 0">
              <el-form
                label-width="120px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学号：" prop="number">
                      <el-input v-model="formData.number" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名：" prop="name">
                      <el-input v-model="formData.name" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学院：" prop="college">
                      <el-select v-model="formData.college">
                        <el-option v-for="item in collegeList" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业：" prop="major">
                      <el-select v-model="formData.major">
                        <el-option v-for="item in majorList" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级：" prop="grade">
                      <el-select v-model="formData.grade">
                        <el-option v-for="item in gradeList" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份：" prop="role">
                      <el-select v-model="formData.role">
                        <el-option v-for="item in ['本科生','研究生']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别：" prop="gender">
                      <el-select v-model="formData.gender">
                        <el-option v-for="item in ['男','女']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族：" prop="nation">
                      <el-select v-model="formData.nation">
                        <el-option v-for="item in ['汉族','少数民族']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="年龄：" prop="age">
                      <el-input v-model="formData.age"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期：" prop="birthday">
                      <el-date-picker
                        v-model="formData.birthday"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份证号：" prop="cardId">
                      <el-input v-model="formData.cardId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话：" prop="phone">
                      <el-input v-model="formData.phone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱：" prop="mail">
                      <el-input v-model="formData.mail"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <!-- 诚信问题 -->
            <div v-else-if="active === 1">
              <el-form
                label-width="120px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:10px;"
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
                      <el-input v-model="formData.cheat" :autosize="{ minRows: 2}" type="textarea"></el-input>
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
                      <el-input v-model="formData.breach" :autosize="{ minRows: 2}" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 学习信息 -->
            <div v-else-if="active === 2">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="政治面貌：" prop="political">
                      <el-select v-model="formData.political">
                        <el-option
                          v-for="item in ['中共党员','预备役党员','团员','群众']"
                          :key="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="类别：" prop="studentType">
                      <el-select v-model="formData.studentType">
                        <el-option v-for="item in ['本科生','研究生']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="外语语种：" prop="foreignLang">
                      <el-select v-model="formData.foreignLang">
                        <el-option v-for="item in ['英语','德语','日语','韩语']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="外语水平：" prop="foreignLevel">
                      <el-select v-model="formData.foreignLevel">
                        <el-option
                          v-for="item in ['CET4','CET6','托福','雅思','专业四级','专业八级']"
                          :key="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="外语分数：" prop="foreignGrade">
                      <el-input v-model="formData.foreignGrade"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学制：" prop="educationalSystem">
                      <el-input v-model="formData.educationalSystem"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历：" prop="educationalBackground">
                      <el-select v-model="formData.educationalBackground">
                        <el-option v-for="item in ['高中','本科']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族：" prop="nation">
                      <el-select v-model="formData.nation">
                        <el-option v-for="item in ['汉族','少数民族']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入学时间：" prop="enrolmentTime">
                      <el-date-picker
                        v-model="formData.enrolmentTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="毕业时间：" prop="graduationTime">
                      <el-date-picker
                        v-model="formData.graduationTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学分成绩：" prop="creditScore">
                      <el-input v-model="formData.creditScore"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学分班级排名：" prop="creditClassRanking">
                      <el-input v-model="formData.creditClassRanking"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学分年级排名：" prop="creditGradeRanking">
                      <el-input v-model="formData.mail"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="综合成绩：" prop="comprehensiveResult">
                      <el-input v-model="formData.comprehensiveResult"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="综合班级排名：" prop="comprehensiveClassRanking">
                      <el-input v-model="formData.comprehensiveClassRanking"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="综合年级排名：" prop="comprehensiveGradeRanking">
                      <el-input v-model="formData.comprehensiveGradeRanking"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="挂科情况：" prop="failureCourse">
                      <el-input
                        v-model="formData.failureCourse"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item prop="result" label="科研成果：">
                      <el-input v-model="formData.result" :autosize="{ minRows: 3}" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 家庭情况 -->
            <div v-else-if="active === 3">
              <el-form
                label-width="0"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px 140px ;"
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
                      <!-- <el-select v-model="formData.home">
                        <el-option v-for="item in ['湖北','陕西']" :key="item" :value="item"></el-option>
                      </el-select>-->
                      <el-input v-model="formData.home"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <h4>家庭详细地址：</h4>
                    <el-form-item prop="address" label-width="0">
                      <el-input
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
                    <el-form-item prop="isPoor">
                      <el-select v-model="formData.isPoor">
                        <el-option v-for="item in ['是','否']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <h4>家庭详细情况描述：</h4>
                    <el-form-item prop="family" label-width="0">
                      <el-input v-model="formData.family" :autosize="{ minRows: 3}" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 申请理由 -->
            <div v-else-if="active === 4">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="20">
                    <el-form-item prop="applyReason">
                      <h3>请详细说明申请理由：</h3>
                      <el-input
                        v-model="formData.applyReason"
                        :autosize="{ minRows: 10}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 其他说明 -->
            <div v-else-if="active === 5">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="20">
                    <el-form-item prop="others">
                      <h3>其他需要特别说明的情况：</h3>
                      <el-input
                        v-model="formData.others"
                        :autosize="{ minRows: 10}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 承诺页面 -->
            <div v-else-if="active === 6">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col center :span="20">
                    <el-form-item prop="cardId">
                      <h2 style="text-align:center;font-weight:bold;">西北农林科技大学资助申请诚信协议</h2>
                      <div style="text-align:left;padding-left:50px;">
                        <h3>（一）遵守宪法和法律、法规；</h3>
                        <h3>（二）遵守学校章程和规章制度；</h3>
                        <h3>（三）恪守学术道德，完成规定学业；</h3>
                        <h3>（四）按规定缴纳学费及有关费用，履行获得贷学金及助学金的相应义务；</h3>
                        <h3>（五）遵守学生行为规范，尊敬师长，养成良好的思想品德和行为习惯；</h3>
                        <h3>（六）法律、法规及学校章程规定的其他义务。</h3>
                        <el-checkbox v-model="Ipromise">
                          <h3 style="font-weight:bold;">
                            本人承诺以上信息全部属实，愿意承担一切后果并同意
                            <el-button type="text" @click="promiseVisible = true">
                              <h3>《西北农林科技大学资助申请诚信协议》</h3>
                            </el-button>
                          </h3>
                        </el-checkbox>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-dialog
                center
                title="西北农林科技大学资助申请诚信协议"
                :visible.sync="promiseVisible"
                width="50%"
                style="hegiht:50%;"
              >
                <span>第一条 不同意西北农林科技大学资助申请诚信协议就查你水表</span>
                <br v-for="i in  16" :key="i">
              </el-dialog>
            </div>

            <!-- 完成页面 -->
            <div v-else-if="active === 7" style="text-align:center;color:#078F48">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="20">
                    <el-form-item prop="cardId">
                      <h2>提交申请成功！</h2>
                      <h2>{{seconds}} 秒后跳转至申请状态页面...</h2>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

          <div style="width:100%;text-align:center">
            <el-button
              v-if="active > 0 && active < 7"
              style="margin-top: 12px;"
              type="success"
              @click="pre"
            >上一步</el-button>
            <el-button v-if="active < 6" style="margin-top: 12px;" type="success" @click="next">下一步</el-button>
            <el-button
              v-if="Ipromise && active === 6"
              style="margin-top: 12px;"
              type="success"
              @click="onSubmit"
            >提交申请</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <cwx-footer></cwx-footer>
    </div>
  </div>
</template>
<script>
import { getScholarList, auditInsert, getApplyList } from "../api/scholar.js";
import { applyAdd } from "../api";
export default {
  mounted() {
    this.getList();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    getList() {
      getApplyList().then(data => {
        this.formData = data.content;
      });
    },
    next() {
      if (this.active++ > 6) {
        this.active = 0;
      }
      if (this.active === 7) {
        this.countDown();
      }
    },
    pre() {
      if (this.active-- < 1) {
        this.active = 6;
      }
    },
    //倒计时三秒
    countDown() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          clearInterval(this.interval);
          this.$router.push("/profile/applystatus");
        }
      }, 1000);
    },
    //提交申请
    onSubmit() {
      let { number, name } = this.formData;
      let formInsert = Object.assign(
        {},
        { category: this.$route.params.title },
        { number, name }
      );
      auditInsert(formInsert)
        .then(() => {
          this.next();
        })
        .catch(() => {
          this.$message.error("审核记录插入失败！");
        });
      let formAdd = Object.assign({}, this.formData, {
        category: this.$route.params.title
      });
      applyAdd(formAdd)
        .then(data => {})
        .catch(() => {
          this.$message.error("申请失败！");
        });
    }
  },
  data: function() {
    return {
      interval: null,
      seconds: 5,
      promiseVisible: false,
      list: [],
      collegeList: ["信息工程学院", "动物科技学院"],
      majorList: ["电子商务", "软件工程"],
      gradeList: ["1501", "1601", "1701"],
      active: 0,
      formData: {
        // name:  localStorage.name,
        // number: localStorage.number,
        // birthday: "1996-11-26",
        // role: "本科生",
        // college: "信息工程学院",
        // major: "电子商务",
        // grade: "1501",
        // gender: "男",
        // age: "18",
        // nation: "汉族",
        // cardId: "421126199910100010",
        // phone: "18821709973",
        // mail: "1260077156@qq.com",
      },
      Ipromise: false
    };
  }
};
</script>
<style lang="scss" scoped>
.policy {
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
