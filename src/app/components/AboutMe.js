'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="min-h-screen p-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <motion.h2 className="text-3xl font-semibold mb-4">Sobre mí</motion.h2>
      <p>Información personal sobre mi carrera, experiencia y habilidades.</p>
    </section>
  );
}