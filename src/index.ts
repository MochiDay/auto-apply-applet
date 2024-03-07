import express, { Request, Response, Application } from "express";

const app: Application = express();
const port = 8762;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running  at http://localhost:${port}`);
});
