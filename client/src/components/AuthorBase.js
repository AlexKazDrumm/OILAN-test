import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AuthorCard from "./AuthorCard";

const AuthorBase = observer(() => {
	const {author} = useContext(Context)

	return (
		<Row className="d-flex authorBase">
			{author.authors.map(author => 
				<AuthorCard key={author.id} author={author}/>
			)}
		</Row>
	);
});

export default AuthorBase;