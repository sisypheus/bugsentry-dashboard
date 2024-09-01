import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../api/auth';
import GoogleLogo from '../components/icons/GoogleLogo';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/google`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(await response.text())
      const data = await response.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          <input
            type="password"
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign In
          </button>
        </form>
        <div className="space-y-4">
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <GoogleLogo className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <Link to="/signup" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;