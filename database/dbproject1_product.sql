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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `brand` varchar(45) NOT NULL,
  `id_category` int NOT NULL,
  `pic_url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'4D Fusio Shoes',250,'Adidas',1,'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/d5f8f2fd77d64b69a1b1ac7200db5c57_9366/4D_Fusio_Shoes_Black_FZ2414_01_standard.jpg'),(2,'Ultra 4D 5.0 Shoes',300,'Adidas',1,'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/95ea9a46c0ad4de4b1b6ac7200dcb054_9366/Ultra_4D_5.0_Shoes_Black_G58162_01_standard.jpg'),(3,'Adidas 4D Run 1.0 Shoes',160,'Adidas',1,'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/ae99cef75be04e089032ab25010d4dfa_9366/adidas_4D_Run_1.0_Shoes_White_EG6264_01_standard.jpg'),(4,'Nike Air Presto',120,'Nike',1,'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/08e369ae-fa2f-4097-9b46-d226428c1738/air-presto-shoe-QdhgZW.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-19  1:36:33
