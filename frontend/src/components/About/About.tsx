'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white text-green-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          About Our Hospital
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          We are committed to providing accessible, affordable, and compassionate health care
          services to the Mukuru community and beyond. From patient registration and consultations
          to pharmacy and specialized services — every step is designed to treat with dignity.
        </motion.p>
      </div>
    </section>
  )
}
