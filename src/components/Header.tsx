
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const { toast } = useToast();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("syedwasifahmed@protonmail.com");
    toast({
      description: "Email address copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-white mb-1">Syed Wasif Ahmed</h1>
      <h2 className="text-base mb-2 text-accent">DevOps Engineer</h2>
    </header>
  );
};

export default Header;
