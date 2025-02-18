import { getUserInfoByTenant } from "./FirebaseClient";

describe("getUserInfoByTenant", () => {
  test("should return selected user when found", async () => {
    // Mock the necessary dependencies (e.g., db, doc, collection, getDocs)
    const mockUser = { uid: "user1" };
    const mockTenantName = "tenant1";
    const mockSnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          data: () => ({ uid: "user1", name: "John Doe" }),
          id: "doc1",
        });
      }),
    };
    const mockUserCollectionRef = {
      where: jest.fn(() => mockSnapshot),
    };
    const mockTenantDocRef = {
      collection: jest.fn(() => mockUserCollectionRef),
    };
    const mockDb = {
      doc: jest.fn(() => mockTenantDocRef),
    };

    // Call the function
    const result = await getUserInfoByTenant(mockUser, mockTenantName);

    // Assert the result
    expect(result).toEqual({ uid: "user1", name: "John Doe", id: "doc1" });
    expect(mockDb.doc).toHaveBeenCalledWith("tenants", "tenant1");
    expect(mockTenantDocRef.collection).toHaveBeenCalledWith("users");
    expect(mockUserCollectionRef.where).toHaveBeenCalledWith(
      "uid",
      "==",
      "user1"
    );
    expect(mockSnapshot.forEach).toHaveBeenCalled();
  });

  test("should return null when user is not found", async () => {
    // Mock the necessary dependencies (e.g., db, doc, collection, getDocs)
    const mockUser = { uid: "user1" };
    const mockTenantName = "tenant1";
    const mockSnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          data: () => ({ uid: "user2", name: "Jane Smith" }),
          id: "doc2",
        });
      }),
    };
    const mockUserCollectionRef = {
      where: jest.fn(() => mockSnapshot),
    };
    const mockTenantDocRef = {
      collection: jest.fn(() => mockUserCollectionRef),
    };
    const mockDb = {
      doc: jest.fn(() => mockTenantDocRef),
    };

    // Call the function
    const result = await getUserInfoByTenant(mockUser, mockTenantName);

    // Assert the result
    expect(result).toBeNull();
    expect(mockDb.doc).toHaveBeenCalledWith("tenants", "tenant1");
    expect(mockTenantDocRef.collection).toHaveBeenCalledWith("users");
    expect(mockUserCollectionRef.where).toHaveBeenCalledWith(
      "uid",
      "==",
      "user1"
    );
    expect(mockSnapshot.forEach).toHaveBeenCalled();
  });

  test("should handle error and return null", async () => {
    // Mock the necessary dependencies (e.g., db, doc, collection, getDocs)
    const mockUser = { uid: "user1" };
    const mockTenantName = "tenant1";
    const mockError = new Error("Some error message");
    const mockUserCollectionRef = {
      where: jest.fn(() => {
        throw mockError;
      }),
    };
    const mockTenantDocRef = {
      collection: jest.fn(() => mockUserCollectionRef),
    };
    const mockDb = {
      doc: jest.fn(() => mockTenantDocRef),
    };

    // Call the function
    const result = await getUserInfoByTenant(mockUser, mockTenantName);

    // Assert the result
    expect(result).toBeNull();
    expect(mockDb.doc).toHaveBeenCalledWith("tenants", "tenant1");
    expect(mockTenantDocRef.collection).toHaveBeenCalledWith("users");
    expect(mockUserCollectionRef.where).toHaveBeenCalledWith(
      "uid",
      "==",
      "user1"
    );
    expect(console.error).toHaveBeenCalledWith(
      "Error retrieving user info:",
      mockError
    );
  });
});
