import { eq } from "drizzle-orm";
import { internshipPrograms } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create Internship Program
export const createInternshipProgram = async (program: {
  station_id: number;
  topic_id?: number;
  internship_title: string;
  internship_details?: string;
  duration_weeks: number;
  seats_available: number;
  start_date: Date;
  end_date: Date;
}): Promise<number> => {
  const [result] = await db
    .insert(internshipPrograms)
    .values({
      ...program,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .execute();

  return result.insertId;
};

// ✅ Get All Internship Programs
export const getAllInternshipPrograms = async () => {
  return await db.select().from(internshipPrograms).execute();
};

// ✅ Get Internship Program by ID
export const getInternshipProgramById = async (programId: number) => {
  const [program] = await db
    .select()
    .from(internshipPrograms)
    .where(eq(internshipPrograms.internship_id, programId))
    .execute();

  return program || null;
};

// ✅ Update Internship Program
export const updateInternshipProgram = async (
  programId: number,
  updateData: Partial<{
    station_id: number;
    topic_id?: number;
    internship_title: string;
    internship_details?: string;
    duration_weeks: number;
    seats_available: number;
    start_date: Date;
    end_date: Date;
  }>
) => {
  const [result] = await db
    .update(internshipPrograms)
    .set({
      ...updateData,
      updated_at: new Date(),
    })
    .where(eq(internshipPrograms.internship_id, programId))
    .execute();

  return result.affectedRows;
};

// ✅ Delete Internship Program
export const deleteInternshipProgram = async (programId: number) => {
  const [result] = await db
    .delete(internshipPrograms)
    .where(eq(internshipPrograms.internship_id, programId))
    .execute();

  return result.affectedRows;
};
