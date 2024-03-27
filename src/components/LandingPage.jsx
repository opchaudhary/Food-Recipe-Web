import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div>
            <header>
                <h1>Welcome to Foodie Delight</h1>
            </header>
            <section>
                <div className='para-content'>
                    <p>
                        Welcome to our culinary hub, where you can unleash your inner chef and embark on a flavorful journey through a world of diverse cuisines! Whether you're a seasoned home cook or just starting your culinary adventure, our platform offers a delightful array of recipes to suit every taste and skill level.
                    </p>
            
                    <p>
                        But the adventure doesn't stop there! Feel free to share your own culinary masterpieces with our community by adding your favorite recipes to our ever-growing collection. Join a vibrant community of food enthusiasts, exchange tips and tricks, and celebrate the joy of cooking together.
                    </p>
                    <p>
                        Get ready to explore, create, and indulge in the art of cooking like never before. Join us today and let's embark on a delicious journey together!
                    </p>
                    <h2>
                        Ready to get cooking? <Link to="/login">Login</Link> or <Link to="/register">Register</Link> now!
                    </h2>
                </div>
                <div className='image-container'>
                    <img src={require("../img/landing.jpg")} alt="Food Recipe Image" style={{
                        padding: 100
                    }} />
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
