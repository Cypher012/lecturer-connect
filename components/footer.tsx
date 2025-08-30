import Link from "next/link"
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">Lecturer Connect</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Connecting students with faculty members in the Faculty of Computing. Explore lecturer profiles, research
              areas, and engage with our AI assistant.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Faculty of Computing, University Campus</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+234-800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@computing.university.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/lecturers" className="hover:text-accent transition-colors">
                  All Lecturers
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-accent transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-accent transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-accent transition-colors">
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Resources */}
          <div>
            <h3 className="font-semibold mb-4">Academic Resources</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Course Catalog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Research Publications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Student Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2024 Faculty of Computing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
