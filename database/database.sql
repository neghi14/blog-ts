-- Database Schema for blogr
CREATE DATABASE IF NOT EXISTS blog;
USE blog;
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    PRIMARY KEY (`id`)
);
CREATE TABLE `user_verifications` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `token` VARCHAR(50) NOT NULL,
    `token_created_at` DATETIME NOT NULL,
    `token_verified_at` DATETIME,
    `token_updated_at` DATETIME,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    KEY `user_id_idx` (`user_id`),
    PRIMARY KEY (`id`)
);
CREATE TABLE `password_resets` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `token` VARCHAR(50) NOT NULL,
    `token_created_at` DATETIME NOT NULL,
    `token_verified_at` DATETIME,
    `token_updated_at` DATETIME,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    KEY `user_id_idx` (`user_id`),
    PRIMARY KEY (`id`)
);
CREATE TABLE `posts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME
);
CREATE TABLE `publications` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `author_id` INT UNSIGNED NOT NULL,
    `post_id` INT UNSIGNED NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    KEY `author_id_idx` (`author_id`),
    KEY `post_id_idx` (`post_id`)
);
CREATE TABLE `comments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME
);
CREATE TABLE `replies` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment_id` INT UNSIGNED NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    KEY `comment_id_idx` (`comment_id`)
);
CREATE TABLE `likes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE `post_interactions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `post_id` INT UNSIGNED NOT NULL,
    `interaction_type` VARCHAR(50) NOT NULL,
    `comment_id` INT UNSIGNED,
    `reply_id` INT UNSIGNED,
    `like_id` INT UNSIGNED,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    KEY `user_id_idx` (`user_id`),
    KEY `post_id_idx` (`post_id`),
    KEY `comment_id_idx` (`comment_id`),
    KEY `reply_id_idx` (`reply_id`),
    KEY `like_id_idx` (`like_id`)
);
CREATE TABLE `permissions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `attributes` JSON NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME
);
CREATE TABLE `user_permissions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `permission_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    KEY `user_id_idx` (`user_id`),
    KEY `permission_id_idx` (`permission_id`)
);
-- Doesnt work on planetscale
-- ALTER TABLE `user_verifications`
-- ADD CONSTRAINT `fk_user_verifications_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- ALTER TABLE `password_resets`
-- ADD CONSTRAINT `fk_password_resets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- ALTER TABLE `user_permissions`
-- ADD CONSTRAINT `fk_user_permissions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- ALTER TABLE `user_permissions`
-- ADD CONSTRAINT `fk_user_permissions_permissions_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);
-- ALTER TABLE `publications`
-- ADD CONSTRAINT `fk_publications_author_id` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);
-- ALTER TABLE `publications`
-- ADD CONSTRAINT `fk_publications_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
-- ALTER TABLE `post_interactions`
-- ADD CONSTRAINT `fk_post_interactions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- ALTER TABLE `post_interactions`
-- ADD CONSTRAINT `fk_post_interactions_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
-- ALTER TABLE `post_interactions`
-- ADD CONSTRAINT `fk_post_interactions_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`);
-- ALTER TABLE `post_interactions`
-- ADD CONSTRAINT `fk_post_interactions_like_id` FOREIGN KEY (`like_id`) REFERENCES `likes` (`id`);
-- ALTER TABLE `post_interactions`
-- ADD CONSTRAINT `fk_post_interactions_replies_id` FOREIGN KEY (`reply_id`) REFERENCES `replies` (`id`);
-- ALTER TABLE `replies`
-- ADD CONSTRAINT `fk_replies_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`);
CREATE FULLTEXT INDEX `idx_title_content` ON `posts` (`title`, `content`);