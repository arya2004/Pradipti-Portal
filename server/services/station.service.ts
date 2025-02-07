import { eq } from "drizzle-orm";
import { stations } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create Station
export const createStation = async (station: {
  station_name: string;
  station_code?: string;
  station_address?: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
}): Promise<number> => {
  const [result] = await db
    .insert(stations)
    .values({
      ...station,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .execute();

  return result.insertId;
};

// ✅ Get All Stations
export const getAllStations = async () => {
  return await db.select().from(stations).execute();
};

// ✅ Get Station by ID
export const getStationById = async (stationId: number) => {
  const [station] = await db
    .select()
    .from(stations)
    .where(eq(stations.station_id, stationId))
    .execute();

  return station || null;
};

// ✅ Update Station
export const updateStation = async (
  stationId: number,
  updateData: Partial<{
    station_name: string;
    station_code?: string;
    station_address?: string;
    contact_person: string;
    contact_email: string;
    contact_phone: string;
  }>
) => {
  const [result] = await db
    .update(stations)
    .set({
      ...updateData,
      updated_at: new Date(),
    })
    .where(eq(stations.station_id, stationId))
    .execute();

  return result.affectedRows;
};

// ✅ Delete Station
export const deleteStation = async (stationId: number) => {
  const [result] = await db
    .delete(stations)
    .where(eq(stations.station_id, stationId))
    .execute();

  return result.affectedRows;
};
