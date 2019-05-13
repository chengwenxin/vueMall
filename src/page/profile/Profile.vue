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
            <!-- 基本信息 -->
            <div class="shadow">
              <div style="padding-top:10px;"> 
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">基本信息</h1>
                <div style="padding-left:500px; display:inline-block">
                  <el-button type="success" @click="edit1 = true">编辑</el-button>
                  <el-button type="success" @click="onSubmit('edit1')">保存</el-button>
                </div>
              </div>
              <br>
              <div v-if="edit1">
                <el-form
                  label-width="100px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';height:300px"
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
                     <el-col :span="8">
                      <el-form-item label="身份：" prop="role">
                        <el-select v-model="formData.role">
                          <el-option v-for="item in ['本科生','研究生']" :key="item" :value="item"></el-option>
                        </el-select>
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
                    <el-col :span="8">
                      <el-form-item label="银行卡号：" prop="bankCard">
                         <el-input v-model="formData.bankCard"></el-input>
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
              <div v-else>
                <el-form
                  label-width="100px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';height:300px"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="学号：" prop="number">{{formData.number}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                    </el-col>
                        <el-col :span="8">
                      <el-form-item label="身份：" prop="role">{{formData.role}}</el-form-item>
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
                      <el-form-item label="银行卡号：" prop="bankCard">
                      {{formData.bankCard}}
                      </el-form-item>
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
              </div>
            </div>

            <!-- 诚信问题 -->
            <div class="shadow">
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">诚信记录</h1>
                <!-- <div style="padding-left:500px; display:inline-block">
                <el-button type="success" @click="edit =true">编辑</el-button>
                <el-button type="success" @click="edit =false">保存</el-button>
                </div>-->
              </div>
              <br>
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
                        disabled
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
                        disabled
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
                      <el-input
                        disabled
                        v-model="formData.rent"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item prop="breach">
                      <h4>其他诚信问题：</h4>
                      <el-input
                        disabled
                        v-model="formData.breach"
                        :autosize="{ minRows: 2}"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 学习信息 -->
            <div class="shadow">
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">学习信息</h1>
                <div style="padding-left:500px; display:inline-block">
                  <el-button type="success" @click="edit3 =true">编辑</el-button>
                  <el-button type="success" @click="onSubmit('edit3')">保存</el-button>
                </div>
              </div>
              <br>
              <div v-if="edit3">
                <el-form
                  label-width="140px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:400px"
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
                          <el-option
                            v-for="item in ['英语','德语','日语','韩语']"
                            :key="item"
                            :value="item"
                          ></el-option>
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
                        <el-input v-model="formData.creditGradeRanking"></el-input>
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
                    <el-col :span="20">
                      <el-form-item label="挂科情况：" prop="failureCourse">
                        <el-input
                          v-model="formData.failureCourse"
                          :autosize="{ minRows: 3}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                      <el-form-item prop="result" label="科研成果：">
                        <el-input
                          v-model="formData.result"
                          :autosize="{ minRows: 3}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div v-else>
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
            </div>
            <!-- 家庭情况 -->
            <div class="shadow">
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">家庭信息</h1>
                <div style="padding-left:500px; display:inline-block">
                  <el-button type="success" @click="edit4 =true">编辑</el-button>
                  <el-button type="success" @click="onSubmit('edit4')">保存</el-button>
                </div>
              </div>
              <br>
              <div v-if="edit4">
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
                        <el-input
                          v-model="formData.family"
                          :autosize="{ minRows: 3}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div v-else>
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
                      <el-form-item prop="home">{{formData.home}}</el-form-item>
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
              </div>
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
import { baseInformation, updateInformation ,getCollegeList} from "../../api";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  mounted() {
    if (window.localStorage.getItem("isLogin") !== "1") {
      this.$message.error("当前未登录,请先登录！");
      this.$router.push("/login");
    }
    this.getList();
  },
  methods: {
    onSubmit(edit) {
      if (this[edit]) {
        this[edit] = false;
        console.log(this.formData)
        for(let i in this.formData){
          if(this.formData[i] === null){
            this.formData[i] = ''
          }
        }
        updateInformation(this.formData).then(data => {
          if (data.status === "1") {
            this.$message.success("信息保存成功！");
          }
        });
      }
    },
    getList() {
      //获取基本信息
      baseInformation()
        .then(data => {
          if (data.status === "1") {
            this.formData = data.content;
            this.$store.commit("role", data.content);
            this.menuList();
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    //学院 专业 班级信息
getCollegeList().then(data => {
          if (data.status === "1") {
            let collegeList=[]
            let majorList=[]
            let gradeList=[]
            this.allCollegeList = data.content
            data.content.forEach(item => {
              collegeList.push(item.college)
              majorList.push(item.major)
              gradeList.push(item.grade)
            });
            this.collegeList=Array.from(new Set(collegeList))
            this.majorList =Array.from(new Set(majorList))
            this.gradeList = Array.from(new Set(gradeList))
          } else {
            this.$message.error(data.msg);
          }
        })
    }
  },
  data: function() {
    return {
      allCollegeList:[],
        collegeList: ["信息工程学院", "动物科技学院"],
      majorList: ["电子商务", "软件工程"],
      gradeList: ["1501", "1601", "1701"],
      formData: {
        college:'',
        major:'',
        grade:'',
        gender:'',
        age:'',
        birthday:'',
        nation:'',
        cardId:'',
        phone:'',
        mail:'',
        bankCard:'',
        credibility:'无',
        cheat:'无',
        rent:'无',
        breach:'无',
        political:'',
        studentType:'',
        isFullTime:'',
        foreignLang:'',
        foreignLevel:'',
        foreignGrade:'',
        educationalSystem:'',
        educationalBackground:'',
        enrolmentTime:'',
        graduationTime:'',
        creditScore:'',
        comprehensiveResult:'',
        creditClassRanking:'',
        creditGradeRanking:'',
        comprehensiveClassRanking:'',
        comprehensiveGradeRanking:'',
        result:'',
        address:'',
        family:'',
        isPoor:'',
        applyReason:'',
        others:'',
        home:'',
        failureCourse:'',
      },
      edit1: false,
      edit2: false,
      edit3: false,
      edit4: false
    };
  }
};
</script>
<style lang="scss" scoped>
.el-form-item__label,
.el-form-item__content {
  font-size: 18px;
}
.el-form-item {
  margin-bottom: 5px;
}
</style>

<style lang="scss" scoped>
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
      .el-date-editor.el-input{
        width:179.33px;
      }
      position: relative;
      .shadow {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        margin-top: 20px;
      }
    }
  }
}
</style>
