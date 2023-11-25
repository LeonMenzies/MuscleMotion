import { Users } from "../models/Users";
import { authenticateLogin, hashPassword } from "../helpers/AuthMiddleware";
import { sendSuccessResponse } from "../helpers/ResponseHandler";
import express from "express";

export const router = express.Router();

// Route: POST /signup - Create a new user
router.post("/signup", async (req: any, res: any, next: any) => {
  try {
    const { FirstName, LastName, Email, Role, Password } = req.body;

    // Check if the email is already registered
    const existingUser = await Users.findOne({
      where: { Email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Create a new user
    const user = await Users.create({
      FirstName,
      LastName,
      Email,
      Role,
      PasswordHash: hashPassword(Password),
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route: POST /logout - Logout user
router.post("/logout", async (req: any, res: any, next: any) => {
  try {
    const { FirstName, LastName, Email, Role, Password } = req.body;

    const user = await Users.create({
      FirstName,
      LastName,
      Email,
      Role,
      PasswordHash: hashPassword(Password),
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route: POST /users/login - Login user
router.post("/login", async (req: any, res: any, next: any) => {
  try {
    const { Email, Password } = req.body;

    const user = await Users.findOne({
      where: { Email },
      attributes: ["ID", "FirstName", "LastName", "Email", "Roles", "PasswordHash"],
    });

    const jwt = authenticateLogin(user, Password);

    if (jwt) {
      sendSuccessResponse({ res, data: { user, jwt } });
    } else {
      res.status(404).json({ error: "Login Failed" });
    }
  } catch (error) {
    next(error);
  }
});
