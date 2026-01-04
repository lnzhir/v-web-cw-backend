
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TABLE public.users
(
	id bigserial primary key,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL
);

-- языки
CREATE TABLE public.languages
(
	id bigserial primary key,
	name varchar(32) NOT NULL,
	short_name varchar(32)
);

-- страны
CREATE TABLE public.countries
(
	id bigserial primary key,
	name varchar(64) NOT NULL
);

-- авторы
CREATE TABLE public.authors
(
	id bigserial primary key,
	image varchar(255),
	first_name varchar(255) NOT NULL,
	sur_name varchar(255),
	last_name varchar(255)
);

-- издатели
CREATE TABLE public.publishers
(
	id bigserial primary key,
	image varchar(255),
	name varchar(255) NOT NULL,
	country_id bigint references countries(id)
);

-- книги
CREATE TABLE public.books
(
	id bigserial primary key,
	isbn varchar(255),
	title varchar(255) NOT NULL,
	image varchar(255),
	file varchar(255),
	publish_year integer NOT NULL,
	publisher_id bigint references publishers(id),
	language_id bigint references languages(id)
);

-- авторы книги
CREATE TABLE public.bookauthors
(
	author_id bigint references authors(id),
	book_id bigint references books(id),

	PRIMARY KEY(author_id, book_id)
);

-- жанры
CREATE TABLE public.genres
(
	id bigserial primary key,
	name varchar(128) NOT NULL
);

-- жанры книги
CREATE TABLE public.bookgenres
(
	genre_id bigint references genres(id),
	book_id bigint references books(id),

	PRIMARY KEY(genre_id, book_id)
);

-- избранное
CREATE TABLE public.favorites
(
	user_id bigint references users(id),
	book_id bigint references books(id),

	PRIMARY KEY(user_id, book_id)
);