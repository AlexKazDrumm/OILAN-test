import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import {useParams} from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchOneAuthor} from '../http/authorAPI'

const AuthorCard = () => {

  const [author, setAuthor] = useState({info: []})
  const {id} = useParams()


  useEffect(() => {

    fetchOneAuthor(id).then(data => {
      setAuthor(data)
    })
  }, [])

  return (
    <Container>
        <Row className="d-flex flex-column align-items-center">
          <h2>{author.surname + ' ' + author.name}</h2>
          <div>{author.year}</div>
        </Row>
    </Container>
  );
};

export default AuthorCard;
