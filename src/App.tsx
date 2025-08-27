import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Calendar,
  MapPin,
  Download,
  ArrowUpRight,
} from "lucide-react";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sections = scrollContainer.querySelectorAll("section[id]");
      const scrollTop = scrollContainer.scrollTop;

      sections.forEach((section) => {
        const offsetTop = (section as HTMLElement).offsetTop - 100;
        const height = (section as HTMLElement).offsetHeight;

        if (scrollTop >= offsetTop && scrollTop < offsetTop + height) {
          setActiveSection((section as HTMLElement).id);
        }
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences = [
    {
      company: "TechCorp Solutions",
      role: "Senior Information Systems Engineer",
      period: "2023 - Present",
      description:
        "Leading digital transformation initiatives and architecting enterprise-level information systems. Managed cross-functional teams and implemented scalable solutions serving 100K+ users.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Kubernetes",
      ],
    },
    {
      company: "DataFlow Analytics",
      role: "Information Systems Engineer",
      period: "2021 - 2023",
      description:
        "Developed and maintained data processing pipelines and business intelligence systems. Collaborated with stakeholders to design efficient workflows and optimize system performance.",
      technologies: [
        "Python",
        "SQL",
        "Apache Kafka",
        "MongoDB",
        "Tableau",
        "Azure",
      ],
    },
    {
      company: "InnovateLab",
      role: "Junior Systems Engineer",
      period: "2020 - 2021",
      description:
        "Built and deployed web applications while contributing to system architecture decisions. Gained experience in full-stack development and DevOps practices.",
      technologies: [
        "JavaScript",
        "Vue.js",
        "Express.js",
        "MySQL",
        "Jenkins",
        "Linux",
      ],
    },
  ];

  const projects = [
    {
      title: "Enterprise Dashboard System",
      description:
        "Comprehensive analytics dashboard for enterprise clients with real-time data visualization, custom reporting, and role-based access control.",
      technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      year: "2024",
    },
    {
      title: "Distributed Data Pipeline",
      description:
        "High-throughput data processing system handling millions of records daily with fault tolerance and automatic scaling capabilities.",
      technologies: ["Python", "Apache Kafka", "Redis", "Docker", "Kubernetes"],
      liveUrl: "#",
      githubUrl: "#",
      year: "2023",
    },
    {
      title: "Smart Inventory Management",
      description:
        "IoT-integrated inventory system with predictive analytics, automated reordering, and comprehensive tracking across multiple warehouses.",
      technologies: ["Vue.js", "Flask", "MongoDB", "MQTT", "TensorFlow"],
      liveUrl: "#",
      githubUrl: "#",
      year: "2023",
    },
    {
      title: "Cloud Migration Tool",
      description:
        "Automated migration platform for legacy systems with zero-downtime deployment and comprehensive rollback capabilities.",
      technologies: ["Go", "Terraform", "AWS", "GitLab CI", "Monitoring"],
      liveUrl: "#",
      githubUrl: "#",
      year: "2022",
    },
  ];

  const blogPosts = [
    {
      title: "Building Scalable Information Systems: A Modern Approach",
      excerpt:
        "Exploring the architectural patterns and technologies that enable modern information systems to scale efficiently while maintaining reliability.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      tags: ["Architecture", "Scalability", "Systems Design"],
      url: "#",
    },
    {
      title: "The Evolution of Data Processing: From Batch to Real-time",
      excerpt:
        "A deep dive into how data processing paradigms have evolved and what it means for modern enterprise systems.",
      date: "Nov 28, 2024",
      readTime: "12 min read",
      tags: ["Data Engineering", "Real-time", "Big Data"],
      url: "#",
    },
    {
      title: "Security by Design: Implementing Zero Trust Architecture",
      excerpt:
        "Understanding the principles of zero trust security and how to implement it in modern information systems.",
      date: "Nov 10, 2024",
      readTime: "10 min read",
      tags: ["Security", "Zero Trust", "Architecture"],
      url: "#",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && scrollContainerRef.current) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="portfolio-container">
      {/* Left Sidebar - Static */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className={`profile-section ${isLoaded ? "loaded" : ""}`}>
            {/* Profile Picture */}
            <div className="profile-picture">
              <div className="profile-image">
                <div className="profile-placeholder">
                  <span>MB</span>
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="profile-info">
              <h1 className="name">M. Burak Dorman</h1>
              <p className="title">Computer Engineer</p>
              <div className="location">
                <MapPin className="location-icon" />
                <span>Istanbul, Turkey</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            {[
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "blog", label: "Blog" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="social-links">
            <a href="#" className="social-link" aria-label="GitHub">
              <Github className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="Email">
              <Mail className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Content - Scrollable */}
      <div className="content" ref={scrollContainerRef}>
        {/* About Section */}
        <section id="about" className="section">
          <div className="section-content">
            <h2 className="section-title">About Me</h2>

            <div className="about-content">
              <p className="about-text">
                I'm a passionate Information Systems Engineer with over 4 years
                of experience in designing and implementing enterprise-level
                systems. I specialize in building scalable architectures, data
                processing pipelines, and modern web applications that drive
                business value.
              </p>

              <p className="about-text">
                My expertise spans across full-stack development, cloud
                infrastructure, and systems integration. I enjoy solving complex
                technical challenges and have a proven track record of
                delivering solutions that improve operational efficiency and
                user experience.
              </p>

              <p className="about-text">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or writing about the
                latest trends in information systems and software architecture.
              </p>

              <button className="resume-button">
                <Download className="resume-icon" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="section-content">
            <h2 className="section-title">Experience</h2>

            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="experience-header">
                      <h3 className="experience-role">{exp.role}</h3>
                      <div className="experience-company">{exp.company}</div>
                      <div className="experience-period">{exp.period}</div>
                    </div>

                    <p className="experience-description">{exp.description}</p>

                    <div className="technologies">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="technology-tag">
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
        <section id="projects" className="section">
          <div className="section-content">
            <h2 className="section-title">Some Things I've Built</h2>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <div className="project-year">{project.year}</div>
                    <div className="project-links">
                      <a
                        href={project.liveUrl}
                        className="project-link"
                        aria-label="Live Demo"
                      >
                        <ArrowUpRight className="link-icon" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="project-link"
                        aria-label="GitHub"
                      >
                        <Github className="link-icon" />
                      </a>
                    </div>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="section">
          <div className="section-content">
            <h2 className="section-title">Latest Blog Posts</h2>

            <div className="blog-posts">
              {blogPosts.map((post, index) => (
                <article key={index} className="blog-post">
                  <div className="post-meta">
                    <time className="post-date">{post.date}</time>
                    <span className="post-separator">•</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>

                  <h3 className="post-title">
                    <a href={post.url} className="post-link">
                      {post.title}
                      <ArrowUpRight className="post-arrow" />
                    </a>
                  </h3>

                  <p className="post-excerpt">{post.excerpt}</p>

                  <div className="post-tags">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-footer">
              <a href="#" className="view-all-link">
                View all posts
                <ArrowUpRight className="view-all-arrow" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
