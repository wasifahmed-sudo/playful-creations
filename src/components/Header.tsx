import { Mail, Github, Twitter, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-6">
      <h1 className="text-xl font-bold text-white mb-1">Syed Wasif Ahmed</h1>
      <h2 className="text-sm mb-2 text-accent">DevOps Engineer</h2>
      
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="text-accent" />
          <span>Hyderabad, India</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail size={12} className="text-accent" />
          <a href="mailto:syedwasifahmed@protonmail.com" className="hover:text-white transition-colors">
            cat@aubrey.rs
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Github size={12} className="text-accent" />
          <a href="https://github.com/wasifahmed-sudo" className="hover:text-white transition-colors">
            github.com/wasifahmed-sudo
          </a>
        </div>
{/*         <div className="flex items-center gap-1.5">
          <Twitter size={12} className="text-accent" />
          <a href="https://twitter.com/aubyrs" className="hover:text-white transition-colors">
            twitter.com/aubyrs
          </a>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
