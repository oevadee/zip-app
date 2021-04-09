import { Request, Response } from "express";
type Controller = (req: Request, res: Response) => Promise<any>;

export default Controller