import "./index.css";
import Vector from "../../assets/product-clay/Vector.png";
import VideoModal from "../VideoModel";
import HeaderEl from "../Header";
import FooterEl from "../Footer";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from "axios";

import AOS from 'aos';
import 'aos/dist/aos.css';

import SubProductsSection from "../SubProductsCarousle";

const ClayEl = () => {
  const [data, setData] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1400, once: false });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/quartzpage/5` // index 2 for Clay
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch Clay data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data){
    return <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  }

  return (
    <>
      <HeaderEl />

      {/* Banner Section */}
      <div
        className='seventhPage-home-section-one-main-container'
        style={{
          backgroundImage: `url(${data.bannerSection?.backgroundImageUrl || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='seventhPage-color-overlay'></div>
        <div className='container seventhPage-home-banner-text-container'>
          <div className='row'>
            {data.bannerSection?.title && (
              <h1
                className='seventhPage-home-section-one-banner-heading'
                data-aos='fade-up'
                dangerouslySetInnerHTML={{ __html: data.bannerSection.title }}
              />
            )}
            {data.bannerSection?.description && (
              <h4
                className='seventhPage-home-section-one-sub-heading'
                data-aos='fade-up'
                data-aos-delay='150'
                dangerouslySetInnerHTML={{ __html: data.bannerSection.description }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Section One */}
      <div className='seventhPage-journey-section container-fluid'>
        <div className='row g-0'>
          <div className='col-lg-6' data-aos='fade-right'>
            <img
              src={data.sectionOne?.imageUrl || ''}
              className='img-fluid seventhPage-journey-image'
              alt={data.sectionOne?.title || 'Clay Image'}
            />
          </div>
          <div className='col-lg-6'>
            <div className='seventhPage-green-container'>
              {data.sectionOne?.title && (
                <h1
                  className='seventhPage-green-container-heading'
                  data-aos='fade-left'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.title }}
                />
              )}
              {data.sectionOne?.description && (
                <p
                  className='seventhPage-green-container-text'
                  data-aos='fade-left'
                  data-aos-delay='100'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.description }}
                />
              )}

              {/* Static Points */}
              <h4 className='seventhPage-green-container-sub-heading mb-3' data-aos='fade-right'>
                What Makes Our Clay Special?
              </h4>
              <div className="d-flex flex-row">
                <div><FaCheckCircle color="#ffffff" height={20} width={20} style={{marginRight:"5px"}}/></div>
                <div> <p className='seventhPage-green-container-each-point' style={{marginTop:"2px"}} data-aos='fade-left' data-aos-delay='100'>
                  <strong>High Alumina Content:</strong> Essential for durability, Thermal stability.
              </p></div>
              </div>
              <div className="d-flex flex-row">
                <div> <FaCheckCircle color="#ffffff" height={20} width={20} style={{marginRight:"5px"}}/></div>
                <div><p className='seventhPage-green-container-each-point' style={{marginTop:"2px"}} data-aos='fade-left' data-aos-delay='200'>
                  <strong>Yellow Clay Characteristics:</strong> Under R&D to be used in Ceramics and Tiles industries. 
                </p></div>
              </div>
              {/* <p className='seventhPage-green-container-each-point' data-aos='fade-left' data-aos-delay='300'>
                <span>
                  <FaCheckCircle color="#ffffff" size={20} className="me-2" />
                  <strong>Sustainable Source:</strong> Extracted with care...
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Section Two 
      <div className='seventhPage-third-section-container'>
        <div className='seventhPage-third-section-left'>
          {data.sectionTwo?.title && (
            <h2
              className='seventhPage-third-section-heading'
              data-aos='fade-right'
              dangerouslySetInnerHTML={{ __html: data.sectionTwo.title }}
            />
          )}
        </div>
        <div className='seventhPage-third-section-right'>
          {data.sectionTwo?.points?.map((item, index) => (
            <div
              key={index}
              className='seventhPage-third-section-card'
              data-aos='fade-left'
              data-aos-delay={150 * (index + 1)}
              dangerouslySetInnerHTML={{ __html: item.point }}
            />
          ))}
        </div>
      </div>*/}

      {/*Section Two */}
      {/* <SubProductsSection data={data.sectionTwo}/> */}
      {/* <div className="claypage-temp">
        <h2 className="temp-heading">Still in R&D</h2>
      </div> */}


      {/* Section Three - Video */}
      {/* <div className="fourthPage-fifth-section-video-container">
        <div
          className="fourthPage-fifth-section-play-icon"
          onClick={() => setIsVideoModalOpen(true)}
          style={{
            backgroundImage: `url(${data.sectionThree?.videoThumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <img src={Vector} alt="" height={50} width={50}/>
        </div>
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

export default ClayEl;
