
import Header from "../components/Header";
import SkillBar from "../components/SkillBar";
import Experience from "../components/Experience";
import React, { useState } from 'react';
import Keyboard from "../components/Keyboard";
import NeuralParticles from "../components/NeuralParticles";
import FloatingCode from "../components/FloatingCode";
import ThoughtBubbles from "../components/ThoughtBubbles";
import BlackHole from "../components/BlackHole";

const Index = () => {
  return (
    <div className="min-h-screen py-4 px-4 max-w-6xl mx-auto relative z-10">
      <BlackHole />
      <NeuralParticles />
      <FloatingCode />
      <ThoughtBubbles />
      
      <div className="grid md:grid-cols-[1fr,2fr] gap-4 relative z-20">
        <div className="space-y-6">
          <Header />
          <Keyboard />
          <section className="p-4 rounded-lg bg-card backdrop-blur-sm border border-accent/10">
            <h2 className="text-xl font-semibold text-white mb-3">Technical Expertise</h2>
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
              <SkillBar name="Blockchain and Web3" level="Proficient" />
              <SkillBar name="Machine Learning Ops" level="Familiar" />
            </div>
          </section>
        </div>
        
        <section className="p-4 rounded-lg bg-card backdrop-blur-sm border border-accent/10">
          <h2 className="text-xl font-semibold text-white mb-3">Professional Experience</h2>
          <div className="space-y-4">
            <Experience
              title="DevOps Engineer"
              company="Bytestack"
              period="Feb 2023 - Present"
              description="Streamlining operations and delivering reliable cloud solutions"
              bullets={[
                "Managed and maintained cloud infrastructure to ensure smooth operations and uptime.",
                "Automated deployment processes, streamlining workflows and reducing manual effort.",
                "Enhanced security protocols and operational efficiency",
                "Collaborated closely with teams to deliver tailored infrastructure solutions."
              ]}
            />
            <Experience
              title="DevOps Engineer"
              company="Cerebrone.ai"
              period="Feb 2022 - Feb 2023"
              description="Scaling cloud environments and improving development workflows"
              bullets={[
                "Designed and deployed scalable cloud environments with Terraform and CI/CD pipelines.",
                "Migrated applications between cloud platforms to improve scalability and performance.",
                "Built custom automation scripts to optimize workflows and simplify operations.",
                "Strengthened cloud security with modern authentication and monitoring solutions."
              ]}
            />
            <Experience
              title="Junior DevOps Engineer"
              company="E-Spirit"
              period="Aug 2020 - Jan 2022"
              description="Automating processes and supporting development pipelines"
              bullets={[
                "Contributed to building and maintaining infrastructure using modern IaC tools.",
                "Automated repetitive tasks, improving team productivity and reducing manual errors.",
                "Supported CI/CD pipelines to ensure smooth and efficient deployments.",
                "Gained experience managing and optimizing virtualized and cloud environments."
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
