'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <motion.h2 className="text-3xl font-semibold mb-4">Proyectos</motion.h2>
      <ul className="space-y-6">
        <motion.li className="p-4 border rounded-lg dark:border-gray-700" whileHover={{ scale: 1.02 }}>
          <Link href="#project1" className="block hover:underline">
            <h3 className="text-xl font-bold">Proyecto 1</h3>
            <p className="text-gray-600 dark:text-gray-400">Descripción del proyecto, tecnologías usadas y funcionalidades.</p>
          </Link>
        </motion.li>
        <motion.li className="p-4 border rounded-lg dark:border-gray-700" whileHover={{ scale: 1.02 }}>
          <Link href="#project2" className="block hover:underline">
            <h3 className="text-xl font-bold">Proyecto 2</h3>
            <p className="text-gray-600 dark:text-gray-400">Otro proyecto destacado con breve descripción.</p>
          </Link>
        </motion.li>
      </ul>
    </section>
  );
}