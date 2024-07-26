-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : ven. 26 juil. 2024 à 09:17
-- Version du serveur : 8.0.39
-- Version de PHP : 8.2.21

SET
SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET
time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tp_todo_list`
--

-- --------------------------------------------------------

--
-- Structure de la table `todo`
--

CREATE TABLE `todo`
(
    `id`          bigint NOT NULL,
    `completed`   bit(1) NOT NULL,
    `created_at`  datetime(6) DEFAULT NULL,
    `description` text,
    `title`       varchar(255) DEFAULT NULL,
    `updated_at`  datetime(6) DEFAULT NULL,
    `user_id`     bigint       DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `todo`
--

INSERT INTO `todo` (`id`, `completed`, `created_at`, `description`, `title`, `updated_at`, `user_id`)
VALUES (1, b'1', '2024-07-26 09:14:44.741509', 'First description', 'First todo', '2024-07-26 09:14:44.741526', 1),
       (2, b'0', '2024-07-26 09:14:56.173942', 'second description', 'Second todo', '2024-07-26 09:14:56.173983', 1),
       (3, b'0', '2024-07-26 09:15:11.007766', 'third description', 'third todo', '2024-07-26 09:15:11.007779', 1),
       (4, b'1', '2024-07-26 09:16:18.262960', 'beautiful description', 'Docker its a life !',
        '2024-07-26 09:16:18.262980', 1);

-- --------------------------------------------------------

--
-- Structure de la table `todo_seq`
--

CREATE TABLE `todo_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `todo_seq`
--

INSERT INTO `todo_seq` (`next_val`)
VALUES (101);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users`
(
    `id`       bigint       NOT NULL,
    `email`    varchar(255) NOT NULL,
    `name`     varchar(255) DEFAULT NULL,
    `password` varchar(255) NOT NULL,
    `role`     enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`)
VALUES (1, 'admin@admin.fr', 'Admin', '$2a$10$Jrq58OyUQfIwgAxMOpnyyu0jJLr7KPJU/Ak7zGaegtDwVBCfK/6G2', 'ROLE_ADMIN'),
       (2, 'user@user.fr', 'User', '$2a$10$1gNXIax33OMN7ven3qWTIOSD0exw7fq3iZ.kICJAwPQ9O4SZ0nlAi', 'ROLE_USER');

-- --------------------------------------------------------

--
-- Structure de la table `users_seq`
--

CREATE TABLE `users_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users_seq`
--

INSERT INTO `users_seq` (`next_val`)
VALUES (101);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `todo`
--
ALTER TABLE `todo`
    ADD PRIMARY KEY (`id`),
  ADD KEY `FKdcopxq1yu1u8ijb7rjexhsr6v` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `todo`
--
ALTER TABLE `todo`
    ADD CONSTRAINT `FKdcopxq1yu1u8ijb7rjexhsr6v` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
