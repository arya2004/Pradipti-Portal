
import { db } from "../db/drizzle";
import * as mouService from "../services/mou.service";

describe("MOU Service", () => {
  let mouId: number;
  let institutionId = 1; // Mock institution_id for testing
  let approverId = 1; // Mock user_id for testing

  afterAll(async () => {
    await db.execute(`DELETE FROM mous`);
  });

  // ✅ Test Create MOU
  it("should create a new MOU", async () => {
    const newMOU = {
      institution_id: institutionId,
      mou_start_date: new Date("2024-01-01"),
      mou_end_date: new Date("2025-01-01"),
      approver_id: approverId,
      approved_at: new Date(),
    };

    mouId = await mouService.createMOU(newMOU);
    expect(mouId).toBeDefined();
  });

  // ✅ Test Get All MOUs
  it("should retrieve all MOUs", async () => {
    const mous = await mouService.getAllMOUs();
    expect(mous.length).toBeGreaterThan(0);
  });

  // ✅ Test Get MOU By ID
  it("should retrieve a MOU by ID", async () => {
    const mou = await mouService.getMOUById(mouId);
    expect(mou).not.toBeNull();
    expect(mou?.institution_id).toBe(institutionId);
  });

  // ✅ Test Update MOU
  it("should update an existing MOU", async () => {
    const updateData = {
      mou_status: "Expired",
    };

    const affectedRows = await mouService.updateMOU(mouId, updateData);
    expect(affectedRows).toBe(1);

    const updatedMOU = await mouService.getMOUById(mouId);
    expect(updatedMOU?.mou_status).toBe("Expired");
  });

  // ✅ Test Delete MOU
  it("should delete a MOU", async () => {
    const affectedRows = await mouService.deleteMOU(mouId);
    expect(affectedRows).toBe(1);

    const deletedMOU = await mouService.getMOUById(mouId);
    expect(deletedMOU).toBeNull();
  });
});
