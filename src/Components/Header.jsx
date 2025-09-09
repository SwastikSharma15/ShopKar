import { Link, useNavigate, useSearchParams } from "react-router";
import CartIcon from "../assets/Images/icons/cart-icon.png";
import SearchIcon from "../assets/Images/icons/search-icon.png";
import "./Header.css";
import { useState } from "react";

function Header({ cart }) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [search, setSearch] = useState(searchText || "");
  const navigate = useNavigate();

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  const handleQuantityKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProducts();
    } else if (event.key === "Escape") {
      event.target.value = "";
      setSearch("");
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <div className="shop-logo">
            <span className="shop-text">Shop</span>
            <span className="kar-text">Kar</span>
          </div>
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={updateSearchInput}
          onKeyDown={handleQuantityKeyDown}
        />

        <button className="search-button" onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
