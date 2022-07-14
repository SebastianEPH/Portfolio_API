-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.27 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for portfolio_db
CREATE DATABASE IF NOT EXISTS `portfolio_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `portfolio_db`;

-- Dumping structure for table portfolio_db.academic_studie
CREATE TABLE IF NOT EXISTS `academic_studie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `details` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_init` date DEFAULT NULL,
  `date_finish` date DEFAULT NULL,
  `finish` tinyint(1) DEFAULT NULL COMMENT 'is finish? ',
  PRIMARY KEY (`id`),
  KEY `FK_academic_studie_academic_studie_type` (`type`),
  CONSTRAINT `FK_academic_studie_academic_studie_type` FOREIGN KEY (`type`) REFERENCES `academic_studie_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.academic_studie_type
CREATE TABLE IF NOT EXISTS `academic_studie_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.difficulty
CREATE TABLE IF NOT EXISTS `difficulty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `difficulty` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my
CREATE TABLE IF NOT EXISTS `my` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` int DEFAULT NULL,
  `lastname` int DEFAULT NULL,
  `fullname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `photo` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `logo` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `professional_profile` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_emails
CREATE TABLE IF NOT EXISTS `my_emails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `icon` varchar(150) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_extra_knowledge
CREATE TABLE IF NOT EXISTS `my_extra_knowledge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `knowledge` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `icon` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `knowlegge` (`knowledge`) USING BTREE,
  KEY `FK_extra_knowledge_dificulty` (`difficulty`) USING BTREE,
  CONSTRAINT `FK_extra_knowledge_dificulty` FOREIGN KEY (`difficulty`) REFERENCES `difficulty` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_languages
CREATE TABLE IF NOT EXISTS `my_languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(70) DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_languages_dificulty` (`difficulty`) USING BTREE,
  CONSTRAINT `FK_languages_dificulty` FOREIGN KEY (`difficulty`) REFERENCES `difficulty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_phones
CREATE TABLE IF NOT EXISTS `my_phones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_programming_languages
CREATE TABLE IF NOT EXISTS `my_programming_languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(50) DEFAULT NULL,
  `file_extension` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `language` (`language`),
  KEY `FK_programming_languages_dificulty` (`difficulty`) USING BTREE,
  CONSTRAINT `FK_programming_languages_dificulty` FOREIGN KEY (`difficulty`) REFERENCES `difficulty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_programming_tools
CREATE TABLE IF NOT EXISTS `my_programming_tools` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tool` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` enum('Biblioteca','Framework','Servicio') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `framework` (`tool`) USING BTREE,
  KEY `FK_programing_tools_dificulty` (`difficulty`) USING BTREE,
  CONSTRAINT `FK_programing_tools_dificulty` FOREIGN KEY (`difficulty`) REFERENCES `difficulty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.my_social_networks
CREATE TABLE IF NOT EXISTS `my_social_networks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `web` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `icon` varchar(200) DEFAULT NULL,
  `dificulty_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_my_social_networks_difficulty` (`dificulty_id`),
  CONSTRAINT `FK_my_social_networks_difficulty` FOREIGN KEY (`dificulty_id`) REFERENCES `difficulty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `range` int DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `web_deploy` varchar(512) DEFAULT NULL,
  `short_description` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `note` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `repository` varchar(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `documentation` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_init` date DEFAULT NULL,
  `date_finish` date DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `version` varchar(50) DEFAULT NULL,
  `architecture` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `platform` varchar(50) DEFAULT NULL,
  `licence` varchar(50) DEFAULT NULL,
  `ide` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_project_project_type` (`type_id`),
  KEY `FK_project_project_range` (`range`),
  CONSTRAINT `FK_project_project_range` FOREIGN KEY (`range`) REFERENCES `projects_ranges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_project_project_type` FOREIGN KEY (`type_id`) REFERENCES `projects_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects_features
CREATE TABLE IF NOT EXISTS `projects_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projects_id` int DEFAULT NULL,
  `feature` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `img` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_project_features_project` (`projects_id`) USING BTREE,
  CONSTRAINT `FK_project_features_project` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1507 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects_languages
CREATE TABLE IF NOT EXISTS `projects_languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projects_id` int DEFAULT NULL,
  `languages_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_project_language_project` (`projects_id`) USING BTREE,
  KEY `FK_project_language_programming_languages` (`languages_id`) USING BTREE,
  CONSTRAINT `FK_project_language_programming_languages` FOREIGN KEY (`languages_id`) REFERENCES `my_programming_languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_project_language_project` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects_ranges
CREATE TABLE IF NOT EXISTS `projects_ranges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `range` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects_screenshots
CREATE TABLE IF NOT EXISTS `projects_screenshots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projects_id` int DEFAULT NULL,
  `screenshot` varchar(2032) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `number` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_project_screnshort_project` (`projects_id`) USING BTREE,
  CONSTRAINT `FK_project_screnshort_project` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects_tools
CREATE TABLE IF NOT EXISTS `projects_tools` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projects_id` int DEFAULT NULL,
  `tools_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_project_tools_programming_tools` (`tools_id`) USING BTREE,
  KEY `FK_project_tools_project` (`projects_id`) USING BTREE,
  CONSTRAINT `FK_project_tools_programming_tools` FOREIGN KEY (`tools_id`) REFERENCES `my_programming_tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_project_tools_project` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.projects_types
CREATE TABLE IF NOT EXISTS `projects_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_type` (`project_type`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table portfolio_db.works_experiences
CREATE TABLE IF NOT EXISTS `works_experiences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `work` varchar(100) DEFAULT NULL,
  `details` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `person_id` int DEFAULT NULL,
  `data_init` date DEFAULT NULL,
  `data_finish` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure portfolio_db.sp_addProjects_features
DELIMITER //
CREATE PROCEDURE `sp_addProjects_features`(IN _projects_id_ varchar(200),  IN _feature_ varchar(200), IN _img_ varchar(512),
                                         IN _description_ text)
BEGIN
    insert into  projects_features (projects_id, feature, img, description) Values ( _projects_id_, _feature_, _img_, _description_);
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_addProjects_languages
DELIMITER //
CREATE PROCEDURE `sp_addProjects_languages`(IN _projects_id_ varchar(200),  IN _languages_id_ int)
BEGIN
    insert into  projects_languages (projects_id, languages_id) Values ( _projects_id_, _languages_id_);
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_addProjects_screenshots
DELIMITER //
CREATE PROCEDURE `sp_addProjects_screenshots`(IN _projects_id_ int,
                                            IN _screenshot_ varchar(2032),
                                            IN _number_ int(10),
                                            IN _description_ text)
BEGIN
    INSERT INTO  projects_screenshots (projects_id, screenshot, number, description) VALUES ( _projects_id_, _screenshot_, _number_, _description_);
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_addProjects_tools
DELIMITER //
CREATE PROCEDURE `sp_addProjects_tools`(IN _projects_id_ varchar(200),  IN _tools_id_ int)
BEGIN
    insert into  projects_tools (projects_id, tools_id) Values ( _projects_id_, _tools_id_);
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_delProjects_features
DELIMITER //
CREATE PROCEDURE `sp_delProjects_features`(IN _projects_id_ int,
                                         IN _id_ int)
BEGIN
    DELETE FROM projects_features
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_delProjects_languages
DELIMITER //
CREATE PROCEDURE `sp_delProjects_languages`(IN _projects_id_ int,
                                         IN _id_ int)
BEGIN
    DELETE FROM projects_languages
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_delProjects_screenshots
DELIMITER //
CREATE PROCEDURE `sp_delProjects_screenshots`(IN _projects_id_ int, IN _id_ int)
BEGIN
    DELETE FROM projects_screenshots
    WHERE projects_id = _projects_id_
    AND
    id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_delProjects_tools
DELIMITER //
CREATE PROCEDURE `sp_delProjects_tools`(IN _projects_id_ int, IN _id_ int)
BEGIN
    DELETE FROM projects_tools
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getMyExtraKnowledge
DELIMITER //
CREATE PROCEDURE `sp_getMyExtraKnowledge`()
BEGIN
    SELECT
        k.id,
        k.knowledge,
        k.icon,
        difficulty.difficulty
    from  my_extra_knowledge k
              left join difficulty ON k.difficulty = difficulty.id
    order by k.knowledge ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getMyInformation
DELIMITER //
CREATE PROCEDURE `sp_getMyInformation`()
BEGIN
    SELECT
        my.id,
        my.name,
        my.lastname,
        my.fullname,
        my.username,
        my.country,
        my.description,
        my.photo,
        my.logo,
        my.professional_profile
    from  my;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getMyLanguages
DELIMITER //
CREATE PROCEDURE `sp_getMyLanguages`()
BEGIN
    SELECT
        my.id,
        my.language,
        difficulty.difficulty
    from  my_languages my
              left join difficulty ON my.difficulty = difficulty.id
    order by  my.language ASC ;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getMyProgrammingLanguages
DELIMITER //
CREATE PROCEDURE `sp_getMyProgrammingLanguages`()
BEGIN
    SELECT
        lan.id,
        lan.language,
        lan.file_extension,
        lan.icon,
        difficulty.difficulty
    from  my_programming_languages lan
              left join difficulty ON lan.difficulty = difficulty.id;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getMyProgrammingTools
DELIMITER //
CREATE PROCEDURE `sp_getMyProgrammingTools`()
BEGIN
    SELECT
        tool.id,
        tool.tool,
        tool.type,
        tool.icon,
        difficulty.difficulty
    from  my_programming_tools tool
    left join difficulty ON tool.difficulty = difficulty.id;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getMySocialNetworks
DELIMITER //
CREATE PROCEDURE `sp_getMySocialNetworks`()
BEGIN
    SELECT
        my.id,
        my.web,
        my.link,
        my.icon
    from  my_social_networks my;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects
DELIMITER //
CREATE PROCEDURE `sp_getProjects`(in _id_ int(10))
BEGIN
    SELECT
        projects.id,
        projects.name,
        projects.img,
        projects.date_init,
        projects.short_description,
        projects.date_finish,
        projects.web_deploy,
        projects.description,
        projects.repository,
        projects.documentation,
        projects_types.project_type as "type",
        projects.version,
        projects.architecture,
        projects.state,
        projects.size,
        projects.platform,
        projects.licence,
        projects.ide,
        projects_ranges.range
#         project_range.id as "range_id"
    FROM projects
             LEFT JOIN projects_types ON projects.type_id = projects_types.id
             LEFT JOIN projects_ranges ON projects.range = projects_ranges.id
    WHERE projects.id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjectsAll
DELIMITER //
CREATE PROCEDURE `sp_getProjectsAll`()
BEGIN
    SELECT
        projects.id,
        projects.name,
        projects.date_init,
        projects.date_finish,
        projects.web_deploy,
        projects.short_description,
        projects.description,
        projects.repository,
        projects.documentation,
        projects_types.project_type as "type",
        projects.version,
        projects.architecture,
        projects.state,
        projects.size,
        projects.platform,
        projects.licence,
        projects.ide,
        projects_ranges.range
#         project_range.id as "range_id"

    FROM projects
             LEFT JOIN projects_types ON projects.type_id = projects_types.id
             LEFT JOIN projects_ranges ON projects.range = projects_ranges.id
    ORDER BY projects_ranges.id asc ;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_features
DELIMITER //
CREATE PROCEDURE `sp_getProjects_features`(IN _projects_id_ int, IN _features_id_ int)
begin
    SELECT
        projects_features.id,
        projects_features.feature,
        projects_features.img,
        projects_features.description
    FROM projects_features
    WHERE projects_id = _projects_id_ AND id = _features_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_featuresAll
DELIMITER //
CREATE PROCEDURE `sp_getProjects_featuresAll`(IN _projects_id_ int)
begin
    SELECT
        projects_features.id,
        projects_features.feature,
        projects_features.img,
        projects_features.description
    FROM projects_features
    WHERE projects_id = _projects_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_languages
DELIMITER //
CREATE PROCEDURE `sp_getProjects_languages`(IN _projects_id_ int, IN _languages_id_ int)
begin
    SELECT
        projects_languages.id as 'id',
        my_programming_languages.id as "languages_id",
        my_programming_languages.language,
        my_programming_languages.file_extension,
        my_programming_languages.icon
    FROM projects_languages
             LEFT JOIN my_programming_languages ON projects_languages.languages_id = my_programming_languages.id
    WHERE projects_id = _projects_id_ and projects_languages.languages_id = _languages_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_languagesAll
DELIMITER //
CREATE PROCEDURE `sp_getProjects_languagesAll`(IN _projects_id_ int)
begin
    SELECT
         projects_languages.id as 'id',
         my_programming_languages.id as "languages_id",
         my_programming_languages.language,
         my_programming_languages.file_extension,
         my_programming_languages.icon
    FROM projects_languages
    LEFT JOIN my_programming_languages ON projects_languages.languages_id = my_programming_languages.id
    WHERE projects_id = _projects_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_screenshots
DELIMITER //
CREATE PROCEDURE `sp_getProjects_screenshots`(IN _projects_id_ int, IN _screenshots_id_ int)
begin
    SELECT
        projects_screenshots.id,
        projects_screenshots.screenshot,
        projects_screenshots.number,
        projects_screenshots.description
    FROM projects_screenshots
    WHERE projects_id = _projects_id_ AND id = _screenshots_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_screenshotsAll
DELIMITER //
CREATE PROCEDURE `sp_getProjects_screenshotsAll`(IN _projects_id_ int)
begin
    SELECT
        projects_screenshots.id,
        projects_screenshots.screenshot,
        projects_screenshots.number,
        projects_screenshots.description
    FROM projects_screenshots
    WHERE projects_id = _projects_id_
    ORDER BY projects_screenshots.number ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_tools
DELIMITER //
CREATE PROCEDURE `sp_getProjects_tools`(IN _projects_id_ int, IN _tools_id_ int)
begin
    SELECT
        projects_tools.id,
        my_programming_tools.id as "tools_id",
        my_programming_tools.type,
        my_programming_tools.icon,
        difficulty.difficulty
    FROM projects_tools
             LEFT JOIN my_programming_tools ON projects_tools.tools_id = my_programming_tools.id
             LEFT JOIN difficulty ON my_programming_tools.difficulty = difficulty.id
    WHERE projects_id = _projects_id_ AND projects_tools.id = _tools_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_getProjects_toolsAll
DELIMITER //
CREATE PROCEDURE `sp_getProjects_toolsAll`(IN _projects_id_ int)
begin
    SELECT
        projects_tools.id as 'id',
        my_programming_tools.id as "tools_id",
        my_programming_tools.type,
        my_programming_tools.icon,
        difficulty.difficulty
    FROM projects_tools
             LEFT JOIN my_programming_tools ON projects_tools.tools_id = my_programming_tools.id
             LEFT JOIN difficulty ON my_programming_tools.difficulty = difficulty.id
    WHERE projects_id = _projects_id_
    ORDER BY projects_id ASC;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_updProjects_features
DELIMITER //
CREATE PROCEDURE `sp_updProjects_features`(IN _projects_id_ int,
                                         IN _id_ int,
                                         IN _feature_ varchar(200),
                                         IN _img_ varchar(512),
                                         IN _description_ text)
BEGIN
    UPDATE projects_features
    SET feature = _feature_ , img = _img_, description = _description_
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_updProjects_languages
DELIMITER //
CREATE PROCEDURE `sp_updProjects_languages`(IN _id_ varchar(200), IN _projects_id_ varchar(200),  IN _languages_id_ int)
BEGIN
    UPDATE projects_languages
    SET languages_id = _languages_id_
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_updProjects_screenshots
DELIMITER //
CREATE PROCEDURE `sp_updProjects_screenshots`(IN _projects_id_ int,
                                            IN _id_ int,
                                            IN _screenshot_ varchar(2032),
                                            IN _number_ int(10),
                                            IN _description_ text)
BEGIN
    UPDATE projects_screenshots
    SET screenshot = _screenshot_ , number = _number_, description = _description_
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

-- Dumping structure for procedure portfolio_db.sp_updProjects_tools
DELIMITER //
CREATE PROCEDURE `sp_updProjects_tools`(IN _id_ varchar(200), IN _projects_id_ varchar(200),  IN _tools_id_ int)
BEGIN
    UPDATE projects_tools
    SET tools_id = _tools_id_
    WHERE
        projects_id = _projects_id_
    AND
        id = _id_;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
