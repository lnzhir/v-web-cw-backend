import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Book } from './Book'

@Entity("languages")
export class Language {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  short_name: string

  @OneToMany(() => Book, (book: Book) => book.language)
  books: Book[];
}
