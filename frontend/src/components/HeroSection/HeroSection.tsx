// components/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-[130vh] bg-gray-200">
      {/* Background Image */}
      <div className="absolute inset-0 pt-20">
    <Image
      src="/images/background/Ruben.jpeg"
      alt="Hospital staff"
      fill
      className="object-cover"
      priority
    />
  </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-10" />

      {/* Text Content */}
      <div className="absolute inset-0 z-20 pt-60 flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-green-700"
        >
          Compassionate Health Care, Right at Your Doorstep
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl font-bold max-w-2xl text-center text-green-900"
        >
          Serving the Mukuru community with dignity, integrity, and professionalism.
        </motion.p>
        <motion.a
          href="#about"
          className="mt-6 bg-white text-green-700 px-6 py-3 rounded shadow hover:bg-green-100 transition"
          whileHover={{ scale: 1.05 }}
        >
          Learn More About Us
        </motion.a>
      </div>
    </section>
  )
}
