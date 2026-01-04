import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Favorite, User, Book } from '../entity'


export async function getFavorites(req: Request, res: Response) {
	try {
		console.log(req.params)
		const { user_id } = req.params;
		const repo = AppDataSource.getRepository(Favorite);

		res.status(200).json(await repo.find({
			where: { user_id: Number(user_id) },
	      relations: ['book', 'book.authors', 'book.publisher', 'book.language']
		}));
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: err.message });
	}
}


export async function addFavorite(req: Request, res: Response) {
	try {
		console.log(req.body)
		const { user_id, book_id } = req.body;
		const repo = AppDataSource.getRepository(Favorite);

		const favorite = new Favorite();
		favorite.user_id = user_id;
		favorite.book_id = book_id;
		await repo.save(favorite);

		res.status(200);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function removeFavorite(req: Request, res: Response) {
	try {
		console.log(req.body)
		const { user_id, book_id } = req.body;
		const repo = AppDataSource.getRepository(Favorite);

		const book = await repo.findOneBy({
			user_id: user_id,
			book_id: book_id
		})

		await repo.remove(book);

		res.status(200);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}