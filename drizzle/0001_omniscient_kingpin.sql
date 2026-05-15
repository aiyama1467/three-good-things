CREATE TABLE `entry` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`item_1` text DEFAULT '' NOT NULL,
	`item_2` text DEFAULT '' NOT NULL,
	`item_3` text DEFAULT '' NOT NULL,
	`mood` text DEFAULT 'neutral' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entry_user_date_idx` ON `entry` (`user_id`,`date`);