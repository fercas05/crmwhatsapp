import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

const isAuthCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  const [, token] = authHeader.split(" ");
  
  try {
    const getToken = process.env.COMPANY_TOKEN;
    if (!getToken) {
      throw new AppError("ERR_SESSION_EXPIRED", 401);
    }

    if (getToken !== token) {
      throw new AppError("ERR_SESSION_EXPIRED", 401);
    }
  } catch (err) {
    throw new AppError(
      "Token no válido. Intentaremos asignar uno nuevo en la próxima solicitud.",
      403
    );
  }

  return next();
};

export default isAuthCompany;
