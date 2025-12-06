import './index.css';

import HeaderEl from '../Header';
import FooterEl from '../Footer';

import locationPin from '../../assets/location-1/locationPin.png';
import phone from '../../assets/location-1/phone.png';
import mail from '../../assets/location-1/mail.png';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const LocationEl = () => {
  const { id } = useParams(); // will be undefined for /location
  const currentRoute = useLocation().pathname;
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        let response;
        if (id) {
          // Fetch single location by ID
          response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/locationpage/${id}`);
          setLocations([response.data.data]); // wrap in array to reuse same rendering logic
        } else {
          // Fetch all locations
          response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/locationpage`);
          setLocations(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch location(s):', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [id, currentRoute]);

  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  if (loading) {
    return (
      <>
        <HeaderEl />
        <div className='d-flex justify-content-center align-items-center' style={{}}>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <FooterEl />
      </>
    );
  }

  return (
    <>
      <HeaderEl />

      {locations.length === 0 ? (
        <div className="text-center py-5">
          <h2>No location data available</h2>
        </div>
      ) : (
        locations.map((location, index) => {
          return (
            <div key={location._id || index}>
              {/* Dynamic Banner Section */}
              <div className="location-section-one" style={{ width: '100%' }}>
                {isVideo(location.imageUrl) ? (
                  <video
                    src={location.imageUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="location-section-one-video"
                    style={{ width: '100%', objectFit: 'cover',   // 🔥 prevents black bars
                  objectPosition: 'center', }}
     
                  />
                ) : (
                  location.imageUrl && (
                    <div
                      style={{
                        backgroundImage: `url(${location.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                      }}
                    ></div>
                  )
                )}
              </div>

              {/* Location Info Section */}
              <div className="location-second-section-main-container">
                <h1
                  className="location-second-main-heading mb-4"
                >
                  {location.title || 'Unknown Location'}
                </h1>
                <div className="container location-contact-container">
                  <div className="row justify-content-center gap-4 text-center text-md-start">
                    {/* Address */}
                    <div
                      className="col-12 col-md-4"
                    >
                      <div className="location-contact-item d-flex flex-column align-items-center align-items-md-start">
                        <div className="location-icon-text d-flex align-items-center mb-2">
                          <img
                            src={locationPin}
                            alt="Address Icon"
                            className="location-icon me-2"
                          />
                          <strong className="location-title">Address</strong>
                        </div>
                        <p className="location-text mb-0">
                          {location.address || 'No address provided'}
                        </p>
                      </div>
                    </div>

                    {/* Phone 
                    <div
                      className="col-12 col-md-4"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="location-contact-item d-flex flex-column align-items-center align-items-md-start">
                        <div className="location-icon-text d-flex align-items-center mb-2">
                          <img
                            src={phone}
                            alt="Phone Icon"
                            className="location-icon me-2"
                          />
                          <strong className="location-title">Call us</strong>
                        </div>
                        <p className="location-text mb-0">
                          +91 90329 21234
                        </p>
                      </div>
                    </div>*/}

                    {/* Email */}
                    <div
                      className="col-12 col-md-4"
                    >
                      <div className="location-contact-item d-flex flex-column align-items-center align-items-md-start">
                        <div className="location-icon-text d-flex align-items-center mb-2">
                          <img
                            src={mail}
                            alt="Mail Icon"
                            className="location-icon me-2"
                          />
                          <strong className="location-title">Email</strong>
                        </div>
                        <p className="location-text mb-0">
                          sales@skcmines.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <FooterEl />
    </>
  );
};

export default LocationEl;
