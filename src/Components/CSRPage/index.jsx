import './index.css';
import HeaderEl from '../Header';
import FooterEl from '../Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
 
const CsrEl = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1400, once: false });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/csrpage`
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch CSR data:", error);
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
        className='eightPage-home-section-one-main-container'
        style={{
          backgroundImage: `url(${data.bannerSection?.backgroundImage || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='eightPage-color-overlay'></div>
        <div className='container eightPage-home-banner-text-container'>
          <div className='row'>
            <div className='col-lg-8'>
              {data.bannerSection?.title && (
                <h1
                  className='eightPage-home-section-one-banner-heading'
                  data-aos='fade-right'
                  dangerouslySetInnerHTML={{ __html: data.bannerSection.title }}
                />
              )}
              {data.bannerSection?.description && (
                <h4
                  className='eightPage-home-section-one-sub-heading'
                  data-aos='fade-up'
                  data-aos-delay='150'
                  dangerouslySetInnerHTML={{ __html: data.bannerSection.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className='eightPage-second-section-main-container'>
        <div className='eightPage-overlay'></div>
        <div className='container eightPage-content-container'>
          <div className='row'>
            <div className='col-lg-6 d-flex flex-column justify-content-center' data-aos='fade-right'>
              {data.sectionOne?.title && (
                <h1
                  className='eightPage-second-section-heading'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.title }}
                />
              )}
            </div>
            <div className='d-none d-md-block col-lg-1'></div>
            <div className='col-lg-4' data-aos='fade-left' data-aos-delay='150'>
              {data.sectionOne?.description && (
                <p
                  className='eightPage-second-section-text'
                  dangerouslySetInnerHTML={{ __html: data.sectionOne.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className='eightPage-third-section-main-container'>
        {data.sectionTwo?.title && (
          <h1
            className='eightPage-third-section-main-container'
            data-aos='fade-left'
            dangerouslySetInnerHTML={{ __html: data.sectionTwo.title }}
          />
        )}
        <div className="container eightPage-csr-grid-container">
          <div className="row gap-6">
            {data.sectionTwo?.subProducts?.map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4"
                data-aos='fade-up'
                data-aos-delay={`${index * 100}`}
              >
                <div className="eightPage-csr-card">
                  <img src={item.image} alt={item.title} className="img-fluid eightPage-csr-image" />
                  {item.title && (
                    <p
                      className="eightPage-csr-caption mt-2"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterEl />
    </>
  );
};

export default CsrEl;
