'use client';
import { motion } from 'framer-motion';

export default function ContactMe() {
  return (
    <section id="contact" className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <motion.h2 className="text-3xl font-semibold mb-4">Contacto</motion.h2>
      <p>Formulario de contacto o información de contacto.</p>
    </section>
  );
}
