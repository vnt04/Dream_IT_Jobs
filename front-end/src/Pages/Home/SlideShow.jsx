import  { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

const SlideShow = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 1500); 
        return () => clearInterval(interval);
    });
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <div className="relative">
            <div className="relative">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500  ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} className="w-full custom-slider" />
                    </div>
                ))}
                <button
                    onClick={prevSlide}
                    className="absolute custom-top-button-slider left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l"
                >
                    &lt;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute custom-top-button-slider right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

SlideShow.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SlideShow;
