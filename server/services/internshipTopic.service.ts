import { eq } from "drizzle-orm";
import { internshipTopics } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create Internship Topic
export const createInternshipTopic = async (topic: {
  topic_name: string;
  topic_details: string;
}): Promise<number> => {
  const [result] = await db
    .insert(internshipTopics)
    .values({
        ...topic,
        created_at: new Date(),
        updated_at: new Date(),
    })
    .execute();

  return result.insertId;
};

// ✅ Get All Internship Topics
export const getAllInternshipTopics = async () => {
  return await db.select().from(internshipTopics).execute();
};

// ✅ Get Internship Topic by ID
export const getInternshipTopicById = async (topicId: number) => {
  const [topic] = await db
    .select()
    .from(internshipTopics)
    .where(eq(internshipTopics.topic_id, topicId))
    .execute();

  return topic || null;
};

// ✅ Update Internship Topic
export const updateInternshipTopic = async (
  topicId: number,
  updateData: Partial<{
    topic_name: string;
    topic_details?: string;
  }>
) => {
  const [result] = await db
    .update(internshipTopics)
    .set({
      ...updateData,
      updated_at: new Date(),
    })
    .where(eq(internshipTopics.topic_id, topicId))
    .execute();

  return result.affectedRows;
};

// ✅ Delete Internship Topic
export const deleteInternshipTopic = async (topicId: number) => {
  const [result] = await db
    .delete(internshipTopics)
    .where(eq(internshipTopics.topic_id, topicId))
    .execute();

  return result.affectedRows;
};
