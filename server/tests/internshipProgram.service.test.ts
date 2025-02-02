
import { db } from "../db/drizzle";
import * as internshipProgramService from "../services/internshipProgram.service";

describe("Internship Program Service", () => {
  let programId: number;
  let stationId = 1; 
  let topicId = 1; 

  afterAll(async () => {
    await db.execute(`DELETE FROM internship_programs`);
  });

  // ✅ Test Create Internship Program
  it("should create a new internship program", async () => {
    const newProgram = {
      station_id: stationId,
      topic_id: topicId,
      internship_title: "AI in Aviation",
      internship_details: "Exploring AI applications in airports",
      duration_weeks: 8,
      seats_available: 10,
      start_date: new Date("2024-06-01"),
      end_date: new Date("2024-08-01"),
    };

    programId = await internshipProgramService.createInternshipProgram(newProgram);
    expect(programId).toBeDefined();
  });

  // ✅ Test Get All Internship Programs
  it("should retrieve all internship programs", async () => {
    const programs = await internshipProgramService.getAllInternshipPrograms();
    expect(programs.length).toBeGreaterThan(0);
  });

  // ✅ Test Get Internship Program By ID
  it("should retrieve an internship program by ID", async () => {
    const program = await internshipProgramService.getInternshipProgramById(programId);
    expect(program).not.toBeNull();
    expect(program?.internship_title).toBe("AI in Aviation");
  });

  // ✅ Test Update Internship Program
  it("should update an existing internship program", async () => {
    const updateData = {
      internship_title: "Machine Learning in Aviation",
      duration_weeks: 12,
    };

    const affectedRows = await internshipProgramService.updateInternshipProgram(programId, updateData);
    expect(affectedRows).toBe(1);

    const updatedProgram = await internshipProgramService.getInternshipProgramById(programId);
    expect(updatedProgram?.internship_title).toBe("Machine Learning in Aviation");
    expect(updatedProgram?.duration_weeks).toBe(12);
  });

  // ✅ Test Delete Internship Program
  it("should delete an internship program", async () => {
    const affectedRows = await internshipProgramService.deleteInternshipProgram(programId);
    expect(affectedRows).toBe(1);

    const deletedProgram = await internshipProgramService.getInternshipProgramById(programId);
    expect(deletedProgram).toBeNull();
  });
});
