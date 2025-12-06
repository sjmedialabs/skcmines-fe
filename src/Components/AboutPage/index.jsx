import './index.css';
import HeaderEl from '../Header';
import FooterEl from '../Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import rocket from "../../assets/about us/rocket.png";

const SecondPageEl = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });

    const fetchAboutPage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/aboutpage`);
        setData(res.data || null);
        console.log('Fetched about page data:', res.data.heroSection);
      } catch (error) {
        console.error('Failed to fetch about page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!data) return <p>No data found</p>;

  return (
    <>
      <HeaderEl />

      {/* Hero Section */}
      <div
        className="secondPage-home-section-one-main-container"
        style={{
          backgroundImage: `url(${data?.heroSection?.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              {data?.heroSection?.title && (
                <h1
                  className="secondPage-home-section-one-banner-heading"
                  data-aos="fade-up"
                  dangerouslySetInnerHTML={{ __html: data.heroSection.title }}
                />
              )}
              {data?.heroSection?.description && (
                <h1
                  className="secondPage-home-section-one-sub-heading"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  dangerouslySetInnerHTML={{ __html: data.heroSection.description }}
                />
              )} 
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Section */}
      <div className="secondPage-home-section-two-main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {data?.legacySection?.heading && (
                <h1
                  className="secondPage-second-section-main-heading"
                  dangerouslySetInnerHTML={{ __html: data.legacySection.heading }}
                />
              )}
            </div>
            
            <div className="col-md-6">
              {data?.legacySection?.description && (
                <p
                  className="secondPage-second-section-sub-heading"
                  dangerouslySetInnerHTML={{ __html: data.legacySection.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Founder Section */}
      <div className="secondPage-second-page-third-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5" data-aos="fade-right">
              <img
                src={data?.aboutFounderSection?.image}
                className="img-fluid"
                style={{ width: '100%', height: '100%' }}
                alt="Founder"
              />
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-6" data-aos="fade-left">
              {data?.aboutFounderSection?.title && (
                <h1
                  className="secondPage-second-page-third-section-heading"
                  dangerouslySetInnerHTML={{ __html: data.aboutFounderSection.title }}
                />
              )}
              {data?.aboutFounderSection?.subTitle && (
                <h4
                  className="secondPage-second-page-third-section-sub-heading"
                  dangerouslySetInnerHTML={{ __html: data.aboutFounderSection.subTitle }}
                />
              )}

              {Array.isArray(data?.aboutFounderSection?.highlights) &&
                data.aboutFounderSection.highlights.map((highlight, idx) => (
                  <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                    {highlight.heading && (
                      <h5
                        className="secondPage-second-page-third-section-text-heading mt-4"
                        dangerouslySetInnerHTML={{ __html: highlight.heading }}
                      />
                    )}
                    {highlight.description && (
                      <p
                        className="secondPage-second-page-third-section-text"
                        dangerouslySetInnerHTML={{ __html: highlight.description }}
                      />
                    )}
                    <hr style={{ width: '100%', color: '#ffffff', borderWidth: '2px' }} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Journey Section */}
       <div style={{marginTop:"2px"}}>
         <div className="secondPage-journey-section container-fluid" data-aos="fade-up">
        <div className="row g-0">
          <div className="col-lg-6" data-aos="fade-right">
            <img
              src={data?.journeySection?.image}
              className="journey-section-image-styling"
              alt="Journey"
             
            />
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="secondPage-green-container">
              {data?.journeySection?.title && (
                <h1
                  className="secondPage-green-container-heading"
                  dangerouslySetInnerHTML={{ __html: data.journeySection.title }}
                />
              )}
              {data?.journeySection?.description && (
                <p
                  className="secondPage-green-container-text"
                  dangerouslySetInnerHTML={{ __html: data.journeySection.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
       </div>

      {/* Reform Era Section */}
     <div style={{marginTop:"2px"}}>
       <div className="secondPage-journey-section container-fluid" data-aos="fade-up">
        <div className="row g-0">
          <div className="col-lg-6" data-aos="fade-right">
            <img
              src={data?.reformEraSection?.image}
              className="journey-section-image-styling"
              alt="Reform Era"
             
            />
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="secondPage-green-container secondPage-blue-container">
              {data?.reformEraSection?.title && (
                <h1
                  className="secondPage-green-container-heading"
                  dangerouslySetInnerHTML={{ __html: data.reformEraSection.title }}
                />
              )}
              {data?.reformEraSection?.description && (
                <p
                  className="secondPage-green-container-text"
                  dangerouslySetInnerHTML={{ __html: data.reformEraSection.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
     </div>

      {/* Modern Era Section */}
      <div className="secondPage-sixth-section-main-container" data-aos="zoom-in">
        {data?.modernEraSection?.title && (
          <h1 className="secondPage-main-heading" dangerouslySetInnerHTML={{ __html: data.modernEraSection.title }} />
        )}
        {data?.modernEraSection?.description && (
          <h3 className="secondPage-sixth-section-sub-heading mb-4" dangerouslySetInnerHTML={{ __html: data.modernEraSection.description }} />
        )}
        <section className="container text-center">
          <div className="row justify-content-center">
            {Array.isArray(data?.modernEraSection?.stats) &&
              data.modernEraSection.stats.map((stat, index) => (
                <div
                  key={index}
                  className="col-6 col-md-3 secondPage-stats-col"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <h3 className="secondPage-stat-value" dangerouslySetInnerHTML={{ __html: stat.value }} />
                  <p className="secondPage-stat-label" dangerouslySetInnerHTML={{ __html: stat.label }} />
                  {index < (data?.modernEraSection?.stats?.length || 0) - 1 && (
                    <span className="secondPage-stat-divider d-none d-md-block"></span>
                  )}
                </div>
              ))}
          </div>
          {data?.modernEraSection?.lastLine && (
            <p className="secondPage-stats-caption mt-2" data-aos="fade-right" dangerouslySetInnerHTML={{ __html: data.modernEraSection.lastLine }} />
          )}
        </section>
      </div>

      {/* Mission Section */}
      <div className="secondPage-seven-section-main-container" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className='col-lg-4' data-aos="fade-right">
              <img src={rocket} alt='rocket' className='img-fluid' />
            </div>
            <div className="col-lg-2 d-none d-lg-block"></div>
            <div className="col-lg-6 secondPage-seven-section-text-container" data-aos="fade-left">
              {data?.missionSection?.title && (
                <h1 className="secondPage-seven-section-main-heading" dangerouslySetInnerHTML={{ __html: data.missionSection.title }} />
              )}
              {data?.missionSection?.description && (
                <p className="secondPage-seven-section-text" dangerouslySetInnerHTML={{ __html: data.missionSection.description }} />
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterEl />
    </>
  );
};

export default SecondPageEl;
