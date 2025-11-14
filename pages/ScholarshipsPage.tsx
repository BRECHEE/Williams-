
// pages/ScholarshipsPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { DUMMY_SCHOLARSHIPS } from '../constants';
import { Scholarship } from '../types';

const ScholarshipsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const domains = ['All', ...new Set(DUMMY_SCHOLARSHIPS.map((s) => s.domain))];
  const types: Array<Scholarship['type'] | 'All'> = ['All', 'Scholarship', 'Internship', 'Student Job'];

  const filteredScholarships = DUMMY_SCHOLARSHIPS.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || scholarship.domain === selectedDomain;
    const matchesType = selectedType === 'All' || scholarship.type === selectedType;
    return matchesSearch && matchesDomain && matchesType;
  }).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()); // Sort by deadline

  const getTypeColor = (type: Scholarship['type']) => {
    switch (type) {
      case 'Scholarship': return 'bg-green-100 text-green-800';
      case 'Internship': return 'bg-purple-100 text-purple-800';
      case 'Student Job': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div ref={pageRef} className="pt-24 pb-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Bourses et Stages</h1>

        {/* Filters and Search */}
        <Card className="mb-8 p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Input
            id="search-scholarship"
            label="Rechercher une offre"
            type="text"
            placeholder="Titre, entreprise, pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <label htmlFor="domain-filter" className="block text-gray-700 text-sm font-medium mb-1">
              Domaine
            </label>
            <select
              id="domain-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'Tous les domaines' : d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type-filter" className="block text-gray-700 text-sm font-medium mb-1">
              Type d'offre
            </label>
            <select
              id="type-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'Tous les types' : t === 'Scholarship' ? 'Bourse' : t === 'Internship' ? 'Stage' : 'Emploi Étudiant'}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Scholarship List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-blue-700">{scholarship.title}</h2>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getTypeColor(scholarship.type)}`}>
                      {scholarship.type === 'Scholarship' ? 'Bourse' : scholarship.type === 'Internship' ? 'Stage' : 'Emploi Étudiant'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-1"><span className="font-medium">Organisation:</span> {scholarship.organization}</p>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Domaine:</span> {scholarship.domain}</p>
                  <p className="text-gray-600 mb-4"><span className="font-medium">Pays:</span> {scholarship.country}</p>
                </div>
                <div className="mt-4 border-t pt-4 border-gray-200 flex justify-between items-center">
                  <p className="text-sm text-gray-700">
                    <i className="far fa-calendar-alt mr-1 text-blue-600"></i> Date limite: <span className="font-semibold">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                  </p>
                  <a href={scholarship.applyLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="sm">
                      <i className="fas fa-external-link-alt mr-2"></i> Postuler
                    </Button>
                  </a>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">Aucune offre trouvée avec ces critères.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;
