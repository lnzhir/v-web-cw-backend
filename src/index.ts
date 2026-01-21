import { Author, Book, BookAuthor, BookGenre, Country, Genre, Language, Publisher, User, Favorite } from "./entity"
import { AppDataSource } from "./data-source"
import { Routes } from './routes'
import express from 'express'
import cors from 'cors'
import { Like } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
  })
  .catch((error) => console.log("Error: ", error))

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  //origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use('/api', Routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});