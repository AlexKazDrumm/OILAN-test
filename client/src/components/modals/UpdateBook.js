import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { fetchOneBook, updateBook } from '../../http/bookAPI.js'
import { fetchAuthors } from '../../http/authorAPI.js'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid'


const defaultValue = {title: '', year: '', author: ''}
const defaultValid = {title: null, year: null, author: null}

const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'title') result.title = value.title.trim() !== ''
        if (key === 'year') result.year = pattern.test(value.year.trim())
        if (key === 'author') result.author = pattern.test(value.author)
    }
    return result
}


const UpdateBook = (props) => {
    const { id, show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)

    
    const [authors, setAuthors] = useState(null)

   
    const [img, setImage] = useState(null)

    useEffect(() => {
        if(id) {
           
            fetchOneBook(id)
                .then(
                    data => {
                        const prod = {
                            title: data.title,
                            year: data.year.toString(),
                            author: data.authorId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                       
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
            
            fetchAuthors()
                .then(
                    data => setAuthors(data)
                )
        }
    }, [id])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const correct = isValid(value)
        setValid(correct)

            const data = new FormData()
            data.append('title', value.title)
            data.append('year', value.year.trim())
            // data.append('authorId', value.author)
            if (img) data.append('img', img, img.name)

            updateBook(id, data)
                .then(
                    data => {
                        event.target.img.value = ''
                        
                        const prod = {
                            title: data.title,
                            year: data.year.toString(),
                            author: data.authorId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                       
                        setShow(false)
                       
                        setChange(state => !state)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Редактирование книги</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="title"
                        value={value.title}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.title === true}
                        isInvalid={valid.title === false}
                        placeholder="Название книги..."
                        className="mb-3"
                    />
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="author"
                                value={value.author}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.author === true}
                                isInvalid={valid.author === false}
                            >
                                <option value="">Автор</option>
                                {authors && authors.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="year"
                                value={value.year}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.year === true}
                                isInvalid={valid.year === false}
                                placeholder="Год издания..."
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name="img"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Обложка..."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit">Сохранить</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateBook