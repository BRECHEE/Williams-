
// pages/ContactPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import FaqAccordion from '../components/FaqAccordion';
import { DUMMY_FAQS } from '../constants';
import { ContactFormData } from '../types';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    if (errors[e.target.name as keyof ContactFormData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validateForm = () => {
    let newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        alert('Votre message a été envoyé avec succès !');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div ref={pageRef} className="pt-24 pb-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Contact & Support</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="contact-name"
                name="name"
                label="Votre Nom"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Input
                id="contact-email"
                name="email"
                label="Votre Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              <div>
                <label htmlFor="contact-message" className="block text-gray-700 text-sm font-medium mb-1">
                  Votre Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-y ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i> Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Google Maps Embed */}
          <Card className="p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Notre Campus</h2>
            <div className="relative w-full h-full min-h-[300px] flex-grow rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916892305096!2d2.2922926156748434!3d48.8583700792874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964a787d5%3A0x8e09f63f58a5c0b!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1678912345678!5m2!1sen!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Campus Location"
              ></iframe>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              (Adresse fictive : 1 Rue de l'Université, 75000 Paris, France)
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Questions Fréquemment Posées</h2>
          <FaqAccordion items={DUMMY_FAQS} />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
