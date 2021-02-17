import React, { Component } from "react";
import Cart from "../components/Cart";

import ErrorBoundary from '../components/Error';

export default class FavoriteScreen extends Component {
  componentDidMount() {
    //set menu active
    document.getElementById("favoritePage").classList.add("activeHeader");
    document.getElementById("homePage").classList.remove("activeHeader");
  }
  render() {
    return (
      <div>
        <div className="sidebar">
          <ErrorBoundary>
            <Cart />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
