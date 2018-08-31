/*
SQLyog Community v9.20 Beta2
MySQL - 5.7.17-log : Database - custom_project
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`custom_project` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `custom_project`;

/*Table structure for table `contact_data` */

DROP TABLE IF EXISTS `contact_data`;

CREATE TABLE `contact_data` (
  `username` varchar(60) NOT NULL,
  `contact_number` varchar(60) NOT NULL,
  `contact_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `contact_data` */

insert  into `contact_data`(`username`,`contact_number`,`contact_name`,`email`) values ('saketjo','9657609234','vaibhav','vaibhav5@gmail.com'),('saketjo','9823005406','tipu','tipu@gmail.com'),('saketjo','8989562356','bhuvi','bhuvi@gmail.com');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `mobileno` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `NewIndex1` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`mobileno`,`lastname`,`firstname`,`username`,`password`,`email_id`) values ('7507553059','joshi','ritwik','ritwikjo','ea2fb83d347455c6eabf4429b19d3b7dd858b006c913608ccfb5687b76bde571','ritwikj@gmail.com'),('7507553058','joshi','saket','saketjo','c65222f32a38850e8bc2b3839e0699e00f1b04cd988beb83264797b2ec3145fe','saketj95@yahoo.com');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
