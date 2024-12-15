interface SkillBarProps {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
}

const SkillBar = ({ name, level }: SkillBarProps) => {
  const getWidth = () => {
    switch (level) {
      case "Expert":
        return "w-full";
      case "Advanced":
        return "w-4/5";
      case "Intermediate":
        return "w-3/5";
      default:
        return "w-2/5";
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span className="text-accent">{level}</span>
      </div>
      <div className="w-full bg-card rounded-full">
        <div className={`skill-bar ${getWidth()}`} />
      </div>
    </div>
  );
};

export default SkillBar;