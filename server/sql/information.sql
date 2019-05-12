/*
Navicat MySQL Data Transfer

Source Server         : 毕业设计
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : nwafu

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-05-12 14:40:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sno` varchar(3) CHARACTER SET utf8 NOT NULL,
  `gender` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '性别',
  `age` int(3) DEFAULT NULL,
  `birthday` varchar(10) CHARACTER SET utf8 DEFAULT '暂未审核',
  `nation` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `cardId` varchar(19) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `bankCard` varchar(20) DEFAULT NULL,
  `credibility` text CHARACTER SET utf8 COMMENT '申请资助过程中弄虚作假行为',
  `cheat` text CHARACTER SET utf8 COMMENT '考试作弊行为',
  `rent` text CHARACTER SET utf8 COMMENT '校外租住',
  `breach` text COMMENT '其他违纪',
  `political` varchar(5) DEFAULT NULL COMMENT '政治面貌',
  `studentType` varchar(3) DEFAULT NULL,
  `isFullTime` varchar(5) DEFAULT NULL COMMENT '是否在职和是否全日制',
  `foreignLang` varchar(10) DEFAULT NULL,
  `foreignLevel` varchar(10) DEFAULT NULL,
  `foreignGrade` float DEFAULT NULL,
  `educationalSystem` varchar(10) DEFAULT NULL COMMENT '学制',
  `educationalBackground` varchar(10) DEFAULT NULL,
  `enrolmentTime` varchar(10) DEFAULT NULL,
  `graduationTime` varchar(10) DEFAULT NULL COMMENT '毕业时间',
  `creditScore` float DEFAULT NULL COMMENT '学分成绩',
  `comprehensiveResult` float DEFAULT NULL COMMENT '综测成绩',
  `creditClassRanking` varchar(10) DEFAULT NULL,
  `creditGradeRanking` varchar(10) DEFAULT NULL,
  `comprehensiveClassRanking` varchar(10) DEFAULT NULL,
  `comprehensiveGradeRanking` varchar(10) DEFAULT NULL,
  `result` text COMMENT '科研成果',
  `address` varchar(255) DEFAULT NULL,
  `family` text,
  `isPoor` varchar(1) DEFAULT NULL,
  `applyReason` text COMMENT '申请理由',
  `others` text,
  `home` varchar(50) DEFAULT NULL COMMENT '籍贯',
  `failureCourse` text COMMENT '挂科情况',
  PRIMARY KEY (`id`),
  UNIQUE KEY `奖学金+学号+姓名` (`id`,`sno`,`gender`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf16 ROW_FORMAT=COMPACT COMMENT='申请审核表';
