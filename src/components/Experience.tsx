interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}

const Experience = ({ title, company, period, description, bullets }: ExperienceProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
      <div className="text-accent mb-2">
        {company} | {period}
      </div>
      <p className="mb-2">{description}</p>
      <ul className="list-disc list-inside space-y-1">
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;