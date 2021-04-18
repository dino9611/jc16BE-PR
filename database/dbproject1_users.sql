-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbproject1
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` varchar(45) DEFAULT 'user',
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ommi','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','ommi@gmail.com'),(2,'dino','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','admin','dino@gmail.com'),(3,'derian','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','derian@gmail.com'),(4,'willy','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','willy@gmail.com'),(5,'alghi','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','alghi@gmail.com'),(6,'zulfikar','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','zulfikar@gmail.com'),(7,'dedi','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','dedi@gmail.com'),(8,'salman','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','salman@gmail.com'),(9,'andi','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','andi@gmail.com'),(25,'gatra','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','gatra@gmail.com'),(26,'ibnu','9b453c36034d03b8cc5bc56127e744d04aeb53142a22022a845fdce0b16a99b2','user','ibnu@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-19  1:36:34
