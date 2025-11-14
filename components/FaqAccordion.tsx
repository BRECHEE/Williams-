
// components/FaqAccordion.tsx
import React, { useState } from 'react';
import { FAQItem } from '../types';

interface FaqAccordionProps {
  items: FAQItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-lg shadow-sm">
          <button
            className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors duration-300"
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${item.id}`}
          >
            <span>{item.question}</span>
            <i className={`fas ${activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'} text-blue-700 transition-transform duration-300`}></i>
          </button>
          <div
            id={`faq-answer-${item.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? 'max-h-96 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-600 border-t border-gray-100 pt-4">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
