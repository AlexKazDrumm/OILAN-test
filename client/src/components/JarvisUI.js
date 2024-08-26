import React, {useContext} from 'react';
import {Context} from '../index';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {AUTHORS_ROUTE, BOOKS_ROUTE, BOOK_WORM_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'

const JarvisUI = observer(() => {
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={AUTHORS_ROUTE}>База авторов</NavLink>
                <NavLink style={{color:'white'}} to={BOOKS_ROUTE}>Библиотека</NavLink>
                <NavLink style={{color:'white'}} to={BOOK_WORM_ROUTE}>Админка</NavLink>
            </Container>
        </Navbar>

    );
});

export default JarvisUI;