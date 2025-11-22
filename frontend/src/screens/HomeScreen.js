import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  
  // Get the query string (e.g., "?keyword=iphone")
  const location = useLocation();
  const keyword = location.search; 

  useEffect(() => {
    const fetchProducts = async () => {
      // Append the keyword to the API call
      // If keyword is empty, it calls '/api/products' (Show All)
      // If keyword is '?keyword=iphone', it calls '/api/products?keyword=iphone'
      const res = await fetch(`/api/products${keyword}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [keyword]); // <--- Re-run this whenever the URL changes

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {/* Sidebar Column (Simple Category Filter) */}
        <Col md={3} className='d-none d-md-block'>
          <h4>Categories</h4>
          <ListGroup variant='flush'>
            <ListGroup.Item><Link to='/'>All Products</Link></ListGroup.Item>
            <ListGroup.Item><Link to='/?keyword=Electronics'>Electronics</Link></ListGroup.Item>
            <ListGroup.Item><Link to='/?keyword=Apple'>Apple Devices</Link></ListGroup.Item>
            <ListGroup.Item><Link to='/?keyword=Sony'>Sony</Link></ListGroup.Item>
            <ListGroup.Item><Link to='/?keyword=Cannon'>Cameras</Link></ListGroup.Item>
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