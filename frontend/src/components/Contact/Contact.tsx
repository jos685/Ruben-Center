'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white text-green-900">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-4">
            Reach out to us for inquiries, appointments, or more information.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <MapPin className="text-green-700" />
              Ruben Centre, Mukuru kwa Ruben, Nairobi, Kenya
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-green-700" />
              +254 700 000 000
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-green-700" />
              info@rubencentre.org
            </li>
          </ul>
        </div>

        {/* Static Map */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
          <div className="w-full h-64 rounded-xl overflow-hidden border">
            <Image
              src="/images/map/image.png"
              alt="Static map showing hospital location"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            *Map is for reference only. Visit us in person for directions.
          </p>
        </div>
      </div>
    </section>
  )
}
