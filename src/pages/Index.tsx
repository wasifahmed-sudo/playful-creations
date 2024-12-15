import Header from "../components/Header";
import SkillBar from "../components/SkillBar";
import Experience from "../components/Experience";
import ProjectCard from "../components/ProjectCard";

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <Header />
      
      <div className="grid md:grid-cols-[2fr,3fr] gap-12">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Technical Expertise</h2>
          <div className="space-y-4">
            <SkillBar name="C/C++/Rust" level="Expert" />
            <SkillBar name="JVM Languages" level="Expert" />
            <SkillBar name="Kernel Programming" level="Expert" />
            <SkillBar name="Digital Forensics" level="Expert" />
            <SkillBar name="Windows Internals & APIs" level="Expert" />
            <SkillBar name="MySQL, MariaDB, MongoDB" level="Advanced" />
            <SkillBar name="Linux/UNIX Systems" level="Advanced" />
            <SkillBar name="Virtualization" level="Advanced" />
            <SkillBar name="Frontend Development" level="Intermediate" />
            <SkillBar name="Network Security" level="Intermediate" />
          </div>
        </section>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Professional Experience</h2>
            <Experience
              title="Infrastructure Lead"
              company="Phytor"
              period="2024 - Present"
              description="Maintaining infrastructure, ensuring high availability and performance."
              bullets={[
                "Automated server provisioning using Terraform and Ansible",
                "Led transition to bare metal servers, reducing costs",
                "Developed custom infrastructure ontop of Kubernetes"
              ]}
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Notable Projects</h2>
            <div className="grid gap-6">
              <ProjectCard
                title="Kronos"
                description="A containerized security solution that specializes in detecting and mitigating JVM-based malware within Docker environments."
                technologies={["Docker", "JVM", "Kotlin", "ASM", "eBPF", "C++", "Linux Kernel"]}
              />
              <ProjectCard
                title="Vytal"
                description="A Security Information and Event Management (SIEM) system tailored for monitoring and securing Docker environments in real-time"
                technologies={["Rust", "Docker", "Elasticsearch", "Logstash", "Kibana", "Kubernetes"]}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;