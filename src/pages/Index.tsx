import Header from "../components/Header";
import SkillBar from "../components/SkillBar";
import Experience from "../components/Experience";
import { Code, Database, Server, Cloud, Terminal, Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen py-4 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr,2fr] gap-4">
        <div className="space-y-6">
          <Header />
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Technical Expertise</h2>
            <div className="grid grid-cols-1 gap-y-1.5">
              <SkillBar name="Infrastructure as Code" level="Expert" />
              <SkillBar name="CI/CD" level="Expert" />
              <SkillBar name="Cloud Platforms" level="Expert" />
              <SkillBar name="Containerization" level="Expert" />
              <SkillBar name="Monitoring & Observability" level="Expert" />
              <SkillBar name="Scripting & Automation" level="Proficient" />
              <SkillBar name="Data Orchestration" level="Proficient" />
              <SkillBar name="Virtualization" level="Expert" />
              <SkillBar name="Networking" level="Advanced" />
              <SkillBar name="DevOps Security" level="Proficient" />
              <SkillBar name="Databases" level="Proficient" />
              <SkillBar name="Machine Learning Ops" level="Familiar" />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Tech Stack</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
                <Code className="w-4 h-4 text-accent" />
                <span className="text-xs">Python</span>
              </div>
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-xs">Bash/Shell</span>
              </div>
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
                <Cloud className="w-4 h-4 text-accent" />
                <span className="text-xs">AWS</span>
              </div>
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
                <Server className="w-4 h-4 text-accent" />
                <span className="text-xs">Kubernetes</span>
              </div>
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
                <Database className="w-4 h-4 text-accent" />
                <span className="text-xs">PostgreSQL</span>
              </div>
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
                <Github className="w-4 h-4 text-accent" />
                <span className="text-xs">GitHub Actions</span>
              </div>
            </div>
          </section>
        </div>
        
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Professional Experience</h2>
          <div className="space-y-4">
            <Experience
              title="DevOps Engineer"
              company="Bytestack"
              period="Feb 2023 - Present"
              description="Driving DevOps strategies and infrastructure excellence for large-scale enterprise projects"
              bullets={[
                "Orchestrated resilient AWS and Kubernetes architectures",
                "Streamlined workflows with advanced automation and IaC practices",
                "Enhanced security protocols and operational efficiency"
              ]}
            />
            <Experience
              title="DevOps Engineer"
              company="Cerebrone.ai"
              period="Feb 2022 - Feb 2023"
              description="Driving DevOps strategies and infrastructure excellence for large-scale enterprise projects"
              bullets={[
                "Designed scalable Terraform modules improving efficiency by 15%",
                "Led migration from GCP to AWS optimizing system performance",
                "Engineered custom GitHub runners enhancing automation capabilities",
                "Implemented OIDC protocols for enhanced pod security"
              ]}
            />
            <Experience
              title="Junior DevOps Engineer"
              company="E-Spirit"
              period="Aug 2020 - Jan 2022"
              description="Implemented Infrastructure as Code and automation solutions"
              bullets={[
                "Spearheaded IaC implementation using ARM templates",
                "Managed VM migrations optimizing resource allocation",
                "Automated tasks with Bash/Shell scripts improving productivity by 30%",
                "Configured Jenkins CI pipelines with Ant and Maven integration"
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;