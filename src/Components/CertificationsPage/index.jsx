import './index.css';
import HeaderEl from '../Header';
import FooterEl from '../Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CertificationsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCertImage, setSelectedCertImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });

    const fetchHomePage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/homepage`);
        setData(res.data || null);
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
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#0b121c' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const defaultCertificates = [
    {
      title: "ISO 9001:2015 Certificate",
      subTitle: "Quality Management System",
      image: "/six.jpeg"
    },
    {
      title: "ISO 9001:2015 Annex",
      subTitle: "Scope & Locations",
      image: "/one.jpeg"
    },
    {
      title: "ISO 14001:2015 Certificate",
      subTitle: "Environmental Management System",
      image: "/two.jpeg"
    },
    {
      title: "ISO 14001:2015 Annex",
      subTitle: "Scope & Locations",
      image: "/three.jpeg"
    },
    {
      title: "ISO 45001:2018 Certificate",
      subTitle: "Occupational Health & Safety",
      image: "/four.jpeg"
    },
    {
      title: "ISO 45001:2018 Annex",
      subTitle: "Scope & Locations",
      image: "/five.jpeg"
    }
  ];

  const certsToRender = (data?.certificationsSection?.certificates && data.certificationsSection.certificates.length > 0)
    ? data.certificationsSection.certificates
    : defaultCertificates;

  const sectionTitle = data?.certificationsSection?.title || "Our Certifications";
  const sectionSubTitle = data?.certificationsSection?.subTitle || "We are committed to global quality, environmental safety, and occupational health standards.";
  
  const bannerTitle = data?.certificationsSection?.bannerTitle || "Our Certifications";
  const bannerSubTitle = data?.certificationsSection?.bannerSubTitle || "Global standards of quality, safety, and environmental responsibility.";
  const bannerBgImage = data?.certificationsSection?.bannerBackgroundImage || "/certificateBanner.jpeg";

  return (
    <div style={{ backgroundColor: '#0b121c', minHeight: '100vh', color: '#ffffff' }}>
      <HeaderEl />

      {/* Hero Banner Section */}
      <div 
        className="certificationsPage-banner-container"
        style={bannerBgImage ? { backgroundImage: `url(${bannerBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className="certificationsPage-color-overlay"></div>
        <div className="container certificationsPage-banner-text-container">
          <div className="row">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="certificationsPage-banner-heading">
                {bannerTitle}
              </h1>
              <p className="certificationsPage-banner-subheading">
                {bannerSubTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid List Section */}
      <section className="certificationsPage-grid-section">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-aos="fade-up">
              <h2 className="certifications-section-heading">
                {sectionTitle}
              </h2>
              <div className="certifications-divider"></div>
              <p className="certifications-section-subheading">
                {sectionSubTitle}
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            {certsToRender.map((cert, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 mb-4 d-flex"
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 150}
              >
                <a
                  href={cert.image}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCertImage(cert.image);
                  }}
                  className="certification-card-link"
                >
                  <div className="certification-card d-flex flex-column h-100">
                    <div className="certification-image-container">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="img-fluid certification-img"
                      />
                      <div className="certification-overlay">
                        <span className="view-cert-btn">View Full Certificate</span>
                      </div>
                    </div>
                    <div className="certification-body">
                      <h4 className="certification-title">{cert.title}</h4>
                      <p className="certification-subtitle">{cert.subTitle}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Certificates */}
      {selectedCertImage && (
        <div 
          className="cert-lightbox-modal"
          onClick={() => setSelectedCertImage(null)}
        >
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lightbox-close" onClick={() => setSelectedCertImage(null)}>
              &times;
            </button>
            <img src={selectedCertImage} alt="Certificate" className="cert-lightbox-img" />
          </div>
        </div>
      )}

      <FooterEl />
    </div>
  );
};

export default CertificationsPage;
