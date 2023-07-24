import fs from "fs";
import createFile from "../src/createFileJSON";

// Mock the fs module functions
jest.mock("fs");

describe("createFile", () => {
  beforeEach(() => {
    // Clear the mock calls and reset the mock implementation
    (fs.existsSync as jest.Mock).mockClear();
    (fs.writeFileSync as jest.Mock).mockClear();
  });

  test("creates todo.json and done.json files if they don't exist", () => {
    // Arrange
    const filePath = "my-folder";

    // Mock the existsSync function to return false for both files, todo and done
    (fs.existsSync as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    createFile(filePath);

    //Assert
    expect(fs.existsSync).toHaveBeenCalledTimes(2);
    expect(fs.existsSync).toHaveBeenCalledWith(
      expect.stringContaining("my-folder/todo.json")
    );
    expect(fs.existsSync).toHaveBeenCalledWith(
      expect.stringContaining("my-folder/done.json")
    );

    expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("my-folder/todo.json"),
      JSON.stringify([])
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("my-folder/done.json"),
      JSON.stringify([])
    );
  });

  test("does not create files if they already exist", () => {
    // Arrange
    const filePath = "existing-folder";

    // Mock the existsSync function to return true for both files,todo and done
    (fs.existsSync as jest.Mock)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    createFile(filePath);

    expect(fs.existsSync).toHaveBeenCalledTimes(2);
  });
});
