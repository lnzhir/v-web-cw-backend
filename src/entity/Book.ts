import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm"
import { Language } from './Language'
import { Publisher } from './Publisher'
import { Author } from './Author'
import { Genre } from './Genre'

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  isbn: string

  @Column()
  image: string

  @Column()
  title: string

  @Column()
  file: string

  @Column()
  publish_year: number

  @Column()
  publisher_id: number

  @Column()
  language_id: number

  @ManyToOne(() => Publisher, publisher => publisher.id)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @ManyToOne(() => Language, language => language.id)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @ManyToMany(() => Author, author => author.books)
  @JoinTable({ 
    name: 'bookauthors',
    joinColumn: { name: 'book_id' },
    inverseJoinColumn: { name: 'author_id' }
  })
  authors: Promise<Author[]>;

  @ManyToMany(() => Genre, genre => genre.books)
  @JoinTable({ 
    name: 'bookgenres',
    joinColumn: { name: 'book_id' },
    inverseJoinColumn: { name: 'genre_id' }
  })
  genres: Promise<Genre[]>;
}
