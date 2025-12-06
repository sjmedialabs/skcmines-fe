import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Vector from "../../assets/product-clay/Vector.png";
import VideoModal from "../VideoModel";
import HeaderEl from "../Header/index";
import FooterEl from "../Footer/index";

import AOS from 'aos';
import 'aos/dist/aos.css';

import SubProductsSection from '../SubProductsCarousle';
import ProductCarousle from '../ProductCarusle';

const FifthPageEl = () => {
  const [data, setData] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const sectionOnePoducts=[
    {
      id:1,
      image:"http://api.skcmines.com/uploads/images/1763718666519-SKC- 1.jpg",
    },
    {
      id:2,
      image:"http://api.skcmines.com/uploads/images/1763556178576-SKC-4MQ.jpg",
    },
    {
      id:3,
      image:"http://api.skcmines.com/uploads/images/1763718871989-SKC-3Q.jpg",
    },
    {
      id:4,
      image:"http://api.skcmines.com/uploads/images/1763719151324-SKC- KQ.jpg",
    },
    {
      id:5,
      image:"http://api.skcmines.com/uploads/images/1763722570070-SKC-3D.jpg",
    },
    {
      id:6,
      image:"http://api.skcmines.com/uploads/images/1763723692584-SKC - KMQ.jpg",
    },
    {
      id:7,
      image:"http://api.skcmines.com/uploads/images/1763722960756-SKC.jpg",
    },
    {
      id:8,
      image:"http://api.skcmines.com/uploads/images/1763723041290-SKC- 4Q.jpg",
    }
  ]

  useEffect(() => {
    AOS.init({
      duration: 1600,
      once: false,
    });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quartzpage/3`); // index = 0 for Quartz
        setData(response.data);
        console.log("Fetched quartz data:", response.data);
      } catch (error) {
        console.error("Failed to fetch quartz data:", error);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!data) {
    return <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  }

  return (
    <>
      <HeaderEl />
      
      {/* Banner Section */}
      <div
        className='fifthPage-home-section-one-main-container'
        style={{
          backgroundImage: `url(${data.bannerSection?.backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='fifthPage-color-overlay'></div>
        <div className='container fifthPage-home-banner-text-container'>
          <div className='row'>
            {data.bannerSection?.title && (
              <h1
                className='fifthPage-home-section-one-banner-heading'
                data-aos='fade-up'
                data-aos-delay='200'
                dangerouslySetInnerHTML={{ __html: data.bannerSection.title }}
              />
            )}
            {data.bannerSection?.description && (
              <h4
                className='fifthPage-home-section-one-sub-heading'
                data-aos='fade-up'
                data-aos-delay='400'
                dangerouslySetInnerHTML={{ __html: data.bannerSection.description }}
              />
            )}
          </div>
        </div>
      </div>
 
      {/* Section One */}
      <div className='fifthPage-journey-section container-fluid'>
        <div className='row g-0'>
           <ProductCarousle data={sectionOnePoducts}/>
          {/* <div className='col-md-6' data-aos='fade-right' data-aos-offset="200">
            <img
              src={data.sectionOne?.imageUrl}
              className='quartz-page-section-two-image-stying'
              alt={data.sectionOne?.title || 'Quartz Image'}
            />
          </div> */}
          <div className='col-md-6' data-aos="fade-left" data-aos-delay="200" data-aos-offset="200">
            <div className='fifthPage-green-container'>
              {data.sectionOne?.title && (
                <h1
                  className='fifthPage-green-container-heading'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.title }}
                />
              )}
              {data.sectionOne?.description && (
                <p
                  className='fifthPage-green-container-text'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Two */}
       <SubProductsSection data={data.sectionTwo}/>

      {/* Section Three - Video */}
      {/* <div className="fourthPage-fifth-section-video-container">
        <div
          className="fifthPage-fourth-section-play-icon"
          onClick={() => setIsVideoModalOpen(true)}
          style={{
            backgroundImage: `url(${data.sectionThree.videoThumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"

          }}
        >
          <img src={Vector} alt=""   height={50} width={50}/>
        </div>
      </div> */}

      {/* ✅ Video Modal */}
      {/* <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc={data.sectionThree?.videoUrl} /> */}

      <FooterEl />
    </>
  );
};

export default FifthPageEl;
