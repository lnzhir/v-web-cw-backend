import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Book } from './Book'

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  // @ManyToMany()
  // @JoinTable({ 
  //   name: 'favorites',
  //   joinColumn: { name: 'user_id' },
  //   inverseJoinColumn: { name: 'book_id' }
  // })
  // books: Promise<Book[]>;
}


