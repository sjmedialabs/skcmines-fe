import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Vector from "../../assets/product-clay/Vector.png";
import VideoModal from "../VideoModel";
import HeaderEl from "../Header";
import FooterEl from "../Footer";

import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from '../../assets/Product-feldspar/Image.png';


import SubProductsSection from "../SubProductsCarousle";
import image20 from "../../assets/Product-feldspar/image20.png";

import ProductCarousle from "../ProductCarusle";

const SixthPageEL = () => {
  const [data, setData] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const sectionOnePoducts=[
    {
      id:1,
      image:"http://api.skcmines.com/uploads/images/1763720728530-SKC Potash Feldspar A Grade (2).jpg",
    },
    {
      id:2,
      image:"http://api.skcmines.com/uploads/images/1763720771167-SKC Potash Feldspar B Grade.jpg",
    },
    {
      id:3,
      image:"http://api.skcmines.com/uploads/images/1763720830493-SKC- Soda Feldspar Chips.jpg",
    },
    {
      id:4,
      image: "http://api.skcmines.com/uploads/images/1763721005054-SKC- Soda Feldspar.jpg",
    },
  ]

  useEffect(() => {
    AOS.init({ duration: 1600, once: false });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/quartzpage/4` // index 1 for Feldspar
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch Feldspar data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  }

   const imageUrl = data.sectionThree?.videoThumbnail
  ? encodeURI(data.sectionThree.videoThumbnail)
  : image20
  return (
    <>
      <HeaderEl /> 

      {/* Banner Section */}
      <div
        className='sixthPage-home-section-one-main-container'
        style={{
          backgroundImage: `url(${data.bannerSection?.backgroundImageUrl || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='sixthPage-color-overlay'></div>
        <div className='container sixthPage-home-banner-text-container'>
          <div className='row'>
            {data.bannerSection?.title && (
              <h1
                className='sixthPage-home-section-one-banner-heading'
                data-aos='fade-right'
                data-aos-delay='150'
                dangerouslySetInnerHTML={{ __html: data.bannerSection.title }}
              />
            )}
            {data.bannerSection?.description && (
              <h4
                className='sixthPage-home-section-one-sub-heading'
                data-aos='fade-up'
                data-aos-delay='300'
                dangerouslySetInnerHTML={{ __html: data.bannerSection.description }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Section One */}
      <div className='sixthPage-journey-section container-fluid'>
        <div className='row g-0'>
          <ProductCarousle data={sectionOnePoducts}/>
          {/* <div className='col-md-6' data-aos='fade-right'>
            <img
              src={data.sectionOne?.imageUrl || ''}
              className='feldspar-page-section-two-image-stying'
              alt={data.sectionOne?.title || 'Feldspar'}
            />
          </div> */}
          <div className='col-md-6' data-aos='fade-left' data-aos-delay='200'>
            <div className='sixthPage-green-container'>
              {data.sectionOne?.title && (
                <h1
                  className='sixthPage-green-container-heading'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.title }}
                />
              )}
              {data.sectionOne?.description && (
                <p
                  className='sixthPage-green-container-text'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Two 
      <div className='sixthPage-journey-section container-fluid'> 
        <div className='row g-0'> 
          <div className='col-lg-6' data-aos='fade-right'> 
            <img src={Image} className='w-100' alt='sand' /> 
          </div> 
          <div className='col-lg-6'> 
            <div className='sixthPage-green-container'> 
              {data.sectionTwo?.title && (
                <h1
                  className='sixthPage-green-container-heading sixthpage-third-section-heading'
                  data-aos='fade-left'
                  data-aos-delay='150'
                  dangerouslySetInnerHTML={{ __html: data.sectionTwo.title }}
                />
              )}
              <div>
                {data.sectionTwo?.points?.map((item, index) => (
                  <div
                    key={index}
                    className="sixthPage-third-section-card mt-2"
                    data-aos='zoom-in'
                    data-aos-delay={150 * (index + 1)}
                    dangerouslySetInnerHTML={{ __html: item.point }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>*/}

      {/*Section Two */}
      <SubProductsSection data={data.sectionTwo}/>

      {/* Section Three - Video 
<div className="flex justify-center my-8">
  <div
    className="relative inline-block cursor-pointer overflow-hidden shadow-lg"
    onClick={() => setIsVideoModalOpen(true)}
  >
    
    <img
      src={data.sectionThree?.videoThumbnail || "fallback-thumbnail.png"}
      alt="Video Thumbnail"
      style={{height:"60vh",width:"100vw"}}
    />
  </div>
</div>*/}

{/* <div
  onClick={() => setIsVideoModalOpen(true)}
  className="feldspar-video-container"
  style={{
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  
  }}
>
  <img src={Vector} alt="vector" height={50} width={50}/>
</div> */}





      {/* ✅ Video Modal */}
      {/* <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={data.sectionThree?.videoUrl}
      /> */}

      <FooterEl />
    </>
  );
};

export default SixthPageEL;
