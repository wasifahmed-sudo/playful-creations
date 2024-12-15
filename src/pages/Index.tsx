import Header from "../components/Header";
import SkillBar from "../components/SkillBar";
import Experience from "../components/Experience";

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-[1fr,2fr] gap-12 mb-12">
        <Header />
        
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Professional Experience</h2>
          <Experience
            title="DevOps Consultant"
            company="Bytestack"
            period="Feb 2022 - Present"
            description="Leading DevOps initiatives and infrastructure optimization for enterprise clients"
            bullets={[
              "Orchestrated high availability environments on AWS EC2 with 99.99% uptime",
              "Implemented Kubernetes Network Policies for enhanced security",
              "Led EKS Anywhere cluster deployment on Nutanix with 25% efficiency improvement",
              "Automated operational tasks saving substantial time and costs"
            ]}
          />
          <Experience
            title="DevOps Engineer"
            company="Cerebrone.ai"
            period="Jan 2023 - Nov 2023"
            description="Spearheaded cloud infrastructure and DevOps practices"
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
            period="Aug 2020 - Feb 2022"
            description="Implemented Infrastructure as Code and automation solutions"
            bullets={[
              "Spearheaded IaC implementation using ARM templates",
              "Managed VM migrations optimizing resource allocation",
              "Automated tasks with Bash/Shell scripts improving productivity by 30%",
              "Configured Jenkins CI pipelines with Ant and Maven integration"
            ]}
          />
        </section>
      </div>
      
      <section>
        <h2 className="text-2xl font-semibold text-white mb-6">Technical Expertise</h2>
        <div className="space-y-4">
          <SkillBar name="Infrastructure as Code" level="Expert" />
          <SkillBar name="CI/CD Pipeline Implementation" level="Expert" />
          <SkillBar name="Containerization & Orchestration" level="Expert" />
          <SkillBar name="Cloud Platforms" level="Expert" />
          <SkillBar name="Monitoring & Visualization" level="Advanced" />
          <SkillBar name="Source Code Management" level="Advanced" />
          <SkillBar name="Data Orchestration" level="Advanced" />
          <SkillBar name="Virtualization" level="Advanced" />
        </div>
      </section>
    </div>
  );
};

export default Index;