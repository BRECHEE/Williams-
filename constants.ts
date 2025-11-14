
// constants.ts

import { Announcement, Course, TimetableEntry, ForumPost, Scholarship, FAQItem } from "./types";

export const API_KEY = process.env.API_KEY || 'YOUR_GEMINI_API_KEY'; // Assumes process.env.API_KEY is available.

export const NAV_LINKS = [
  { name: 'Accueil', path: '/' },
  { name: 'Cours & Ressources', path: '/courses' },
  { name: 'Emploi du Temps', path: '/timetable' },
  { name: 'Forum', path: '/forum' },
  { name: 'Bourses & Stages', path: '/scholarships' },
  { name: 'Profil', path: '/profile' },
  { name: 'Contact', path: '/contact' },
];

// Placeholder data for demonstration
export const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Inscriptions au semestre 2 ouvertes !', content: 'Ne manquez pas la date limite pour vous inscrire.', date: '2024-03-01', type: 'urgent' },
  { id: '2', title: 'Soirée Gala de l\'Université', content: 'Rejoignez-nous pour une soirée mémorable le 15 mars.', date: '2024-02-28', type: 'event' },
  { id: '3', title: 'Nouveaux horaires de la bibliothèque', content: 'La bibliothèque sera ouverte plus tard les mardis et jeudis.', date: '2024-02-20', type: 'news' },
];

export const DUMMY_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Programmation Web Avancée',
    code: 'INF301',
    lecturer: 'Dr. Dupont',
    semester: 'S1',
    discipline: 'Informatique',
    level: 'L3',
    resources: [
      { id: 'r1', name: 'Cours 1 - Introduction.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'PDF' },
      { id: 'r2', name: 'Présentation CSS.pptx', url: 'https://file-examples.com/storage/fe05c6d36e63283f3a1d00d/2017/10/file-example_PPT_250kB.ppt', type: 'PPT' },
    ],
  },
  {
    id: 'c2',
    title: 'Analyse de Données Statistiques',
    code: 'STA205',
    lecturer: 'Prof. Martin',
    semester: 'S1',
    discipline: 'Mathématiques',
    level: 'L2',
    resources: [
      { id: 'r3', name: 'Chapitre 1 - Probabilités.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'PDF' },
    ],
  },
  {
    id: 'c3',
    title: 'Management de Projet',
    code: 'MAN400',
    lecturer: 'Mme. Dubois',
    semester: 'S2',
    discipline: 'Gestion',
    level: 'M1',
    resources: [
      { id: 'r4', name: 'Introduction au Management.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'PDF' },
    ],
  },
];

export const DUMMY_TIMETABLE_ENTRIES: TimetableEntry[] = [
  { id: 't1', courseId: 'c1', courseTitle: 'Programmation Web Avancée', day: 'Monday', startTime: '09:00', endTime: '10:30', room: 'B101', semester: 'S1', group: 'A' },
  { id: 't2', courseId: 'c2', courseTitle: 'Analyse de Données Statistiques', day: 'Monday', startTime: '10:30', endTime: '12:00', room: 'A203', semester: 'S1', group: 'A' },
  { id: 't3', courseId: 'c3', courseTitle: 'Management de Projet', day: 'Tuesday', startTime: '14:00', endTime: '15:30', room: 'C305', semester: 'S2', group: 'B' },
  { id: 't4', courseId: 'c1', courseTitle: 'Programmation Web Avancée', day: 'Wednesday', startTime: '14:00', endTime: '17:00', room: 'B102', semester: 'S1', group: 'A' },
  { id: 't5', courseId: 'c2', courseTitle: 'Analyse de Données Statistiques', day: 'Thursday', startTime: '09:00', endTime: '12:00', room: 'A203', semester: 'S1', group: 'A' },
];

export const DUMMY_FORUM_POSTS: ForumPost[] = [
  {
    id: 'f1',
    title: 'Besoin d\'aide pour l\'exercice 3 de INF301',
    content: 'Quelqu\'un a-t-il compris comment résoudre la dernière question ? Je suis bloqué sur la partie authentification.',
    author: 'Alice Martin',
    category: 'Homework Help',
    date: '2024-03-05T10:00:00Z',
    comments: [
      { id: 'f1c1', postId: 'f1', author: 'Bob Léger', content: 'Oui, il faut utiliser JWT. Voici un tutoriel...', date: '2024-03-05T10:30:00Z' },
    ],
  },
  {
    id: 'f2',
    title: 'Événement portes ouvertes ce samedi !',
    content: 'L\'université organise une journée portes ouvertes pour les futurs étudiants. Venez nombreux !',
    author: 'Admin Université',
    category: 'Events',
    date: '2024-03-04T15:00:00Z',
    comments: [],
  },
];

export const DUMMY_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 's1',
    title: 'Bourse d\'Excellence Internationale',
    organization: 'Fondation GlobalConnect',
    country: 'France',
    deadline: '2024-05-15',
    domain: 'Toutes',
    type: 'Scholarship',
    applyLink: 'https://example.com/scholarship1',
  },
  {
    id: 's2',
    title: 'Stage Développeur Frontend - Été 2024',
    organization: 'TechInnov Solutions',
    country: 'France',
    deadline: '2024-04-30',
    domain: 'Informatique',
    type: 'Internship',
    applyLink: 'https://example.com/internship1',
  },
  {
    id: 's3',
    title: 'Assistant Marketing Digital (CDD Étudiant)',
    organization: 'MarketBoost Agence',
    country: 'France',
    deadline: '2024-03-20',
    domain: 'Marketing',
    type: 'Student Job',
    applyLink: 'https://example.com/job1',
  },
];

export const DUMMY_FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Comment accéder à mes notes ?',
    answer: 'Vos notes sont disponibles dans la section "Profil Étudiant" après vous être connecté.',
  },
  {
    id: 'faq2',
    question: 'Où trouver l\'emploi du temps de mon groupe ?',
    answer: 'L\'emploi du temps est accessible via la page "Emploi du Temps", vous pouvez filtrer par semestre et par groupe.',
  },
  {
    id: 'faq3',
    question: 'Comment contacter l\'administration ?',
    answer: 'Vous pouvez utiliser le formulaire de contact sur la page "Contact / Support" ou consulter les coordonnées du service concerné sur le site officiel de l\'université.',
  },
  {
    id: 'faq4',
    question: 'Puis-je modifier mes informations personnelles ?',
    answer: 'Oui, connectez-vous à votre profil et cliquez sur le bouton "Modifier le profil".',
  },
];
