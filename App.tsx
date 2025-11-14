
// App.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import AuthForm from './components/AuthForm';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import TimetablePage from './pages/TimetablePage';
import ForumPage from './pages/ForumPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    alert('Déconnexion réussie !');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/profile" element={<ProfilePage currentUser={currentUser} onUpdateUser={handleUpdateUser} />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add a fallback route for unmatched paths */}
          <Route path="*" element={
            <div className="pt-24 pb-8 bg-gray-100 min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-extrabold text-blue-700 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-8">Page non trouvée</p>
                <a href="/#/" className="text-blue-600 hover:underline text-lg">Retour à l'accueil</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />

      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} title="Authentification">
        <AuthForm onLoginSuccess={handleLoginSuccess} onClose={() => setIsAuthModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
