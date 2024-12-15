import Header from "../components/Header";
import SkillBar from "../components/SkillBar";
import Experience from "../components/Experience";

const Index = () => {
  return (
    <div className="h-screen py-8 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr,2fr] gap-8 mb-8">
        <Header />
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Professional Experience</h2>
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
        <h2 className="text-xl font-semibold text-white mb-4">Technical Expertise</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <SkillBar name="Infrastructure as Code" level="Expert" />
          <SkillBar name="CI/CD" level="Expert" />
          <SkillBar name="Cloud Platforms" level="Expert" />
          <SkillBar name="Containerization" level="Expert" />
          <SkillBar name="Monitoring & Observability" level="Expert" />
          <SkillBar name="Scripting & Automation" level="Advanced" />
          <SkillBar name="Data Orchestration" level="Advanced" />
          <SkillBar name="Virtualization" level="Expert" />
          <SkillBar name="Networking" level="Advanced" />
          <SkillBar name="DevOps Security" level="Advanced" />
          <SkillBar name="Databases" level="Advanced" />
          <SkillBar name="Machine Learning Ops" level="Intermediate" />
        </div>
      </section>
    </div>
  );
};

export default Index;