import { Fragment, useState } from "react";
import { formatMoney } from "../../Utils/Money";
import axios from "axios";

const CartItemDetails = ({ cartItem, loadCart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(newQuantity),
    });

    setIsEditing(false);
    await loadCart();
  };

  const handleQuantityKeyDown = (event) => {
    if (event.key === "Enter") {
      updateCartItem();
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setNewQuantity(cartItem.quantity);
    }
  };

  return (
    <Fragment>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">x{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isEditing ? (
              <input
                type="number"
                min={1}
                value={newQuantity}
                onChange={(event) => {
                  setNewQuantity(event.target.value);
                }}
                onKeyDown={handleQuantityKeyDown}
                className="quantity-input"
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            {isEditing ? "Save" : "Update"}
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default CartItemDetails;
