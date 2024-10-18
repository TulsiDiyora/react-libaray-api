import React, { useEffect } from 'react';
import { Container, Card, Row, Col, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAsync, getAsync, selectDropdown, singleAsync } from '../../Actions/libararyAction'; // Make sure to import getAsync
import { useNavigate } from 'react-router-dom';
import LibraryLoader from '../Loader/Loader';

function View() {
  const { books, book, dropdownn, isLoading, isError, errorMsg } = useSelector(state => state.libararyRedux);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log("handleEdit", id);
    dispatch(singleAsync(id));
  };

  const handleDelete = (id) => {
    console.log("handleDelete", id);
    dispatch(deleteAsync(id));
  };

  const handleSelect = (genre) => {
    dispatch(selectDropdown(genre));
  };

  useEffect(() => {
    dispatch(getAsync()); 
  }, [dispatch]);

  useEffect(() => {
    console.log("book", book);
    if (book) {
      navigate('/edit');
    }
  }, [book]);

  const handleBack = () => {
    navigate('/');
  };

  const filteredBooks = dropdownn.length > 0 ? dropdownn : books;

  return (
    <Container>
      <div className='text-center'>
        <h1 className="text-center mt-5 mb-3 title-background">Book - List</h1>
      </div>

      <Dropdown className='mb-5 text-center'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown-Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelect('')}>all</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect('fiction')}>fiction</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect('history')}>history</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect('cartoon')}>cartoon</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect('horror')}>horror</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect('drama')}>drama</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Row>
        {
          isError ?
            <h1>{errorMsg}</h1>
            :
            isLoading ?
             <LibraryLoader />
              :
              filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <Col key={index} md={4} className="mb-4">
                    <Card className='card-background shadow-sm border-light'>
                      {book.image && (
                        <Card.Img
                          variant="top"
                          src={book.image}
                          alt={book.btitle}
                          style={{ height: '300px', backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '10px' }}
                        />
                      )}
                      <Card.Body>
                        <Card.Title ><strong className="fw-bold">Title: </strong>{book.btitle}</Card.Title><hr />
                        <Card.Text >
                          <strong>Author:</strong> {book.author} <br /><hr />
                          <strong>Genre:</strong> {book.genre} <br /><hr />
                          <strong>Publication Year:</strong> {book.pyear}<br /><hr />
                          <button className="btn btn-primary mt-2" onClick={() => handleEdit(book.id)}>Edit</button>&nbsp; || &nbsp;
                          <button className="btn btn-danger mt-2" onClick={() => handleDelete(book.id)}>Delete</button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center error">No books available in this Library.</p>
              )}
      </Row>

      <div className='text-center'>
        <button className="book-btn mb-2" onClick={handleBack}>
          Back to Form
        </button>
      </div>
    </Container>
  );
}

export default View;
