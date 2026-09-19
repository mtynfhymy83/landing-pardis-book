import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TopBar } from './components/TopBar';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyUs } from './components/WhyUs';
import { OrderProcess } from './components/OrderProcess';
import { UrgencyBanner } from './components/UrgencyBanner';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTABar } from './components/CTABar';
import { Footer } from './components/Footer';
import './styles.css';

function App() {
  return <div id="home" className="min-h-screen bg-white font-sans text-ink antialiased">
    <a href="#main" className="sr-only z-50 rounded bg-white p-3 text-ink focus:fixed focus:top-2 focus:right-2 focus:not-sr-only">رفتن به محتوای اصلی</a>
    <TopBar />
    <Header />
    <main id="main"><Hero /><FeaturedProducts /><WhyUs /><OrderProcess /><UrgencyBanner /><Testimonials /><FAQ /><CTABar /></main>
    <Footer />
  </div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
