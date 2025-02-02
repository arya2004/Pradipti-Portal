CREATE TABLE `applications` (
	`application_id` bigint AUTO_INCREMENT NOT NULL,
	`student_id` bigint NOT NULL,
	`internship_id` bigint NOT NULL,
	`application_date` datetime NOT NULL,
	`status` varchar(50) DEFAULT 'Pending',
	`approval_by_station` varchar(50) DEFAULT 'Pending',
	`approval_by_institution` varchar(50) DEFAULT 'Pending',
	`remarks` varchar(500),
	`created_at` datetime NOT NULL DEFAULT '2025-02-02 10:46:10.764',
	`updated_at` datetime NOT NULL DEFAULT '2025-02-02 10:46:10.764',
	CONSTRAINT `applications_application_id` PRIMARY KEY(`application_id`)
);
--> statement-breakpoint
CREATE TABLE `institutions` (
	`institution_id` bigint AUTO_INCREMENT NOT NULL,
	`institution_name` varchar(200) NOT NULL,
	`institution_address` varchar(300) NOT NULL,
	`contact_person` varchar(150) NOT NULL,
	`contact_email` varchar(150) NOT NULL,
	`contact_phone` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `institutions_institution_id` PRIMARY KEY(`institution_id`)
);
--> statement-breakpoint
CREATE TABLE `internship_programs` (
	`internship_id` bigint AUTO_INCREMENT NOT NULL,
	`station_id` bigint NOT NULL,
	`topic_id` bigint,
	`internship_title` varchar(200) NOT NULL,
	`internship_details` varchar(500),
	`duration_weeks` int NOT NULL,
	`seats_available` int NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `internship_programs_internship_id` PRIMARY KEY(`internship_id`)
);
--> statement-breakpoint
CREATE TABLE `internship_topics` (
	`topic_id` bigint AUTO_INCREMENT NOT NULL,
	`topic_name` varchar(200) NOT NULL,
	`topic_details` varchar(500),
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `internship_topics_topic_id` PRIMARY KEY(`topic_id`)
);
--> statement-breakpoint
CREATE TABLE `mous` (
	`mou_id` bigint AUTO_INCREMENT NOT NULL,
	`institution_id` bigint NOT NULL,
	`mou_start_date` date NOT NULL,
	`mou_end_date` date NOT NULL,
	`mou_status` varchar(50) DEFAULT 'Active',
	`approver_id` bigint NOT NULL,
	`approved_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `mous_mou_id` PRIMARY KEY(`mou_id`)
);
--> statement-breakpoint
CREATE TABLE `stations` (
	`station_id` bigint AUTO_INCREMENT NOT NULL,
	`station_name` varchar(200) NOT NULL,
	`station_code` varchar(50),
	`station_address` varchar(300),
	`contact_person` varchar(150) NOT NULL,
	`contact_email` varchar(150) NOT NULL,
	`contact_phone` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `stations_station_id` PRIMARY KEY(`station_id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`student_id` bigint AUTO_INCREMENT NOT NULL,
	`institution_id` bigint NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`enrollment_no` varchar(100) NOT NULL,
	`course_or_major` varchar(150),
	`created_at` datetime NOT NULL DEFAULT '2025-02-02 10:46:10.764',
	`updated_at` datetime NOT NULL DEFAULT '2025-02-02 10:46:10.764',
	CONSTRAINT `students_student_id` PRIMARY KEY(`student_id`),
	CONSTRAINT `students_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`password_hash` varchar(300) NOT NULL,
	`salt` varchar(255) NOT NULL,
	`sessiontoken` varchar(255),
	`email` varchar(150) NOT NULL,
	`role` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2025-02-02 10:46:10.763',
	`updated_at` datetime NOT NULL DEFAULT '2025-02-02 10:46:10.763',
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_student_id_students_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `internship_programs` ADD CONSTRAINT `internship_programs_station_id_stations_station_id_fk` FOREIGN KEY (`station_id`) REFERENCES `stations`(`station_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `internship_programs` ADD CONSTRAINT `internship_programs_topic_id_internship_topics_topic_id_fk` FOREIGN KEY (`topic_id`) REFERENCES `internship_topics`(`topic_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mous` ADD CONSTRAINT `mous_institution_id_institutions_institution_id_fk` FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`institution_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mous` ADD CONSTRAINT `mous_approver_id_users_user_id_fk` FOREIGN KEY (`approver_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_institution_id_institutions_institution_id_fk` FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`institution_id`) ON DELETE no action ON UPDATE no action;