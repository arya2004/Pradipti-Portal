
import { db } from "../db/drizzle";
import * as stationService from "../services/station.service";

describe("Station Service", () => {
  let stationId: number;

  afterAll(async () => {
    await db.execute(`DELETE FROM stations`);
  });

  // ✅ Test Create Station
  it("should create a new station", async () => {
    const newStation = {
      station_name: "Test Airport",
      station_code: "TST123",
      station_address: "123 Test Street",
      contact_person: "Jane Doe",
      contact_email: "jane.doe@testairport.com",
      contact_phone: "9876543210",
    };

    stationId = await stationService.createStation(newStation);
    expect(stationId).toBeDefined();
  });

  // ✅ Test Get All Stations
  it("should retrieve all stations", async () => {
    const stations = await stationService.getAllStations();
    expect(stations.length).toBeGreaterThan(0);
  });

  // ✅ Test Get Station By ID
  it("should retrieve a station by ID", async () => {
    const station = await stationService.getStationById(stationId);
    expect(station).not.toBeNull();
    expect(station?.station_name).toBe("Test Airport");
  });

  // ✅ Test Update Station
  it("should update an existing station", async () => {
    const updateData = {
      station_name: "Updated Test Airport",
      contact_person: "John Smith",
    };

    const affectedRows = await stationService.updateStation(stationId, updateData);
    expect(affectedRows).toBe(1);

    const updatedStation = await stationService.getStationById(stationId);
    expect(updatedStation?.station_name).toBe("Updated Test Airport");
    expect(updatedStation?.contact_person).toBe("John Smith");
  });

  // ✅ Test Delete Station
  it("should delete a station", async () => {
    const affectedRows = await stationService.deleteStation(stationId);
    expect(affectedRows).toBe(1);

    const deletedStation = await stationService.getStationById(stationId);
    expect(deletedStation).toBeNull();
  });
});
