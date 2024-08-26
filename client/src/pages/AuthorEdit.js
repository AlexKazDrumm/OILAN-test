import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {createAuthor, deleteAuthor} from '../http/authorAPI';
import {useParams} from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CreateAuthor = observer(() => {
    const {id} = useParams()
    const {author} = useContext(Context)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [year, setYear] = useState('')


    const rewriteAuthor = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('year', year)

        if (name && surname && year) {
            createAuthor(formData)
            deleteAuthor(id)
            window.alert("Данные автора обновлены!")
        } else {window.alert("Введены не все данные!")}

    }

    return (
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите имя автора"}
                    />
                    <Form.Control
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        placeholder={"Введите фамилию автора"}
                    />
                    <Form.Control
                        className="mt-3"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        placeholder={"Введите год рождения автора"}
                    />
                    <hr/>
                    <Button variant="outline-success" onClick={rewriteAuthor}>Обновить</Button>
                </Form>
    );
});

export default CreateAuthor;