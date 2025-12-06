import "./index.css";
import HeaderEl from "../Header";
import FooterEl from "../Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Vector from "../../assets/product-clay/Vector.png";
import VideoModal from "../VideoModel";
import SubProductsSection from "../SubProductsCarousle";
import ProductCarousle from "../ProductCarusle";
const FourthPageEl = () => {
    const [micaData, setMicaData] = useState(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

    const SectionOneProducts=[
        {
            id:1,
            image:"http://api.skcmines.com/uploads/images/1763555976531-SKC -Ruby Mica Blocks.jpg",
        },
        {
            id:2,
            image:"http://api.skcmines.com/uploads/images/1763556040062-SKC -Ruby Mica Scrap.jpg",
        },
        {
            id:3,
            image:"http://api.skcmines.com/uploads/images/1763555870871-SKC- Light Gree Mica Blocks.jpg",
        }
    ]

    useEffect(() => {
        AOS.init({ duration: 1200, once: false });

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/micapage`);
                setMicaData(response.data);
                console.log("Mica page data:", response);
            } catch (error) {
                console.error("Error fetching mica page data:", error);
            }
        };

        fetchData();
    }, []);

    if (!micaData) {
        return <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    }

    const { bannerSection, sectionOne, sectionTwo, sectionThree, sectionFour } = micaData;

    return (
        <>
            <HeaderEl />

            {/* First Section */}
            <div
                className="fourthPage-home-section-one-main-container"
                style={{
                    backgroundImage: `url(${bannerSection.backgroundImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 d-flex flex-column justify-content-center">
                            {bannerSection.title && (
                                <h1
                                    className="fourthPage-home-section-one-banner-heading"
                                    data-aos="fade-right"
                                    data-aos-delay={200}
                                     dangerouslySetInnerHTML={{ __html: bannerSection.title }}
                                />
                            )}
                            {bannerSection.description && (
                                <h1
                                    className="fourthPage-home-section-one-sub-heading"
                                    data-aos="fade-up"
                                    data-aos-delay={400}
                                    dangerouslySetInnerHTML={{ __html: bannerSection.description }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="fourthPage-journey-section container-fluid">
                <div className="row g-0">
                    {/* <div className="col-md-6" >
                        <img src={sectionOne.image} className="mica-page-section-two-image-stying" alt={sectionOne.title} />
                    </div> */}
                    <ProductCarousle data={SectionOneProducts}/>
                    <div className="col-md-6"  data-aos-delay={200}>
                        <div className="fourthPage-green-container">
                            {sectionOne.title && (
                                <h1 className="fourthPage-green-container-heading" dangerouslySetInnerHTML={{ __html: sectionOne.title }} />
                            )}
                            {sectionOne.description && (
                                <p className="fourthPage-green-container-text" dangerouslySetInnerHTML={{ __html: sectionOne.description }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Section */}
           <SubProductsSection data={sectionTwo}/>

            {/* Fourth Section */}
            {/* <section className="fourthPage-fourthsection container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 mb-4" data-aos="fade-up">
                        {sectionThree.title && (
                            <h2 className="fourthPage-fourthsection-heading" dangerouslySetInnerHTML={{ __html: sectionThree.title }} />
                        )}
                        {sectionThree.description && (
                            <p className="fourthPage-fourthsection-subheading" dangerouslySetInnerHTML={{ __html: sectionThree.description }} />
                        )}
                    </div>

                    <div className="row justify-content-center">
                        {sectionThree.subProducts.map((product, index) => (
                            <div
                                key={index}
                                className="col-6 col-md-3 mb-4 d-flex justify-content-start"
                                data-aos="zoom-in"
                                data-aos-delay={index * 150}
                            >
                                <div className="fourthPage-fourthsection-card">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="fourthPage-fourthsection-image img-fluid"
                                    />
                                    <p className="fourthPage-fourthsection-title" dangerouslySetInnerHTML={{ __html: product.title }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Fifth Section - Video */}
            {/* <div className="fourthPage-fifth-section-video-container">
                <div
                    className="fourthPage-fifth-section-play-icon"
                    onClick={() => setIsVideoModalOpen(true)}
                    style={{
                        backgroundImage: `url(${sectionFour.videoThumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    <img src={Vector} alt="" className="mica-page-play-icon-styling"/>
                </div>
            </div>

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoSrc={sectionFour.videoUrl}
            /> */}

            <FooterEl />
        </>
    );
};

export default FourthPageEl;
