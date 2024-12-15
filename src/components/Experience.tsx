interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}

const Experience = ({ title, company, period, description, bullets }: ExperienceProps) => {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-white mb-0.5">{title}</h3>
      <div className="text-xs text-accent mb-1">
        {company} | {period}
      </div>
      <p className="text-xs mb-1">{description}</p>
      <ul className="list-disc list-inside space-y-0.5">
        {bullets.map((bullet, index) => (
          <li key={index} className="text-xs">{bullet}</li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;