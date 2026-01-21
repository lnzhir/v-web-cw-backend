import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { User } from '../entity'
import { sign, verify  } from "jsonwebtoken";
import { createHash } from 'crypto';




export const createAccessToken = (user: User) => {
	return sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m"
	});
};

export const createRefreshToken = (user: User) => {
	return sign(
		{ sub: user.id },
			process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "7d"
		}
	);
};


export async function refreshToken(req: Request, res: Response) {
	try {
		const { token } = req.body;

		let payload: any = null
		try {
			payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
		} catch (err) {
			res.status(401).json({ error: err.message });
			return;
		}
		

		const user = await AppDataSource.getRepository(User).findOneBy({ id: payload.sub });
		if (!user) {
			res.status(401).json({ error: "Пользователь не найден"})
			return;
		}

		// if (Date.now() >= payload.exp * 1000) {
		// 	res.status(401).json({ error: "Срок действия токена истек"})
		// 	return;
		// }

		res.status(200).json({ 
			refreshToken: createRefreshToken(user),
			accessToken: createAccessToken(user)
		});
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: err.message });
	}
}


export async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const user = await AppDataSource.getRepository(User).findOneBy({
			email: email,
			password: createHash('md5').update(password).digest('hex')
		});
		if (!user) {
			res.status(401).json({ error: "Неверный логин или пароль"})
			return;
		}

		res.status(200).json({
			user: { 
				id: user.id, 
				name: user.name, 
				email: user.email
			},
			refreshToken: createRefreshToken(user),
			accessToken: createAccessToken(user)
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}