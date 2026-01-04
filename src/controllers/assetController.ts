import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { join } from 'path';




export function getAsset(req: Request, res: Response) {
	try {
		const { filepath } = req.params;
		let resPath = ""
		for (let p of filepath) {
			resPath += "/" + p
		}
		

		res.status(200).sendFile(join(process.cwd(), "items", resPath));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}