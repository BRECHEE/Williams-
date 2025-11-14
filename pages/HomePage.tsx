
// pages/HomePage.tsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Button from '../components/Button';
import Card from '../components/Card';
import { DUMMY_ANNOUNCEMENTS } from '../constants';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for subtle effects
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
    if (bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: 'back.out(1.7)' }
      );
    }
    if (newsRef.current) {
      gsap.fromTo(newsRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.8, ease: 'power2.out' }
      );
    }
    if (buttonsRef.current) {
      gsap.fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, stagger: 0.2, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="pt-20 pb-8 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white shadow-lg"
        style={{ backgroundImage: `url(https://picsum.photos/1600/900?grayscale&random=1)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Bienvenue à votre StudentPortal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in delay-500">
            Votre passerelle vers l'excellence académique et la vie étudiante.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-800 animate-scale-in delay-1000">
            Découvrir nos filières
          </Button>
        </div>
      </section>

      {/* Dynamic Announcement Banner */}
      <section ref={bannerRef} className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 text-center text-lg md:text-xl font-semibold shadow-md mt-8 mx-auto max-w-4xl rounded-lg">
        <i className="fas fa-bullhorn mr-3"></i>
        <span>{DUMMY_ANNOUNCEMENTS[0].title}</span>
        <Link to="/profile" className="underline ml-2 hover:text-blue-100 transition-colors duration-300">
          (Accéder à votre profil)
        </Link>
      </section>

      <div className="container mx-auto px-4 mt-12">
        {/* Student News Section */}
        <section ref={newsRef} className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Actualités Étudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DUMMY_ANNOUNCEMENTS.map((announcement) => (
              <Card key={announcement.id} className="transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  {announcement.type === 'event' && <i className="fas fa-calendar-alt mr-2 text-blue-500"></i>}
                  {announcement.type === 'news' && <i className="fas fa-newspaper mr-2 text-green-500"></i>}
                  {announcement.type === 'urgent' && <i className="fas fa-exclamation-triangle mr-2 text-red-500"></i>}
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 text-sm">{announcement.content}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Sections Navigation */}
        <section ref={buttonsRef} className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Accès Rapide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/courses" className="block">
              <Card className="text-center bg-blue-100 hover:bg-blue-200 transition-colors duration-300 transform hover:scale-105">
                <i className="fas fa-book text-5xl text-blue-700 mb-4"></i>
                <h3 className="text-2xl font-semibold text-blue-800">Cours & Ressources</h3>
                <p className="text-gray-600 mt-2">Accédez à vos supports de cours et documents.</p>
              </Card>
            </Link>
            <Link to="/timetable" className="block">
              <Card className="text-center bg-green-100 hover:bg-green-200 transition-colors duration-300 transform hover:scale-105">
                <i className="fas fa-calendar-alt text-5xl text-green-700 mb-4"></i>
                <h3 className="text-2xl font-semibold text-green-800">Emploi du Temps</h3>
                <p className="text-gray-600 mt-2">Consultez votre emploi du temps hebdomadaire.</p>
              </Card>
            </Link>
            <Link to="/forum" className="block">
              <Card className="text-center bg-yellow-100 hover:bg-yellow-200 transition-colors duration-300 transform hover:scale-105">
                <i className="fas fa-comments text-5xl text-yellow-700 mb-4"></i>
                <h3 className="text-2xl font-semibold text-yellow-800">Forum Communauté</h3>
                <p className="text-gray-600 mt-2">Échangez avec les autres étudiants.</p>
              </Card>
            </Link>
            <Link to="/scholarships" className="block">
              <Card className="text-center bg-purple-100 hover:bg-purple-200 transition-colors duration-300 transform hover:scale-105">
                <i className="fas fa-graduation-cap text-5xl text-purple-700 mb-4"></i>
                <h3 className="text-2xl font-semibold text-purple-800">Bourses & Stages</h3>
                <p className="text-gray-600 mt-2">Trouvez des opportunités de financement et de carrière.</p>
              </Card>
            </Link>
            <Link to="/profile" className="block">
              <Card className="text-center bg-red-100 hover:bg-red-200 transition-colors duration-300 transform hover:scale-105">
                <i className="fas fa-user-circle text-5xl text-red-700 mb-4"></i>
                <h3 className="text-2xl font-semibold text-red-800">Mon Profil</h3>
                <p className="text-gray-600 mt-2">Gérez vos informations et notes académiques.</p>
              </Card>
            </Link>
            <Link to="/contact" className="block">
              <Card className="text-center bg-indigo-100 hover:bg-indigo-200 transition-colors duration-300 transform hover:scale-105">
                <i className="fas fa-headset text-5xl text-indigo-700 mb-4"></i>
                <h3 className="text-2xl font-semibold text-indigo-800">Contact & Support</h3>
                <p className="text-gray-600 mt-2">Besoin d'aide ? Contactez-nous facilement.</p>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
