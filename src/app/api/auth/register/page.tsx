'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import userRegister from '@/libs/userRegister';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', telephone: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Submitting form:', form);

    setLoading(true);

    try {
      const response = await userRegister(form.name, form.email, form.password, form.telephone);
      // console.log('Registration Response:', response);

      if (response?.success) { // เช็คว่าสมัครสำเร็จไหม
        
        
        setLoading(false)
        
        router.push("/api/auth/signin"); // ไปที่หน้า login
      } else {
        alert(response?.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'Something went wrong!');
    } 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
        <input name="telephone" placeholder="Telephone" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
        <button type="submit" 
        className={`w-full text-white p-2 rounded-lg transition
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-indigo-600'}`}
          disabled={loading}
        >
          {loading ? 'Reserving...' : 'Register' }
          </button>
      </form>
    </div>
  );
}
