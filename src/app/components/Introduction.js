'use client';
import { motion } from 'framer-motion';

export default function Introduction() {
  return (
    <section id="home" className="min-h-screen p-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-20">
      <motion.h1 className="text-4xl font-bold mb-4">Bienvenido a mi portafolio</motion.h1>
      <motion.p className="text-lg">Aquí encontrarás información sobre mis proyectos y experiencia.</motion.p>
    </section>
  );
}