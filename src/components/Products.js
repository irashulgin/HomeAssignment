import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts, filterProducts } from "../actions/productActions";
import { addToCart, removeFromCart } from "../actions/cartActions";
import ListItem from "../components/ListItem";
import ModalItem from "../components/ModalItem";
import ErrorBoundary from '../components/Error';
import ReactPaginate from 'react-paginate';

class Products extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    debugger;
    this.state = {
      product: null,
      currentPage: 0,
      perPage: 12
    };
  }
  handlePageClick = (e) => {
    debugger;
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    let filter = document.getElementById("food").value;
    let cb;
    if (filter === "") {
      cb = () => {
        this.props.fetchProducts(this.state.currentPage);
      };
    } else {
      debugger;
      cb = () => {
        this.props.filterProducts(this.props.products, filter, this.state.currentPage);
      }
    };
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, cb
    );

  };
  componentDidMount(error, info) {
    debugger;
    console.log("PAGE", this.state.currentPage);
    let page = 0;
    this.props.fetchProducts(page);
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
              <ul className="products">
                {this.props.products && this.props.products.map((product) => (
                  <li key={product.id}>
                    <ErrorBoundary>
                      <ListItem key={product.id}
                        value={product}
                        addToCart={this.props.addToCart}
                        removeFromCart={this.props.removeFromCart}
                        openModal={this.openModal}
                        frompage="products"
                      />
                    </ErrorBoundary>
                  </li>
                ))}
              </ul>
            )}
        </Fade>
        {product && (
          <ErrorBoundary>
            <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
              <Zoom>
                <ModalItem key={product.id}
                  value={product}
                  closeModal={this.closeModal}></ModalItem>
              </Zoom>
            </Modal>
          </ErrorBoundary>
        )}
        <div>
          {this.state.postData}
          <ErrorBoundary> <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    filterProducts,
    addToCart,
    removeFromCart
  }
)(Products);//component to connect to store
