import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createBook, fetchBooks} from '../../http/bookAPI'; 
import {fetchAuthors} from '../../http/authorAPI' 

const CreateBook = observer(({show, onHide}) => {
	const {book} = useContext(Context)
    const {author} = useContext(Context)
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
    fetchAuthors(null, null, 1, 8).then(data => {
      author.setAuthors(data.rows)
      author.setTotalCount(data.count)
      })
  }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addBook = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('year', year)
        formData.append('img', file)
        formData.append('authorId', book.selectedAuthor.id)
        createBook(formData).then(data => onHide())
    }

	return (
		<Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить книгу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                	<Dropdown className="mt-2 mb-2">
                		<Dropdown.Toggle>{book.selectedAuthor.name || 'Выберите автора'}</Dropdown.Toggle>
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
                	</Dropdown>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={"Введите название книги"}
                    />
                    <Form.Control
                        className="mt-3"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        placeholder={"Введите год издания"}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBook}>Добавить</Button>
            </Modal.Footer>
        </Modal>
	);
});

export default CreateBook;