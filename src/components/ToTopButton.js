import React, { useState, useEffect } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState();

  // Smoothly scroll to top on click
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show/hide button based on scroll ammount
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Adds then removes listener to window scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll to top button */}
      <Button
        aria-label="Scroll to top"
        className={`top-button ${isVisible && "visible"}`}
        onClick={handleClick}
      >
        Top <i className="fas fa-arrow-up" style={{ color: "white" }}></i>
      </Button>
    </>
  );
};

export default ToTopButton;
