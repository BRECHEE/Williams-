// pages/CoursesPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from '../components/Modal'; // Import the Modal component
import { DUMMY_COURSES } from '../constants';
import { Course, Resource } from '../types';
import { generateTextWithGemini } from '../services/geminiService';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [geminiPrompt, setGeminiPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [showDriveConnectInfoModal, setShowDriveConnectInfoModal] = useState(false);


  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const semesters = ['All', ...new Set(DUMMY_COURSES.map((c) => c.semester))];
  const disciplines = ['All', ...new Set(DUMMY_COURSES.map((c) => c.discipline))];
  const levels = ['All', ...new Set(DUMMY_COURSES.map((c) => c.level))];

  const filteredCourses = DUMMY_COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'All' || course.semester === selectedSemester;
    const matchesDiscipline = selectedDiscipline === 'All' || course.discipline === selectedDiscipline;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesSemester && matchesDiscipline && matchesLevel;
  });

  const handleGeminiQuery = async () => {
    if (!geminiPrompt.trim()) return;
    setIsLoadingGemini(true);
    setGeminiResponse('');
    try {
      const response = await generateTextWithGemini(geminiPrompt);
      setGeminiResponse(response);
    } catch (error) {
      setGeminiResponse('Erreur lors de la communication avec l\'IA.');
      console.error('Error fetching Gemini response:', error);
    } finally {
      setIsLoadingGemini(false);
    }
  };

  const handleSimulateDriveConnect = () => {
    setIsDriveConnected(true);
    setShowDriveConnectInfoModal(false);
    alert('Connexion à Google Drive simulée !');
  };

  const handleDisconnectDrive = () => {
    setIsDriveConnected(false);
    alert('Déconnexion de Google Drive simulée.');
  };

  const renderResourceIcon = (type: Resource['type']) => {
    const iconClassMap = {
      'PDF': 'fas fa-file-pdf',
      'PPT': 'fas fa-file-powerpoint',
      'DOC': 'fas fa-file-word',
      'VIDEO': 'fas fa-video',
    };
    const colorClassMap = {
      'PDF': 'bg-red-100 text-red-600',
      'PPT': 'bg-orange-100 text-orange-600',
      'DOC': 'bg-blue-100 text-blue-600',
      'VIDEO': 'bg-purple-100 text-purple-600',
    };

    const iconClass = iconClassMap[type] || 'fas fa-file';
    const colorClass = colorClassMap[type] || 'bg-gray-100 text-gray-600';

    return (
      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClass} text-xl mr-3 flex-shrink-0`}>
        <i className={iconClass}></i>
      </span>
    );
  };

  return (
    <div ref={pageRef} className="pt-24 pb-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Cours et Ressources</h1>

        {/* Filters and Search */}
        <Card className="mb-8 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Input
            id="search-course"
            label="Rechercher un cours"
            type="text"
            placeholder="Titre, code, enseignant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <label htmlFor="semester-filter" className="block text-gray-700 text-sm font-medium mb-1">
              Semestre
            </label>
            <select
              id="semester-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'Tous les semestres' : `Semestre ${s}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="discipline-filter" className="block text-gray-700 text-sm font-medium mb-1">
              Filière
            </label>
            <select
              id="discipline-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
            >
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'Toutes les filières' : d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level-filter" className="block text-gray-700 text-sm font-medium mb-1">
              Niveau
            </label>
            <select
              id="level-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l === 'All' ? 'Tous les niveaux' : l}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">{course.title} ({course.code})</h2>
                <p className="text-gray-700 mb-1"><span className="font-medium">Enseignant:</span> {course.lecturer}</p>
                <p className="text-gray-600 mb-1"><span className="font-medium">Semestre:</span> {course.semester}</p>
                <p className="text-gray-600 mb-4"><span className="font-medium">Niveau:</span> {course.level} | <span className="font-medium">Filière:</span> {course.discipline}</p>

                {course.resources.length > 0 && (
                  <div className="mt-4 border-t pt-4 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ressources:</h3>
                    <ul className="space-y-2">
                      {course.resources.map((resource) => (
                        <li key={resource.id} className="flex items-center text-gray-700">
                          {renderResourceIcon(resource.type)}
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
                          >
                            {resource.name}
                          </a>
                          <Button variant="ghost" size="sm" className="ml-auto text-blue-600 hover:bg-blue-50">
                            <i className="fas fa-share-alt mr-1"></i> Partager
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.resources.length === 0 && (
                  <p className="text-gray-500 italic mt-4">Aucune ressource disponible pour ce cours.</p>
                )}
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">Aucun cours trouvé avec ces critères.</p>
          )}
        </div>

        {/* Study Buddy with Gemini */}
        <Card className="mt-12 p-6 bg-blue-50 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Besoin d'aide pour vos études ?</h2>
          <p className="text-gray-700 mb-6">Utilisez notre assistant IA, propulsé par Gemini, pour obtenir des explications, des résumés ou des réponses à vos questions académiques.</p>
          <Button onClick={() => setIsGeminiModalOpen(true)} className="bg-blue-600 hover:bg-blue-800">
            <i className="fas fa-robot mr-2"></i> Poser une question à l'IA
          </Button>
        </Card>

        {/* Google Drive Integration */}
        <Card className="mt-8 p-6 bg-green-50 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Centralisez vos documents avec Google Drive</h2>
          <p className="text-gray-700 mb-6">Connectez votre compte Google Drive pour accéder facilement à vos fichiers et partager des ressources.</p>
          {isDriveConnected ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg text-green-700 font-semibold flex items-center">
                <i className="fas fa-check-circle mr-2 text-green-500"></i> Google Drive connecté !
              </p>
              <div className="flex space-x-4">
                <Button onClick={handleDisconnectDrive} variant="secondary" className="bg-green-600 hover:bg-green-700 text-white">
                  <i className="fas fa-unlink mr-2"></i> Déconnecter
                </Button>
                {/* Add a placeholder button for "Upload to Drive" or "Browse Drive" functionality here */}
                <Button variant="ghost" className="text-green-700 border border-green-700 hover:bg-green-100">
                  <i className="fas fa-folder-open mr-2"></i> Parcourir Drive (Simulé)
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setShowDriveConnectInfoModal(true)} className="bg-green-600 hover:bg-green-800">
              <i className="fab fa-google-drive mr-2"></i> Connecter Google Drive
            </Button>
          )}
        </Card>

        {/* Gemini Modal */}
        {isGeminiModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Assistant d'Étude Gemini</h2>
                <button
                  onClick={() => { setIsGeminiModalOpen(false); setGeminiPrompt(''); setGeminiResponse(''); }}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              <div className="p-4">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-y"
                  rows={4}
                  placeholder="Posez votre question académique ici... (ex: 'Expliquez le concept de la récursivité en programmation')"
                  value={geminiPrompt}
                  onChange={(e) => setGeminiPrompt(e.target.value)}
                  disabled={isLoadingGemini}
                  aria-label="Question à l'IA"
                ></textarea>
                <Button onClick={handleGeminiQuery} className="mt-4 w-full" disabled={isLoadingGemini}>
                  {isLoadingGemini ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> Chargement...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i> Envoyer
                    </>
                  )}
                </Button>

                {geminiResponse && (
                  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Réponse de l'IA:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{geminiResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Google Drive Connect Info Modal */}
        <Modal isOpen={showDriveConnectInfoModal} onClose={() => setShowDriveConnectInfoModal(false)} title="Connecter Google Drive">
          <div className="space-y-4 text-gray-700">
            <p>Pour intégrer Google Drive, cette application aurait besoin d'accéder à votre compte Google via une authentification sécurisée (OAuth 2.0).</p>
            <p>Cela permettrait à l'application de :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Créer, modifier et supprimer des fichiers spécifiques que vous partagez avec l'application (<code className="bg-gray-100 p-1 rounded">drive.file</code>).</li>
              <li>Stocker des données spécifiques à l'application dans votre Google Drive (<code className="bg-gray-100 p-1 rounded">drive.appdata</code>).</li>
            </ul>
            <p className="font-semibold text-orange-600">Note : Dans cette version démo purement frontend, la connexion est simulée. Une intégration réelle nécessiterait une configuration d'API Google Cloud et potentiellement un backend pour une gestion sécurisée des tokens.</p>
            <Button onClick={handleSimulateDriveConnect} className="w-full bg-green-600 hover:bg-green-700 mt-4">
              <i className="fas fa-link mr-2"></i> Simuler la connexion
            </Button>
            <Button variant="secondary" onClick={() => setShowDriveConnectInfoModal(false)} className="w-full mt-2">
              Annuler
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CoursesPage;