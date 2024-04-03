-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2024 at 08:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `MessageId` int(225) NOT NULL,
  `TextMessage` text DEFAULT NULL,
  `FromUser` int(225) DEFAULT NULL,
  `ToUser` int(225) DEFAULT NULL,
  `TimeSended` datetime DEFAULT NULL,
  `seen` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`MessageId`, `TextMessage`, `FromUser`, `ToUser`, `TimeSended`, `seen`) VALUES
(55, 'uahdu', 4, 4, '2024-03-26 15:21:57', NULL),
(56, 'salam', 5, 4, '2024-03-26 17:59:08', NULL),
(57, 'salam', 4, 5, '2024-03-26 19:11:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(225) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `phonenumber` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `email`, `phonenumber`) VALUES
(2, 'parsa', '1234', 'p@gmail.com', '0932323'),
(3, 'parsaa', '$2b$10$G6fd509xXmjxDk/0UnCcVODx3lu019FLNl8qPa6vmvMXpoEWvYgQi', 'p@gmail.com', '0932323'),
(4, 'parsaaa', '$2b$10$jQ2u5fIPUk8kJQywCipPIepKHFkkhKVn5TQNn5aCy5SXqo..H4h3m', 'p@gmail.com', '0932323'),
(5, 'ali3223', '$2b$10$Rcqh3oM.0pD2d3fzIVbZHOGNptY8HzKCaMRxRQW0x/spg31O9KgeS', 'p@gmail.com', '0932323');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`MessageId`),
  ADD KEY `FromUser` (`FromUser`),
  ADD KEY `ToUser` (`ToUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `MessageId` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`FromUser`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`ToUser`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
