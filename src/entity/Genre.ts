import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Book } from './Book'

@Entity("genres")
export class Genre {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Book, (book: Book) => book.genres)
  books: Promise<Book[]>;
}
