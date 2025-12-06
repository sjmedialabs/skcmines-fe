import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderEl from "../Header";
import FooterEl from "../Footer";
import { FaTimes } from "react-icons/fa";
import "./index.css";
import { IoPlayOutline } from "react-icons/io5";

import SubProductsSection from "../SubProductsCarousle";

const NewProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/newproductpage/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <HeaderEl />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <FooterEl />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <HeaderEl />
        <div className="loading-section">
          <h2>Product Not Found</h2>
        </div>
        <FooterEl />
      </>
    );
  }

  const handleClose = () => setIsPlaying(false);

  return (
    <>
      <HeaderEl />
      {/* Banner Section */}
      <div
        className="defaultPage-home-section-one-main-container"
        style={{
          backgroundImage: `url(${product.bannerSection?.backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="defaultPage-color-overlay"></div>
        <div className="container defaultPage-home-banner-text-container">
          <div className="row">
            <h1
              className="defaultPage-home-section-one-banner-heading"
              data-aos="fade-up"
            >
              {product.bannerSection?.title}
            </h1>
            <h4
              className="defaultPage-home-section-one-sub-heading"
              data-aos="fade-up"
              data-aos-delay="150"
              dangerouslySetInnerHTML={{
                __html: product.bannerSection?.description || "",
              }}
            />
          </div>
        </div>
      </div>

      {/* Section One */}
      <div className="defaultPage-journey-section container-fluid">
        <div className="row g-0">
          <div className="col-lg-6" data-aos="fade-right">
            <img
              src={product.sectionOne?.imageUrl}
              className="img-fluid"
              alt={product.sectionOne?.title}
            />
          </div>
          <div className="col-lg-6">
            <div className="defaultPage-green-container">
              <h1
                className="defaultPage-green-container-heading"
                data-aos="fade-left"
              >
                {product.sectionOne?.title}
              </h1>
              <p
                className="defaultPage-green-container-text"
                data-aos="fade-left"
                data-aos-delay="100"
                dangerouslySetInnerHTML={{
                  __html: product.sectionOne?.description || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Two */}
      <SubProductsSection data={product.sectionTwo} />

      {/* Section Three */}
      <div
        className={`defaultPage-fourth-section-main-container ${
          isPlaying ? "defaultPage-video-playing" : ""
        }`}
      >
        {isPlaying ? (
          <>
            <iframe
              className="defaultPage-fourth-section-full-video"
              src={product.sectionThree?.videoUrl}
              title="Quartz Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              className="defaultPage-fourth-section-close-button"
              onClick={handleClose}
            >
              <FaTimes size={24} />
            </button>
          </>
        ) : (
          <div
            className="defaultPage-fourth-section-play-icon"
            onClick={() => setIsPlaying(true)}
            style={{
              backgroundImage: `url(${product.sectionThree?.videoThumbnail || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <IoPlayOutline color="#ffffff" size={100} />
          </div>
        )}
      </div>

      <FooterEl />
    </>
  );
};

export default NewProductDetailPage;
