-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-04-2025 a las 14:51:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `logindb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sudoku_boards`
--

CREATE TABLE `sudoku_boards` (
  `IDSudoku` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `board_data` longtext NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sudoku_boards`
--

INSERT INTO `sudoku_boards` (`IDSudoku`, `IDUser`, `board_data`, `created_at`) VALUES
(1, 1, '[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]', '2025-04-08 05:37:16'),
(2, 1, '[[5,3,2,2,7,2,2,2,2],[6,2,2,1,9,5,2,2,2],[0,9,8,2,2,2,2,6,2],[8,2,2,2,6,2,2,2,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]', '2025-04-08 05:37:35'),
(3, 1, '[[5,2,4,6,2,2,9,4,2],[6,2,2,2,9,5,3,4,4],[2,9,2,2,4,2,5,4,7],[2,2,2,2,2,1,4,2,4],[4,2,6,4,5,3,7,9,1],[null,null,null,null,2,4,4,5,4],[9,null,1,5,3,null,2,8,null],[2,null,7,4,1,null,6,null,5],[3,null,null,null,8,null,1,7,9]]', '2025-04-08 05:39:31'),
(4, 1, '\"[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]\"', '2025-04-08 05:57:41'),
(5, 1, '\"[[5,2,4,6,2,8,9,4,2],[6,2,2,1,9,5,3,4,4],[0,9,2,2,4,4,5,4,7],[0,0,9,7,6,1,4,2,4],[4,2,6,4,5,3,7,9,1],[0,0,0,0,2,4,4,5,4],[9,0,1,5,3,0,2,8,0],[2,0,7,4,1,0,6,0,5],[3,0,0,0,8,0,1,7,9]]\"', '2025-04-08 06:03:52'),
(6, 1, '[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]', '2025-04-08 06:21:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `ID_User` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`ID_User`, `Name`, `Email`, `Password`) VALUES
(1, 'Jose', 'jose@gmail.com', '$2y$10$Up6oxdFB3imwwVx0YytFrOKMEvc7ojRGLV98YcrqadSuDGKTkREAm');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sudoku_boards`
--
ALTER TABLE `sudoku_boards`
  ADD PRIMARY KEY (`IDSudoku`),
  ADD KEY `IDUser` (`IDUser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_User`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sudoku_boards`
--
ALTER TABLE `sudoku_boards`
  MODIFY `IDSudoku` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `ID_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sudoku_boards`
--
ALTER TABLE `sudoku_boards`
  ADD CONSTRAINT `sudoku_boards_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
