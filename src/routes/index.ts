import express from 'express'
import { 
	getUsers, getUser,
	getFavorites, addFavorite, removeFavorite,
	getBooks, getBook, getBooksEx,
	getAuthors, getAuthor,
	getPublishers, getPublisher,
	getLanguages, getLanguage,
	getGenres, getGenre,
	login, refreshToken,
	getAsset
} from '../controllers'




export function Routes() {
	const router = express.Router()

	router.get('/User', getUsers);
	router.get('/User/:id', getUser);

	router.get('/Favorite/:token', getFavorites);
	router.post('/Favorite', addFavorite);
	router.delete('/Favorite', removeFavorite);

	router.get('/Book', getBooks);
	router.get('/Book/:id', getBook);
	router.post('/Book', getBooksEx);

	router.get('/Author', getAuthors);
	router.get('/Author/:id', getAuthor);

	router.get('/Publisher', getPublishers);
	router.get('/Publisher/:id', getPublisher);

	router.get('/Language', getLanguages);
	router.get('/Language/:id', getLanguage);

	router.get('/Genre', getGenres);
	router.get('/Genre/:id', getGenre);

	router.post('/auth/Login', login);
	router.post('/auth/Refresh', refreshToken);

	router.get('/Asset/{*filepath}', getAsset);

	return router;
}