import { Mail, Github, Twitter, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-white mb-1">Syed Wasif Ahmed</h1>
      <h2 className="text-base mb-2 text-accent">DevOps Engineer</h2>
      
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-accent" />
          <span>Hyderabad, India</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail size={14} className="text-accent" />
          <a href="mailto:syedwasifahmed@protonmail.com" className="hover:text-white transition-colors">
            syedwasifahmed@protonmail.com
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Github size={14} className="text-accent" />
          <a href="https://github.com/wasifahmed-sudo" className="hover:text-white transition-colors">
            github.com/wasifahmed-sudo
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;