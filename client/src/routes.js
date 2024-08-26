import Books from './pages/Books';
import Authors from './pages/Authors';
import BookCard from './pages/BookCard';
import AuthorCard from './pages/AuthorCard';
import BookEdit from './pages/BookEdit';
import AuthorEdit from './pages/AuthorEdit';
import BookWorm from './pages/BookWorm';
import {BOOKS_ROUTE, AUTHORS_ROUTE, BOOK_CARD_ROUTE, AUTHOR_CARD_ROUTE, BOOK_EDIT_ROUTE, AUTHOR_EDIT_ROUTE, BOOK_WORM_ROUTE} from './utils/consts'

export const publicRoutes = [
	{
		path: BOOKS_ROUTE,
		Component: Books
	},
	{
		path: AUTHORS_ROUTE,
		Component: Authors
	},
	{
		path: BOOK_WORM_ROUTE,
		Component: BookWorm
	},
	{
		path: BOOK_CARD_ROUTE + '/:id',
		Component: BookCard
	},
	{
		path: AUTHOR_CARD_ROUTE + '/:id',
		Component: AuthorCard
	},
		{
		path: BOOK_EDIT_ROUTE + '/:id',
		Component: BookEdit
	},
	{
		path: AUTHOR_EDIT_ROUTE + '/:id',
		Component: AuthorEdit
	},
]