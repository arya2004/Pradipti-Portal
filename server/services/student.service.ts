import { eq } from "drizzle-orm";
import { students } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create Student
export const createStudent = async (student: {
  institution_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  enrollment_no: string;
  course_or_major: string;
}): Promise<number> => {
  const [result] = await db
    .insert(students)
    .values({
      institution_id: student.institution_id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone: student.phone,
      enrollment_no: student.enrollment_no
    })
    .execute();

  return result.insertId;
};

// ✅ Get All Students
export const getAllStudents = async () => {
  return await db.select().from(students).execute();
};

// ✅ Get Student by ID
export const getStudentById = async (studentId: number) => {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.student_id, studentId))
    .execute();

  return student || null;
};

// ✅ Update Student
export const updateStudent = async (
  studentId: number,
  updateData: Partial<{
    institution_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    enrollment_no: string;
    course_or_major?: string;
  }>
) => {
  const [result] = await db
    .update(students)
    .set({
      ...updateData,
    })
    .where(eq(students.student_id, studentId))
    .execute();

  return result.affectedRows;
};

// ✅ Delete Student
export const deleteStudent = async (studentId: number) => {
  const [result] = await db
    .delete(students)
    .where(eq(students.student_id, studentId))
    .execute();

  return result.affectedRows;
};
