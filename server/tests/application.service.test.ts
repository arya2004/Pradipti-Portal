
import { db } from "../db/drizzle";
import * as applicationService from "../services/application.service";

describe("Application Service", () => {
  let applicationId: number;
  let studentId = 1; // Mock student_id for testing
  let internshipId = 1; // Mock internship_id for testing

  afterAll(async () => {
    await db.execute(`DELETE FROM applications`);
  });

  // ✅ Test Create Application
  it("should create a new application", async () => {
    const newApplication = {
      student_id: studentId,
      internship_id: internshipId,
      application_date: new Date(),
      status: "Pending",
      approval_by_station: "Pending",
      approval_by_institution: "Pending",
      remarks: "Application submitted successfully",
    };

    applicationId = await applicationService.createApplication(newApplication);
    expect(applicationId).toBeDefined();
  });

  // ✅ Test Get All Applications
  it("should retrieve all applications", async () => {
    const applications = await applicationService.getAllApplications();
    expect(applications.length).toBeGreaterThan(0);
  });

  // ✅ Test Get Application By ID
  it("should retrieve an application by ID", async () => {
    const application = await applicationService.getApplicationById(applicationId);
    expect(application).not.toBeNull();
    expect(application?.status).toBe("Pending");
  });

  // ✅ Test Update Application
  it("should update an existing application", async () => {
    const updateData = {
      status: "Approved",
      approval_by_station: "Approved",
      approval_by_institution: "Approved",
    };

    const affectedRows = await applicationService.updateApplication(applicationId, updateData);
    expect(affectedRows).toBe(1);

    const updatedApplication = await applicationService.getApplicationById(applicationId);
    expect(updatedApplication?.status).toBe("Approved");
    expect(updatedApplication?.approval_by_station).toBe("Approved");
    expect(updatedApplication?.approval_by_institution).toBe("Approved");
  });

  // ✅ Test Delete Application
  it("should delete an application", async () => {
    const affectedRows = await applicationService.deleteApplication(applicationId);
    expect(affectedRows).toBe(1);

    const deletedApplication = await applicationService.getApplicationById(applicationId);
    expect(deletedApplication).toBeNull();
  });
});
