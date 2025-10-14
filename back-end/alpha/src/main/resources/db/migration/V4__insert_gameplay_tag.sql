-- V4__insert_gameplay_tag.sql
-- Creation of table used for scrapping and search servers

CREATE TABLE `gameplay_tag` (
    `id` BINARY(16) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `game_id` BINARY(16) NOT NULL,
    `position` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_gameplay_tag_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `gameplay_tag_alias` (
    `id` BINARY(16) NOT NULL,
    `alias` VARCHAR(255) NOT NULL,
    `gameplay_tag_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_gameplay_tag_id` (`gameplay_tag_id`),
    CONSTRAINT `fk_gameplay_tag` 
        FOREIGN KEY (`gameplay_tag_id`) REFERENCES `gameplay_tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;