import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  database: "musclemotion",
  username: "leonmenzies",
  password: "GoSkiing2!2",
};
