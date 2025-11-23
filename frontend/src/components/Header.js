import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    dispatch({ type: 'USER_LOGOUT' });
    document.location.href = '/login';
  };

  // Amazon's dark blue hex code: #131921
  return (
    <header>
      <Navbar style={{ backgroundColor: '#131921' }} variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '1px' }}>
              AMAZON CLONE
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            
            {/* CHANGE: 'ms-auto' pushes items to the RIGHT in Bootstrap 5 */}
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

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
                    <Nav.Link>
                      <i className='fas fa-user-plus'></i> Register
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
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