interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}

const Experience = ({ title, company, period, description, bullets }: ExperienceProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-white mb-0.5">{title}</h3>
      <div className="text-sm text-accent mb-1">
        {company} | {period}
      </div>
      <p className="text-sm mb-1">{description}</p>
      <ul className="list-disc list-inside space-y-0.5">
        {bullets.map((bullet, index) => (
          <li key={index} className="text-sm">{bullet}</li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;