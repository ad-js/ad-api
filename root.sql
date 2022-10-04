/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : root

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 04/10/2022 10:22:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ad_type
-- ----------------------------
DROP TABLE IF EXISTS `ad_type`;
CREATE TABLE `ad_type`  (
  `id` int(65) NOT NULL COMMENT '唯一id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '广告类型名称',
  `ad_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '类型',
  `event` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '触发事件 click dbclick',
  `showType` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '展示形式 image video',
  `imageUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '图片链接',
  `videoTUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频链接',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '跳转链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ad_type
-- ----------------------------
INSERT INTO `ad_type` VALUES (1, 'banner广告', 'BannerAD', 'click', 'image', 'https://img-operation.csdnimg.cn/csdn/silkroad/img/1662634720055.png', NULL, 'https://www.baidu.com');
INSERT INTO `ad_type` VALUES (2, 'banner广告 视频', 'BannerAD', 'click', 'video', NULL, 'https://www.runoob.com/try/demo_source/movie.mp4', 'https://www.baidu.com');

-- ----------------------------
-- Table structure for app_list
-- ----------------------------
DROP TABLE IF EXISTS `app_list`;
CREATE TABLE `app_list`  (
  `id` int(65) NOT NULL,
  `appKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'appkey\r\n',
  `appName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '应用名称',
  PRIMARY KEY (`id`, `appKey`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of app_list
-- ----------------------------
INSERT INTO `app_list` VALUES (1, 'app1', 'Huang Ziyi');
INSERT INTO `app_list` VALUES (2, 'app2', 'Zou Xiuying');
INSERT INTO `app_list` VALUES (3, 'app3', 'Wong Yu Ling');
INSERT INTO `app_list` VALUES (4, 'app4', 'Larry Wallace');
INSERT INTO `app_list` VALUES (5, 'app5', 'Yin Ka Man');
INSERT INTO `app_list` VALUES (6, 'app6', 'Gary Allen');
INSERT INTO `app_list` VALUES (7, 'app7', 'Ryan Gutierrez');
INSERT INTO `app_list` VALUES (8, 'app8', 'Li Yuning');
INSERT INTO `app_list` VALUES (9, 'app9', 'Alexander Alexander');
INSERT INTO `app_list` VALUES (10, 'app10', 'Li Jiehong');

-- ----------------------------
-- Table structure for launch_list
-- ----------------------------
DROP TABLE IF EXISTS `launch_list`;
CREATE TABLE `launch_list`  (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `appKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '应用key\r\n',
  `ad_type_id` int(11) NULL DEFAULT NULL COMMENT '广告类型id',
  `total_money` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '总费用',
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '单价/完成浏览广告任务\r\n',
  `effectTotal` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '生效量总计\r\n',
  `start` timestamp NULL DEFAULT NULL COMMENT '开始时间 时间戳',
  `end` timestamp NULL DEFAULT NULL COMMENT '结束时间 时间戳',
  `peopleType` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '人群：高收入|低收入|学生| 互联网| 教育 | 工业    多选\r\n',
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '地区:  省/市',
  `showTotal` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '曝光了总计',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of launch_list
-- ----------------------------

-- ----------------------------
-- Table structure for user_list
-- ----------------------------
DROP TABLE IF EXISTS `user_list`;
CREATE TABLE `user_list`  (
  `id` int(65) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '权限 1代表 用户, 投放系统全部账号都是用户',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_list
-- ----------------------------
INSERT INTO `user_list` VALUES (1, 'ldq', '123456', '1');
INSERT INTO `user_list` VALUES (2, 'root', '123456', '1');
INSERT INTO `user_list` VALUES (3, 'admin', '123456', '1');

SET FOREIGN_KEY_CHECKS = 1;
