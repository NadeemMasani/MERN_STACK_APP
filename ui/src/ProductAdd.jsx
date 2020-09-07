import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button,
} from 'react-bootstrap';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    let prce = form.price.value;
    prce = prce.slice(1);
    const product = {
      Name: form.productName.value,
      Price: prce,
      Category: form.category.value,
      Image: form.imageurl.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.productName.value = '';
    form.price.value = '$';
    form.imageurl.value = '';
    form.category.value = 'Shirts';
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Add a New Product to inventory</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal name="productAdd" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={1}>Category:</Col>
              <Col sm={6}>
                <FormControl componentClass="select" name="category">
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={1}>Price:</Col>
              <Col sm={6}>
                <FormControl type="text" name="price" defaultValue="$" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={1}>Product Name:</Col>
              <Col sm={6}>
                <FormControl type="text" name="productName" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={1}>Image URL:</Col>
              <Col sm={6}>
                <FormControl type="text" name="imageurl" />
              </Col>
            </FormGroup>
            <Col smOffset={1} sm={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Add Product</Button>
              </ButtonToolbar>
            </Col>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired,
};
