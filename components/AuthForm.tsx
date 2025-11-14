
// components/AuthForm.tsx
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { User } from '../types';

interface AuthFormProps {
  onLoginSuccess: (user: User) => void;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!isLogin && name.trim() === '') {
      setNameError('Le nom est requis.');
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Adresse email invalide.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      isValid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call for login/registration
      setTimeout(() => {
        const dummyUser: User = {
          id: '1',
          name: isLogin ? 'Étudiant Démo' : name,
          email: email,
          studentId: '12345',
          major: 'Informatique',
          isLoggedIn: true,
        };
        onLoginSuccess(dummyUser);
        onClose();
        alert(isLogin ? 'Connexion réussie !' : 'Inscription réussie !');
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-bold text-center text-blue-700 mb-6">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h3>

      {!isLogin && (
        <Input
          id="name"
          label="Nom complet"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          required
        />
      )}
      <Input
        id="email"
        label="Email universitaire"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        required
      />
      <Input
        id="password"
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        required
      />
      {!isLogin && (
        <Input
          id="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          required
        />
      )}

      <Button type="submit" className="w-full" size="lg">
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </Button>

      <p className="text-center text-gray-600 mt-4">
        {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-700 hover:underline ml-1 focus:outline-none"
        >
          {isLogin ? "S'inscrire" : "Se connecter"}
        </button>
      </p>
    </form>
  );
};

export default AuthForm;
