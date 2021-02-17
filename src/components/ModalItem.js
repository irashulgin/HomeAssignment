import React from "react";

const ModalItem = (props) => {
  let product = props.value;
  return (
    <div>
      <button className="close-modal" onClick={() => props.closeModal(product)}>
        x
      </button>
      <div className="product-details">
        <img src={product.image_url} alt={product.name}></img>
        <div className="product-details-description">
          <p>
            <strong>{product.name}</strong>
          </p>
          <p>
            <strong>{product.tagline}</strong>
          </p>
          <p>{product.description}</p>
          <div className="product-brewed"> <strong>First brewed  :  {product.first_brewed} </strong></div>
          <div className="product-brewed">
            <strong>Brewers tips :</strong>{product.brewers_tips}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalItem;