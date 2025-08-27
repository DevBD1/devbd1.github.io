import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Mail, Linkedin, MapPin, Calendar, Code, Zap, Layers, Globe, ArrowRight, ChevronDown, Download } from 'lucide-react';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sections = scrollContainer.querySelectorAll('section[id]');
      const scrollTop = scrollContainer.scrollTop;
      
      sections.forEach((section) => {
        const offsetTop = section.offsetTop - 100;
        const height = section.offsetHeight;
        
        if (scrollTop >= offsetTop && scrollTop < offsetTop + height) {
          setActiveSection(section.id);
        }
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "AI-Powered Analytics Platform",
      description: "Revolutionary analytics platform using machine learning to provide real-time insights for enterprise clients. Features advanced data visualization and predictive modeling with WebGL-accelerated charts.",
      technologies: ["React", "TypeScript", "Python", "TensorFlow", "D3.js", "WebGL", "Node.js", "PostgreSQL"],
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      stats: { users: "50K+", data: "1M+ points", uptime: "99.9%" },
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Next-Gen E-Commerce Engine",
      description: "Headless commerce platform with micro-frontend architecture, supporting millions of transactions with sub-200ms response times. Built with modern serverless architecture.",
      technologies: ["Next.js", "GraphQL", "Microservices", "Kubernetes", "Redis", "Stripe", "AWS Lambda"],
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      stats: { transactions: "5M+", response: "<200ms", conversion: "+35%" },
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Real-Time Collaboration Suite",
      description: "WebRTC-based collaboration platform with simultaneous editing, voice/video calls, and advanced permission systems. Supports real-time document collaboration.",
      technologies: ["Vue.js", "WebRTC", "Socket.io", "Operational Transform", "FFmpeg", "Docker"],
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      stats: { companies: "100+", concurrent: "10K+", latency: "<50ms" },
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Blockchain DeFi Platform",
      description: "Decentralized finance platform with smart contracts, yield farming, and cross-chain functionality. Built on Ethereum with Layer 2 scaling solutions.",
      technologies: ["Solidity", "Web3.js", "React", "Hardhat", "IPFS", "MetaMask"],
      image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      stats: { tvl: "$2M+", transactions: "50K+", apy: "12%" },
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const experiences = [
    {
      company: "MetaTech Innovations",
      role: "Senior Full Stack Architect",
      period: "2023 - Present",
      description: "Leading development of next-generation web applications serving millions of users. Architecting scalable solutions and mentoring engineering teams across multiple time zones.",
      achievements: ["40% performance improvement", "Led team of 12 developers", "99.99% uptime achievement"],
      technologies: ["React", "Node.js", "AWS", "Kubernetes", "GraphQL"]
    },
    {
      company: "CloudScale Solutions",
      role: "Full Stack Engineer",
      period: "2021 - 2023",
      description: "Built enterprise-grade applications with focus on performance, security, and scalability. Implemented microservices architecture and comprehensive CI/CD pipelines.",
      achievements: ["50% cost reduction", "Implemented DevOps pipeline", "Security compliance lead"],
      technologies: ["Vue.js", "Python", "Docker", "PostgreSQL", "Redis"]
    },
    {
      company: "InnovateX Startup",
      role: "Frontend Developer",
      period: "2020 - 2021",
      description: "Developed user-centric interfaces and improved conversion rates through data-driven optimizations, A/B testing, and comprehensive user research.",
      achievements: ["35% conversion increase", "Mobile-first redesign", "Accessibility improvements"],
      technologies: ["JavaScript", "React", "SCSS", "Firebase", "Analytics"]
    }
  ];

  const skills = [
    { name: "Frontend Architecture", level: 95, icon: <Layers className="w-4 h-4" /> },
    { name: "React Ecosystem", level: 98, icon: <Code className="w-4 h-4" /> },
    { name: "TypeScript", level: 92, icon: <Zap className="w-4 h-4" /> },
    { name: "Node.js & APIs", level: 90, icon: <Globe className="w-4 h-4" /> },
    { name: "Cloud Architecture", level: 85, icon: <Layers className="w-4 h-4" /> },
    { name: "Database Design", level: 88, icon: <Code className="w-4 h-4" /> },
  ];

  const ParticleField = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const particles = [];
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth * 0.4; // Left side only
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5
        });
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.fill();
          
          // Connect nearby particles
          particles.slice(i + 1).forEach(otherParticle => {
            const dist = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 80) * 0.1})`;
              ctx.stroke();
            }
          });
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => window.removeEventListener('resize', resizeCanvas);
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && scrollContainerRef.current) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex overflow-hidden">
      {/* Custom cursor effect */}
      <div 
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-60 transition-transform duration-100"
        style={{ 
          left: mousePosition.x - 8, 
          top: mousePosition.y - 8,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Left Sidebar - Static */}
      <div className="w-2/5 min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10">
        <ParticleField />
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Profile Section */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold mb-6 mx-auto lg:mx-0">
                AD
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="block text-white">Alex</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Developer</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Full Stack Developer crafting exceptional digital experiences with modern technologies.
              </p>

              <div className="flex items-center space-x-4 text-gray-400 text-sm mb-8">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Available for work</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mb-8">
              {[
                { id: 'about', label: 'About Me' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 mb-2 ${
                    activeSection === item.id 
                      ? 'bg-blue-500/20 text-blue-400 border-l-4 border-blue-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </button>
              
              <button className="w-full border border-gray-600 text-gray-300 py-3 px-6 rounded-lg font-semibold hover:border-white hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
                { icon: <Mail className="w-5 h-5" />, href: "#", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Divider */}
      <div className="w-px relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 transform -skew-x-12 origin-top w-8 -ml-4"></div>
      </div>

      {/* Right Side - Scrollable Content */}
      <div className="flex-1 h-screen overflow-y-auto" ref={scrollContainerRef}>
        <div className="min-h-full bg-gray-800/30">
          
          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center px-8 lg:px-16 py-20">
            <div className="max-w-4xl">
              <div className="mb-12">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-12">
                <p>
                  I started my journey in software development back in 2018, diving into web technologies 
                  with a passion for creating digital experiences that matter. What began as curiosity about 
                  how websites work has evolved into deep expertise in full-stack development.
                </p>
                <p>
                  Today, I specialize in building scalable web applications using modern technologies like 
                  React, Node.js, and TypeScript. I've had the privilege of working with startups and 
                  established companies, helping them bring their digital visions to life while focusing 
                  on performance, accessibility, and user experience.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, mentoring junior developers, and sharing knowledge through technical writing.
                </p>
              </div>

              {/* Skills Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-400">{skill.icon}</div>
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-blue-500/30"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="min-h-screen px-8 lg:px-16 py-20">
            <div className="max-w-4xl">
              <div className="mb-12">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Experience
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
              </div>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="group relative pl-8 border-l-2 border-gray-700 hover:border-blue-500 transition-all duration-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900"></div>
                    
                    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/70">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                        <div className="text-blue-400 font-semibold mb-1">{exp.company}</div>
                        <div className="text-gray-400 text-sm">{exp.period}</div>
                      </div>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY ACHIEVEMENTS</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen px-8 lg:px-16 py-20">
            <div className="max-w-6xl">
              <div className="mb-12">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    {/* Project image/gradient */}
                    <div 
                      className="h-48 relative"
                      style={{ background: project.image }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={project.liveUrl} className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a href={project.githubUrl} className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-900/50 rounded-lg">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm font-bold text-blue-400">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-300 text-xs">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center px-8 lg:px-16 py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <div className="max-w-4xl">
              <div className="mb-12">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Let's Work Together
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
              </div>
              
              <div className="space-y-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  I'm always excited about new challenges and opportunities to create 
                  innovative solutions. Whether you're a startup looking to build something amazing 
                  or an established company wanting to innovate, let's connect and discuss how we 
                  can bring your vision to life.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <Mail className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Email Me</h3>
                    <p className="text-gray-400 mb-4">Ready to start a conversation?</p>
                    <a href="mailto:hello@alexdev.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                      hello@alexdev.com
                    </a>
                  </div>
                  
                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <Linkedin className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Connect</h3>
                    <p className="text-gray-400 mb-4">Let's connect on LinkedIn</p>
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                      /in/alexdeveloper
                    </a>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <p className="text-gray-400 flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Based in San Francisco • Available worldwide • Remote friendly</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;