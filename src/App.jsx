import { useState, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ScrollToTop from "./Components/ScrollToTop";

// Lazy loaded components
const HomeEl = lazy(() => import("./Components/Home"));
const SecondPageEl = lazy(() => import("./Components/AboutPage"));
const ThirdPageEl=lazy(()=>import("./Components/ProductPage"));
const FourthPageEl = lazy(() => import("./Components/MICAPage"));
const FifthPageEl = lazy(() => import("./Components/QuartzPage"));
const SixthPageEL = lazy(() => import("./Components/FeldsparPage"));
const ClayEl = lazy(() => import("./Components/ClayPage"));
const CsrEl = lazy(() => import("./Components/CSRPage"));
const LocationEl=lazy(()=>import("./Components/LocationPage"));
const ContactUsEl = lazy(() => import("./Components/Contact-us"));
const NewProductDetailPage = lazy(() => import("./Components/NewProductPage"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="d-flex flex-row justify-content-center align-items-center" style={{height:'100vh'}}>
      <div className="spinner-border text-primary" role="status"></div>
      </div>}>
        <Routes>
          <Route exact path="/" element={<HomeEl/>} />
          <Route exact path="/about" element={<SecondPageEl />} />
          <Route exact path="/products" element={<ThirdPageEl/>}/>
          <Route exact path="/mica" element={<FourthPageEl />} />
          <Route exact path="/quartz" element={<FifthPageEl />} />
          <Route exact path="/feldspar" element={<SixthPageEL />} />
          <Route exact path="/clay" element={<ClayEl />} />
          <Route exact path="/csr" element={<CsrEl />} />
          {/* <Route exact path="/location" element={<LocationEl/>}/> */}
          <Route exact path="/location/:id" element={<LocationEl/>}/>
          <Route exact path="/contact-us" element={<ContactUsEl />} />
             {/* New Dynamic Product Route */}
          <Route exact path="/newproducts/:id" element={<NewProductDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
