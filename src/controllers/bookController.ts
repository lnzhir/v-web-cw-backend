import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Book } from '../entity'



export async function getBooks(req: Request, res: Response) {
	try {
		const repo = AppDataSource.getRepository(Book);

		res.status(200).json(await repo.find({
	      loadEagerRelations: true,
	      relations: ['authors', 'publisher', 'language']
	    }));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function getBooksEx(req: Request, res: Response) {
	console.log(req.body)
	try {
		const { where, order_by } = req.body;
		const repo = AppDataSource.getRepository(Book);

		// const where = {}
		// where[key] = value
		const order = {}
		order[order_by] = "ASC"

		res.status(200).json(await repo.find({
			where: where,
			order: order,
	      loadEagerRelations: true,
	      relations: ['authors', 'publisher', 'language']
	    }));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function getBook(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const repo = AppDataSource.getRepository(Book);

		res.status(200).json(await repo.findOne({
			where: { id: +id },
			loadEagerRelations: true,
	      relations: ['authors', 'publisher', 'language', 'genres']
		}));
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}