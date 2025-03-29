'use client';

import React from 'react';
import { FaHeart, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">GymBro</h3>
            <p className="text-gray-300 text-sm md:text-base mb-4">
              Track your fitness journey, get workout recommendations, and stay motivated.
            </p>
            <div className="flex space-x-3">
              <SocialIcon icon={<FaGithub />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <FooterLink text="Workouts" href="/workouts" />
              <FooterLink text="Statistics" href="/statistics" />
              <FooterLink text="Profile" href="/profile" />
              <FooterLink text="Settings" href="/settings" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Support</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <FooterLink text="Help Center" href="/help" />
              <FooterLink text="About" href="/about" />
              <FooterLink text="Terms of Service" href="#" />
              <FooterLink text="Contact Us" href="#" />
            </ul>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
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
      className="bg-gray-700 p-2 rounded-full hover:bg-primary transition-colors text-sm md:text-base"
      aria-label="Social media"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ text, href }: { text: string, href: string }) => {
  return (
    <li>
      <Link href={href} className="text-gray-300 hover:text-white transition-colors">
        {text}
      </Link>
    </li>
  );
};

export default Footer; 