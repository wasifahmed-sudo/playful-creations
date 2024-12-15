interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
}

const ProjectCard = ({ title, description, technologies }: ProjectCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-accent/20">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-background border border-accent/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;