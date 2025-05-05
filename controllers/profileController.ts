// controllers/profileController.ts
import { Request, Response } from "express";

const profile = (req: Request, res: Response) => {
  res.status(200).json({ message: "Perfil del usuario" });
};

export default profile;
