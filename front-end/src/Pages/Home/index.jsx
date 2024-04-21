import SlideShow from "./SlideShow";

function Home() {
    const ImageSlider = [
        "/src/assets/ImageSlider/ImageSlider1.png",
        "/src/assets/ImageSlider/ImageSlider2.jpg",
        "/src/assets/ImageSlider/ImageSlider3.jpg",
        "/src/assets/ImageSlider/ImageSlider4.jpg",
        "/src/assets/ImageSlider/ImageSlider5.png",
    ]
    return (  
        <SlideShow images={ImageSlider}/>
    );
}

export default Home;