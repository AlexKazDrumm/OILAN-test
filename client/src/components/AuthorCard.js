import React from 'react';
import {Row, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {AUTHOR_CARD_ROUTE, AUTHOR_EDIT_ROUTE} from "../utils/consts";
import {deleteAuthor} from '../http/authorAPI';

const AuthorCard = ({author}) => {
	const navigate = useNavigate()
	return (
			<Row className={"authorInfo"} border={'light'}>
				<Col>
				<div >
					{author.surname + ' ' + author.name}
				</div>
				
				<div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
					<div>Год: {author.year}</div>
					
				</div>
				
				<button onClick={() => navigate(AUTHOR_EDIT_ROUTE + '/' + author.id)} className="editButton">&#9998;</button>
				<button onClick={() => {
					deleteAuthor(author.id)
					window.location.reload()}
				} className="deleteButton">&#128465;</button>
				</Col>
			</Row>

	);
};

export default AuthorCard;