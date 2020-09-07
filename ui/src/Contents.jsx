import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductImage from './ProductImage.jsx';
import ProductReport from './ProductReport.jsx';


const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route path="/image/:id" component={ProductImage} />
      <Route path="/report" component={ProductReport} />
      <Route component={NotFound} />
    </Switch>
  );
}
