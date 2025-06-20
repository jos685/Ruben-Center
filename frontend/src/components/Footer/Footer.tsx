import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ruben Centre. All rights reserved.
        </p>

        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="#about" className="hover:underline text-sm">
            About
          </a>
          <a href="#services" className="hover:underline text-sm">
            Services
          </a>
          <a href="#contact" className="hover:underline text-sm">
            Contact
          </a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-5 w-5 hover:text-green-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5 hover:text-green-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5 hover:text-green-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-green-300" />
          </a>
        </div>
      </div>
    </footer>
  )
}
