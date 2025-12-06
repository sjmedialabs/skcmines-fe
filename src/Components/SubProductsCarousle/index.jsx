import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"; // We'll include CSS separately below
import two from "../../assets/Product-MICA/two.png";

export default function SubProductsSection(props) {
  const{data}=props;
  const{title,subProducts}=data;
  /*const products = [
    {
      id: 1,
      title: "Premium Mica Sheets",
      description:
        "Our premium mica sheets are known for high temperature resistance and superior insulation. Ideal for industrial and home applications.",
      image: two,
    },
    {
      id: 2,
      title: "Insulated Panels",
      description:
        "Energy-efficient insulated panels offering strength, durability, and eco-friendly performance for various industries.",
      image:two,
    },
    {
      id: 3,
      title: "Decorative Laminates",
      description:
        "Beautifully designed laminates available in multiple textures and finishes for modern interiors.",
      image: two,
    },
  ];*/

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="fourthPage-third-section" style={{marginBottom:"2px"}}>
      <div className="container-fluid">
        <h1 className="mica-third-section-heading">{title}</h1>
        <div className="subproducts-slider-container">
          <Slider {...settings}>
            {subProducts.map((item) => ( 
              <div key={item.id} className="subproduct-slide">
                <div className="subproduct-content">
                  <div className="subproduct-image">
                    <img src={item.subProductImageUrl} alt={item.subProductTitle} className="img"/>
                  </div>
                  <div className="subproduct-text">
                    <h2>{item.subProductTitle}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.subProductdescription }}
                  />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
