import { requestHandler } from "../src/requestHandler";
import { IncomingMessage, ServerResponse } from "http";
import fs, { write } from "fs";
import path from "path";

describe("requestHandler", () => {
  //setup and teardown
  let req: IncomingMessage;
  let res: ServerResponse;

  const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync").mockImplementation();

  const readFileSyncSpy = jest
    .spyOn(fs, "readFileSync")
    .mockImplementation((filePath: string) => {
      if (filePath === path.join(__dirname, "../data/todo.json")) {
        return JSON.stringify([
          { todo: "Task 3", done: false },
          { todo: "Task 4", done: false },
        ]);
      } else if (filePath === path.join(__dirname, "../data/done.json")) {
        return JSON.stringify([{ todo: "Task 5", done: true }]);
      }
      throw new Error(`Unknown file path: ${filePath}`);
    });

  beforeEach(() => {
    req = {
      method: "",
      url: "",
    } as IncomingMessage;
    res = {
      statusCode: 0,
      end: jest.fn(),
    } as unknown as ServerResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  //Test cases

  it("should handle GET request to /todos", () => {
    req.method = "GET";
    req.url = "/todos";

    requestHandler(req, res, "/todos", {});

    expect(res.statusCode).toBe(200);
    expect(readFileSyncSpy).toHaveBeenCalledTimes(2);
    expect(readFileSyncSpy).toHaveBeenCalledWith(
      path.join(__dirname, "../data/todo.json"),
      "utf-8"
    );
    expect(readFileSyncSpy).toHaveBeenCalledWith(
      path.join(__dirname, "../data/done.json"),
      "utf-8"
    );
  });

  it("should handle other paths", () => {
    req.method = "GET";
    req.url = "/other";
    requestHandler(req, res, "/other", {});
    expect(res.statusCode).toBe(404);
    expect(res.end).toHaveBeenCalledWith("no data found here");
  });

  it("should handle the POST request", () => {
    req.method = "POST";
    req.url = "/todos";
    const data = { todo: "Test", done: false };
    const requestData = JSON.stringify(data);
    const pseudoList = [];

    req.on = jest
      .fn()
      .mockImplementation((event: string, callback: Function) => {
        if (event === "data") {
          callback(requestData);
        } else if (event === "end") {
          pseudoList.push(data);
          callback();
        }
      });
    requestHandler(req, res, "/todos", {});

    expect(writeFileSyncSpy).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.end).toHaveBeenCalledWith("Request body received");
    expect(pseudoList).toStrictEqual([data]);
  });

  it("should handle PUT request", () => {
    req.method = "PUT";
    req.url = "/todos";
    const updatedTodos = [
      { todo: "Task 1", done: true },
      { todo: "Task 2", done: false },
    ];
    const requestBody = JSON.stringify(updatedTodos);

    req.on = jest
      .fn()
      .mockImplementation((event: string, callback: Function) => {
        if (event === "data") {
          callback(requestBody);
        } else if (event === "end") {
          callback();
        }
      });

    requestHandler(req, res, "/todos", {});

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(2);

    expect(res.statusCode).toBe(201);
  });
  it("should DELETE a todo", () => {
    req.method = "DELETE";
    req.url = "/todos";
    const data = [{ todo: "Task 3", done: false }];

    req.on = jest
      .fn()
      .mockImplementation((event: string, callback: Function) => {
        if (event === "data") {
          callback(JSON.stringify(data));
        } else if (event === "end") {
          callback();
        }
      });

    requestHandler(req, res, "/todos", {});
    expect(writeFileSyncSpy).toHaveBeenCalled();
  });
});
