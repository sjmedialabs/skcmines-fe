import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"; // We'll include CSS separately below
import two from "../../assets/Product-MICA/two.png";
const ProductCarousle=(props)=>{
      const{data}=props;
//   const{title,subProducts}=data;
  const products = [
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
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
   
    responsive: [
      {
        breakpoint: 1024,
        // settings: {
        //   arrows: true,
        // },
      },
    ],
  };
    return(
        <div className="col-md-6 mb-1"  style={{backgroundColor:"#505b8e",padding:"20px"}}>
            <Slider {...settings}>
            {data.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.subProductTitle} style={{width:"100%"}}/>
                {/* <div className="subproduct-content">
                  <div className="subproduct-image">
                  
                  </div>
                 
                </div> */}
              </div>
            ))}
          </Slider>
        </div>
    )
}
export default ProductCarousle;