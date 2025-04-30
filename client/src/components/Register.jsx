import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onAuthSuccess }) {
  const API = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
    //   const res = await axios.post('http://localhost:5000/api/auth/register', form);
    const res = await axios.post(`${API}/api/auth/register`, form);

      localStorage.setItem('token', res.data.token);
      onAuthSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className={`w-full border p-2 mb-3 rounded text-black ${form.username ? 'border-green-500' : 'border-gray-300'}`} 
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={`w-full border p-2 mb-3 rounded text-black ${form.username ? 'border-green-500' : 'border-gray-300'}`} 
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
}
