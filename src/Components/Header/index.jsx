import './index.css';
import logoDark from '../../assets/Home page/logoDark.png';
import skclogo from '../../assets/Home page/skclogo.png'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HeaderEl = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dropdown = document.querySelectorAll('.nav-item.dropdown');
    dropdown.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const menu = item.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
      });
      item.addEventListener('mouseleave', () => {
        const menu = item.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
    });
  }, []);

  const [locations, setLocations] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/locationpage`
        );
        setLocations(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/newproductpage`
        );

        const products = response.data?.data || response.data || [];
        setNewProducts(products);
      } catch (error) {
        console.error("Failed to fetch new products:", error);
      }
    };
    fetchNewProducts();
  }, []);

  // ✅ Reusable function for active link style
  const activeStyle = (pathCheck) => (
    location.pathname === pathCheck ||
    (typeof pathCheck === "function" && pathCheck(location.pathname))
  )
    ? { textDecoration: "underline", textDecorationColor: "white", textUnderlineOffset: "6px" }
    : {};

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} navbar-expand-lg navbar-dark main-container fixed-top`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={skclogo} className="header-logo-styling" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mt-4 mt-lg-0">
              <Link to="/" className="header-item-styling" style={activeStyle("/")}>
                Home
              </Link>
            </li>
            <li className="nav-item mt-4 mt-lg-0">
              <Link to="/about" className="header-item-styling" style={activeStyle("/about")}>
                About
              </Link>
            </li>

            {/* Products Dropdown */}
            <li className="nav-item dropdown mt-4 mt-lg-0">
              <Link
                to="/products"
                className="header-item-styling dropdown-toggle"
                style={activeStyle((path) => path.startsWith("/products") || path.startsWith("/newproducts"))}
                id="navbarDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                Products 
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><Link to="/quartz" className="dropdown-item">Quartz</Link></li>
                <li><Link to="/mica" className="dropdown-item">MICA</Link></li>
                <li><Link to="/feldspar" className="dropdown-item">Feldspar</Link></li>
                <li><Link to="/clay" className="dropdown-item">Clay (R&D)</Link></li>

                {newProducts.length > 0 && <li><hr className="dropdown-divider" /></li>}

                {newProducts.length > 0 &&
                  newProducts.map(product => (
                    <li key={product._id}>
                      <Link
                        to={`/newproducts/${product._id}`}
                        className="dropdown-item"
                      >
                        {product?.bannerSection?.title || "Untitled Product"}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>

            {/* Locations Dropdown */}
            <li className="nav-item dropdown mt-4 mt-lg-0">
              <Link
                to="/location"
                className="header-item-styling dropdown-toggle"
                style={activeStyle((path) => path.startsWith("/location"))}
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Locations
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {locations.length > 0 ? (
                  locations.map(loc => (
                    <li key={loc._id}>
                      <Link to={`/location/${loc._id}`} className="dropdown-item">
                        {loc.title || "Untitled Location"}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item text-muted">
                      No locations available
                    </span>
                  </li>
                )}
              </ul>
            </li>

            <li className="nav-item mt-4 mt-lg-0">
              <Link to="/csr" className="header-item-styling" style={activeStyle("/csr")}>
                CSR
              </Link>
            </li>
            <li className="nav-item mt-4 mt-lg-0">
              <Link to="/contact-us" className="header-item-styling" style={activeStyle("/contact-us")}>
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderEl;
