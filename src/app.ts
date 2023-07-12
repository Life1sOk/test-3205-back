import express, { Application, Request, Response } from "express";
const app: Application = express();

import cors from "cors";

app.use(express.json());
app.use(cors());

import { usersData, DataType } from "./data";

app.get("/", (request: Request, response: Response) => {
  response.send(JSON.stringify(usersData));
});

app.post(
  "/find",
  (request: Request<DataType>, response: Response<DataType[] | string>) => {
    const { email, number } = request.body;

    const findedUser = usersData.filter((user) => {
      if (number > 0) {
        return user.email === email && user.number.toString().includes(number.toString());
      } else {
        return user.email === email;
      }
    });

    setTimeout(() => response.status(200).json(findedUser), 5000);
  }
);

app.listen(3001, () => console.log("Server running"));
