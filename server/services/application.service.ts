import { eq } from "drizzle-orm";
import { applications } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create Application
export const createApplication = async (application: {
  student_id: number;
  internship_id: number;
  application_date: Date;
  status?: string;
  approval_by_station?: string;
  approval_by_institution?: string;
  remarks?: string;
}): Promise<number> => {
  const [result] = await db
    .insert(applications)
    .values({
      ...application,
    })
    .execute();

  return result.insertId;
};

// ✅ Get All Applications
export const getAllApplications = async () => {
  return await db.select().from(applications).execute();
};

// ✅ Get Application by ID
export const getApplicationById = async (applicationId: number) => {
  const [application] = await db
    .select()
    .from(applications)
    .where(eq(applications.application_id, applicationId))
    .execute();

  return application || null;
};

// ✅ Update Application
export const updateApplication = async (
  applicationId: number,
  updateData: Partial<{
    student_id: number;
    internship_id: number;
    application_date: Date;
    status?: string;
    approval_by_station?: string;
    approval_by_institution?: string;
    remarks?: string;
  }>
) => {
  const [result] = await db
    .update(applications)
    .set({
      ...updateData
    })
    .where(eq(applications.application_id, applicationId))
    .execute();

  return result.affectedRows;
};

// ✅ Delete Application
export const deleteApplication = async (applicationId: number) => {
  const [result] = await db
    .delete(applications)
    .where(eq(applications.application_id, applicationId))
    .execute();

  return result.affectedRows;
};
