import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="font-montserrat bg-white w-full border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image at the center */}
        <div className="mb-8 flex justify-center">
          <img
            src="/image.png" // Replace with your image URL
            alt="Footer Logo"
            className="w-32" // Adjust the size as needed
          />
        </div>

        {/* Top Section */}
        <div className="flex flex-wrap justify-between space-y-8 md:space-y-0">
          {/* Address and Contact */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Address:</h2>
            <p className="text-black">AAI Address Here</p>
            <h2 className="text-lg font-semibold">Contact:</h2>
            <p className="text-black underline cursor-pointer">1234567890</p>
            <p className="text-black underline cursor-pointer">
              info@pradipti.in
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 bg-gray-600 flex justify-center items-center rounded-full"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-white" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 bg-gray-600 flex justify-center items-center rounded-full"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 bg-gray-600 flex justify-center items-center rounded-full"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 bg-gray-600 flex justify-center items-center rounded-full"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-white" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 bg-gray-600 flex justify-center items-center rounded-full"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-white" />
              </a>
            </div>
          </div>

          <div className="flex space-x-12">
            {/* Column 1 */}
            <div className="space-y-4">
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link One
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Two
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Three
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Four
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Five
              </a>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Six
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Seven
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Eight
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Nine
              </a>
              <a
                href="#"
                className="block text-black hover:text-gray-800 font-semibold"
              >
                Link Ten
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-center">
          {/* Policies */}
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
            <p>Copyright © 2025 - AAI- Pradipti All Rights Reserved</p>
            <a href="#" className="text-black hover:text-gray-800">
              Privacy Policy
            </a>
            <a href="#" className="text-black hover:text-gray-800">
              Terms of Service
            </a>
            <a href="#" className="text-black hover:text-gray-800">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
