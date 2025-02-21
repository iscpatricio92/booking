// pages/signup.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Usar Supabase Auth para registrar al usuario
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setMessage('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.');
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          placeholder="Nombre" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Correo electrónico" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Contraseña" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {message && <p style={{color:'green'}}>{message}</p>}
    </div>
  );
}