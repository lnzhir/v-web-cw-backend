import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("bookauthors")
export class BookAuthor {
  @PrimaryColumn()
  author_id: number

  @PrimaryColumn()
  book_id: number
}
