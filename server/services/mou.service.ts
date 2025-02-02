import { eq } from "drizzle-orm";
import { mous } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create MOU
export const createMOU = async (mou: {
  institution_id: number;
  mou_start_date: Date;
  mou_end_date: Date;
  mou_status?: string;
  approver_id: number;
  approved_at: Date;
}): Promise<number> => {
  const [result] = await db
    .insert(mous)
    .values({
      institution_id: mou.institution_id,
      mou_start_date: mou.mou_start_date,
      mou_end_date: mou.mou_end_date,
      approver_id: mou.approver_id,
      approved_at: mou.approved_at,
      updated_at: new Date(),
    })
    .execute();

  return result.insertId;
};

// ✅ Get All MOUs
export const getAllMOUs = async () => {
  return await db.select().from(mous).execute();
};

// ✅ Get MOU by ID
export const getMOUById = async (mouId: number) => {
  const [mou] = await db
    .select()
    .from(mous)
    .where(eq(mous.mou_id, mouId))
    .execute();

  return mou || null;
};

// ✅ Update MOU
export const updateMOU = async (
  mouId: number,
  updateData: Partial<{
    institution_id: number;
    mou_start_date: Date;
    mou_end_date: Date;
    mou_status?: string;
    approver_id: number;
    approved_at: Date;
  }>
) => {
  const [result] = await db
    .update(mous)
    .set({
      ...updateData,
      updated_at: new Date(),
    })
    .where(eq(mous.mou_id, mouId))
    .execute();

  return result.affectedRows;
};

// ✅ Delete MOU
export const deleteMOU = async (mouId: number) => {
  const [result] = await db
    .delete(mous)
    .where(eq(mous.mou_id, mouId))
    .execute();

  return result.affectedRows;
};
