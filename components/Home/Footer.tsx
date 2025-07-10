import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border text-foreground">
      <div className="container mx-auto px-4 pt-10 pb-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Blog
              </span>
              <span className="text-foreground">Nest</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Learn. Code. Share.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/articles" className="hover:text-primary transition-colors">
              Articles
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="flex gap-4">
            <Link href="https://github.com" target="_blank" className="hover:text-primary">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-primary">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className=" text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BlogNext. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
