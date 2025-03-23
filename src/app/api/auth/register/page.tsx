'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import userRegister from '@/libs/userRegister';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', telephone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    try {
      await userRegister(form.name, form.email, form.password, form.telephone);
      router.push('/login'); // Go to login after successful registration
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <input name="telephone" placeholder="Telephone" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
