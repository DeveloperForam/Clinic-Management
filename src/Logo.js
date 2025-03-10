import React, { useState, useEffect } from "react";
import './Logo.css';

const Logo = ({ onComplete = () => {} }) => {
  const [showHomePage, setShowHomePage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowHomePage(true);
      onComplete();
    }, 30000);
  }, [onComplete]);

  const sideImages = [
    "/images/sideimag1.png",
    "/images/sideimag2.png",
    "/images/sideimag3.png",
    "/images/sideimag4.png",
    "/images/sideimag5.png",
    "/images/sideimag6.png",
    "/images/sideimag7.png",
    "/images/sideimag8.png",
    "/images/sideimag9.png",
  ];

  // Fixed Positions Instead of Fully Random to Ensure Visibility
  const positions = [
    { top: "12%", left: "-15%" },   // Top-left  
    { top: "1%", left: "55%" },  // Top-right  
    { top: "-5%", left: "-5%" },  // Bottom-left  
    { bottom: "12%", right: "1%" }, // Bottom-right  
    { top: "48%", left: "2%" },    // Mid-left  
    { top: "48%", right: "2%" },   // Mid-right  
    { top: "-60%", left: "27%" }, // Mid-bottom-left  
    { top: "8%", right: "27%" }, // Mid-bottom-right  
    { top: "-70%", left: "18%" },  // Center image  

  ]
  return (
    <div className="logo-page">
      {!showHomePage ? (
        <div className="preload">
          <div className="logo-container">
            <img
              src="/images/logo.jpg"
              alt="Hospital Logo"
              className="logo"
            />
          </div>
          <div className="side-images">
            {sideImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Side Image ${index + 1}`}
                className="side-image"
                style={positions[index]} // Using predefined positions
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Logo;
