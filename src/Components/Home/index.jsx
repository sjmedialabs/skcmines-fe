import './index.css';
import HeaderEl from '../Header';
import FooterEl from '../Footer';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeEl = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState({}); // Track loading for each video by index
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);


  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });

    const fetchHomePage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/homepage`);
        setData(res.data || null);
        console.log('Fetched home page data:', res);
      } catch (err) {
        console.error('Failed to fetch home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!data) return <p>No data found</p>;

  // Get only enabled banners
  const enabledBanners = data.bannerSection?.filter(b => b.enabled) || [];

  const handleVideoLoaded = (index) => {
    setVideoLoading(prev => ({ ...prev, [index]: false }));
  };

  return (
    <>
      <HeaderEl />

      {/* Banner Section Carousel */}
      {enabledBanners.length > 0 && (
        <Carousel
          fade
          interval={30000}
          controls={enabledBanners.length > 1} // show arrows only if more than 1 slide
          indicators={false}
          pause="hover"
          className="home-section-one-main-container home-banner-carousel"
        >
          {enabledBanners.map((banner, idx) => (
            <Carousel.Item key={idx}>
              {banner.banner?.match(/\.(mp4|webm|ogg)$/i) ? (
                <div style={{ position: 'relative', width: '100%'}}>
                  {videoLoading[idx] !== false && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        zIndex: 2,
                      }}
                    >
                      <div className="spinner-border text-light" role="status"></div>
                    </div>
                  )}
                  <div style={{ position: "relative" }}>
                    <video
                      ref={videoRef}
                      src={banner.banner}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      style={{ width: "100%", objectFit: "cover" }}
                      onLoadedData={() => handleVideoLoaded(idx)}
                    />

                    {/* Toggle sound button */}
                    <button
                      onClick={toggleMute}
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                    >
                      {isMuted ? "🔇" : "🔊"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${banner.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              {/* <Carousel.Caption className=''>
                {banner.title && <h1 dangerouslySetInnerHTML={{ __html: banner.title }} />}
                {banner.subTitle && <h2 dangerouslySetInnerHTML={{ __html: banner.subTitle }} />}
              </Carousel.Caption> */}
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Sections One to Five */}
      {[data.sectionOne, data.sectionTwo, data.sectionThree, data.sectionFour, data.sectionFive].map((section, index) => {
        if (!section) return null;

        const linkPaths = ['/mica', '/quartz', '/feldspar', '/clay'];
        const isFirstSection = index === 0;

        return (
          <section
            key={index}
            className={isFirstSection ? 'home-section-two-main-container' : `home-section-three-main-container home-main-container-${index}` }
            style={isFirstSection ? {} : { backgroundImage: `url(${section.backGroundImageUrl})` }}
          >
            <div className="container">
              <div className="row">
                {isFirstSection ? (
                  <>
                    <div className="col-md-6">
                      {section.title && <h1 className="second-section-main-heading" dangerouslySetInnerHTML={{ __html: section.title }} />}
                    </div>
                    <div className="col-md-6">
                      {section.discription && <p className="second-section-sub-heading" dangerouslySetInnerHTML={{ __html: section.discription }} />}
                      <Link to="/about" style={{ textDecoration: 'none' }}>
                        <p className="home-section-card-arrow-text">
                          Learn more  <FaArrowRightLong className="right-arrow-icon" />
                        </p>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="col-md-6 d-flex flex-column justify-content-center">
                    <div className={`home-section-third-card`}>
                      {section.title && <h1 className="home-section-card-main-heading" dangerouslySetInnerHTML={{ __html: section.title }} />}
                      {section.discription && <p className="home-section-card-text" dangerouslySetInnerHTML={{ __html: section.discription }} />}
                      {section.linkText && (
                        <Link to={linkPaths[index - 1]} style={{ textDecoration: 'none' }}>
                          <p className="home-section-card-arrow-text">
                            {section.linkText} <FaArrowRightLong className="right-arrow-icon" />
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <FooterEl />
    </>
  );
};

export default HomeEl;
