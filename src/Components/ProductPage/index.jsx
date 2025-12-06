import './index.css';
import HeaderEl from '../Header';
import FooterEl from '../Footer';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ThirdPageEl = () => {
  const [bannerSection, setBannerSection] = useState({
    title: 'Default Title',
    subTitle: 'Default Subtitle',
    backgroundImage: '',
  });
  const [productsSection, setProductsSection] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/productspage`);
        const newProductsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/newproductpage`);
        console.log("Fetched new products data:", newProductsResponse.data);
        console.log('Fetched product page data response:', response.data);

        if (response.data) {
          setBannerSection(response.data.bannerSection || bannerSection);
          setProductsSection(response.data.productsSection || []);
          setNewProducts(newProductsResponse.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch product page data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderEl />

      {/* -------------------------------------First Section-------------------------------------- */}
      <div
        className="thirdPage-home-section-one-main-container"
        style={{
          backgroundImage: `url(${bannerSection.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              {bannerSection.title && (
                <h1
                  className="thirdPage-home-section-one-banner-heading"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  dangerouslySetInnerHTML={{ __html: bannerSection.title }}
                />
              )}
              {bannerSection.subTitle && (
                <h1
                  className="thirdPage-home-section-one-sub-heading"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  dangerouslySetInnerHTML={{ __html: bannerSection.subTitle }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------Second Section----------------------------------- */}
      <section className="thirdPage-products-section container-fluid" data-aos="fade-up">
        <h2
          className="thirdPage-section-two-main-heading text-center mb-5 mt-4"
        >
          Our Core Products
        </h2>
        <div className="row justify-content-center">
          {Array.isArray(productsSection) && productsSection.length > 0 ? (
            productsSection.map((product, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
    
                data-aos-delay={index * 150}
              >
                <Link to={product.toUrl || '#'} style={{ textDecoration: 'none' }}>
                  <div className="thirdPage-product-card">
                    <img
                      src={product.image || ''}
                      alt={product.title || 'Product'}
                      className="thirdPage-product-img"
                    />
                    <div className="thirdPage-product-body">
                      <h5 className="thirdPage-product-title" dangerouslySetInnerHTML={{ __html: product.title || 'Untitled' }} />
                      <p className="thirdPage-product-desc line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
                      <span className="thirdPage-read-more">Read More →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-light">No products available</p>
          )}

          {/*-------------------------------------------- New Products Section---------------------------------- */}
          {newProducts.length > 0 &&
            newProducts.map((product, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <Link to={`/newproducts/${product._id}` || '#'} style={{ textDecoration: 'none' }}>
                  <div className="thirdPage-product-card">
                    <img
                      src={product.bannerSection.backgroundImageUrl || ''}
                      alt={product.bannerSection.title || 'Product'}
                      className="thirdPage-product-img"
                    />
                    <div className="thirdPage-product-body">
                      <h5
                        className="thirdPage-product-title"
                        dangerouslySetInnerHTML={{ __html: product.bannerSection.title || 'Untitled' }}
                      />
                      <p
                        className="thirdPage-product-desc"
                        dangerouslySetInnerHTML={{ __html: product.bannerSection.description || 'No description available.' }}
                      />
                      <span className="thirdPage-read-more">Read More →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>

      <FooterEl />
    </>
  );
};

export default ThirdPageEl;
