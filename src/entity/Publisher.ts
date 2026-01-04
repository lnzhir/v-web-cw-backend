import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Book } from './Book'
import { Country } from './Country'

@Entity("publishers")
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  image: string

  @Column()
  name: string

  @Column()
  country_id: number

  @ManyToOne(() => Country, country => country.id)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => Book, book => book.publisher)
  books: Book[];
}
