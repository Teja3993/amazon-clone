import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // <--- NEW
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info from Redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    // 1. Clear ALL local storage items, not just user info
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');        // <--- NEW
    localStorage.removeItem('shippingAddress');  // <--- NEW
    localStorage.removeItem('paymentMethod');    // <--- NEW

    // 2. Clear Redux
    dispatch({ type: 'USER_LOGOUT' });
    
    // 3. Optional: Reload page to clear any lingering Redux state
    // navigate('/login'); 
    // OR cleaner:
    document.location.href = '/login'; 
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Amazon Clone</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              
              {/* CONDITIONAL RENDERING: Show User Name if logged in, else Sign In */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                <LinkContainer to='/register'>
                  <Nav.Link><i className='fas fa-user-plus'></i> Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;