import { useState, useEffect } from 'react';
import './NotificationBanner.css';

function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    const newTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000000); 
    setTimer(newTimer);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timer) clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    startTimer();
  };

  const handleClose = () => {
    setIsVisible(false);
    if (timer) clearTimeout(timer);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="notification-banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Close button on the left */}
      <button className="close-btn" onClick={handleClose}>
        ×
      </button>

      <div className="notification-content">
        <span className="warning-icon">⚠️</span>
        <span className="note-text">Note: </span>
        Backend services are disabled on the live demo (to avoid hosting costs). 
        Features like product search, cart sync, and checkout are not functional here.
        <br />
        <span className="pointer-icon">👉</span>
        For the fully working version with a local database, please see: 
        <a 
          href="https://swastiksharma15.github.io/Amazon-with-HTML-CSS-JS/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="project-link"
        >
          Ecommerce Project on Local Database
        </a>
      </div>
    </div>
  );
}

export default NotificationBanner;