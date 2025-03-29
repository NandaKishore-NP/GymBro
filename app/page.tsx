'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Dashboard />
      <Footer />
    </main>
  );
} 