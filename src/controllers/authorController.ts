import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Author } from '../entity'


export async function getAuthors(req: Request, res: Response) {
	try {
		const repo = AppDataSource.getRepository(Author);

		res.status(200).json(await repo.find());
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function getAuthor(req: Request, res: Response) {
	try {
		const { id } = req.body;
		const repo = AppDataSource.getRepository(Author);

		res.status(200).json(await repo.findOneBy({
			id: id
		}));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}