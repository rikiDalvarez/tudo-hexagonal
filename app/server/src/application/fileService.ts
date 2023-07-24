// application/FileService.ts
import path from "path";
import { FileRepository } from "../domain/FileRepository";

const createFile = async (filePath: string, fileRepository: FileRepository) => {
  const folderName = "./data";

  await fileRepository.createDirectoryIfNotExist(folderName);

  const todo = path.join(__dirname, "../data", "todo.json");
  const done = path.join(__dirname, "../data", "done.json");

  await fileRepository.createFileIfNotExist(todo);
  await fileRepository.createFileIfNotExist(done);
};

export default createFile;
