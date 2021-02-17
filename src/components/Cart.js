import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import ErrorBoundary from '../components/Error';
import { removeFromCart, removeFromCartAll, setRank } from "../actions/cartActions";

import ModalItem from "../components/ModalItem";

import ListItem from "../components/ListItem";
class Cart extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.state = {
      item: null,
    };
  }
  openModal = (item) => {
    console.log(item);
    this.setState({ item });
  };
  closeModal = () => {
    this.setState({ item: null });
  };
  change = (e, i) => {
    debugger;
    let newItem = i;
    newItem.rate = e.target.value;
    this.setState({ item: newItem });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { item } = this.state;
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the cart{" "}

              <button id="removeAll" onClick={() => this.props.removeFromCartAll()}>Remove All</button>
            </div>
          )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items react-reveal products">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <ErrorBoundary>
                      <ListItem key={item.id}
                        value={item}
                        openModal={this.openModal}
                        removeFromCart={this.props.removeFromCart}
                        setRank={this.props.setRank}
                      />
                    </ErrorBoundary>

                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {item && (
            <ErrorBoundary>
              <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
                <Zoom>
                  <ModalItem key={item.id}
                    value={item}
                    closeModal={this.closeModal}></ModalItem>
                </Zoom>
              </Modal>
            </ErrorBoundary>
          )}

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, removeFromCartAll, setRank }
)(Cart);
