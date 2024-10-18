import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { bookAsync } from '../../Actions/libararyAction'; 
import { useNavigate } from 'react-router-dom';

function LibraryFrom() {
    
    const [formInput, setFormInput] = useState({
        btitle: '',
        author: '',
        genre: '',
        pyear: '',
        image: null,
    });
    
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleClick = (e) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setFormInput({ ...formInput, image: reader.result });
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("formInput", formInput);
    
        
        formInput.id = Math.floor(Math.random() * 10000).toString();
        

        dispatch(bookAsync(formInput));

        navigate('/view');

      
    };

    const bookData = () =>{
        navigate('/view');
    }

    return (
        <Container>
            <h1 className='text-center mt-5 mb-3'>Library Form</h1>
            <div className='text-center mb-5'>
                <button type='button' className="book-btn" onClick={bookData}>View Book Data </button>
            </div>
            <form className="row g-3 library-form" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="btitle" className="form-label">Book Title : </label>
                    <input type="text" className="form-control" id="btitle" placeholder="Enter book title" name='btitle' value={formInput.btitle} onChange={handleClick} required/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="author" className="form-label">Author : </label>
                    <input type="text" className="form-control" id="author" placeholder="Enter author name" name='author' value={formInput.author} onChange={handleClick} required/>
                </div>
                <div className="col-6">
                    <label htmlFor="genre" className="form-label">Genre : </label>
                    <input type="text" className="form-control" id="genre" placeholder="Enter genre" name='genre' value={formInput.genre} onChange={handleClick} required/>
                </div>
                <div className="col-6">
                    <label htmlFor="pyear" className="form-label">Publication Year : </label>
                    <input type="number" className="form-control" id="pyear" placeholder="Enter publication year" name='pyear' value={formInput.pyear} onChange={handleClick} required/>
                </div>
                <div className="col-6">
                    <label htmlFor="image" className="form-label">Book Image : </label>
                    <input type="file" className="form-control" id="image" name='image' accept="image/*" onChange={handleImage} required/>
                </div>
                <div className="col-12">
                    <button type="submit" className="book-btn mt-3">Add Book</button>
                </div>
            </form>
           
        </Container>
    );
}

export default LibraryFrom;
