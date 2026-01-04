import "reflect-metadata"
import { DataSource } from "typeorm"
import { 
  Author, Book, BookAuthor, 
  BookGenre, Country, Genre, 
  Language, Publisher, User, 
  Favorite 
} from "./entity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 4502,
  username: "postgres",
  password: "popbob",
  database: "library",
  synchronize: false,
  logging: false,
  entities: [
    Author, Book, BookAuthor, 
    BookGenre, Country, Genre, 
    Language, Publisher, User, 
    Favorite
  ],
  subscribers: [],
  migrations: [],
})
