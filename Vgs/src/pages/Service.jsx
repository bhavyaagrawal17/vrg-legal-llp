import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tax from "../assets/tax.jpeg";
import dispute from "../assets/Dispute.jpeg";
import consumer from "../assets/consumer.png";
import Bankruptcy from "../assets/bankruptcy.png";
import Arbitration from "../assets/arbitration.png";
import civil from "../assets/civil.jpeg";
import commercial from "../assets/commercial.jpeg";
import property from "../assets/property.jpeg";
import family from "../assets/family.jpeg";

const services = [
  {
    id: "tax",
    img: tax,
    title: "TAX",
    desc: "Know More",
    link: "/tax",
    titleColor: "text-red",
    buttonColor: "bg-black text-black",
    popupContent: "Comprehensive tax planning and compliance services to help you navigate complex tax regulations and optimize your tax strategy."
  },
  {
    id: "dispute",
    img: dispute,
    title: "Dispute Resolution",
    desc: "Know More",
    link: "/dispute",
    titleColor: "text-white",
    buttonColor: "bg-[#dee9fd] text-white",
    popupContent: "Expert mediation and resolution services for commercial and civil disputes, ensuring efficient and cost-effective solutions."
  },
  {
    id: "consumer",
    img: consumer,
    title: "Consumer Protection",
    desc: "Know More",
    link: "/consumer",
    titleColor: "text-black",
    buttonColor: "bg-[#dcfce7] text-[#166534]",
    popupContent: "Dedicated legal support for consumer rights protection, product liability claims, and fair trade practice enforcement."
  },
  {
    id: "bankruptcy",
    img: Bankruptcy,
    title: "Insolvency & Bankruptcy",
    desc: "Know More",
    link: "/bankruptcy",
    titleColor: "text-black",
    buttonColor: "bg-[#fef3c7] text-[#78350f]",
    popupContent: "Professional guidance through insolvency proceedings, debt restructuring, and bankruptcy processes for individuals and businesses."
  },
  {
    id: "arbitration",
    img: Arbitration,
    title: "Arbitration",
    desc: "Know More",
    link: "/arbitration",
    titleColor: "text-black",
    buttonColor: "bg-[#e0e7ff] text-[#4338ca]",
    popupContent: "Alternative dispute resolution through arbitration, providing faster and more confidential resolution of commercial disputes."
  },
];

// Second row of services
const servicesRow2 = [
  {
    id: "Civil Law",
    img: civil,
    title: "Civil Law",
    desc: "Know More",
    link: "/intellectual",
    titleColor: "text-white",
    buttonColor: "bg-[#dee9fd] text-white",
    popupContent: "Comprehensive intellectual property protection including patents, trademarks, copyrights, and trade secrets."
  },
  {
    id: "Commercial Law",
    img: commercial,
    title: "Commercial Law",
    desc: "Know More",
    link: "/employment",
    titleColor: "text-white",
    buttonColor: "bg-green-100 text-green-600",
    popupContent: "Employment law services covering workplace disputes, contracts, compliance, and employee rights."
  },
  {
    id: "  Law",
    img: property,
    title: "Property Law",
    desc: "Know More",
    link: "/real-estate",
    titleColor: "text-white",
    buttonColor: "bg-orange-100 text-orange-600",
    popupContent: "Real estate legal services including property transactions, disputes, zoning, and development."
  },
  {
    id: "Family and Guardianship",
    img: family,
    title: "Family and Guardianship",
    desc: "Know More",
    link: "/family",
    titleColor: "text-white",
    buttonColor: "text-white",
    popupContent: "Family law services including divorce, custody, adoption, and domestic relations."
  },
];

// Combine all services into a single array for active state management
const allServices = [...services, ...servicesRow2];

// Popup Component
const Popup = ({ isOpen, onClose, title, content, titleColor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold ${titleColor}`}>{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const Desktop = () => {
  const [active, setActive] = useState("tax");
  const [popup, setPopup] = useState({ isOpen: false, service: null });
  const navigate = useNavigate();

  const handleKnowMoreClick = (e, service) => {
    e.stopPropagation();
    setPopup({ isOpen: true, service });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, service: null });
  };

  return (
    <section id="services">
      <h1 className="font-bold font-sans text-[40px] text-center mb-3">
        Our Services
      </h1>
      <div className="bg-[#fdfdfd] w-full py-8">
        
        {/* First Row - 5 Services - Constrained width container */}
        <div className="w-full flex justify-center mb-6 px-4">
          <div className="flex gap-4 w-full max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setActive(service.id)}
                className={`
                  relative flex flex-col justify-end items-center rounded-[40px] border border-black bg-cover bg-center cursor-pointer transition-all duration-500 ease-in-out
                  h-[350px] pb-1
                  ${active === service.id ? "flex-[1.4]" : "flex-1"}
                `}
                style={{ backgroundImage: `url(${service.img})` }}
              >
                {/* Title - positioned at bottom */}
                <div
                  className={`
                    font-bold text-xl md:text-2xl text-center drop-shadow-lg transition-all duration-500 mb-0
                    ${active === service.id ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-5"}
                    ${service.titleColor}
                  `}
                >
                  {service.title}
                </div>

                {/* Know More - smaller text below title */}
                {active === service.id && (
                  <div
                    onClick={(e) => handleKnowMoreClick(e, service)}
                    className={`underline cursor-pointer transition-colors text-sm font-medium drop-shadow-lg ${
                      service.id === "dispute"  ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"
                    }`}
                  >
                    {service.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - 4 Services - Constrained width container */}
        <div className="w-full flex justify-center px-4">
          <div className="flex gap-4 w-full max-w-6xl mx-auto">
            {servicesRow2.map((service) => (
              <div
                key={service.id}
                onClick={() => setActive(service.id)}
                className={`
                  relative flex flex-col justify-end items-center rounded-[40px] border border-black bg-cover bg-center cursor-pointer transition-all duration-500 ease-in-out
                  h-[350px] pb-1
                  ${active === service.id ? "flex-[1.3]" : "flex-1"}
                `}
                style={{ backgroundImage: `url(${service.img})` }}
              >
                {/* Title - positioned at bottom */}
                <div
                  className={`
                    font-bold text-xl md:text-2xl text-center drop-shadow-lg transition-all duration-500 mb-0
                    ${active === service.id ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-5"}
                    ${service.titleColor}
                  `}
                >
                  {service.title}
                </div>

                {/* Know More - smaller text below title */}
                {active === service.id && (
                  <div
                    onClick={(e) => handleKnowMoreClick(e, service)}
                    className={`underline cursor-pointer transition-colors text-sm font-medium drop-shadow-lg ${
                      service.id === "Family and Guardianship"  || service.id === "Civil Law" || service.id === "Commercial Law" || service.id === "Property Law"? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"
                    }`}
                  >
                    {service.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      <Popup
        isOpen={popup.isOpen}
        onClose={closePopup}
        title={popup.service?.title}
        content={popup.service?.popupContent}
        titleColor={popup.service?.titleColor}
      />
    </section>
  );
};

export default Desktop;