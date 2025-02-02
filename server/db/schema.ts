import { mysqlTable, serial, varchar,bigint, datetime, int, date, unique, text } from "drizzle-orm/mysql-core";

// Institutions Table
export const institutions = mysqlTable("institutions", {
  institution_id: bigint("institution_id", { mode: "number" }).primaryKey().autoincrement(),
  institution_name: varchar("institution_name", { length: 200 }).notNull(),
  institution_address: varchar("institution_address", { length: 300 }).notNull(),
  contact_person: varchar("contact_person", { length: 150 }).notNull(),
  contact_email: varchar("contact_email", { length: 150 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 50 }).notNull(),
  created_at: datetime("created_at").notNull(),
  updated_at: datetime("updated_at").notNull(),
});

// Stations Table
export const stations = mysqlTable("stations", {
  station_id: bigint("station_id", { mode: "number" }).primaryKey().autoincrement(),
  station_name: varchar("station_name", { length: 200 }).notNull(),
  station_code: varchar("station_code", { length: 50 }),
  station_address: varchar("station_address", { length: 300 }),
  contact_person: varchar("contact_person", { length: 150 }).notNull(),
  contact_email: varchar("contact_email", { length: 150 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 50 }).notNull(),
  created_at: datetime("created_at").notNull(),
  updated_at: datetime("updated_at").notNull(),
});



// Users Table
export const users = mysqlTable("users", {
  id: bigint("user_id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("username", { length: 100 }).unique().notNull(),  
  password_hash: varchar("password_hash", { length: 300 }).notNull(), 
  salt: varchar("salt", { length: 255 }).notNull(),  
  sessiontoken: varchar("sessiontoken", { length: 255 }),  
  email: varchar("email", { length: 150 }).unique().notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  created_at: datetime("created_at").notNull().default(new Date()),  // Default timestamp
  updated_at: datetime("updated_at").notNull().default(new Date()).$onUpdateFn(() => new Date()), // Auto-update
});

// MOUs Table
export const mous = mysqlTable("mous", {
  mou_id: bigint("mou_id", { mode: "number" }).primaryKey().autoincrement(),
  institution_id: bigint("institution_id", { mode: "number" }).notNull().references(() => institutions.institution_id),
  mou_start_date: date("mou_start_date").notNull(),
  mou_end_date: date("mou_end_date").notNull(),
  mou_status: varchar("mou_status", { length: 50 }).default("Active"),
  approver_id: bigint("approver_id", { mode: "number" }).notNull().references(() => users.id),
  approved_at: datetime("approved_at").notNull(),
  updated_at: datetime("updated_at").notNull(),
});

// Students Table
export const students = mysqlTable("students", {
  student_id: bigint("student_id", { mode: "number" }).primaryKey().autoincrement(),  // Fixed to BIGINT
  institution_id: bigint("institution_id", { mode: "number" }).notNull().references(() => institutions.institution_id),  // Match institution_id type
  first_name: varchar("first_name", { length: 100 }).notNull(),
  last_name: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).unique().notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  enrollment_no: varchar("enrollment_no", { length: 100 }).notNull(),
  course_or_major: varchar("course_or_major", { length: 150 }),
  created_at: datetime("created_at").notNull().default(new Date()),  // Default timestamp
  updated_at: datetime("updated_at").notNull().default(new Date()).$onUpdateFn(() => new Date()), // Auto-update
});

// Internship Topics Table
export const internshipTopics = mysqlTable("internship_topics", {
  topic_id: bigint("topic_id", { mode: "number" }).primaryKey().autoincrement(),
  topic_name: varchar("topic_name", { length: 200 }).notNull(),
  topic_details: varchar("topic_details", { length: 500 }),
  created_at: datetime("created_at").notNull(),
  updated_at: datetime("updated_at").notNull(),
});

// Internship Programs Table
export const internshipPrograms = mysqlTable("internship_programs", {
  internship_id: bigint("internship_id", { mode: "number" }).primaryKey().autoincrement(),
  station_id: bigint("station_id", { mode: "number" }).notNull().references(() => stations.station_id),
  topic_id: bigint("topic_id", { mode: "number" }).references(() => internshipTopics.topic_id),
  internship_title: varchar("internship_title", { length: 200 }).notNull(),
  internship_details: varchar("internship_details", { length: 500 }),
  duration_weeks: int("duration_weeks").notNull(),
  seats_available: int("seats_available").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  created_at: datetime("created_at").notNull(),
  updated_at: datetime("updated_at").notNull(),
});

// Applications Table
export const applications = mysqlTable("applications", {
  application_id: bigint("application_id", { mode: "number" }).primaryKey().autoincrement(),
  student_id: bigint("student_id", { mode: "number" }).notNull().references(() => students.student_id),  // Fixed type
  internship_id: bigint("internship_id", { mode: "number" }).notNull(),
  application_date: datetime("application_date").notNull(),
  status: varchar("status", { length: 50 }).default("Pending"),
  approval_by_station: varchar("approval_by_station", { length: 50 }).default("Pending"),
  approval_by_institution: varchar("approval_by_institution", { length: 50 }).default("Pending"),
  remarks: varchar("remarks", { length: 500 }),
  created_at: datetime("created_at").notNull().default(new Date()),  // Default timestamp
  updated_at: datetime("updated_at").notNull().default(new Date()).$onUpdateFn(() => new Date()), // Auto-update
});