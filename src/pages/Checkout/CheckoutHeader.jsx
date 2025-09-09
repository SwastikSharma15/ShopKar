import './CheckoutHeader.css';
import { Link } from 'react-router'
import CheckoutLockIcon from '../../assets/Images/icons/checkout-lock-icon.png';
import Logo from '../../assets/Images/logo.png';
import MobileLogo from '../../assets/Images/mobile-logo.png';

function CheckoutHeader({cart}) {
  const itemCount = Array.isArray(cart) 
  ? cart.reduce((total, item) => total + item.quantity, 0) 
  : 0;

  return (
    <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={Logo} />
              <img className="mobile-logo" src={MobileLogo} />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {itemCount} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src={CheckoutLockIcon} />
          </div>
        </div>
      </div>
  )
}

export default CheckoutHeader