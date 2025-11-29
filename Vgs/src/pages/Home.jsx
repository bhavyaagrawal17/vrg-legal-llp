import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Shield,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Linkedin,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { AboutUs } from "./AboutUs";
import Team from "./Team";
import Service from "./Service";
import ContactForm from './ContactForm';
import Testimonials from "./testimonials";
import logo from "../assets/logo.jpg";


const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Prevent scrolling when disclaimer is shown
  useEffect(() => {
    if (showDisclaimer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showDisclaimer]);

  useEffect(() => {
    const checkDisclaimerStatus = () => {
      try {
        const agreed = localStorage.getItem("vrg_disclaimerAgreed");
        if (agreed === "true") {
          setShowDisclaimer(false);
        } else {
          setShowDisclaimer(true);
        }
      } catch (error) {
        setShowDisclaimer(true);
      }
    };

    checkDisclaimerStatus();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAgree = () => {
    try {
      localStorage.setItem("vrg_disclaimerAgreed", "true");
      setShowDisclaimer(false);
    } catch (error) {
      setShowDisclaimer(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Website Content */}
      <div className={showDisclaimer ? "pointer-events-none" : ""}>
        <Navbar disabled={showDisclaimer} />

        {/* Hero Section */}
        <section
          id="home"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop')",
            }}
          />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Integrity, Expertise, and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Advocacy
              </span>{" "}
              You Can Trust
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Delivering exceptional legal representation with unwavering
              commitment to justice and client success for over two decades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <AboutUs />

        {/* Services Section */}
        <Service />

        {/* Key Highlights */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose VRG Legal?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Proven Track Record
                </h3>
                <p className="text-slate-400">
                  Consistent success in complex legal matters
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Client-Centered Approach
                </h3>
                <p className="text-slate-400">
                  Personalized attention for every case
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Industry Recognition
                </h3>
                <p className="text-slate-400">
                  Celebrated for Professional Excellence
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Scale className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Unwavering Ethics
                </h3>
                <p className="text-slate-400">
                  Integrity in every interaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />

         <Testimonials/> 

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Schedule a Consultation
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Connect with our legal experts for personalized advice
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ContactForm />

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-slate-800 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 text-amber-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Phone</h3>
                  </div>
                  <p className="text-slate-300">9899505223</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-amber-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Email</h3>
                  </div>
                  <p className="text-slate-300">
                    vaibhavguptalegal@gmail.com
                  </p>
                  <p className="text-slate-300">Office@vrglegal.com</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-amber-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Address</h3>
                  </div>
                  <p className="text-slate-300">BP-10, </p>
                  <p className="text-slate-300">Pitampura, Delhi-110034</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Follow Us</h3>
                  </div>
                  <p>
                    <a
                      href="https://www.linkedin.com/company/vrg-legal-llp/posts/?feedView=all"
                      target="_blank"
                    >
                      <Linkedin className="h-6 w-6 text-amber-400 mr-3" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  

                    <img src={logo} alt="VRG Legal Logo" className="h-16 w-auto object-contain" />
                    
                  
                  <div>
                     <h1 className="text-2xl font-bold text-white">
    VRG Legal <span className="text-amber-400">LLP</span>
  </h1>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Trusted legal representation with integrity, expertise, and
                  unwavering commitment to justice.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#about"
                      className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      Practice Areas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#team"
                      className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      Team
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      Book Consultation
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Contact Info</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-400">BP-10, </p>
                  <p className="text-slate-400">
                    Pitampura, Delhi-110034
                  </p>
                  <p className="text-slate-400">9899505223</p>
                  <p className="text-slate-400">
                    vaibhavguptalegal@gmail.com
                  </p>
                  <p className="text-slate-400">Office@vrglegal.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 VRG Legal LLP. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Disclaimer Overlay */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 border-b border-gray-200">
              <div className="flex items-center justify-center mb-2 sm:mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 sm:p-3 rounded-lg mr-2 sm:mr-3">
                  <Scale className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">VRG Legal</h1>
                  <p className="text-xs sm:text-sm text-amber-600 font-medium">LLP</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
              {/* Acknowledgement Section */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">ACKNOWLEDGEMENT</h2>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  The rules of the Bar Council of India prohibit lawyers and law firms from soliciting work and advertising. By 
                  proceeding further and clicking on the "I AGREE" button herein below, I hereby acknowledge that I, of my own 
                  accord, intend to know more and subsequently acquire more information about VRG Legal LLP for 
                  my own purpose and use. I further acknowledge that there has been no advertisement, solicitation, 
                  communication, invitation or inducement of any sort whatsoever from VRG Legal LLP or any of its 
                  members to create or solicit an attorney-client relationship through this website. I further acknowledge having read 
                  and understood and perused through the content of the DISCLAIMER mentioned below and the Privacy Policy.
                </p>
              </div>

              {/* Disclaimer Section */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">DISCLAIMER</h2>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  This website (www.vrglegal.com) is a resource for informational purposes only and is intended, 
                  but not promised or guaranteed, to be correct and complete. VRG Legal LLP does not warrant that 
                  the information contained on this website is accurate or complete, and hereby disclaims any and all liability to any 
                  person for any loss or damage caused by errors or omissions, whether such errors or omissions result from 
                  negligence, accident or any other cause. Any information obtained or downloaded from this website is completely 
                  at the user's volition and their own discretion and any further transmission, receipt or use of this website would not 
                  create any attorney-client relationship. The contents of this website do not constitute, and shall not be construed 
                  as, legal advice or a substitute for legal advice. All material and information (except any statutory enactments and/
                  or judicial precedents) on this website is the property of VRG Legal LLP and no part thereof shall be 
                  used, without the express prior written consent of VRG Legal LLP.
                </p>
              </div>
            </div>

            {/* Footer Button */}
            <div className="px-3 sm:px-4 lg:px-8 pb-3 sm:pb-4 lg:pb-8">
              <button
                onClick={handleAgree}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                I AGREE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;