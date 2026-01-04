import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("bookgenres")
export class BookGenre {
  @PrimaryColumn()
  genre_id: number

  @PrimaryColumn()
  book_id: number
}
