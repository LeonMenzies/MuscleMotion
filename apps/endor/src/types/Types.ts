import { NextFunction } from "express";

export type ControllerFunction<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;
