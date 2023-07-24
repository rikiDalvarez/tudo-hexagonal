import { parse } from "url";
import requestHandler from "./requestHandler";
import http from "http";
import createFile from "./createFileJSON";

createFile("../data");

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.writeHead(200);
    res.end();
    return;
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { pathname, query } = parse(req.url || "", true);
  requestHandler(req, res, pathname || "", query || {});
});

const port = 3000;
server.listen(port, () => {
  console.log(
    ` ⚡️⚡️⚡️ Server is running on port http://localhost:${port} ⚡️⚡️⚡️`
  );
});
