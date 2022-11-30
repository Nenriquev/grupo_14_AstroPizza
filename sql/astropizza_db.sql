-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2022 a las 16:01:03
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `astropizza_db`
--
CREATE DATABASE IF NOT EXISTS `astropizza_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `astropizza_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'pizzas'),
(2, 'quesos'),
(3, 'vegetales'),
(4, 'carnes'),
(5, 'bebidas'),
(6, 'cervezas'),
(7, 'postres'),
(8, 'aderezos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `category_id`, `status_id`) VALUES
(1, 'mercurio', 1150, 'La pizza mas cercana al sol. con 200 grs de cremosa muzzarella', 'mercurio.webp', 1, 1),
(2, 'venus', 1350, 'La pizza exotica romana, con 200grs de muzzarella, panceta crocante, Anana y un toque de ciantro', 'venus.webp', 1, 1),
(3, 'marte', 1200, 'La Pizza de arenas rojas con 200 grs de muzzarella y muuuucho pepperoni!', 'marte.webp', 1, 1),
(4, 'jupiter', 1200, 'Pizza vegetariana interestelar con 200 grs de muzzarella, cebolla morada, morron verde, champinones y olivas negras', 'jupiter.webp', 1, 1),
(5, 'saturno', 1300, 'Una pizza con anillos y con 200 grs de muzzarella, panceta, jamon, champinones y choclo', 'saturno.webp', 1, 1),
(6, 'urano', 1350, 'La septima pizza del sistema solar, con 200 grs de muzzarella, queso parmesano, queso provolone y queso azul', 'urano.webp', 1, 1),
(7, 'neptuno', 1350, 'Pizza de sentimientos fríos, con 200 grs de muzzarella, salchicha italiana y meatballs', 'neptuno.webp', 1, 1),
(8, 'arma tu pizza', 1150, 'Arma tu propia pizza, sos dueno del universo pizza, creala como quieras', 'arma-tu-pizza.webp', 1, 1),
(9, 'muzzarella', 150, 'Extra de queso muzarella', 'muzzarella.png', 2, 1),
(10, 'provolone', 150, 'Extra de queso provolone', 'provolone.png', 2, 1),
(11, 'parmesano', 150, 'Extra de queso parmesano', 'parmesano.png', 2, 1),
(12, 'roquefort', 150, 'Extra de queso roquefort', 'roquefor.png', 2, 1),
(13, 'jamon', 250, 'Extra de Jamon', 'jamon.png', 4, 1),
(14, 'panceta', 250, 'Extra de panceta', 'panceta.png', 4, 1),
(15, 'pepperoni', 250, 'Extra de pepperoni', 'pepperoni.png', 4, 1),
(16, 'pastrami', 250, 'Extra de pastrami', 'pastrami.png', 4, 1),
(17, 'salchicha alemana', 250, 'Extra de salchicha alemana', 'salchicha.png', 4, 1),
(18, 'salchicha italiana', 250, 'Extra de salchicha italiana', 'salchicha-italiana.png', 4, 1),
(19, 'meatballs', 250, 'Extra de meatballs', 'meatballs.png', 4, 1),
(20, 'morron rojo', 150, 'Extra de morron rojo', 'morron-rojo.png', 3, 1),
(21, 'morron verde', 150, 'Extra morron verde', 'morron-verde.png', 3, 1),
(22, 'morron amarillo', 150, 'Extra morron amarillo', 'morron-amarillo.png', 3, 1),
(23, 'cebolla blanca', 150, 'Extra cebolla blanca', 'cebolla-blanca.png', 3, 1),
(24, 'cebolla morada', 150, 'Extra cebolla morada', 'cebolla-morada.png', 3, 1),
(25, 'champinones', 150, 'Extra chanpinones', 'champinones.jpg', 3, 1),
(26, 'tomate', 150, 'Extra tomate en rodajas', 'tomate.png', 3, 1),
(27, 'olivas verdes', 150, 'Extra olivas verdes', 'olivas-verdes.webp', 3, 1),
(28, 'olivas negras', 150, 'Extra olivas negras', 'olivas-negras.png', 3, 1),
(29, 'anana', 150, 'Extra anana', 'anana.png', 3, 1),
(30, 'pera', 150, 'Extra de pera', 'pera.png', 3, 1),
(31, 'frutilla', 150, 'Extra frutilla', 'frutilla.png', 3, 1),
(32, 'bocconcini', 200, 'Extra de queso bocconcini', 'bocconcini.png', 2, 1),
(33, 'coca-cola', 300, 'Coca cola regular 350ml', 'coca-cola.webp', 5, 1),
(34, 'coca-cola zero', 300, 'Coca cola sin azucar 350ml', 'coca-cola-zero.webp', 5, 1),
(35, 'sprite', 300, 'Sprite 350ml', 'sprite.webp', 5, 1),
(36, 'fanta', 300, 'Fanta 350ml', 'fanta.webp', 5, 1),
(37, 'bon aqua', 250, 'Agua mineral sin gas 500ml', 'bon-aqua.webp', 5, 1),
(38, 'bon aqua con gas', 300, 'Agua mineral con gas 500ml', 'bon-aqua-con-gas.png', 5, 1),
(39, 'patagonia bohemian', 450, 'Cerveza patagonia rubia bohemian 473cc', 'patagonia-bohemian.png', 6, 1),
(40, 'patagonia amber', 450, 'Cerveza patagonia amber roja 473cc', 'patagonia-amber.png', 6, 1),
(41, 'patagonia 24/7', 450, 'Cerveza patagonia IPA 473cc', 'patagonia-ipa.png', 6, 1),
(42, 'corona extra', 450, 'Cerveza corona extra 330cc', 'corona-extra.png', 6, 1),
(43, 'franui chocoleche', 700, 'Frambuesas congeladas cubiertas en chocolate con leche.', 'franui-chocoleche.png', 7, 1),
(44, 'franui amargo', 700, 'Frambuesas congeladas cubiertas en chocolate amargo', 'franui-amargo.png', 7, 1),
(49, 'albahaca', 150, 'Extra de albahaca', 'albahaca.png', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `status_name`) VALUES
(1, 'activo'),
(2, 'inactivo'),
(3, 'sin stock');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `names` text NOT NULL,
  `email` text NOT NULL,
  `telephone` bigint(20) DEFAULT NULL,
  `password` text NOT NULL,
  `profile_img` text DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `names`, `email`, `telephone`, `password`, `profile_img`, `role_id`, `createdAt`) VALUES
(1, 'Nerio Enrique', 'nerio@astropizza.com', 611435385, '$2b$10$4.QGSyCHR8gbMsgq.pURCumao6XHclrJflusYu63vhfHzSWzCgFBy', 'default_profile.png', 2, '2022-11-30'),
(2, 'Matias Rene', 'matiasrene@astropizza.com', 0, '$2b$10$UudqLBjLd75PDC5UU0rPx.2iMfrl6oovFny3.3i.mEFwuJIWW2ZuW', 'default_profile.png', 2, '2022-11-30'),
(3, 'Ramiro', 'ramiro@astropizza.com', 0, '$2b$10$X3zp/QVnvaf/nq6gRITJYusKdYPtsQ/ofxWkkhs8n9Q402SoCg5tG', 'default_profile.png', 2, '2022-11-30'),
(4, 'Miguel', 'miguel@astropizza.com', 0, '$2b$10$NuxngeLejoMHfglYEjgY2OHSjqp5LvxmiV9Y4l7My3Ygzk6m2xnwO', 'default_profile.png', 2, '2022-11-30'),
(5, 'common user', 'user@astropizza.com', 0, '$2b$10$.twmDidG2HTGg1NA3lMCxeTFpINVjb2DZsldtbAfT/G9PQMFCFS1K', 'default_profile.png', 1, '2022-11-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_role`
--

INSERT INTO `user_role` (`id`, `role`) VALUES
(2, 'admin'),
(1, 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indices de la tabla `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_name` (`status_name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
