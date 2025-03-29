'use client';

import React from 'react';
import { FaHeart, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GymBro</h3>
            <p className="text-gray-300 mb-4">
              Track your fitness journey, get workout recommendations, and stay motivated.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FaGithub />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink text="Workouts" />
              <FooterLink text="Progress Tracking" />
              <FooterLink text="Schedule" />
              <FooterLink text="Settings" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink text="Help Center" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Terms of Service" />
              <FooterLink text="Contact Us" />
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p className="flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" /> for fitness enthusiasts
          </p>
          <p className="mt-2">© {new Date().getFullYear()} GymBro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <a 
      href="#" 
      className="bg-gray-700 p-2 rounded-full hover:bg-primary transition-colors"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ text }: { text: string }) => {
  return (
    <li>
      <a href="#" className="text-gray-300 hover:text-white transition-colors">
        {text}
      </a>
    </li>
  );
};

export default Footer; 