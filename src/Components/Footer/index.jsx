import './index.css';
import footerArrow from "../../assets/Home page/footerArrow.png";
//import logo from "../../assets/Home page/logo.png";
import facebook from "../../assets/Home page/facebook.png";
import instagram from "../../assets/Home page/instagram.png";
import linkdin from "../../assets/Home page/linkdin.png";
import { useEffect } from 'react';
import skclogo from '../../assets/Home page/skclogo.png'
// import logowhite from '../../assets/Home page/logowhite.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FooterEl = () => {
    const navigate=useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000, // animation speed
            once: true,     // animation happens only once
        });
    }, []);

    return (
        <>
            <div className='footer-main-container'>
                <h1 className='footer-main-heading'>
                    Work & play in life-changing places
                </h1>
                <div className="footer-line mb-5">
                    <img
                        src={footerArrow}
                        alt="Arrow"
                        className="footer-arrow"
                    />
                   <button className="contact-btn" onClick={()=>navigate('/contact-us')}>Contact us</button>
                </div>
                <div className="container-fluid mt-5">
                   <div className="row justify-content-between text-center text-lg-start align-items-start">
  {/* Registered Office */}
  <div className="col-sm-6 col-lg-3 mb-4 mb-lg-0">
    <p className="footer-text">Registered Office</p>
    <p className="footer-text">The Raja’s Palace, Venkatagiri town, Tirupathi Dist, Andhra Pradesh.</p>
  </div>

  {/* Org number 
  <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0" data-aos="fade-up">
    <p className="footer-text">Org. number</p>
    <p className="footer-text">976 144 163</p>
  </div>*/}

  {/* Email */}
  <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
    <a href="mailto:info@skcmines.com" className="footer-text">
       sales@skcmines.com
    </a>
  </div>

  {/* Logo + Social Links */}
  <div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 d-flex flex-column align-items-center align-items-lg-start">
    <Link to="/">
      <img src={skclogo} className="footeer-logo-styling" alt="logo" />
    </Link>
   {/*  <div className="d-flex gap-1 ">
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <img src={facebook} className="each-logo-styling" alt="facebook" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
        <img src={instagram} className="each-logo-styling" alt="instagram" />
      </a>
      <a href="https://in.linkedin.com/" target="_blank" rel="noreferrer">
        <img src={linkdin} className="each-logo-styling" alt="linkedin" />
      </a>
    </div>*/}
  </div>
</div>

                </div>
            </div>
            <div className='copy-right-section'>
                <hr className='horizental-line mt-5' />
                <p className='footer-text text-center'>© 2025 skcmines.com</p>
            </div>
        </>
    );
}

export default FooterEl;
