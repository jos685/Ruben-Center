'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Outpatient Consultation',
    description: 'Get expert diagnosis and personalized care from our experienced doctors.',
    image: '/images/services/child.jpg',
  },
  {
    title: 'Laboratory Services',
    description: 'We offer accurate and timely lab tests to support your treatment.',
    image: '/images/services/lab.png',
  },
  {
    title: 'Pharmacy',
    description: 'Affordable, high-quality medication and pharmacist support on-site.',
    image: '/images/services/phramacy.jpeg',
  },
  {
    title: 'Maternal & Child Health',
    description: 'Pre-natal, post-natal, and child wellness services for mothers and babies.',
    image: '/images/services/maternal.jpg',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-green-50 text-green-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Our Health Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
