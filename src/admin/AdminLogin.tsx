
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Step 1: Authenticate with Supabase
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        throw loginError;
      }

      // Step 2: Check whether this user is a PCJ administrator
      const { data: isAdmin, error: adminError } =
        await supabase.rpc('is_pcj_admin');

      if (adminError) {
        await supabase.auth.signOut();
        throw adminError;
      }

      // Step 3: Reject users who are not administrators
      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error('You are not authorised to access the admin panel.');
      }

      // Step 4: Open the admin dashboard
      navigate('/admin');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-stone-900">
            PCJ Property Consultants
          </h1>

          <p className="text-stone-500 mt-2">
            Administrator Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your admin email"
              required
              className="w-full border border-stone-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border border-stone-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-3 rounded-lg font-semibold hover:bg-stone-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <p className="text-xs text-stone-400 text-center mt-8">
          Secure administrator access · PCJ Property Consultants
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;
