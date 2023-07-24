import fs from "fs";
import path from "path";

const dataFolderPath: string = path.join(__dirname, "../../data");
console.log("Data folder path:", dataFolderPath);

const createFolderIfNotExists = async () => {
  try {
    if (!fs.existsSync(dataFolderPath)) {
      await fs.promises.mkdir(dataFolderPath);
      console.log("Data folder created:", dataFolderPath);
    } else {
      console.log("Data folder already exists:", dataFolderPath);
    }
  } catch (err) {
    console.error("Error creating data folder:", err);
  }
};

const createFileIfNotExists = async (filename: string, data: []) => {
  try {
    const filePath = path.join(dataFolderPath, filename);
    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, JSON.stringify(data));
      console.log("File created:", filePath);
    } else {
      console.log("File already exists:", filePath);
    }
  } catch (error) {
    console.error("Error creating file:", error);
  }
};

export const initializeDataFiles = async () => {
  await createFolderIfNotExists();

  await createFileIfNotExists("todo.json", []);
  await createFileIfNotExists("done.json", []);
};
