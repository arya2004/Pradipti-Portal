
import { db } from "../db/drizzle";
import * as userService from "../services/user.service";

describe("User Service", () => {
  let userId: number;

  afterAll(async () => {
    await db.execute(`DELETE FROM users`);
  });

  // ✅ Test Create User
  it("should create a new user", async () => {
    const newUser = {
      username: "testuser",
      email: "testuser@example.com",
      salt: "randomSalt123",
      password_hash: "hashedPassword123",
      sessiontoken: null,
      role: "Admin",
    };

    userId = await userService.createUser(newUser);
    expect(userId).toBeDefined();
  });

  // ✅ Test Get All Users
  it("should retrieve all users", async () => {
    const users = await userService.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  // ✅ Test Get User By ID
  it("should retrieve a user by ID", async () => {
    const user = await userService.getUserById(userId);
    expect(user).not.toBeNull();
    expect(user?.name).toBe("testuser");
  });

  // ✅ Test Update User
  it("should update an existing user", async () => {
    const updateData = {
      username: "updateduser",
      role: "SuperAdmin",
    };

    const affectedRows = await userService.updateUser(userId, updateData);
    expect(affectedRows).toBe(1);

    const updatedUser = await userService.getUserById(userId);
    expect(updatedUser?.name).toBe("updateduser");
    expect(updatedUser?.role).toBe("SuperAdmin");
  });

  // ✅ Test Delete User
  it("should delete a user", async () => {
    const affectedRows = await userService.deleteUser(userId);
    expect(affectedRows).toBe(1);

    const deletedUser = await userService.getUserById(userId);
    expect(deletedUser).toBeNull();
  });
});
