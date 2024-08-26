import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Row, Card, Dropdown, Button} from "react-bootstrap";
import {fetchAuthors} from '../http/authorAPI' 


const AuthorBar = observer(() => {
	const {book} = useContext(Context)
	const {author} = useContext(Context)
	useEffect(() => {
    fetchAuthors(null, null, 1, 8).then(data => {
      author.setAuthors(data.rows)
      author.setTotalCount(data.count)
      })
  }, [])
	return (
		<Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle className="btn btn-dark dropdown-toggle w-75">{book.selectedAuthor.surname || 'Выберите автора'}</Dropdown.Toggle>
            <Dropdown.Menu>
                {author.authors.map(author =>
                	<Dropdown.Item 
                        onClick={() => book.setSelectedAuthor(author)} 
                        key={author.id}
                    >
                		{author.surname + ' ' + author.name}
                    </Dropdown.Item>
                			)}
            </Dropdown.Menu>
            <Button 
            className={book.selectedAuthor.id > 0 ? "btn btn-primary ghost-style btn-sm ms-2" : "d-none"}
            onClick={() => {
              book.setSelectedAuthor(0)
            }}
          	>
         	 X
          	</Button>
        </Dropdown>
	);
});

export default AuthorBar;