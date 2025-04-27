import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Rss } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Global News Network</h3>
            <p className="text-muted-foreground text-sm">
              Your trusted source for breaking news, in-depth reporting, and analysis from around the world.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/world" className="text-sm text-muted-foreground hover:text-primary">
                  World
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="text-sm text-muted-foreground hover:text-primary">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="text-sm text-muted-foreground hover:text-primary">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/africa" className="text-sm text-muted-foreground hover:text-primary">
                  Africa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-sm text-muted-foreground hover:text-primary">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Rss className="h-5 w-5" />
                <span className="sr-only">RSS</span>
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Subscribe to Newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border rounded-md text-sm w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Global News Network. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
