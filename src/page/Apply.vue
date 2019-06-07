<template>
  <div class="policy">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <!-- <cwx-sort-main title="学生资助"></cwx-sort-main> -->
        <div style="float:left;width:100%;min-height:645px;">
          <div style="width:90%;margin:0 auto;padding-top:20px;">
            <el-steps :active="active" finish-status="success" align-center>
              <el-step v-for="(item,index) in steps" :title="item" :key="index"></el-step>
            </el-steps>
            <!-- 基本信息 -->
            <div v-if="active === steps.indexOf('基本信息')">
              <el-form
                label-width="120px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="ref1"
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
                  <el-col :span="8">
                    <el-form-item label="身份：" prop="role" v-if="formRule.role1 !=='不填'">
                      <el-select v-model="formData.role" disabled>
                        <el-option v-for="item in ['本科生','研究生']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学院：" prop="college">
                      <el-select v-model="formData.college" disabled>
                        <el-option v-for="item in collegeList" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业：" prop="major">
                      <el-select v-model="formData.major" disabled>
                        <el-option v-for="item in majorList" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级：" prop="grade">
                      <el-select v-model="formData.grade" disabled>
                        <el-option v-for="item in gradeList" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="性别：" prop="gender" v-if="formRule.gender1 !=='不填'">
                      <el-select v-model="formData.gender" disabled>
                        <el-option v-for="item in ['男','女']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="formRule.nation1 !=='不填'">
                    <el-form-item label="民族：" prop="nation">
                      <el-select v-model="formData.nation" disabled>
                        <el-option v-for="item in ['汉族','少数民族']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="年龄：" prop="age" v-if="formRule.age1 !=='不填'">
                      <el-input v-model="formData.age"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期：" prop="birthday" v-if="formRule.birthday1 !=='不填'">
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
                    <el-form-item label="身份证号：" prop="cardId" v-if="formRule.cardId1 !=='不填'">
                      <el-input v-model="formData.cardId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话：" prop="phone" v-if="formRule.phone1 !=='不填'">
                      <el-input v-model="formData.phone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱：" prop="mail" v-if="formRule.mail1 !=='不填'">
                      <el-input v-model="formData.mail"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <!-- 诚信问题 -->
            <div v-else-if="active === steps.indexOf('诚信记录')">
              <el-form
                label-width="120px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:10px;"
                :rules="rules"
                :model="formData"
                ref="ref2"
              >
                <el-row>
                  <el-col>
                    <el-form-item prop="credibility" v-if="formRule.credibility1 !=='不填'">
                      <h4>申请资助过程中弄虚作假：</h4>
                      <el-input
                        v-model="formData.credibility"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="cheat" v-if="formRule.cheat1 !=='不填'">
                      <h4>考试作弊记录：</h4>
                      <el-input
                        v-model="formData.cheat"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="rent" v-if="formRule.rent1 !=='不填'">
                      <h4>校外租住情况：</h4>
                      <el-input
                        v-model="formData.rent"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item prop="breach" v-if="formRule.breach1 !=='不填'">
                      <h4>其他诚信问题：</h4>
                      <el-input
                        v-model="formData.breach"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 学习信息 -->
            <div v-else-if="active === steps.indexOf('学习信息')">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="ref3"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="政治面貌：" prop="political" v-if="formRule.political1 !=='不填'">
                      <el-select v-model="formData.political">
                        <el-option
                          v-for="item in ['不限','中共党员','预备役党员','团员','群众']"
                          :key="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="外语语种："
                      prop="foreignLang"
                      v-if="formRule.foreignLang1 !=='不填'"
                    >
                      <el-select v-model="formData.foreignLang">
                        <el-option
                          v-for="item in ['不限','英语','德语','日语','韩语']"
                          :key="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="外语水平："
                      prop="foreignLevel"
                      v-if="formRule.foreignLevel1 !=='不填'"
                    >
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
                    <el-form-item
                      label="外语分数："
                      prop="foreignGrade"
                      v-if="formRule.foreignGrade1 !=='不填'"
                    >
                      <el-input v-model="formData.foreignGrade"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row></el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="入学时间："
                      prop="enrolmentTime"
                      v-if="formRule.enrolmentTime1 !=='不填'"
                    >
                      <el-date-picker
                        v-model="formData.enrolmentTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="毕业时间："
                      prop="graduationTime"
                      v-if="formRule.graduationTime1 !=='不填'"
                    >
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
                    <el-form-item
                      label="学分成绩："
                      prop="creditScore"
                      v-if="formRule.creditScore1 !=='不填'"
                    >
                      <el-input v-model="formData.creditScore"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="学分班级排名："
                      prop="creditClassRanking"
                      v-if="formRule.creditClassRanking1 !=='不填'"
                    >
                      <el-input v-model="formData.creditClassRanking"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="学分年级排名："
                      prop="creditGradeRanking"
                      v-if="formRule.creditGradeRanking1 !=='不填'"
                    >
                      <el-input v-model="formData.mail"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="综合成绩："
                      prop="comprehensiveResult"
                      v-if="formRule.comprehensiveResult1 !=='不填'"
                    >
                      <el-input v-model="formData.comprehensiveResult"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="综合班级排名："
                      prop="comprehensiveClassRanking"
                      v-if="formRule.comprehensiveClassRanking1 !=='不填'"
                    >
                      <el-input v-model="formData.comprehensiveClassRanking"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="综合年级排名："
                      prop="comprehensiveGradeRanking"
                      v-if="formRule.comprehensiveGradeRanking1 !=='不填'"
                    >
                      <el-input v-model="formData.comprehensiveGradeRanking"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="挂科情况："
                      prop="failureCourse"
                      v-if="formRule.failureCourse1 !=='不填'"
                    >
                      <el-input
                        v-model="formData.failureCourse"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="result" label="科研成果：" v-if="formRule.result1 !=='不填'">
                      <el-input v-model="formData.result" :autosize="{ minRows: 3}" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 家庭情况 -->
            <div v-else-if="active === steps.indexOf('家庭信息')">
              <el-form
                label-width="0"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px 140px ;"
                :rules="rules"
                :model="formData"
                ref="ref4"
              >
                <el-row v-if="formRule.home1 !=='不填'">
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
                <el-row v-if="formRule.address1 !=='不填'">
                  <el-col>
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
                <el-row v-if="formRule.isPoor1 !=='不填'">
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
                <el-row v-if="formRule.family1 !=='不填'">
                  <el-col>
                    <h4>家庭详细情况描述：</h4>
                    <el-form-item prop="family" label-width="0">
                      <el-input v-model="formData.family" :autosize="{ minRows: 3}" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 申请理由 -->
            <div v-else-if="active === steps.indexOf('申请理由')">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="ref5"
              >
                <el-row>
                  <el-col>
                    <el-form-item prop="applyReason" v-if="formRule.applyReason1 !=='不填'">
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
            <div v-else-if="active === steps.indexOf('其他信息')">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="ref6"
              >
                <el-row>
                  <el-col>
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
            <div v-else-if="active === steps.indexOf('完成')">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="ref7"
              >
                <el-row>
                  <el-col center>
                    <el-form-item prop="cardId">
                      <h2 style="text-align:center;font-weight:bold;">西北农林科技大学诚信协议书</h2>
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
                              <h3>《西北农林科技大学诚信协议书》</h3>
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
                <pre>
                  欢迎您申报国家公派出国留学。 
        请您仔细阅读以下条款，如果您对任何条款表示异议，您可以选择不提交申请。
当您成功提交申请表，无论是否被录取，均意味着您（即「用户」）完全接受以下全部条款。 
        使用规则 
        1. 用户注册成功后，留学基金委将给予每个用户一个用户帐号及相应的密码，
该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。 
        2. 用户须对在本系统的注册、提交信息的真实性、合法性、有效性承担全部责任，
用户不得冒充他人；不得利用他人的名义提交任何信息；否则留学基金委有权立即停止提供服务，
收回其帐号并由用户独自承担由此而产生的一切法律责任。 
        3. 用户承诺不得以任何方式利用本系统直接或间接从事违反中国法律以及社会公德的行为，
留学基金委有权对违反上述承诺的内容予以删除。 
        4. 若今后留学基金委为被录取的留学人员办理用于接收奖学金的银行卡，
当用户的“个人税收居民身份”发生变化时，请在30日内通知相应的发卡商业银行。 
        个人隐私 
        尊重用户个人隐私信息的私有性是留学基金委的一贯原则，留学基金委将通过技术手段、
强化内部管理等办法充分保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或事
先得到用户明确授权等原因外，留学基金委保证不对外公开或向第三方透露用户个人隐私信息，
或用户在使用服务时存储的非公开内容。同时，为了运营和改善留学基金委的技术与服务，
留学基金委将可能会自行收集使用或向第三方提供用户的非个人隐私信息，这将有助于留学基
金委向用户提供更好的用户体验和服务质量。 
        用户一旦被留学基金委录取，其部分个人信息将被提供给教育部留学服务中心、
教育部出国人员上海集训部、广州留学人员服务中心、驻外使（领）馆及承担发放奖学金
职责的商业银行以提高服务质量。 
        免责申明 
        1. 留学基金委不保证网络服务一定能满足用户的要求，也不保证网络服务不会中断。 
        2. 对于因不可抗力或留学基金委不能控制的原因造成的网络服务中断或其它缺陷，
留学基金委不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
              </pre>
                <span>第一条 不同意西北农林科技大学资助申请诚信协议就查你水表</span>
                <br v-for="i in  16" :key="i">
              </el-dialog>
            </div>

            <!-- 完成页面 -->
            <div v-else-if="active === 7" style="text-align:center;color:#438F49">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px;border:1px solid ;margin-top:20px;padding:50px;"
                :rules="rules"
                :model="formData"
                ref="ref8"
              >
                <el-row>
                  <el-col>
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
              v-if="active > 0 && active < len"
              style="margin-top: 12px;"
              type="success"
              @click="pre"
            >上一步</el-button>
            <el-button
              v-if="active < len-1"
              style="margin-top: 12px;"
              type="success"
              @click="next"
            >下一步</el-button>
            <el-button
              v-if="Ipromise && active === len-1"
              style="margin-top: 12px;"
              type="success"
              @click="onSubmit"
            >提交申请</el-button>
          </div>
        </div>
      </div>
      <div>
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { getScholarList, auditInsert, getApplyList } from "../api/scholar.js";
import { applyAdd, queryTemplateList } from "../api";
import formatDate from "../utils/formatDate";
export default {
  mounted() {
    this.getList();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    role() {
      return this.$store.state.role;
    },
    len() {
      return this.steps.length;
    },
    rules() {
      // let rule = {
      //   breach: { required: true, message: "必填项", trigger: "blur" },
      //   cheat: { required: true, message: "必填项", trigger: "blur" },
      //   credibility: { required: true, message: "必填项", trigger: "blur" },
      //   rent: { required: true, message: "必填项", trigger: "blur" }
      // };
      let rule = {};
      if (this.formRule.age1 === "必填")
        rule = Object.assign({}, rule, {
          age: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.phone1 === "必填")
        rule = Object.assign({}, rule, {
          phone: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.cardId1 === "必填")
        rule = Object.assign({}, rule, {
          cardId: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.birthday1 === "必填")
        rule = Object.assign({}, rule, {
          birthday: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.mail1 === "必填")
        rule = Object.assign({}, rule, {
          mail: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.rent1 === "必填")
        rule = Object.assign({}, rule, {
          rent: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.cheat1 === "必填")
        rule = Object.assign({}, rule, {
          cheat: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.credibility1 === "必填")
        rule = Object.assign({}, rule, {
          credibility: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.breach1 === "必填")
        rule = Object.assign({}, rule, {
          breach: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.address1 === "必填")
        rule = Object.assign({}, rule, {
          address: { required: true, message: "必填项", trigger: "blur" }
        });

      if (this.formRule.applyReason1 === "必填")
        rule = Object.assign({}, rule, {
          applyReason: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.comprehensiveClassRanking1 === "必填")
        rule = Object.assign({}, rule, {
          comprehensiveClassRanking: {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        });
      if (this.formRule.comprehensiveGradeRanking1 === "必填")
        rule = Object.assign({}, rule, {
          comprehensiveGradeRanking: {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        });
      if (this.formRule.comprehensiveResult1 === "必填")
        rule = Object.assign({}, rule, {
          comprehensiveResult: {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        });
      if (this.formRule.creditClassRanking1 === "必填")
        rule = Object.assign({}, rule, {
          creditClassRanking1: {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        });

      if (this.formRule.creditGradeRanking1 === "必填")
        rule = Object.assign({}, rule, {
          creditGradeRanking: {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        });
      if (this.formRule.creditScore1 === "必填")
        rule = Object.assign({}, rule, {
          creditScore: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.enrolmentTime1 === "必填")
        rule = Object.assign({}, rule, {
          enrolmentTime: { required: true, message: "必填项", trigger: "blur" }
        });

      if (this.formRule.failureCourse1 === "必填")
        rule = Object.assign({}, rule, {
          failureCourse: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.family1 === "必填")
        rule = Object.assign({}, rule, {
          family: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.foreignGrade1 === "必填")
        rule = Object.assign({}, rule, {
          foreignGrade: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.foreignLang1 === "必填")
        rule = Object.assign({}, rule, {
          foreignLevel: { required: true, message: "必填项", trigger: "change" }
        });
      if (this.formRule.foreignLevel1 === "必填")
        rule = Object.assign({}, rule, {
          foreignLevel: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.gender1 === "必填")
        rule = Object.assign({}, rule, {
          gender: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.graduationTime1 === "必填")
        rule = Object.assign({}, rule, {
          graduationTime: { required: true, message: "必填项", trigger: "blur" }
        });

      if (this.formRule.home1 === "必填")
        rule = Object.assign({}, rule, {
          home: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.isPoor1 === "必填")
        rule = Object.assign({}, rule, {
          isPoor: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.nation1 === "必填")
        rule = Object.assign({}, rule, {
          nation: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.political1 === "必填")
        rule = Object.assign({}, rule, {
          political: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.others1 === "必填")
        rule = Object.assign({}, rule, {
          others: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.result1 === "必填")
        rule = Object.assign({}, rule, {
          result: { required: true, message: "必填项", trigger: "blur" }
        });
      if (this.formRule.age1 === "必填")
        rule = Object.assign({}, rule, {
          age: { required: true, message: "必填项", trigger: "blur" }
        });

      console.log(rule);

      return rule;
    },
    steps() {
      // let step=["基本信息","诚信记录","学习信息","家庭信息","申请理由","其他信息",'完成']
      let step = ["基本信息"];
      if (
        !(
          this.formRule.rent1 === "不填" &&
          this.formRule.cheat1 === "不填" &&
          this.formRule.credibility1 === "不填" &&
          this.formRule.breach1 === "不填"
        )
      ) {
        step.push("诚信记录");
      }
      if (
        !(
          this.formRule.political1 === "不填" &&
          this.formRule.foreignLang1 === "不填" &&
          this.formRule.foreignLevel1 === "不填" &&
          this.formRule.foreignGrade1 === "不填" &&
          this.formRule.graduationTime1 === "不填" &&
          this.formRule.enrolmentTime1 === "不填" &&
          this.formRule.creditScore1 === "不填" &&
          this.formRule.creditClassRanking1 === "不填" &&
          this.formRule.creditGradeRanking1 === "不填" &&
          this.formRule.comprehensiveResult1 === "不填" &&
          this.formRule.comprehensiveClassRanking1 === "不填" &&
          this.formRule.comprehensiveGradeRanking1 === "不填" &&
          this.formRule.failureCourse1 === "不填" &&
          this.formRule.result1 === "不填"
        )
      ) {
        step.push("学习信息");
      }
      if (
        !(
          this.formRule.home1 === "不填" &&
          this.formRule.address1 === "不填" &&
          this.formRule.isPoor1 === "不填" &&
          this.formRule.family1 === "不填"
        )
      ) {
        step.push("家庭信息");
      }
      if (this.formRule.applyReason1 !== "不填") {
        step.push("申请理由");
      }
      if (this.formRule.others1 !== "不填") {
        step.push("其他信息");
      }
      step.push("完成");
      return step;
    }
  },
  methods: {
    getList() {
      getApplyList().then(data => {
        this.formData = data.content;
      });
      queryTemplateList({
        title: this.$route.params.title,
        isTemplate: "0"
      }).then(data => {
        this.formRule = data.content;
      });
    },
    next() {
      let ref = "ref" + (this.active + 1);
      console.log(this.active)
      if (this.active < 7) {
        this.$refs[ref].validate(valid => {
          if (valid) {
            this.active++;
          } else {
            this.$message.error("还有表单未填写，请填写");
            return false;
          }
        });
      }

      console.log("len:",this.len)
      if (this.active === this.len) {
        this.countDown();
      }
    },
    pre() {
      if (this.active-- < 1) {
        this.active = this.len - 1;
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
      if (this.role === "学生") {
        let applyDate = formatDate(new Date());
        let { number, name,college,major,grade } = this.formData;
        let formInsert = Object.assign(
          {},
          { category: this.$route.params.title },
          { number, name,college,major,grade },
          { applyDate }
        );
        auditInsert(formInsert)
          .then(() => {
            console.log("what?");
            this.next();
          })
          .catch(err => {
            console.log(err);
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
      } else {
        this.$message.error("非学生身份，只能浏览申请过程，不可提交申请！");
      }
    }
  },
  data: function() {
    return {
      formRule: {},
      interval: null,
      seconds: 3,
      promiseVisible: false,
      list: [],
      collegeList: [],
      majorList: [],
      gradeList: [],
      active: 0,
      formData: {},
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
    margin: 0 auto;
    padding: 0px;
    width: 1200px;
    .header,
    .main {
      position: relative;
    }
  }
}
</style>
