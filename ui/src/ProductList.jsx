import React from 'react';
/* eslint "react/jsx-no-undef": "off" */
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';


export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { listOfProducts: [], count : null };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
         productList {
           id Name Category Price Image
         }
       }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ listOfProducts: result.data.productList}); 
    this.getCount();
    
  }

  async getCount(){
    const query = `query{
      productCount {
        Total
      }
    }`;

 const response = await fetch(window.ENV.UI_API_ENDPOINT, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ query }),
 });
 const result = await response.json();
 console.log(result);
 this.setState({count: result.data.productCount.Total}); 
//  console.log(count);
}

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { listOfProducts } = this.state;
    const { id } = listOfProducts[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.listOfProducts];
        // if (pathname === `/products/${id}`) {
        //   history.push({ pathname: '/issues', search });
        // }
        newList.splice(index, 1);
        this.getCount();
        return { listOfProducts: newList};
      });
    } else {
      this.loadData();
    }
  }


  async createProduct(product) {
    const query = `mutation productAdd($product : ProductInputs!){
        productAdd(product : $product){
          id
        }
      }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });
    this.loadData();
  }

  render() {
    const { listOfProducts,count } = this.state;
    return (
      <React.Fragment>
        <h3>Showing {count} available products in inventory</h3>
        {/* <TotalCount /> */}
        <hr />
        <ProductTable listOfProducts={listOfProducts} deleteProduct={this.deleteProduct} />
        <hr />
        <h3>Add New Product to Inventory</h3>
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}
