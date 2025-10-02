-- V1__baseline.sql
-- Baseline migration - Schema creation with proper CASCADE deletes

-- Country table (independent, no FKs)
CREATE TABLE `country` (
  `code` VARCHAR(2) NOT NULL,
  `region` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Game table (independent, no FKs)
CREATE TABLE `game` (
  `id` BINARY(16) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_game_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Network table (depends on Game)
CREATE TABLE `network` (
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(500) DEFAULT NULL,
  `discord` VARCHAR(255) DEFAULT NULL,
  `instagram` VARCHAR(255) DEFAULT NULL,
  `youtube` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `reviews_avg` BIGINT DEFAULT 0,
  `reviews_amount` BIGINT DEFAULT 0,
  `game_id` BINARY(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_network_game` (`game_id`),
  CONSTRAINT `fk_network_game` 
    FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User table (depends on Network)
CREATE TABLE `user` (
  `id` BINARY(16) NOT NULL,
  `steam_id` VARCHAR(255) DEFAULT NULL,
  `username` VARCHAR(255) DEFAULT NULL,
  `avatar_url` VARCHAR(500) DEFAULT NULL,
  `accepted_eula` TINYINT(1) NOT NULL DEFAULT 0,
  `accepted_eula_at` TIMESTAMP(6) NULL DEFAULT NULL,
  `last_login_at` TIMESTAMP(6) NULL DEFAULT NULL,
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `network_id` BINARY(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_steam_id` (`steam_id`),
  UNIQUE KEY `uk_user_network` (`network_id`),
  KEY `idx_user_steam_id` (`steam_id`),
  CONSTRAINT `fk_user_network` 
    FOREIGN KEY (`network_id`) REFERENCES `network` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User roles (element collection)
CREATE TABLE `user_roles` (
  `user_id` BINARY(16) NOT NULL,
  `roles` VARCHAR(20) NOT NULL,
  KEY `idx_user_roles_user` (`user_id`),
  CONSTRAINT `fk_user_roles_user` 
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Server table (depends on Country and Network)
CREATE TABLE `server` (
  `id` BINARY(16) NOT NULL,
  `battle_metrics_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `ip` VARCHAR(50) NOT NULL,
  `port` INT NOT NULL,
  `max_players` INT NOT NULL,
  `online_players` INT NOT NULL,
  `country_id` VARCHAR(2) DEFAULT NULL,
  `network_id` BINARY(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_server_battle_metrics` (`battle_metrics_id`),
  KEY `idx_server_country` (`country_id`),
  KEY `idx_server_network` (`network_id`),
  CONSTRAINT `fk_server_country` 
    FOREIGN KEY (`country_id`) REFERENCES `country` (`code`),
  CONSTRAINT `fk_server_network` 
    FOREIGN KEY (`network_id`) REFERENCES `network` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Server tags (element collection)
CREATE TABLE `server_tags` (
  `server_id` BINARY(16) NOT NULL,
  `tags` VARCHAR(50) DEFAULT NULL,
  KEY `idx_server_tags_server` (`server_id`),
  CONSTRAINT `fk_server_tags_server` 
    FOREIGN KEY (`server_id`) REFERENCES `server` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NetworkTag table (depends on Game)
CREATE TABLE `network_tag` (
  `id` BINARY(16) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `is_positive` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `game_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_network_tag_slug` (`slug`),
  KEY `idx_network_tag_game` (`game_id`),
  CONSTRAINT `fk_network_tag_game` 
    FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Review table (depends on Network and User)
CREATE TABLE `review` (
  `id` BINARY(16) NOT NULL,
  `text` VARCHAR(3000) DEFAULT NULL,
  `rating` INT NOT NULL,
  `anonymous` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `network_id` BINARY(16) DEFAULT NULL,
  `author_id` BINARY(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_review_network` (`network_id`),
  KEY `idx_review_author` (`author_id`),
  KEY `idx_review_created_at` (`created_at`),
  CONSTRAINT `fk_review_network` 
    FOREIGN KEY (`network_id`) REFERENCES `network` (`id`),
  CONSTRAINT `fk_review_author` 
    FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Review_Tag junction table (ManyToMany with CASCADE)
CREATE TABLE `review_tag` (
  `review_id` BINARY(16) NOT NULL,
  `networktag_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`review_id`, `networktag_id`),
  KEY `idx_review_tag_tag` (`networktag_id`),
  CONSTRAINT `fk_review_tag_review` 
    FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_review_tag_networktag` 
    FOREIGN KEY (`networktag_id`) REFERENCES `network_tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User_Liked_Reviews junction table (ManyToMany with CASCADE)
CREATE TABLE `user_liked_reviews` (
  `user_id` BINARY(16) NOT NULL,
  `review_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`user_id`, `review_id`),
  KEY `idx_user_liked_review` (`review_id`),
  CONSTRAINT `fk_user_liked_reviews_user` 
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_liked_reviews_review` 
    FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Translation table (independent)
CREATE TABLE `translation` (
  `id` BINARY(16) NOT NULL,
  `lang` VARCHAR(10) NOT NULL,
  `t_key` VARCHAR(255) NOT NULL,
  `t_value` VARCHAR(500) DEFAULT NULL,
  `namespace` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_translation_key_lang` (`t_key`, `lang`),
  KEY `idx_translation_namespace` (`namespace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes adicionais para performance
CREATE INDEX `idx_review_network_created` ON `review` (`network_id`, `created_at` DESC);
CREATE INDEX `idx_review_rating` ON `review` (`rating`);
CREATE INDEX `idx_server_name` ON `server` (`name`);