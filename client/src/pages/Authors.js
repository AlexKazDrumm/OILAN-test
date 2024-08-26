import React, {useContext, useEffect} from 'react';
import AuthorBase from '../components/AuthorBase';
import Pages from '../components/Pages';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';
import {fetchBooks} from '../http/bookAPI';
import {fetchAuthors} from '../http/authorAPI';
import {Container, Col, Row, Button} from "react-bootstrap";


const Authors = observer(() => {
  const {author} = useContext(Context)

  useEffect(() => {
    fetchAuthors(null, null, 1, 8).then(data => {
      author.setAuthors(data.rows)
      author.setTotalCount(data.count)
      })
  }, [])


  return (
    <Container>
      <Row className="mt-3 mainPage">
        <div className="right-pad me-5">
          <AuthorBase />
        </div>
      </Row>
    </Container>
  );
});

export default Authors;
