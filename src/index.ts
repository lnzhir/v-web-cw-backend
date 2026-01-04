import { Author, Book, BookAuthor, BookGenre, Country, Genre, Language, Publisher, User, Favorite } from "./entity"
import { AppDataSource } from "./data-source"
import express from 'express'
import cors from 'cors'
import { Routes } from './routes'
import { Like } from "typeorm";

AppDataSource.initialize()
  .then(async () => {
    //const repo = AppDataSource.getRepository(Book);

    // where: {
    //   title: Like(`%${value}%`)
    // },

    // where: {
    //   authors: [
    //     {
    //       id: 1
    //     }
    //   ]
    // },

    // where: {
    //   genres: [
    //     {
    //       id: 2
    //     }
    //   ]
    // },

    // console.log(await repo.find({
    //   order: {
    //     id: "ASC"
    //   },
    //   loadEagerRelations: true,
    //   relations: ['authors', 'publisher', 'language', 'genres']
    // }));
    
  })
  .catch((error) => console.log("Error: ", error))

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use('/api', Routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});