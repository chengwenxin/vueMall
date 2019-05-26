
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
          <div v-show="!isScan">
            <el-form :model="formData" :inline="true">
              <el-card>
                <div slot="header" class="clearfix">
                  <el-row>
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">基本定制</h1>

                    <el-form-item
                      label="使用现有模板："
                      prop="category"
                      style="margin-left:200px;margin-right:50px;"
                    >
                      <el-select
                        clearable
                        filterable
                        v-model="formData.category"
                        placeholder="请选择模板名称"
                        @change="handleTemplate"
                      >
                        <el-option :value="0" label="不使用模板"></el-option>
                        <el-option
                          v-for="(item,index) in templateList"
                          :key="index"
                          :label="item.title"
                          :value="item.title"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-switch
                        v-model="formData.isTemplate"
                        active-color="#438F49"
                        active-text="此次定制保存为模板"
                        active-value="1"
                        inactive-value="0"
                      ></el-switch>
                      <span style="display:inline-block;width:50px;"></span>
                      <el-button @click="scan" style="background:#438F48;color:#fff">预览</el-button>
                      <el-button @click="submit" style="background:#438F48;color:#fff">提交</el-button>
                    </el-form-item>
                  </el-row>
                </div>
                <el-form-item label="类型" prop="type">
                  <el-select v-model="formData.type">
                    <el-option v-for="item in ['奖助学金项目']" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标题：" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="作者：" prop="author">
                  <el-input v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item label="发布日期：" prop="detailDate">
                  <el-date-picker
                    :clearable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="formData.detailDate"
                  ></el-date-picker>
                </el-form-item>

                <template v-if="formData.type === '奖助学金项目'">
                  <el-form-item prop="title">
                    <el-switch
                      v-model="formData.isApply"
                      active-color="#438F49"
                      active-text="允许申请"
                      inactive-text="不能申请"
                      active-value="允许申请"
                      inactive-value="不能申请"
                      @change="applyChange"
                    ></el-switch>
                  </el-form-item>
                  <!-- <span v-if="this.formData.isApply === '允许申请' && formData.type === '奖助学金项目'">
                    <el-form-item label="模板名称：" prop="category" style="margin-left:50px;">
                      <el-select
                        clearable
                        filterable
                        v-model="formData.category"
                        placeholder="请选择模板名称"
                      >
                        <el-option :value="0" label="不使用模板"></el-option>
                        <el-option
                          v-for="(item,index) in categoryList"
                          :key="index"
                          :label="item.title"
                          :value="item.title"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </span>-->
                </template>

                <div v-if="this.formData.isApply === '允许申请' && formData.type === '奖助学金项目'">
                  <el-form-item label="申请开始/截止时间时间：" prop="validTime">
                    <el-date-picker
                      :clearable="false"
                      type="datetimerange"
                      v-model="formData.validTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>

                  <el-form-item label="评审时间：" prop="auditTime">
                    <el-date-picker
                      :clearable="false"
                      type="date"
                      value-format="yyyy-MM-dd"
                      v-model="formData.auditTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="名单公示时间：" prop="announcementTime">
                    <el-date-picker
                      :clearable="false"
                      type="date"
                      value-format="yyyy-MM-dd"
                      v-model="formData.announcementTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="可申请院系：" prop="college">
                    <el-select
                      v-model="formData.college"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择可申请院系"
                    >
                      <el-option
                        v-for="(item,index) in collegeList"
                        :key="index"
                        :label="item.college"
                        :value="item.college"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="可申请年级：" prop="grade">
                    <el-select
                      v-model="formData.grade"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择可申请年级"
                    >
                      <el-option
                        v-for="item in gradeList"
                        :key="item.value"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-card>
              <div v-if="formData.isApply === '允许申请' && formData.type === '奖助学金项目'">
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">个人信息定制</h1>
                  </div>
                  <div>
                    <!-- <el-row>
                      <el-form-item prop="college" label="学院：">
                        <el-select v-model="formData.college">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.college !== '不填'">
                        <el-form-item prop="college1" label="基本要求：">
                          <el-input
                            v-model="formData.college1"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>-->

                    <!-- <el-row>
                      <el-form-item prop="major1" label="专业：">
                        <el-select v-model="formData.major">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.major !== '不填'">
                        <el-form-item prop="major1" label="基本要求：">
                          <el-input
                            v-model="formData.major1"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>-->

                    <!-- <el-row>
                      <el-form-item prop="grade" label="班级：">
                        <el-select v-model="formData.grade">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.grade !== '不填'">
                        <el-form-item prop="grade1" label="基本要求：">
                          <el-input
                            v-model="formData.grade1"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>-->

                    <!-- <el-row>
                      <el-form-item prop="role" label="身份：">
                        <el-select v-model="formData.role">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.role !== '不填'">
                        <el-form-item prop="role1" label="基本要求：">
                          <el-select v-model="formData.role1">
                            <el-option v-for="item in ['所有','本科生','研究生']" :key="item" :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                      </span>
                    </el-row>-->

                    <el-row>
                      <el-form-item prop="nation1" label="民族：">
                        <el-select v-model="formData.nation1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.nation1 !== '不填'">
                        <el-form-item prop="nation" label="基本要求：">
                          <el-select v-model="formData.nation">
                            <el-option v-for="item in ['所有','汉族','少数民族']" :key="item" :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="gender1" label="性别：">
                        <el-select v-model="formData.gender1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.gender1 !== '不填'">
                        <el-form-item prop="gender" label="基本要求：">
                          <el-select v-model="formData.gender">
                            <el-option v-for="item in ['所有','男','女']" :key="item" :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="age1" label="年龄：">
                        <el-select v-model="formData.age1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.age1 !== '不填'">
                        <el-form-item prop="age" label="基本要求：">
                          <el-input
                            v-model="formData.age"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="birthday1" label="出生日期：">
                        <el-select v-model="formData.birthday1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.birthday1 !== '不填'">
                        <el-form-item prop="birthday" label="基本要求：">
                          <el-input
                            v-model="formData.birthday"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="cardId1" label="身份证号：">
                        <el-select v-model="formData.cardId1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.cardId1 !== '不填'">
                        <el-form-item prop="cardId" label="基本要求：">
                          <el-input
                            v-model="formData.cardId"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="phone1" label="手机号：">
                        <el-select v-model="formData.phone1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.phone1 !== '不填'">
                        <el-form-item prop="phone" label="基本要求：">
                          <el-input
                            v-model="formData.phone"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="mail1" label="邮箱：">
                        <el-select v-model="formData.mail1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.mail1 !== '不填'">
                        <el-form-item prop="mail" label="基本要求：">
                          <el-input
                            v-model="formData.mail"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">诚信记录定制</h1>
                  </div>
                  <div>
                    <el-row>
                      <el-form-item prop="credibility1" label="申请资助过程中弄虚作假：">
                        <el-select v-model="formData.credibility1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.credibility1 !== '不填'">
                        <el-form-item prop="credibility" label="基本要求：">
                          <el-input
                            v-model="formData.credibility"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="cheat1" label="考试作弊记录：">
                        <el-select v-model="formData.cheat1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.cheat1 !== '不填'">
                        <el-form-item prop="cheat" label="基本要求：">
                          <el-input
                            v-model="formData.cheat"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="ren1t" label="校外租住情况：">
                        <el-select v-model="formData.rent1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.rent1 !== '不填'">
                        <el-form-item prop="rent" label="基本要求：">
                          <el-input
                            v-model="formData.rent"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="breach1" label="其他诚信问题：">
                        <el-select v-model="formData.breach1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.breach1 !== '不填'">
                        <el-form-item prop="breach" label="基本要求：">
                          <el-input
                            v-model="formData.breach"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">学习信息定制</h1>
                  </div>
                  <div>
                    <el-row>
                      <el-form-item prop="political1" label="政治面貌：">
                        <el-select v-model="formData.political1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.political1 !== '不填'">
                        <el-form-item prop="political" label="基本要求：">
                          <el-select v-model="formData.political">
                            <el-option
                              v-for="item in ['所有','中共党员','团员','群众']"
                              :key="item"
                              :value="item"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="foreignLang1" label="外语语种：">
                        <el-select v-model="formData.foreignLang1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.foreignLang1 !== '不填'">
                        <el-form-item prop="foreignLang" label="基本要求：">
                          <el-select v-model="formData.foreignLang">
                            <el-option
                              v-for="item in ['英语','德语','日语','韩语']"
                              :key="item"
                              :value="item"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="foreignLevel1" label="外语水平：">
                        <el-select v-model="formData.foreignLevel1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.foreignLevel1 !== '不填'">
                        <el-form-item prop="foreignLevel" label="基本要求：">
                          <el-input
                            v-model="formData.foreignLevel"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="foreignGrade1" label="外语分数：">
                        <el-select v-model="formData.foreignGrade1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.foreignGrade1 !== '不填'">
                        <el-form-item prop="foreignGrade" label="基本要求：">
                          <el-input
                            v-model="formData.foreignGrade"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="enrolmentTime1" label="入学时间：">
                        <el-select v-model="formData.enrolmentTime1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.enrolmentTime1 !== '不填'">
                        <el-form-item prop="enrolmentTime" label="基本要求：">
                          <el-input
                            v-model="formData.enrolmentTime"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="graduationTime1" label="入学时间：">
                        <el-select v-model="formData.graduationTime1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.graduationTime1 !== '不填'">
                        <el-form-item prop="graduationTime" label="基本要求：">
                          <el-input
                            v-model="formData.graduationTime"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="creditScore1" label="学分成绩：">
                        <el-select v-model="formData.creditScore1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.creditScore1 !== '不填'">
                        <el-form-item prop="creditScore" label="基本要求：">
                          <el-input
                            v-model="formData.creditScore"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="creditClassRanking1" label="学分班级排名：">
                        <el-select v-model="formData.creditClassRanking1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.creditClassRanking1 !== '不填'">
                        <el-form-item prop="creditClassRanking" label="基本要求：">
                          <el-input
                            v-model="formData.creditClassRanking"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="creditGradeRanking1" label="学分年级排名：">
                        <el-select v-model="formData.creditGradeRanking1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.creditGradeRanking1 !== '不填'">
                        <el-form-item prop="creditGradeRanking" label="基本要求：">
                          <el-input
                            v-model="formData.creditGradeRanking"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="comprehensiveResult1" label="综合成绩：">
                        <el-select v-model="formData.comprehensiveResult1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.comprehensiveResult1 !== '不填'">
                        <el-form-item prop="comprehensiveResult" label="基本要求：">
                          <el-input
                            v-model="formData.comprehensiveResult"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="comprehensiveClassRanking1" label="综合班级排名：">
                        <el-select v-model="formData.comprehensiveClassRanking1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.comprehensiveClassRanking1 !== '不填'">
                        <el-form-item prop="comprehensiveClassRanking" label="基本要求：">
                          <el-input
                            v-model="formData.comprehensiveClassRanking"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="comprehensiveGradeRanking1" label="综合年级排名：">
                        <el-select v-model="formData.comprehensiveGradeRanking1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.comprehensiveGradeRanking1 !== '不填'">
                        <el-form-item prop="comprehensiveGradeRanking" label="基本要求：">
                          <el-input
                            v-model="formData.comprehensiveGradeRanking"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="failureCourse1" label="挂科情况：">
                        <el-select v-model="formData.failureCourse1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.failureCourse1 !== '不填'">
                        <el-form-item prop="failureCourse" label="基本要求：">
                          <el-input
                            v-model="formData.failureCourse"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>

                    <el-row>
                      <el-form-item prop="result1" label="科研成果：">
                        <el-select v-model="formData.result1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.result1 !== '不填'">
                        <el-form-item prop="result" label="基本要求：">
                          <el-input
                            v-model="formData.result"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">家庭信息定制</h1>
                  </div>
                  <div>
                    <el-row>
                      <el-form-item prop="home1" label="籍贯：">
                        <el-select v-model="formData.home1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.home1 !== '不填'">
                        <el-form-item prop="home" label="基本要求：">
                          <el-input
                            v-model="formData.home"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="address1" label="家庭详细情况描述：">
                        <el-select v-model="formData.address1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.address1 !== '不填'">
                        <el-form-item prop="address" label="基本要求：">
                          <el-input
                            v-model="formData.address"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="isPoor1" label="是否为建档贫困生：">
                        <el-select v-model="formData.isPoor1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.isPoor1 !== '不填'">
                        <el-form-item prop="isPoor" label="基本要求：">
                          <el-select v-model="formData.isPoor">
                            <el-option v-for="item in ['不限','是','否']" :key="item" :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                      </span>
                    </el-row>
                    <el-row>
                      <el-form-item prop="family1" label="家庭详细情况描述：">
                        <el-select v-model="formData.family1">
                          <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <span v-if="formData.family1 !== '不填'">
                        <el-form-item prop="family" label="基本要求：">
                          <el-input
                            v-model="formData.family"
                            :autosize="{ minRows: 1}"
                            type="textarea"
                            style="width:600px;"
                          ></el-input>
                        </el-form-item>
                      </span>
                    </el-row>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">申请理由</h1>
                  </div>
                  <div>
                    <el-form-item prop="applyReason1" label="申请理由：">
                      <el-select v-model="formData.applyReason1">
                        <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <span v-if="formData.applyReason1 !== '不填'">
                      <el-form-item prop="applyReason" label="基本要求：">
                        <el-input
                          v-model="formData.applyReason"
                          :autosize="{ minRows: 1}"
                          type="textarea"
                          style="width:600px;"
                        ></el-input>
                      </el-form-item>
                    </span>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">其他信息</h1>
                  </div>
                  <div>
                    <el-form-item prop="others1" label="申请理由：">
                      <el-select v-model="formData.others1">
                        <el-option v-for="item in ['选填','必填','不填']" :key="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <span v-if="formData.others1 !== '不填'">
                      <el-form-item prop="others" label="基本要求：">
                        <el-input
                          v-model="formData.others"
                          :autosize="{ minRows: 1}"
                          type="textarea"
                          style="width:600px;"
                        ></el-input>
                      </el-form-item>
                    </span>
                  </div>
                </el-card>
              </div>

              <el-form-item>
                <el-upload :on-success="uploadSuccess" multiple action="api/upload">
                  <el-button size="small" style="background:#438F48;color:#fff">上传文件</el-button>
                </el-upload>
                <template prop="content">
                  <vue-ueditor-wrap
                    v-model="formData.content"
                    :config="myConfig"
                    style="line-height:25px;"
                  ></vue-ueditor-wrap>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="isScan">
            <el-button @click="scan" type="success">返回</el-button>
            <cwx-article :detail="formData"></cwx-article>
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
import { addPolicy, queryTemplate, queryTemplateList } from "../../api";
import VueUeditorWrap from "vue-ueditor-wrap";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  name: "Ueditor",
  components: { VueUeditorWrap },
  data() {
    return {
      temp: "",
      isScan: false,
      // categoryList: JSON.parse(window.localStorage.categoryEnum),
      templateList: [],
      category: "",
      formData: {
        // address: "没有要求",
        address1: '不填',
        // announcementTime: "2019-05-08",
        // applyReason: "没有要求",
        applyReason1: '不填',
        // auditTime: "2019-05-08",
        // author: "赵三丰",
        // breach: "必填",
        breach1:'不填',
        category: 0,
        // cheat: "必填",
        cheat1:'不填',
        // college: ["信息工程学院", "动物医学院", "动物科技学院", "农学院"],
        // comprehensiveClassRanking: "没有要求",
        comprehensiveClassRanking1: '不填',
        // comprehensiveGradeRanking: "没有要求",
        comprehensiveGradeRanking1: '不填',
        // comprehensiveResult: "没有要求",
        comprehensiveResult1:'不填',
        // content: "<p>没有要求</p>",
        // credibility: "必填",
        credibility1: '不填',
        // creditClassRanking: "没有要求",
        creditClassRanking1: '不填',
        // creditGradeRanking: "没有要求",
        creditGradeRanking1: '不填',
        // creditScore: "没有要求",
        creditScore1:'不填',
        // detailDate: "2019-05-24",
        // enrolmentTime: "没有要求",
        enrolmentTime1:'不填',
        // failureCourse: "没有要求",
        failureCourse1:'不填',
        // family: "没有要求",
        family1: '不填',
        // foreignGrade: "没有要求",
        foreignGrade1:'不填',
        // foreignLang: "英语",
        foreignLang1: '不填',
        // foreignLevel:'不填',
        foreignLevel1: '不填',
        // gender: "所有",
        gender1: '不填',
        // grade: ["研究生", "15"],
        // graduationTime: "没有要求",
        graduationTime1: '不填',
        // home: "没有要求",
        home1: '不填',
        // isApply: "不能申请",
        // isPoor: "不限",
        isPoor1: '不填',
        // nation: "所有",
        nation1:'不填',
        // political: "所有",
        political1: '不填',
        // rent: "必填",
        rent1: '不填',
        // result: "没有要求",
        result1: '不填',
        // title: "没有标题",
        // type: "奖助学金项目",
        // update_date: "05-24",
        // validTime: ["2019-05-01 00:00:00", "2019-05-09 00:00:00"],
        isApply: "不能申请",
        // isTemplate:1,
           birthday1:'不填',
           age1:'不填',
           cardId1:'不填',
           phone1:'不填',
           mail1:'不填',
           others1:'不填'
      },
      typeList: ["通知公告", "工作动态", "奖助学金项目"],
      // applyList: [
      //   { value: "允许申请", label: "允许申请" },
      //   { value: "不能申请", label: "不能申请" }
      // ],
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
        // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: "/static/ue/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 工具栏是否可以浮动
        autoFloatEnabled: false,
        // 初始容器高度
        initialFrameHeight: 410,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: true
      }
    };
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    collegeList() {
      let collegeEnum = JSON.parse(window.localStorage.collegeEnum);
      collegeEnum.unshift({ college: "所有院系" });
      return collegeEnum;
    },
    gradeList() {
      let gradeEnum = JSON.parse(window.localStorage.gradeEnum);
      gradeEnum.unshift("所有年级", "研究生", "本科生");
      return gradeEnum;
    }
  },
  mounted() {
    this.formData = Object.assign({}, this.formData, {
      detailDate: this.defaultValue(),
      author: this.name
    });
    queryTemplate().then(data => {
      this.templateList = data.content;
    });
  },
  methods: {
    handleTemplate(val) {
      if (val) {
        this.category = val;
        queryTemplateList({ title: val }).then(data => {
          let temp = data.content;
          let validTime = [temp.startTime, temp.endTime];
          let college = temp.college;
          college = college.split(";");
          let grade = temp.grade;
          grade = grade.split(";");
          this.formData = Object.assign({}, temp, {
            validTime,
            college,
            grade,
            type: "奖助学金项目",
            category: this.category,
            isTemplate: "0"
          });
        });
      }
    },
    uploadSuccess(res, file) {
      this.temp = `<div><br><i class="el-icon-link"></i><a href="${
        res.filename
      }" >${file.name}</a></div>`;
      this.formData.content += this.temp;
    },
    applyChange(val) {
      this.formData.isApply = val;
    },
    defaultValue() {
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
      return "" + year + "-" + month + "-" + day;
    },
    submit() {
      let update_date = this.formData.detailDate.slice(5);
      Object.assign(this.formData, { update_date });
      addPolicy(this.formData)
        .then(data => {
          if (data.status === "1") {
            this.$message.success("发布成功");
          } else {
            this.$message.error("重复模板，无法插入");
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    scan() {
      this.isScan = !this.isScan;
    }
  }
};
</script>


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
      position: relative;
    }
  }
}
</style>