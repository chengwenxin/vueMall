<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="70%" center>
      <div slot="title">
        <span style="color:#fff;font-weight:bold;font-size:24px;">评 选 正 文</span>
      </div>
      <div style="margin-bottom:10px;">
        <el-card>
          <div
            style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;margin-top:20px;padding:10px 100px ;"
            v-html="categoryContent"
          ></div>
        </el-card>
      </div>
    </el-dialog>
    <el-table :data="formdata" border stripe>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" prop="number" label="序号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        prop="category"
        label="资助项目"
        show-overflow-tooltip
        width="200"
      ></el-table-column>-->
      <el-table-column
        align="center"
        prop="category"
        label="项目名称"
        show-overflow-tooltip
        width="160"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleCategory(scope.row.category)">{{scope.row.category}}</el-button>
        </template>
      </el-table-column>
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
      <el-table-column
        sortable
        align="center"
        prop="secondAuditStatus"
        label="复审状态"
        min-width="110"
      >
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
            <el-button type="text" @click="getAuditDetail(scope.row.category)">评选标准</el-button>
            <el-button type="text" @click="submitClick(scope.row)">初审</el-button>
          </div>
          <div v-else-if="type === 'secondAudit'">
            <el-button type="text" @click="getDetail(scope.row.number,scope.row.category)">申请书</el-button>
            <el-button type="text" @click="getAuditDetail(scope.row.category)">评选标准</el-button>
            <el-button type="text" @click="submitClick(scope.row)">复审</el-button>
          </div>
          <div v-else>
            <el-button type="text" @click="getDetail(scope.row.number,scope.row.category)">申请书</el-button>
            <el-button type="text" @click="getAuditDetail(scope.row.category)">评选标准</el-button>
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
                  <el-col :span="12">
                    <el-form-item label="学号：" prop="sno">{{formData.sno}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="身份：">学生</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="学院：" prop="college">{{formData.college}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="专业：" prop="major">{{formData.major}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="班级：" prop="grade">{{formData.grade}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别：" prop="gender">{{formData.gender}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="民族：" prop="nation">{{formData.nation}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="年龄：" prop="age">{{formData.age}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出生日期：" prop="birthday">{{formData.birthday}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银行卡号：" prop="bankCard">{{formData.bankCard}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证号：" prop="cardId">{{formData.cardId}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电话：" prop="phone">{{formData.phone}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
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
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="credibility">
                        <h4>申请资助过程中弄虚作假：</h4>
                        <el-input
                          v-model="formData.credibility"
                          :autosize="{ minRows: 2}"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
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
                    <el-col :span="12">
                      <el-form-item prop="rent">
                        <h4>校外租住情况：</h4>
                        <el-input v-model="formData.rent" :autosize="{ minRows: 2}" type="textarea"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
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
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="credibility">
                        <h4>申请资助过程中弄虚作假：</h4>
                        {{formData.credibility}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="cheat">
                        <h4>考试作弊记录：</h4>
                        {{formData.cheat}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="rent">
                        <h4>校外租住情况：</h4>
                        {{formData.rent}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
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
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="政治面貌：" prop="political">{{formData.political}}</el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                      <el-form-item label="类别：" prop="studentType">{{formData.studentType}}</el-form-item>
                    </el-col>-->
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="外语语种：" prop="foreignLang">{{formData.foreignLang}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="外语水平：" prop="foreignLevel">{{formData.foreignLevel}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="外语分数：" prop="foreignGrade">{{formData.foreignGrade}}</el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="学制："
                        prop="educationalSystem"
                      >{{formData.educationalSystem}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学历："
                        prop="educationalBackground"
                      >{{formData.educationalBackground}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="民族：" prop="nation">{{formData.nation}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="入学时间：" prop="enrolmentTime">{{formData.enrolmentTime}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="毕业时间：" prop="graduationTime">{{formData.graduationTime}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="学分成绩：" prop="creditScore">{{formData.creditScore}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学分班级排名："
                        prop="creditClassRanking"
                      >{{formData.creditClassRanking}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学分年级排名："
                        prop="creditGradeRanking"
                      >{{formData.creditGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="综合成绩："
                        prop="comprehensiveResult"
                      >{{formData.comprehensiveResult}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="综合班级排名："
                        prop="comprehensiveClassRanking"
                      >{{formData.comprehensiveClassRanking}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="综合年级排名："
                        prop="comprehensiveGradeRanking"
                      >{{formData.comprehensiveGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
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
                    <el-col :span="12">
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
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;margin-top:20px;padding:10px 100px ;"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="1.8">
                    <h4 style="line-height:2">籍贯：</h4>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="home">
                      <h4 style="line-height:2">{{formData.home}}</h4>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
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
                  <el-col :span="12">
                    <el-form-item prop="isPoor">{{formData.isPoor}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
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

    <!-- 评选标准表 -->
    <div v-if="visible1">
      <el-dialog width="70%" :visible.sync="visible1" center>
        <div slot="title">
          <span style="color:#fff;font-weight:bold;font-size:24px;">评 选 条 件</span>
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
                :model="formData1"
                ref="information"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="学院：" prop="college" style="color:red">{{formData1.college}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="年级：" style="color:red" prop="grade">{{formData1.grade}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="性别："
                      prop="gender"
                      :style="{color:(formData1.gender1==='必填'?'red':'#303133')}"
                    >{{formData1.gender1}} | 要求：{{formData1.gender}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="民族："
                      prop="nation"
                      :style="{color:(formData1.nation1==='必填'?'red':'#303133')}"
                    >{{formData1.nation1}} | 要求：{{formData1.nation}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="年龄："
                      prop="age"
                      :style="{color:(formData1.age1==='必填'?'red':'#303133')}"
                    >{{formData1.age1}} | 要求：{{formData1.age}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="出生日期："
                      prop="birthday"
                      :style="{color:(formData1.birthday1==='必填'?'red':'#303133')}"
                    >{{formData1.birthday1}} | 要求：{{formData1.birthday}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="身份证号："
                      prop="cardId"
                      :style="{color:(formData1.cardId1==='必填'?'red':'#303133')}"
                    >{{formData1.cardId1}} | 要求：{{formData1.cardId}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="电话："
                      prop="phone"
                      :style="{color:(formData1.phone1==='必填'?'red':'#303133')}"
                    >{{formData1.phone1}} | 要求：{{formData1.phone}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="邮箱："
                      prop="mail"
                      :style="{color:(formData1.mail1==='必填'?'red':'#303133')}"
                    >{{formData1.mail1}} | 要求：{{formData1.mail}}</el-form-item>
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
              </div>
              <br>
              <div>
                <el-form
                  label-width="120px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;"
                  :rules="rules"
                  :model="formData1"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        prop="credibility"
                        label="不诚信申请:"
                        :style="{color:(formData1.credibility1==='必填'?'red':'#303133')}"
                      >{{formData1.credibility1}} | 要求： {{formData1.credibility}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        prop="cheat"
                        label="考试作弊记录："
                        :style="{color:(formData1.credibility1==='必填'?'red':'#303133')}"
                      >{{formData1.cheat1}} | 要求： {{formData1.cheat}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        prop="rent"
                        label=" 校外租住情况："
                        :style="{color:(formData1.rent1==='必填'?'red':'#303133')}"
                      >{{formData1.rent1}} | 要求： {{formData1.rent}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        prop="breach"
                        label="其他诚信问题："
                        :style="{color:(formData1.breach1==='必填'?'red':'#303133')}"
                      >{{formData1.breach1}} | 要求： {{formData1.breach}}</el-form-item>
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
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px"
                  :rules="rules"
                  :model="formData1"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="政治面貌："
                        prop="political"
                        :style="{color:(formData1.political1==='必填'?'red':'#303133')}"
                      >{{formData1.political1}} | 要求：{{formData1.political}}</el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                      <el-form-item
                        label="类别："
                        prop="studentType"
                        :style="{color:(formData1.studentType1==='必填'?'red':'#303133')}"
                      >{{formData1.studentType1}} | 要求：{{formData1.studentType}}</el-form-item>
                    </el-col>-->
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="外语语种："
                        prop="foreignLang"
                        :style="{color:(formData1.foreignLang1==='必填'?'red':'#303133')}"
                      >{{formData1.foreignLang1}} | 要求：{{formData1.foreignLang}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="外语水平："
                        prop="foreignLevel"
                        :style="{color:(formData1.foreignLevel1==='必填'?'red':'#303133')}"
                      >{{formData1.foreignLevel1}} | 要求：{{formData1.foreignLevel}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="外语分数："
                        prop="foreignGrade"
                        :style="{color:(formData1.foreignGrade1==='必填'?'red':'#303133')}"
                      >{{formData1.foreignGrade1}} | 要求：{{formData1.foreignGrade}}</el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="学制："
                        prop="educationalSystem"
                        :style="{color:(formData1.educationalSystem1=='必填'?'red':'#303133')}"
                      >{{formData1.educationalSystem1}} | 要求：{{formData1.educationalSystem}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学历："
                        prop="educationalBackground"
                        :style="{color:(formData1.educationalBackground1==='必填'?'red':'#303133')}"
                      >{{formData1.educationalBackground1}} | 要求：{{formData1.educationalBackground}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="入学时间："
                        prop="enrolmentTime"
                        :style="{color:(formData1.enrolmentTime1==='必填'?'red':'#303133')}"
                      >{{formData1.enrolmentTime1}} | 要求：{{formData1.enrolmentTime}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="毕业时间："
                        prop="graduationTime"
                        :style="{color:(formData1.graduationTime1==='必填'?'red':'#303133')}"
                      >{{formData1.graduationTime1}} | 要求：{{formData1.graduationTime}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="学分成绩："
                        prop="creditScore"
                        :style="{color:(formData1.creditScore1==='必填'?'red':'#303133')}"
                      >{{formData1.creditScore1}} | 要求：{{formData1.creditScore}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学分班级排名："
                        prop="creditClassRanking"
                        :style="{color:(formData1.creditClassRanking1==='必填'?'red':'#303133')}"
                      >{{formData1.creditClassRanking1}} | 要求：{{formData1.creditClassRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="学分年级排名："
                        prop="creditGradeRanking"
                        :style="{color:(formData1.creditGradeRanking1==='必填'?'red':'#303133')}"
                      >{{formData1.creditGradeRanking}} | 要求：{{formData1.creditGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="综合成绩："
                        prop="comprehensiveResult"
                        :style="{color:(formData1.comprehensiveGradeRanking1==='必填'?'red':'#303133')}"
                      >{{formData1.comprehensiveGradeRanking1}} | 要求：{{formData1.comprehensiveGradeRanking}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="综合班级排名："
                        prop="comprehensiveClassRanking"
                        :style="{color:(formData1.comprehensiveGradeRanking1==='必填'?'red':'#303133')}"
                      >{{formData1.comprehensiveGradeRanking1}} | 要求：{{formData1.comprehensiveGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="综合年级排名："
                        prop="comprehensiveGradeRanking"
                        :style="{color:(formData1.comprehensiveGradeRanking1==='必填'?'red':'#303133')}"
                      >{{formData1.comprehensiveGradeRanking1}} | 要求：{{formData1.comprehensiveGradeRanking}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="挂科情况："
                        prop="failureCourse"
                        :style="{color:(formData1.failureCourse1==='必填'?'red':'#303133')}"
                      >{{formData1.failureCourse1}} | 要求：{{formData1.failureCourse}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        prop="result"
                        label="科研成果："
                        :style="{color:(formData1.result1==='必填'?'red':'#303133')}"
                      >{{formData1.result1}} | 要求：{{formData1.result}}</el-form-item>
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
                label-width="140"
                style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;margin-top:20px;padding:10px 100px ;"
                :rules="rules"
                :model="formData1"
                ref="information"
              >
                <el-row>
                  <el-col>
                    <el-form-item
                      prop="home"
                      label="籍贯："
                      :style="{color:(formData1.home1==='必填'?'red':'#303133')}"
                    >{{formData1.home1}} | 要求：{{formData1.home}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <h4></h4>
                    <el-form-item
                      prop="address"
                      label="家庭详细地址："
                      :style="{color:(formData1.address1==='必填'?'red':'#303133')}"
                    >{{formData1.address1}} | 要求：{{formData1.address}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item
                      prop="isPoor"
                      label="是否为建档贫困生："
                      :style="{color:(formData1.isPoor1==='必填'?'red':'#303133')}"
                    >{{formData1.isPoor1}} | 要求：{{formData1.isPoor}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item
                      prop="family"
                      label="家庭详细情况描述："
                      :style="{color:(formData1.result1==='必填'?'red':'#303133')}"
                    >{{formData1.result1}} | 要求：{{formData1.result}}</el-form-item>
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
import { applyDetail, applyAdd, queryTemplateList } from "../api";
export default {
  props: ["formdata", "type"],
  data() {
    return {
      dialogVisible: false,
      categoryContent: "",
      visible: false,
      visible1: false,
      formData1: {},
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
    handleCategory(title) {
      console.log(title)
      this.dialogVisible = true;
      queryTemplateList({ title:title })
        .then(data => {
          this.categoryContent = data.content.content;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    //获取申请书
    getDetail(sno, category) {
      this.visible = true;
      applyDetail({ sno, category }).then(data => {
        this.formData = data.content;
      });
    },
    //获取评选标准
    getAuditDetail(category) {
      this.visible1 = true;
      queryTemplateList({ title: category })
        .then(data => {
          console.log(data);
          this.formData1 = data.content;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>