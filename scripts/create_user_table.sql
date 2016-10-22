DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`email`, `password`) VALUES ('test1@gmail.com', 'Test1'), ('test2@gmail.com', 'Test2') , ('test3@gmail.com', 'Test3'), ('test4@gmail.com', 'Test4') , ('test5@gmail.com', 'Test5');
/* inserted 5 dummy users for testing purposes */

/*!40101 SET character_set_client = @saved_cs_client */;
