import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Favorite, User, Book } from '../entity'
import { verify } from "jsonwebtoken";



async function getUserById(id: number) {
	return await AppDataSource.getRepository(User).findOneBy({ id: id });
}


export async function getFavorites(req: Request, res: Response) {
	try {
		// const { user_id } = req.params;

		// res.status(200).json(await AppDataSource.getRepository(Favorite).find({
		// 	where: { user_id: Number(user_id) },
	   //    relations: ['book', 'book.authors', 'book.publisher', 'book.language']
		// }));

		const { token } = req.params;

		let payload: any = null
		try {
			payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
		} catch (err) {
			res.status(401).json({ error: err.message });
			return;
		}

		res.status(200).json(await AppDataSource.getRepository(Favorite).find({
			where: { user_id: payload.sub },
	      relations: ['book', 'book.authors', 'book.publisher', 'book.language']
		}));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function addFavorite(req: Request, res: Response) {
	try {
		// const { user_id, book_id } = req.body;

		// const favorite = new Favorite();
		// favorite.user_id = user_id;
		// favorite.book_id = book_id;

		const { token, book_id } = req.body;

		let payload: any = null
		try {
			payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
		} catch (err) {
			res.status(401).json({ error: err.message });
			return;
		}

		const favorite = new Favorite();
		favorite.user_id = payload.sub;
		favorite.book_id = book_id;

		await AppDataSource.getRepository(Favorite).save(favorite);

		res.status(200).json({});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function removeFavorite(req: Request, res: Response) {
	try {
		// const { user_id, book_id } = req.body;
		// const repo = AppDataSource.getRepository(Favorite);

		// const book = await repo.findOneBy({
		// 	user_id: user_id,
		// 	book_id: book_id
		// })

		const { token, book_id } = req.body;

		let payload: any = null
		try {
			payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
		} catch (err) {
			res.status(401).json({ error: err.message });
			return;
		}

		const repo = AppDataSource.getRepository(Favorite);

		const book = await repo.findOneBy({
			user_id: payload.sub,
			book_id: book_id
		})

		await repo.remove(book);

		res.status(200).json({});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}