import React, {useEffect, useState, useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {BOOK_CARD_ROUTE, BOOK_EDIT_ROUTE} from "../utils/consts";
import {deleteBook} from '../http/bookAPI';
import {fetchOneAuthor} from '../http/authorAPI'

const BookCard = ({book}) => {
	const [author, setAuthor] = useState({info: []})
	  useEffect(() => {
   		fetchOneAuthor(book.authorId).then(data => {setAuthor(data)})
	}, [])
	const navigate = useNavigate()
	return (
		<Col md={3} className={"mt-3 bookCard"} >
			<Card className={"bookInfo"} style={{cursor: 'pointer'}} border={'light'}>
				<Image className={"bookPic"} src={process.env.REACT_APP_API_URL + book.img} onClick={() => navigate(BOOK_CARD_ROUTE + '/' + book.id)}/>
				<button onClick={() => navigate(BOOK_EDIT_ROUTE + '/' + book.id)}>&#9998;</button>
				<button onClick={() => {
					deleteBook(book.id)
					window.location.reload()}
				}>&#128465;</button>
				<div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
					<div>Автор: {author.surname + ' ' + author.name}</div>
					
				</div>
				<div>{book.title}</div>
				<div>Год: {book.year}</div>

			</Card>
		</Col>
	);
};

export default BookCard;