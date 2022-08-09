import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
function Color() {
  const navigate = useNavigate()
  function logout() {
    localStorage.clear()
    navigate('/')
  }
  return (

    <>

      <Navbar bg="primary" variant="dark" >
        <Container>
          <Navbar.Brand href="#home"><MenuIcon /></Navbar.Brand>
          <Nav className="me-auto">
          
            {
              localStorage.getItem('token') ?
                <>
                  <Link to="/postdata" className='text-light  text-decoration-none m-3'>PostData</Link>
                  <Link to="/getpostdata" className='text-light  text-decoration-none m-3'>Getpostdata</Link>
                  <Link to="/getpost" className='text-light  text-decoration-none m-3'>Getpostredux</Link>
                </>
                :
                <>
                  <Link to="/" className='text-light  text-decoration-none m-3'>Registration</Link>
                  <Link to="/login" className='text-light  text-decoration-none m-3'>Login</Link>
                </>
            }
             

            <LogoutIcon className='text-light  text-decoration-none m-3' onClick={logout} />
          
          </Nav>
        </Container>
      </Navbar>

   </>
  );
}

export default Color;