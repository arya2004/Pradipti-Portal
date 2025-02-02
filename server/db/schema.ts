import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const institutions = pgTable('institutions', {
  institution_id: uuid('institution_id').defaultRandom().primaryKey(),
  institution_name: varchar('institution_name', { length: 200 }).notNull(),
  institution_address: varchar('institution_address', { length: 300 }).notNull(),
  contact_person: varchar('contact_person', { length: 150 }).notNull(),
  contact_email: varchar('contact_email', { length: 150 }).notNull(),
  contact_phone: varchar('contact_phone', { length: 50 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const stations = pgTable('stations', {
  station_id: uuid('station_id').defaultRandom().primaryKey(),
  station_name: varchar('station_name', { length: 200 }).notNull(),
  station_code: varchar('station_code', { length: 50 }),
  station_address: varchar('station_address', { length: 300 }),
  contact_person: varchar('contact_person', { length: 150 }).notNull(),
  contact_email: varchar('contact_email', { length: 150 }).notNull(),
  contact_phone: varchar('contact_phone', { length: 50 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const users = pgTable('users', {
  user_id: uuid('user_id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 100 }).unique().notNull(),
  password_hash: varchar('password_hash', { length: 300 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const mous = pgTable('mous', {
  mou_id: uuid('mou_id').defaultRandom().primaryKey(),
  institution_id: uuid('institution_id').notNull().references(() => institutions.institution_id),
  mou_start_date: timestamp('mou_start_date').notNull(),
  mou_end_date: timestamp('mou_end_date').notNull(),
  mou_status: varchar('mou_status', { length: 50 }).default('Active').notNull(),
  approver_id: uuid('approver_id').notNull().references(() => users.user_id),
  approved_at: timestamp('approved_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const students = pgTable('students', {
  student_id: uuid('student_id').defaultRandom().primaryKey(),
  institution_id: uuid('institution_id').notNull().references(() => institutions.institution_id),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  enrollment_no: varchar('enrollment_no', { length: 100 }).notNull(),
  course_or_major: varchar('course_or_major', { length: 150 }),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const internship_topics = pgTable('internship_topics', {
  topic_id: uuid('topic_id').defaultRandom().primaryKey(),
  topic_name: varchar('topic_name', { length: 200 }).notNull(),
  topic_details: varchar('topic_details', { length: 500 }),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const internship_programs = pgTable('internship_programs', {
  internship_id: uuid('internship_id').defaultRandom().primaryKey(),
  station_id: uuid('station_id').notNull().references(() => stations.station_id),
  topic_id: uuid('topic_id').references(() => internship_topics.topic_id),
  internship_title: varchar('internship_title', { length: 200 }).notNull(),
  internship_details: varchar('internship_details', { length: 500 }),
  duration_weeks: integer('duration_weeks').notNull(),
  seats_available: integer('seats_available').notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});

export const applications = pgTable('applications', {
  application_id: uuid('application_id').defaultRandom().primaryKey(),
  student_id: uuid('student_id').notNull().references(() => students.student_id),
  internship_id: uuid('internship_id').notNull().references(() => internship_programs.internship_id),
  application_date: timestamp('application_date').notNull(),
  status: varchar('status', { length: 50 }).default('Pending').notNull(),
  approval_by_station: varchar('approval_by_station', { length: 50 }).default('Pending').notNull(),
  approval_by_institution: varchar('approval_by_institution', { length: 50 }).default('Pending').notNull(),
  remarks: varchar('remarks', { length: 500 }),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
});
