
// pages/ProfilePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { User } from '../types';

interface ProfilePageProps {
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [major, setMajor] = useState(currentUser?.major || '');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setMajor(currentUser.major);
    }
  }, [currentUser]);

  const handleSave = () => {
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        name,
        email,
        major,
        // In a real app, CV upload would involve a backend call
        cvUrl: cvFile ? `uploads/${cvFile.name}` : currentUser.cvUrl,
      };
      onUpdateUser(updatedUser);
      setIsEditing(false);
      alert('Profil mis à jour avec succès !');
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  if (!currentUser) {
    return (
      <div className="pt-24 pb-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Accès Refusé</h1>
          <p className="text-gray-700">Veuillez vous connecter pour accéder à votre profil.</p>
        </Card>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="pt-24 pb-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Mon Profil Étudiant</h1>

        <Card className="max-w-3xl mx-auto p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-blue-200">
              <img
                src={currentUser.profilePicture || 'https://picsum.photos/128/128?random=avatar'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-700 opacity-0 hover:opacity-75 transition-opacity duration-300 flex items-center justify-center text-white text-xl">
                <i className="fas fa-camera"></i>
              </div>
              {/* Actual file input for image upload, hidden */}
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <div className="text-center md:text-left flex-grow">
              {isEditing ? (
                <>
                  <Input
                    id="edit-name"
                    label="Nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    id="edit-email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    id="edit-major"
                    label="Filière"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="mb-4"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-blue-700 mb-2">{currentUser.name}</h2>
                  <p className="text-gray-700 text-lg mb-1"><span className="font-semibold">Email:</span> {currentUser.email}</p>
                  <p className="text-gray-700 text-lg mb-1"><span className="font-semibold">ID Étudiant:</span> {currentUser.studentId}</p>
                  <p className="text-gray-700 text-lg"><span className="font-semibold">Filière:</span> {currentUser.major}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end space-x-4 border-t pt-6 border-gray-200">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  <i className="fas fa-save mr-2"></i> Sauvegarder
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit mr-2"></i> Modifier le Profil
              </Button>
            )}
            <label className="cursor-pointer">
              <input type="file" onChange={handleCvUpload} className="hidden" />
              <Button variant="ghost" className="bg-gray-100 hover:bg-gray-200">
                <i className="fas fa-file-upload mr-2"></i> Télécharger CV
              </Button>
            </label>
            {currentUser.cvUrl && (
              <a href={currentUser.cvUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="bg-gray-100 hover:bg-gray-200">
                  <i className="fas fa-eye mr-2"></i> Voir CV actuel
                </Button>
              </a>
            )}
          </div>
        </Card>

        {/* Academic History Placeholder */}
        <Card className="max-w-3xl mx-auto mt-8 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Historique Académique</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Semestre S1 (2023-2024)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Programmation Web Avancée: <span className="font-medium text-green-600">16/20</span></li>
                <li>Analyse de Données Statistiques: <span className="font-medium text-green-600">14/20</span></li>
                <li>Anglais: <span className="font-medium text-green-600">15/20</span></li>
                <li>Moyenne du semestre: <span className="font-bold text-blue-700">15/20</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Semestre S2 (2023-2024)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Management de Projet: <span className="font-medium text-yellow-600">12/20</span></li>
                <li>Développement Mobile: <span className="font-medium text-green-600">17/20</span></li>
                <li>Droit des Affaires: <span className="font-medium text-red-600">9/20</span> (Absence justifiée)</li>
                <li>Moyenne du semestre: <span className="font-bold text-blue-700">N/A</span> (en cours)</li>
              </ul>
            </div>
            {/* More semesters can be added here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
