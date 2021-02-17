import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
        <div className="filter">
          <div className="filter-food">
            Food Pairing{" "}
            <input id="food"
              value={this.props.selectedfood}
              onKeyDown={(e) => {
                var keycode = e.keyCode || e.which;
                if (keycode === '13') this.props.filterProducts(this.props.products, e.target.value, 0)
              }}
              onBlur={(e) => {
                this.props.filterProducts(this.props.products, e.target.value, 0)
              }
              }
            />
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
