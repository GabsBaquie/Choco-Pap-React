// Component Carrousel
import "./carrousel.css";

// npm i react-responsive-carousel
// https://blog.openreplay.com/elegant-gallery-with-react-responsive-carousel/

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class NextJsCarousel extends Component {
  render() {
    return (
      <div id="styleBc">
        <div className="carouselWrapper">
          {/* NextJs Carousel - Geeks for Geeks */}

          <Carousel
            autoPlay
            interval={5000}
            axis="horizontal"
            infiniteLoop
            showThumbs={false}
          >
            <div>
              <img
                src="/images/accueil1.jpg"
                alt="image1"
                width={1200}
                height={600}
              />
              <p className="legend">Image 1</p>
              <button className="carouselCenterButton">
                <Link to="/Boutique">VOIR LA BOUTIQUE</Link>
              </button>
            </div>

            <div>
              <img
                src="/images/accueil2.jpg"
                alt="image2"
                width={1200}
                height={600}
              />
              <p className="legend">Image 2</p>
              <button className="carouselCenterButton">
                <Link to="/Boutique">VOIR LA BOUTIQUE</Link>
              </button>
            </div>

            <div>
              <img
                src="/images/accueil3.jpg"
                alt="image3"
                width={1200}
                height={600}
              />
              <p className="legend">Image 3</p>
              <button className="carouselCenterButton">
                <Link to="/Boutique">VOIR LA BOUTIQUE</Link>
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}
