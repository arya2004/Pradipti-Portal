CREATE TABLE "applications" (
	"application_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"internship_id" uuid NOT NULL,
	"application_date" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'Pending' NOT NULL,
	"approval_by_station" varchar(50) DEFAULT 'Pending' NOT NULL,
	"approval_by_institution" varchar(50) DEFAULT 'Pending' NOT NULL,
	"remarks" varchar(500),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"institution_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_name" varchar(200) NOT NULL,
	"institution_address" varchar(300) NOT NULL,
	"contact_person" varchar(150) NOT NULL,
	"contact_email" varchar(150) NOT NULL,
	"contact_phone" varchar(50) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internship_programs" (
	"internship_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"station_id" uuid NOT NULL,
	"topic_id" uuid,
	"internship_title" varchar(200) NOT NULL,
	"internship_details" varchar(500),
	"duration_weeks" integer NOT NULL,
	"seats_available" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internship_topics" (
	"topic_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_name" varchar(200) NOT NULL,
	"topic_details" varchar(500),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mous" (
	"mou_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" uuid NOT NULL,
	"mou_start_date" timestamp NOT NULL,
	"mou_end_date" timestamp NOT NULL,
	"mou_status" varchar(50) DEFAULT 'Active' NOT NULL,
	"approver_id" uuid NOT NULL,
	"approved_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"station_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"station_name" varchar(200) NOT NULL,
	"station_code" varchar(50),
	"station_address" varchar(300),
	"contact_person" varchar(150) NOT NULL,
	"contact_email" varchar(150) NOT NULL,
	"contact_phone" varchar(50) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"student_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"enrollment_no" varchar(100) NOT NULL,
	"course_or_major" varchar(150),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id" TO "user_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_hash" varchar(300) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_internship_id_internship_programs_internship_id_fk" FOREIGN KEY ("internship_id") REFERENCES "public"."internship_programs"("internship_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_programs" ADD CONSTRAINT "internship_programs_station_id_stations_station_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("station_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_programs" ADD CONSTRAINT "internship_programs_topic_id_internship_topics_topic_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."internship_topics"("topic_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mous" ADD CONSTRAINT "mous_institution_id_institutions_institution_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("institution_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mous" ADD CONSTRAINT "mous_approver_id_users_user_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_institution_id_institutions_institution_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("institution_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");