import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateAuthor from '../components/modals/CreateAuthor';
import CreateBook from '../components/modals/CreateBook';

const Index = () => {
  const [authorVisible, setAuthorVisible] = useState(false)
  const [bookVisible, setBookVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button 
        variant={"outline-dark"} 
        className="mt-2"
        onClick={() => setAuthorVisible(true)}
      >
        Добавить автора
      </Button>
      <Button 
        variant={"outline-dark"} 
        className="mt-2"
        onClick={() => setBookVisible(true)}
      >
        Добавить книгу
      </Button>

      <CreateBook show={bookVisible} onHide={() => setBookVisible(false)}/>
      <CreateAuthor show={authorVisible} onHide={() => setAuthorVisible(false)}/>

    </Container>
  );
};

export default Index;
