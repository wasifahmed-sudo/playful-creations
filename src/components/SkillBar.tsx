interface SkillBarProps {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate" | "Proficient" | "Familiar";
}

const SkillBar = ({ name, level }: SkillBarProps) => {
  const getWidth = () => {
    switch (level) {
      case "Expert":
        return "w-full";
      case "Advanced":
        return "w-4/5";
      case "Proficient":
        return "w-3/5";
      case "Intermediate":
        return "w-2/5";
      case "Familiar":
        return "w-1/5";
      default:
        return "w-2/5";
    }
  };

  return (
    <div className="mb-1">
      <div className="flex justify-between mb-0.5 text-sm">
        <span>{name}</span>
        <span className="text-accent">{level}</span>
      </div>
      <div className="w-full bg-card rounded-full h-1">
        <div className={`skill-bar h-1 ${getWidth()}`} />
      </div>
    </div>
  );
};

export default SkillBar;