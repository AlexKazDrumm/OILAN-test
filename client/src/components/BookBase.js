import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import BookCard from "./BookCard";

const BookBase = observer(() => {
	const {book} = useContext(Context)

	return (
		<Row className="d-flex bookBase">
			{book.books.map(book => 
				<BookCard key={book.id} book={book}/>
			)}
		</Row>
	);
});

export default BookBase;