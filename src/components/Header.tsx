import { Mail, Github, Twitter, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-12">
      <h1 className="text-4xl font-bold text-white mb-2">Aubrey Clark</h1>
      <h2 className="text-xl mb-4 text-accent">JVM Hacker & Systems Engineer</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-accent" />
          <span>Manchester, GB</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-accent" />
          <a href="mailto:cat@aubrey.rs" className="hover:text-white transition-colors">
            cat@aubrey.rs
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Github size={16} className="text-accent" />
          <a href="https://github.com/aubreyrs" className="hover:text-white transition-colors">
            github.com/aubreyrs
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Twitter size={16} className="text-accent" />
          <a href="https://twitter.com/aubyrs" className="hover:text-white transition-colors">
            twitter.com/aubyrs
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;