import React, { Component } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import ErrorBoundary from '../components/Error';
export default class HomeScreen extends Component {
  componentDidMount() {
    document.getElementById("homePage").classList.add("activeHeader");
    document.getElementById("favoritePage").classList.remove("activeHeader");
  }
  render() {
    return (
      <div>
        <div className="content">
          <div className="main">
            <Filter></Filter>
            <ErrorBoundary>
              <Products></Products>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  }
}
