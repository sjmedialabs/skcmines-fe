import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

import HeaderEl from '../Header';
import FooterEl from '../Footer';

import Location from '../../assets/Contact us/Location.png';
import phone from '../../assets/Contact us/phone.png';
import mail from '../../assets/Contact us/mail.png';
import clock from '../../assets/Contact us/clock.png';
import mapPic from '../../assets/Contact us/mapPic.png';

import AOS from 'aos'; 
import 'aos/dist/aos.css';

const ContactUsEl = () => {
  const [bannerData, setBannerData] = useState({ backgroundImage: '', title: '', description: '' });
  const [contactDetails, setContactDetails] = useState({ address: '', phone: '', email: '', workingHours: '', mapImage: '',mapEmbedLink:'' });

  const [inputFields, setInputFields] = useState({ name: '', mail: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const [formLoading, setFormLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1400, once: false });

    // Fetch data from API
    const fetchContactPage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/contactuspage`);
        if (res.data) {
          setBannerData(res.data.bannerSection || {});
          setContactDetails(res.data.contactDetails || {});
  
        }
      } catch (error) {
        console.error("Error fetching contact page data:", error);
      }
    };

    fetchContactPage();
  }, []);
  console.log("Fetched contact page data:", bannerData);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
  };

  const sendButtonHandle = async (e) => {
    e.preventDefault();
    setResponseMessage(null);
    setError(null);

    const { name, email, phone, subject, message } = inputFields;

    // Field validation
    if (!name || !email || !phone || !subject || !message) {
      setError("⚠️ Please fill in all the fields before submitting.");
      return;
    }

    if (!validateEmail(email)) {
      setError("⚠️ Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contactusform`, inputFields);
      setResponseMessage("✅ " + res.data.message);
      setInputFields({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("❌ Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderEl />

      {/* Banner Section */}
      <div 
        className='contact-us-first-main-container' 
        style={{ backgroundImage: `url(${bannerData.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='row'>
            <h1 className='seventhPage-home-section-one-banner-heading'>
              {bannerData.title}
            </h1>
            <h4 className='seventhPage-home-section-one-sub-heading' data-aos-delay='150'>
              {bannerData.description}
            </h4>
          </div>
      </div>

      {/* Contact Details Section */}
      <div className='contact-us-second-main-container'>
        <div className='container'>
          <div className='row justify-content-center text-center text-md-start'>

            {/* Address */}
            <div className="col-12 col-md-3">
              <div className="contact-item d-flex flex-column align-items-center align-items-md-start">
                <div className="contact-icon-text d-flex align-items-center mb-2">
                  <img src={Location} alt="Address Icon" className="contact-icon me-2" />
                  <strong className="contact-title">Address</strong>
                </div>
                <p className="contact-text mb-0">{contactDetails.address}</p>
              </div>
            </div>

            {/* Phone 
            <div className="col-12 col-md-3" data-aos='fade-right' data-aos-delay='300'>
              <div className="contact-item d-flex flex-column align-items-center align-items-md-start">
                <div className="contact-icon-text d-flex align-items-center mb-2">
                  <img src={phone} alt="Phone Icon" className="contact-icon me-2" />
                  <strong className="contact-title">Call us</strong>
                </div>
                <p className="contact-text mb-0">{contactDetails.phone}</p>
              </div>
            </div>*/}

            {/* Email */}
            <div className="col-12 col-md-3">
              <div className="contact-item d-flex flex-column align-items-center align-items-md-start">
                <div className="contact-icon-text d-flex align-items-center mb-2">
                  <img src={mail} alt="Mail Icon" className="contact-icon me-2" />
                  <strong className="contact-title">Email</strong>
                </div>
                <p className="contact-text mb-0">{contactDetails.email}</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="col-12 col-md-3">
              <div className="contact-item d-flex flex-column align-items-center align-items-md-start">
                <div className="contact-icon-text d-flex align-items-center mb-2">
                  <img src={clock} alt="Clock Icon" className="contact-icon me-2" style={{ width: "20px", height: "22px" }}/>
                  <strong className="contact-title">Working hours</strong>
                </div>
                <p className="contact-text mb-0">{contactDetails.workingHours}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Third Section: Directions + Enquiry Form */}
      <div className='contact-us-third-section'>
        <div className='container'>
          <div className='row g-4'>

            {/* Directions */}
            <div className='col-lg-6'>
              <div className='contact-us-directions-main-container'>
                <h1 className='directions-main-heading'>Directions</h1>
                <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                  <iframe
                    src={contactDetails.mapEmbedLink}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Venkatagiri Raja Vari Kota Map"
                  ></iframe>
              </div>
              </div>
            </div>

            {/*Enquiry form */}
             <div className="col-lg-6">
      <div className="contact-us-directions-main-container">
        <h1 className="directions-main-heading">Enquiry Form</h1>

        {/* Show response or error message */}
        {responseMessage && <p style={{ color: "green", marginBottom: "10px" }}>{responseMessage}</p>}
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <input
          type="text"
          className="contact-enquiry-input-styling"
          placeholder="Your Name"
          onChange={(e) => setInputFields({ ...inputFields, name: e.target.value })}
          value={inputFields.name}
        />
        <input
          type="text"
          className="contact-enquiry-input-styling"
          placeholder="Your Email"
          onChange={(e) => setInputFields({ ...inputFields, email: e.target.value })}
          value={inputFields.email}
        />
        <input
          type="text"
          className="contact-enquiry-input-styling"
          placeholder="Your Phone"
          onChange={(e) => setInputFields({ ...inputFields, phone: e.target.value })}
          value={inputFields.phone}
        />
        <input
          type="text"
          className="contact-enquiry-input-styling"
          placeholder="Your Subject"
          onChange={(e) => setInputFields({ ...inputFields, subject: e.target.value })}
          value={inputFields.subject}
        />
        <textarea
          rows={5}
          cols={30}
          className="contact-enquiry-input-styling text-area-styling"
          placeholder="Your Message"
          onChange={(e) => setInputFields({ ...inputFields, message: e.target.value })}
          value={inputFields.message}
        ></textarea>

        <button
          type="button"
          className="enquiry-send-button-styling"
          onClick={sendButtonHandle}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>

          </div>
        </div>
      </div>

      <FooterEl />
    </>
  );
};

export default ContactUsEl;
