import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  
  // FIXED: Only declare location and query once
  const location = useLocation();
  const query = location.search; 

  useEffect(() => {
    const fetchProducts = async () => {
      // Pass the whole query string (e.g. ?category=Electronics) to backend
      const res = await fetch(`/api/products${query}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [query]);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {/* Sidebar Column (Simple Category Filter) */}
        <Col md={3} className='d-none d-md-block'>
          <h4>Categories</h4>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                All Products
              </Link>
            </ListGroup.Item>
            
            <ListGroup.Item>
              {/* Shows everything because all our mock items are Electronics */}
              <Link to='/?category=Electronics' style={{ textDecoration: 'none', color: 'black' }}>
                Electronics (Category)
              </Link>
            </ListGroup.Item>
            
            <ListGroup.Item>
              {/* Uses the new BRAND filter */}
              <Link to='/?brand=Apple' style={{ textDecoration: 'none', color: 'black' }}>
                Apple Devices
              </Link>
            </ListGroup.Item>
            
            <ListGroup.Item>
              {/* Uses the new BRAND filter */}
              <Link to='/?brand=Sony' style={{ textDecoration: 'none', color: 'black' }}>
                Sony
              </Link>
            </ListGroup.Item>
            
            <ListGroup.Item>
              {/* Searches for "Camera" in the name */}
              <Link to='/?keyword=Camera' style={{ textDecoration: 'none', color: 'black' }}>
                Cameras
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Product Grid Column */}
        <Col md={9}>
          <Row>
            {products.length === 0 ? (
              <h3>No products found</h3>
            ) : (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;