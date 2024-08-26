import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {createAuthor} from '../../http/authorAPI';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateAuthor = observer(({show, onHide}) => {
    const {author} = useContext(Context)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [year, setYear] = useState('')


    const addAuthor = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('year', year)
        createAuthor(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить автора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAuthor}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAuthor;