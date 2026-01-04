import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Publisher } from '../entity'


export async function getPublishers(req: Request, res: Response) {
	try {
		const repo = AppDataSource.getRepository(Publisher);

		res.status(200).json(await repo.find());
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function getPublisher(req: Request, res: Response) {
	try {
		const { id } = req.body;
		const repo = AppDataSource.getRepository(Publisher);

		res.status(200).json(await repo.findOneBy({
			id: id
		}));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}