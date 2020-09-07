import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      // invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onValidityChange = this.onValidityChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  // onValidityChange(event, valid) {
  //   const { name } = event.target;
  //   this.setState((prevState) => {
  //     const invalidFields = { ...prevState.invalidFields, [name]: !valid };
  //     if (valid) delete invalidFields[name];
  //     return { invalidFields };
  //   });
  // }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    console.log(product); // eslint-disable-line no-console
    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id Name Category Price Image 
      }
    }`;

    const { id, ...changes } = product;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated issue successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query product($id: Int!) {
        product(id: $id) {
          id Name Category Price Image
        }
      }`;
    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    // if (data) {
    //   const { product } = data;
    //   product.Name = product.Name != null ? product.Name : '';
    //   // product.Price = product.Price != null ? product.Price.toString() : '';
    //   product.Image = product.Image != null ? product.Image : '';
    //   product.Category = product.Category != null ? product.Category : '';
    //   this.setState({ product });
    // } else {
    //   this.setState({ product: {} });
    // }
    this.setState({ product: data ? data.product : {} });
  }

  render() {
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    const { product: { Name, Category } } = this.state;
    const { product: { Price, Image } } = this.state;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    // const { invalidFields } = this.state;
    // let validationMessage;
    // if (Object.keys(invalidFields).length !== 0) {
    //   validationMessage = (
    //     <div className="error">
    //       Please correct invalid fields before submitting.
    //     </div>
    //   );
    // }
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>{`Editing Product: ${id}`}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Category</Col>
              <Col sm={6}>
                <FormControl componentClass="select" name="Category" value={Category} onChange={this.onChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Product Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass={TextInput}
                  name="Name"
                  value={Name}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Price</Col>
              <Col sm={6}>
                <FormControl
                  componentClass={NumInput}
                  name="Price"
                  value={Price}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Image URL</Col>
              <Col sm={6}>
                <FormControl
                  componentClass={TextInput}
                  name="Image"
                  value={Image}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <Col smOffset={3} sm={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Submit</Button>
                <LinkContainer to="/products">
                  <Button bsStyle="link">Back</Button>
                </LinkContainer>
              </ButtonToolbar>
            </Col>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}
