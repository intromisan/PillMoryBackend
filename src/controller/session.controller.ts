import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // Create a session
  const session = createSession(user._id, req.get("user-agent") || "");

  // Create an accrss token

  // Create a refresh token

  // Return access & refresh tokens
}
