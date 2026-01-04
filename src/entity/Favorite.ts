import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Book } from './Book'



@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn()
  user_id: number

  @PrimaryGeneratedColumn()
  book_id: number

  @ManyToOne(() => Book, book => book.id)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}