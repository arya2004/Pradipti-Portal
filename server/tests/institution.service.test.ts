
import { db } from "../db/drizzle";
import * as institutionService from "../services/institution.service";

describe("Institution Service", () => {
  let institutionId: number;

  // Clean up the database after all tests
  afterAll(async () => {
    await db.execute(`DELETE FROM institutions`);
  });

  // Test Create Institution
  it("should create a new institution", async () => {
    const newInstitution = {
      institution_name: "Test University",
      institution_address: "123 Test Street",
      contact_person: "John Doe",
      contact_email: "johndoe@testuniversity.com",
      contact_phone: "1234567890",
    };

    institutionId = await institutionService.createInstitution(newInstitution);

    expect(institutionId).toBeDefined();
  });

  // Test Get All Institutions
  it("should retrieve all institutions", async () => {
    const institutions = await institutionService.getAllInstitutions();
    expect(institutions.length).toBeGreaterThan(0);
  });

  // Test Get Institution By ID
  it("should retrieve an institution by ID", async () => {
    const institution = await institutionService.getInstitutionById(institutionId);
    expect(institution).not.toBeNull();
    expect(institution?.institution_name).toBe("Test University");
  });

  // Test Update Institution
  it("should update an existing institution", async () => {
    const updateData = {
      institution_name: "Updated Test University",
      contact_person: "Jane Doe",
    };

    const affectedRows = await institutionService.updateInstitution(institutionId, updateData);
    expect(affectedRows).toBe(1);

    const updatedInstitution = await institutionService.getInstitutionById(institutionId);
    expect(updatedInstitution?.institution_name).toBe("Updated Test University");
    expect(updatedInstitution?.contact_person).toBe("Jane Doe");
  });

  // Test Delete Institution
  // it("should delete an institution", async () => {
  //   const affectedRows = await institutionService.deleteInstitution(institutionId);
  //   expect(affectedRows).toBe(1);

  //   const deletedInstitution = await institutionService.getInstitutionById(institutionId);
  //   expect(deletedInstitution).toBeNull();
  // });
});
