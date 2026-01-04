import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { User } from '../entity'


export async function getUsers(req: Request, res: Response) {
	try {
		const userRepo = AppDataSource.getRepository(User);

		res.status(200).json(await userRepo.find());
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function getUser(req: Request, res: Response) {
	try {
		const { id } = req.body;
		const userRepo = AppDataSource.getRepository(User);

		res.status(200).json(await userRepo.findOneBy({
			id: id
		}));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}