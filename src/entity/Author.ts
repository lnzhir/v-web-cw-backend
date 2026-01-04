import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Book } from './Book'

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  image: string

  @Column()
  first_name: string

  @Column()
  sur_name: string

  @Column()
  last_name: string

  @ManyToMany(() => Book, (book: Book) => book.authors)
  books: Promise<Book[]>;
}
