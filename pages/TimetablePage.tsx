
// pages/TimetablePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../components/Card';
import { DUMMY_TIMETABLE_ENTRIES } from '../constants';
import { TimetableEntry } from '../types';

const TimetablePage: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('S1');
  const [selectedGroup, setSelectedGroup] = useState('A');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']; // Example semesters
  const groups = ['A', 'B', 'C']; // Example groups

  const daysOfWeek: Array<TimetableEntry['day']> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]; // Assuming Saturday might have courses

  const filteredEntries = DUMMY_TIMETABLE_ENTRIES.filter(
    (entry) => entry.semester === selectedSemester && entry.group === selectedGroup
  );

  const getDayEntries = (day: TimetableEntry['day']) => {
    return filteredEntries
      .filter((entry) => entry.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div ref={pageRef} className="pt-24 pb-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Mon Emploi du Temps</h1>

        {/* Filters */}
        <Card className="mb-8 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="semester-select" className="block text-gray-700 text-sm font-medium mb-1">
              Sélectionner un semestre
            </label>
            <select
              id="semester-select"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  Semestre {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="group-select" className="block text-gray-700 text-sm font-medium mb-1">
              Sélectionner un groupe
            </label>
            <select
              id="group-select"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  Groupe {g}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Timetable Grid */}
        <Card className="p-4 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="border border-blue-200 rounded-lg shadow-sm bg-blue-50 p-4">
                <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">{day === 'Monday' ? 'Lundi' : day === 'Tuesday' ? 'Mardi' : day === 'Wednesday' ? 'Mercredi' : day === 'Thursday' ? 'Jeudi' : day === 'Friday' ? 'Vendredi' : day === 'Saturday' ? 'Samedi' : day}</h3>
                <div className="space-y-3">
                  {getDayEntries(day).length > 0 ? (
                    getDayEntries(day).map((entry) => (
                      <div key={entry.id} className="bg-white p-3 rounded-md shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                        <p className="font-medium text-blue-800">{entry.courseTitle}</p>
                        <p className="text-sm text-gray-700">
                          <i className="far fa-clock mr-1 text-blue-600"></i> {entry.startTime} - {entry.endTime}
                        </p>
                        <p className="text-sm text-gray-700">
                          <i className="fas fa-map-marker-alt mr-1 text-blue-600"></i> {entry.room}
                        </p>
                        {/* Placeholder for add/replace course for logged-in users */}
                        {/* <button className="text-xs text-blue-500 hover:underline mt-1">Modifier</button> */}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm text-center">Pas de cours programmé.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-center text-gray-600 italic mt-8">
          Pour ajouter ou modifier des cours, veuillez vous connecter. Cette fonctionnalité nécessite un accès au profil étudiant.
        </p>
      </div>
    </div>
  );
};

export default TimetablePage;
