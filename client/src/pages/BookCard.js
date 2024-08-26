import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import {useParams} from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchOneBook} from '../http/bookAPI'
import {fetchOneAuthor} from '../http/authorAPI'

const BookCard = () => {

  const [book, setBook] = useState({info: []})

  const {id} = useParams()

  useEffect(() => {

    fetchOneBook(id).then(data => {setBook(data)})
    

  }, [])


  return (
    <Container>
      <Row>
      <Col md={4}>
        <Image height={280} src={process.env.REACT_APP_API_URL + book.img} className={"mt-2"}/>
      </Col>
      <Col md={4}>
        <Row className="d-flex flex-column align-items-center">
          <h2>{book.title}</h2>
        </Row>
      </Col>
      </Row>
    </Container>
  );
};

export default BookCard;
