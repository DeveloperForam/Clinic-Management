import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/general.css";

const images = [
  "/images/back1.png",
  "/images/back2.png",
  "/images/back3.png"
];

const Home = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
                setFade(true);
            }, 500); // Smooth transition effect
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <div className="banner">
                <div className={`image-slider ${fade ? "fade-in" : "fade-out"}`}>
                    <img src={images[currentImage]} alt="Doctor" className="slider-image" />
                </div>
                <div className="overlay">
                    <div className="banner-text">
                        <h1 className="slide-in">Best Doctors and Equipment in Town</h1>
                        <p className="fade-text">Your Health, Our Priority.</p>
                        <button className="cta-btn pulsate" onClick={() => navigate("/patient/book-appointment")}>
                            Make Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
