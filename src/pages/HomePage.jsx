import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white h-screen">
<img
  src={`${import.meta.env.BASE_URL}nursery1.jpg`}
  className="w-full h-full object-cover"
  alt="Hero Image"
/>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-11/12">
        <div className="bg-black/50 backdrop-blur-md px-6 py-4 rounded-xl h-full flex items-center justify-between">
          <div className="flex flex-col justify-center w-1/3">
            <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
              Welcome to Green Gardens
            </h1>
            <hr className="my-2" />
            <p className="text-white text-md md:text-lg lg:text-xl text-center">
              Find the perfect plant for you
            </p>
            <button
              className="text-white text-md md:text-lg lg:text-xl bg-green-500 text-center p-2 rounded-lg mt-4"
              onClick={() => navigate('/product')}
            >
              Get Started
            </button>
          </div>
          <div className="text-white w-3/6 md:text-lg lg:text-xl text-center">
            <p>Welcome to Green Gardens Nursery!</p>
            <br />
            <p>We have been growing and caring for plants since 1981.</p>
            <p>
              Our nursery is a peaceful place where you can find beautiful flowers, indoor and outdoor plants, herbs, and trees.
            </p>
            <p>
              At Green Gardens, we believe plants bring joy, fresh air, and life to any space. Whether you're a beginner or an experienced gardener, we’re here to help you find the perfect plant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
