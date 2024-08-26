import {useContext, useEffect} from 'react';
import AuthorBar from '../components/AuthorBar';
import BookBase from '../components/BookBase';
import Pages from '../components/Pages';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';
import {fetchBooks} from '../http/bookAPI';
import {fetchAuthors} from '../http/authorAPI';
import {Container, Col, Row, Button} from "react-bootstrap";


const Books = observer(() => {
  const {book} = useContext(Context)
  
  useEffect(() => {
    fetchAuthors().then(data => book.setAuthors(data))
    fetchBooks(null, null, 1, 8).then(data => {
      book.setBooks(data.rows)
      book.setTotalCount(data.count)
      })
  }, [])

  useEffect(() => {
    fetchBooks(book.selectedAuthor.id, book.page, 8).then(data => {
      book.setBooks(data.rows)
      book.setTotalCount(data.count)
    })
  }, [book.page, book.selectedAuthor])

  return (
    <Container>
      <Row className="mt-3 mainPage">
        <div className="left-pad">
          <div className="Filters">
          <AuthorBar />
          </div>
          <div className="clearBtn"><Button 
            className="btn btn-dark w-75"
            onClick={() => {
              book.setSelectedAuthor('')
            }}
          >
          Сбросить фильтр
          </Button>
          </div>
        </div>
        <div className="right-pad me-5">
          <BookBase />
          <Pages />
        </div>
      </Row>
    </Container>
  );
});

export default Books;
