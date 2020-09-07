import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

const deleteTooltip = (
  <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
);

const editTooltip = (
  <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
);
const viewImageTooltip = (
  <Tooltip id="close-tooltip" placement="top">View Image</Tooltip>
);
const ProductRow = withRouter(({
  product, deleteProduct, index,
}) => (
  <tr>
    <td>{product.Name}</td>
    <td>
      $
      { product.Price }
    </td>
    <td>{product.Category}</td>
    <td><a href={product.Image}>Link</a></td>
    <td>
      <LinkContainer to={`/edit/${product.id}`}>
        <OverlayTrigger delayShow={1000} overlay={editTooltip}>
          <Button bsSize="xsmall">
            <Glyphicon glyph="edit" />
          </Button>
        </OverlayTrigger>
      </LinkContainer>
      {'  '}
      <LinkContainer to={`/image/${product.id}`}>
        <OverlayTrigger delayShow={1000} overlay={viewImageTooltip}>
          <Button bsSize="xsmall">
            <Glyphicon glyph="glyphicon glyphicon-picture" />
          </Button>
        </OverlayTrigger>
      </LinkContainer>
      {'  '}
      <OverlayTrigger delayShow={100} overlay={deleteTooltip}>
        <Button bsSize="xsmall" bsStyle="danger" type="button" onClick={() => { deleteProduct(index); }}>
          <Glyphicon glyph="trash" />
        </Button>
      </OverlayTrigger>
    </td>
  </tr>
));
export default function ProductTable({ listOfProducts, deleteProduct }) {
  // const productRows = listOfProducts.map(
  //   product => <ProductRow key={product.id} product={product} deleteProduct = {deleteProduct} />,
  // );
  const productRows = listOfProducts.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));
  return (
  /* <div>This is a Place holder for Product Table Component</div> */
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price </th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </Table>
  );
}
