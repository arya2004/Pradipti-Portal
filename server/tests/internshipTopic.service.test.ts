import { db } from "../db/drizzle";
import * as internshipTopicService from "../services/internshipTopic.service";

describe("Internship Topic Service", () => {
  let topicId: number;

  afterAll(async () => {
    await db.execute(`DELETE FROM internship_topics`);
  });

  // ✅ Test Create Internship Topic
  it("should create a new internship topic", async () => {
    const newTopic = {
      topic_name: "Machine Learning",
      topic_details: "Advanced ML techniques",
    };

    topicId = await internshipTopicService.createInternshipTopic(newTopic);
    expect(topicId).toBeDefined();
  });

  // ✅ Test Get All Internship Topics
  it("should retrieve all internship topics", async () => {
    const topics = await internshipTopicService.getAllInternshipTopics();
    expect(topics.length).toBeGreaterThan(0);
  });

  // ✅ Test Get Internship Topic By ID
  it("should retrieve an internship topic by ID", async () => {
    const topic = await internshipTopicService.getInternshipTopicById(topicId);
    expect(topic).not.toBeNull();
    expect(topic?.topic_name).toBe("Machine Learning");
  });

  // ✅ Test Update Internship Topic
  it("should update an existing internship topic", async () => {
    const updateData = {
      topic_name: "Deep Learning",
      topic_details: "Neural networks and AI",
    };

    const affectedRows = await internshipTopicService.updateInternshipTopic(topicId, updateData);
    expect(affectedRows).toBe(1);

    const updatedTopic = await internshipTopicService.getInternshipTopicById(topicId);
    expect(updatedTopic?.topic_name).toBe("Deep Learning");
    expect(updatedTopic?.topic_details).toBe("Neural networks and AI");
  });

  // ✅ Test Delete Internship Topic
  it("should delete an internship topic", async () => {
    const affectedRows = await internshipTopicService.deleteInternshipTopic(topicId);
    expect(affectedRows).toBe(1);

    const deletedTopic = await internshipTopicService.getInternshipTopicById(topicId);
    expect(deletedTopic).toBeNull();
  });
});
