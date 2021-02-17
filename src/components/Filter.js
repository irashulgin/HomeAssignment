import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts } from "../actions/productActions";

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedfood: ''
    }
    this.filterChanged = this.filterChanged.bind(this);
  }

  handleSubmit() {
    this.props.filterProducts(this.state.selectedfood, 0)
  }

  filterChanged(e) {
    this.setState({
      selectedfood: e.target.value
    });
  }

  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
        <div className="filter">
          <div className="filter-food">
            Food Pairing{" "}
            <input id="food" value={this.props.selectedfood} onBlur={(e) => { this.filterChanged(e) }} />
            <button className={"fa fa-search"} id="food" onClick={(e) => { this.handleSubmit(e) }}></button>
          </div>
          <div className="filter-result">
            {this.props.filteredProducts.length} Products
        </div>
        </div>
      );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    page: state.products.page
  }),
  {
    filterProducts
  }
)(Filter);
