import React, { Component } from "react";
import { connect } from "react-redux";


class ListItem extends Component {

    constructor(props) {
        super(props);
        let product = this.props.value;

        this.state = {
            product: product,
            setRank: this.props.setRank
        };
        this.change = this.change.bind(this);

    }

    change(e) {
        let newprod = this.state.product;
        newprod.rank = e.target.value ? e.target.value : "";
        this.state.setRank(newprod);
    }


    add(e) {
        e.target.classList.add("checked");
        this.props.addToCart(this.state.product);
    }

    remove(e) {
        e.target.classList.remove("checked");
        this.props.removeFromCart(this.state.product)
    }

    render() {
        let product = this.state.product;
        return (
            <div className="product" key={product.id}>
                {this.props.frompage !== "products" ? (
                    <div className="rank">
                        <div>Rank:</div>
                        <select name="rank" id="rank" value={product.rank} onChange={(e) => this.change(e, product)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                ) : <div></div>
                }
                <div onClick={() => this.props.openModal(product)}>
                    <img src={product.image_url} alt={product.name}></img>
                    <p>{product.name}</p>
                </div>
                <button
                    onClick={(e) => {
                        !e.target.classList.contains("checked") ?
                            this.add(e, product)
                            :
                            this.remove(e, product)
                    }
                    }
                    className={
                        this.props.cartItems.find(x => { return x.id === product.id }) ? "fa fa-star checked" : "fa fa-star"
                    }
                >
                </button>
            </div>
        )
    }
}


export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
        product: state.product
    }),
    {}
)(ListItem);
