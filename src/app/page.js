'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Introduction from '@/app/components/Introduction';
import Projects from '@/app/components/Projects';
import AboutMe from '@/app/components/AboutMe';
import ContactMe from '@/app/components/ContactMe';
import '@/app/styles/globals.css';


export default function Home() {

  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    updateHTMLTheme(savedTheme);
  }, []);

  const updateHTMLTheme = (theme) => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    const newTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateHTMLTheme(newTheme);
  };
  
  return (
    <div>
    <nav className="flex gap-6 p-4 bg-gray-100 dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-10">
      <Link href="#introduction" className="hover:underline">Inicio</Link>
      <Link href="#projects" className="hover:underline">Proyectos</Link>
      <Link href="#about" className="hover:underline">Sobre mí</Link>
      <Link href="#contact" className="hover:underline">Contacto</Link>
      <button
        className="ml-auto p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md hover:scale-105 transition-transform"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-500" />}
      </button>
    </nav>

    <Introduction />
    <Projects />
    <AboutMe />
    <ContactMe />
  </div>
  );
}
