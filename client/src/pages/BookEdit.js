import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {createBook, fetchBooks, fetchOneBook, deleteBook} from '../http/bookAPI'; 
import {fetchAuthors} from '../http/authorAPI' 

const UpdateBook = observer(() => {
    const {id} = useParams()
    const {book} = useContext(Context)
    const {author} = useContext(Context)
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
    fetchOneBook(id)
    fetchAuthors(null, null, 1, 8).then(data => {
      author.setAuthors(data.rows)
      author.setTotalCount(data.count)
      })
  }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    console.log (book.title)
    const rewriteBook = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('year', year)
        formData.append('img', file)
        formData.append('authorId', book.selectedAuthor.id)

        if (title && year && file && book.selectedAuthor.id) {
            createBook(formData)
            deleteBook(id)
            window.alert("Данные книги обновлены!")
        } else {window.alert("Введены не все данные!")}
        
    }

    return (
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{book.selectedAuthor.surname || 'Выберите автора'}</Dropdown.Toggle>
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
                        placeholder={book.title}
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
                    <Button variant="outline-success" onClick={rewriteBook}>Обновить</Button>
                </Form>
    );
});

export default UpdateBook;