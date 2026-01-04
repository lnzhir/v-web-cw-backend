import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { User } from '../entity'



export async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({
			email: email,
			password: password
		});

		res.status(200).json({id: user.id, name: user.name, email: user.email});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}