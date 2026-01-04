import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Genre } from '../entity'


export async function getGenres(req: Request, res: Response) {
	try {
		const repo = AppDataSource.getRepository(Genre);

		res.status(200).json(await repo.find());
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function getGenre(req: Request, res: Response) {
	try {
		const { id } = req.body;
		const repo = AppDataSource.getRepository(Genre);

		res.status(200).json(await repo.findOneBy({
			id: id
		}));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}