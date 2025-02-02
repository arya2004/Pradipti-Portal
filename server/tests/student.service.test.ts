import { db } from "../db/drizzle";
import * as studentService from "../services/student.service";

describe("Student Service", () => {
  let studentId: number;
  let institutionId = 1; // Mock institution_id for testing

  afterAll(async () => {
    await db.execute(`DELETE FROM students`);
  });

  // ✅ Test Create Student
  it("should create a new student", async () => {
    const newStudent = {
      institution_id: institutionId,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      enrollment_no: "ENR-001",
      course_or_major: "Computer Science",
    };

    studentId = await studentService.createStudent(newStudent);
    expect(studentId).toBeDefined();
  });

  // ✅ Test Get All Students
  it("should retrieve all students", async () => {
    const students = await studentService.getAllStudents();
    expect(students.length).toBeGreaterThan(0);
  });

  // ✅ Test Get Student By ID
  it("should retrieve a student by ID", async () => {
    const student = await studentService.getStudentById(studentId);
    expect(student).not.toBeNull();
    expect(student?.first_name).toBe("John");
  });

  // ✅ Test Update Student
  it("should update an existing student", async () => {
    const updateData = {
      first_name: "Jane",
      last_name: "Smith",
      course_or_major: "Software Engineering",
    };

    const affectedRows = await studentService.updateStudent(studentId, updateData);
    expect(affectedRows).toBe(1);

    const updatedStudent = await studentService.getStudentById(studentId);
    expect(updatedStudent?.first_name).toBe("Jane");
    expect(updatedStudent?.last_name).toBe("Smith");
    expect(updatedStudent?.course_or_major).toBe("Software Engineering");
  });

  // ✅ Test Delete Student
  it("should delete a student", async () => {
    const affectedRows = await studentService.deleteStudent(studentId);
    expect(affectedRows).toBe(1);

    const deletedStudent = await studentService.getStudentById(studentId);
    expect(deletedStudent).toBeNull();
  });
});
