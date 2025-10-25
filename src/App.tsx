import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Award, ChevronUp, Code, Trophy, Music, BookOpen, Image as ImageIcon, Facebook, ExternalLink } from 'lucide-react';
import { DetailModal } from './DetailModal';
import { detailsData } from './detailsData';
import LoadingScreen from './LoadingScreen';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Image preloading
  useEffect(() => {
    const imagesToPreload = [
      "personal-images/profile.png",
      "school.png",
      "sarc.png",
      "personal-images/ielts.webp",
      "logos/major-conquest.jpg",
      "logos/initiare.jpg",
      "logos/khan-academy.jpg",
      "logos/innova.jpg",
      "logos/tgb.jpg",
      "logos/tdn-music-club.jpg",
      "logos/improve-english.png",
      "logos/hear-us-now.png",
      "logos/coding.jpg",
      "logos/piano.jpg",
    ];

    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Still count errored images to avoid hanging
      });
    };

    Promise.all(imagesToPreload.map(src => preloadImage(src)))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        // If there's an error, still hide loading screen after a timeout
        setTimeout(() => setIsLoading(false), 5000);
      });
  }, []);

  const hobbyTexts = {
    coding: "I began with front-end design and am recently embarking on back-end, to build problem-solving skills with code.",
    music: "I connect deeply and immerse myself in music through various forms: listening to music, singing, and playing the piano.",
    languages: "I have a solid foundation in academic English and am independently studying Korean, French, German, and Spanish."
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);

      const sections = ['home', 'about', 'projects', 'honors', 'extracurriculars', 'leadership', 'experience'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }

      const newVisible = new Set<string>();
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) {
            newVisible.add(section);
          }
        }
      });
      setVisibleSections(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const galleryData: Record<string, GalleryItem[]> = {
    'honors-all': [
      { id: 1, title: 'First Prize Certificate', description: 'City-level English Olympiad 2023' },
      { id: 2, title: 'Scholarship Award', description: 'Tran Dai Nghia Merit-based Scholarship' },
      { id: 3, title: 'Bronze Medal', description: 'Festival Piano Talent Competition 2024' },
      { id: 4, title: 'AP Scholar', description: 'College Board Recognition' },
      { id: 5, title: 'ASIAROPE Silver', description: 'English Category 6' },
      { id: 6, title: 'ASIAROPE Bronze', description: 'Science Category 6' },
      { id: 7, title: 'ABRSM Certificate', description: 'Piano Performance Distinction' },
      { id: 8, title: 'Academic Excellence', description: 'High school achievements' },
    ],
    'major-conquest': [
      { id: 1, title: 'Team Workshop', description: 'Strategic planning session with core team members' },
      { id: 2, title: 'Content Creation', description: 'Developing educational materials and resources' },
      { id: 3, title: 'Podcast Recording', description: 'Weekly podcast series on major selection' },
      { id: 4, title: 'Handbook Launch', description: 'End-of-term comprehensive career orientation handbook' },
      { id: 5, title: 'Community Event', description: 'Engaging with 70+ members nationwide' },
      { id: 6, title: 'Social Media', description: 'Growing our 6,000+ Facebook community' },
    ],
    'initiare': [
      { id: 1, title: 'Orphanage Visit', description: 'Interactive science activities with children' },
      { id: 2, title: 'Teaching Session', description: 'Volunteer teaching scientific concepts' },
      { id: 3, title: 'Fundraising Event', description: 'Community fundraising initiative' },
      { id: 4, title: 'Team Bonding', description: 'Club bonding and coordination sessions' },
      { id: 5, title: 'Science Workshop', description: 'Hands-on learning experiences' },
    ],
    'khan-academy': [
      { id: 1, title: 'Classroom Setup', description: 'Preparing for 50+ young learners' },
      { id: 2, title: 'Teaching Session', description: 'Interactive programming lesson for grades 3-7' },
      { id: 3, title: 'Slide Presentation', description: 'Educational content and interactive materials' },
      { id: 4, title: 'Student Projects', description: 'Reviewing student coding assignments' },
      { id: 5, title: 'Group Activity', description: 'Collaborative programming exercises' },
    ],
    'aspiring-vietnam': [
      { id: 1, title: 'Team Meeting', description: 'Weekly bonding with 10+ team members' },
      { id: 2, title: 'Interview Session', description: 'Recording success stories with university seniors' },
      { id: 3, title: 'Content Planning', description: 'Organizing workload and task assignments' },
      { id: 4, title: 'Final Product', description: 'Published interview and success story content' },
    ],
    'music-club': [
      { id: 1, title: 'School Performance', description: 'Performing as vocalist at school event' },
      { id: 2, title: 'City Concert', description: 'City-level music competition' },
      { id: 3, title: 'Rehearsal', description: 'Practice session with music club' },
      { id: 4, title: 'Group Performance', description: 'Interscholastic music contest' },
    ],
    'piano': [
      { id: 1, title: 'Piano Recital', description: 'Solo performance at concert hall' },
      { id: 2, title: 'Competition', description: 'Festival Piano Talent Competition 2024' },
      { id: 3, title: 'ABRSM Exam', description: 'Piano Performance Examination' },
      { id: 4, title: 'Practice Session', description: 'Daily technique refinement' },
      { id: 5, title: 'Concert Series', description: 'One of 10+ concerts performed' },
    ],
    'work': [
      { id: 1, title: 'Workspace', description: 'Data entry workstation setup' },
      { id: 2, title: 'Product Database', description: 'Processing personal care product data' },
      { id: 3, title: 'Quality Check', description: 'Ensuring accuracy in database management' },
      { id: 4, title: 'Team Collaboration', description: 'Working with Innova Market Insights team' },
    ],
    'coding': [
      { id: 1, title: 'Learning Progress', description: 'Self-paced programming journey' },
      { id: 2, title: 'Projects', description: 'Real-world coding projects completed' },
    ],
    'gifted-battlefield': [
      { id: 1, title: 'Article Writing', description: 'Academic English content creation' },
      { id: 2, title: 'Mock Tests', description: 'Practice questions and assessments' },
    ],
    'improve-english': [
      { id: 1, title: 'Vocabulary Lists', description: 'Topic-specific English resources' },
    ],
    'hear-us-now': [
      { id: 1, title: 'Workshop Support', description: 'Assisting deaf community members' },
    ],
  };

  const openDetail = (detailId: string) => {
    setActiveDetail(detailId);
  };

  const closeDetail = () => {
    setActiveDetail(null);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`min-h-screen bg-white relative transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Background Patterns */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-bridal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-300 magazine-shadow">
        <div className="max-w-6xl mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-display font-bold text-midnight hover:text-sapphire transition-colors"
            >
              Bao Ngoc
            </button>

            <div className="hidden md:flex items-center space-x-6">
              {['home', 'about', 'projects', 'honors', 'extracurriculars', 'leadership', 'experience'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm font-medium transition-all duration-300 font-body ${
                    activeSection === section
                      ? 'text-midnight border-b-2 border-midnight'
                      : 'text-sapphire hover:text-midnight'
                  }`}
                >
                  {section === 'honors' ? 'Honors & Awards' : section === 'leadership' ? 'Leadership Experience' : section === 'experience' ? 'Work Experience' : section === 'projects' ? 'Capstone Project' : section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-midnight hover:bg-bridal rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-3 pb-3 space-y-1">
              {['home', 'about', 'projects', 'honors', 'extracurriculars', 'leadership', 'experience'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 capitalize text-sm font-medium text-midnight hover:bg-petal rounded-lg transition-colors font-body"
                >
                  {section === 'honors' ? 'Honors & Awards' : section === 'leadership' ? 'Leadership Experience' : section === 'experience' ? 'Work Experience' : section === 'projects' ? 'Capstone Project' : section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - 800px height */}
      <section id="home" className="h-[800px] flex items-center px-5 pt-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-lines"></div>
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
                <p className="text-3xl md:text-4xl font-body text-sapphire mb-3">Hello World, I am</p>
                <h1 className="text-[2.19rem] md:text-[2.81rem] lg:text-[3.44rem] font-display font-bold text-midnight leading-tight whitespace-nowrap">
                  Nguyen Hoang Bao Ngoc
                </h1>
              </div>

              <div className="h-px w-full max-w-2xl bg-gradient-to-r from-midnight via-midnight/50 to-transparent my-8 opacity-20"></div>

              <p className="text-base md:text-lg font-body text-midnight/80 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
                A high school student aspiring to discover IT fields, driven by curiosity and a desire to broaden my perspective. I seek opportunities that challenge me to develop my expertise while contributing to projects that spark collective impact.
              </p>

              <button
                onClick={() => scrollToSection('about')}
                className="px-10 py-4 bg-midnight text-white rounded-sm font-body font-semibold hover:bg-bridal transition-transform duration-300 magazine-shadow-lg hover:-translate-y-1 animate-fade-in uppercase tracking-wider text-base"
                style={{ animationDelay: '0.6s', opacity: 0 }}
              >
                Explore My Journey
              </button>
            </div>

            {/* Right side placeholder */}
            <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="arch-frame-large">
                <img src="personal-images/profile.png" alt="Bao Ngoc" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`px-5 py-16 bg-bridal relative transition-all duration-700 ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 pattern-dots"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[2.625rem] md:text-[3.25rem] font-display font-bold text-midnight">About Me</h2>
              <div className="h-[1px] w-32 bg-midnight animate-line-wipe"></div>
            </div>
            <p className="text-base text-sapphire font-body leading-relaxed max-w-3xl">
              This is where I offer insights into what shape the individual that I am.
            </p>
          </div>

        </div>
      </section>

      {/* Marquee Sliders Section - Full Width */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-midnight py-8">
        <div className="space-y-6">
          {/* First Marquee - Right to Left */}
          <div className="overflow-hidden w-full h-[300px]">
            <div className="flex animate-marquee-rtl h-full gap-4">
              {(() => {
                const images = [
                  "personal-images/ca3.png",
                  "personal-images/heathens.png",
                  "personal-images/flowers.png",
                  "personal-images/group.png",
                  "personal-images/uniform.png",
                  "personal-images/sitting.png"
                ];
                return [...images, ...images].map((src, index) => (
                  <img key={index} src={src} alt="School moment" className="h-full w-auto object-cover flex-shrink-0" />
                ));
              })()}
            </div>
          </div>
        
          {/* Second Marquee - Left to Right */}
          <div className="overflow-hidden w-full h-[300px]">
            <div className="flex animate-marquee-ltr h-full gap-4">
              {(() => {
                const images = [
                  "personal-images/singapore.png",
                  "personal-images/on-the-boat.png",
                  "personal-images/band-nine.png",
                  "personal-images/hihi.png",
                  "personal-images/fes.png",
                  "personal-images/live-session.png"
                ];
                return [...images, ...images].map((src, index) => (
                  <img key={index} src={src} alt="School moment" className="h-full w-auto object-cover flex-shrink-0" />
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* About Section Continued */}
      <section id="about-continued" className={`px-5 py-16 bg-bridal relative transition-all duration-700 ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Motto/Objective and Hobbies Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-full">
            {/* Combined Motto, Objective & Skills Card */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-transparent hover:border-midnight hover:-translate-y-1 transition-all duration-300 group">
              <div className="mb-5">
                <p className="text-2xl font-display font-bold text-midnight mb-3 leading-relaxed">
                  "Die with memories, not dreams."
                </p>
                <p className="text-xs text-sapphire uppercase tracking-wider font-body">Life Motto</p>
              </div>
              <div className="py-5 border-t border-midnight/10">
                <p className="text-2xl font-display font-bold text-midnight mb-3 leading-relaxed">
                  Code with <span className="text-sapphire">purpose</span>, build with <span className="text-sapphire">impact</span>.
                </p>
                <p className="text-xs text-sapphire uppercase tracking-wider font-body">Objective</p>
              </div>
              <div className="pt-5 border-t border-midnight/10">
                <p className="text-base font-body text-midnight mb-3">
                  <span className="font-bold">HTML/CSS</span> <span className="mx-2">|</span> <span className="font-bold">JavaScript</span> <span className="mx-2">|</span> <span className="font-bold">Python</span> <span className="mx-2">|</span> <span className="font-bold">SQL</span>
                </p>
                <p className="text-xs text-sapphire uppercase tracking-wider font-body">Skills</p>
              </div>
            </div>

            {/* Hobbies Card */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-transparent hover:border-midnight hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-midnight mb-3 text-center">Hobbies</h3>
                <p className="text-midnight/70 text-sm font-body text-center mb-6">
                  Beyond academics, I find joy and balance through diverse interests
                </p>
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex items-center justify-center gap-8">
                    <div
                      className="hobby-circle animate-float cursor-pointer"
                      onMouseEnter={() => setHoveredHobby('coding')}
                      onMouseLeave={() => setHoveredHobby(null)}
                    >
                      <Code size={28} className="text-sapphire mb-1" />
                      <span className="text-xs font-body font-semibold text-midnight">Coding</span>
                    </div>
                    <div
                      className="hobby-circle animate-float-slow cursor-pointer"
                      onMouseEnter={() => setHoveredHobby('music')}
                      onMouseLeave={() => setHoveredHobby(null)}
                    >
                      <Music size={28} className="text-sapphire mb-1" />
                      <span className="text-xs font-body font-semibold text-midnight">Music</span>
                    </div>
                    <div
                      className="hobby-circle animate-float cursor-pointer"
                      style={{ animationDelay: '1s' }}
                      onMouseEnter={() => setHoveredHobby('languages')}
                      onMouseLeave={() => setHoveredHobby(null)}
                    >
                      <BookOpen size={28} className="text-sapphire mb-1" />
                      <span className="text-xs font-body font-semibold text-midnight">Languages</span>
                    </div>
                  </div>
                  <div className="text-center min-h-[60px] flex items-center justify-center px-4">
                    <p className={`text-sapphire font-body text-sm max-w-lg leading-relaxed transition-opacity duration-300 ${hoveredHobby ? 'opacity-100' : 'opacity-0'}`}>
                      {hoveredHobby && hobbyTexts[hoveredHobby as keyof typeof hobbyTexts]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white magazine-shadow-lg relative overflow-hidden editorial-card max-w-full">
            <div className="grid md:grid-cols-12">
              {/* Left side - School Info */}
              <div className="md:col-span-7 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Award size={32} className="text-sapphire" />
                  <h3 className="text-3xl font-display font-bold text-midnight">Education</h3>
                </div>
                <div className="mb-6">
                  <a
                    href="https://www.tdnthptct.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[22px] font-display font-bold text-midnight hover:text-sapphire transition-colors inline-block mb-2"
                  >
                    Tran Dai Nghia High School for the Gifted
                  </a>
                  <p className="text-sapphire mb-1 font-body">English Major</p>
                  <p className="text-midnight/60 mb-4 font-body flex items-center gap-2 text-sm">
                    2023 - 2026
                  </p>
                  <div className="space-y-1 font-body text-sm">
                    <p className="font-medium text-midnight">GPA: 9.6/10 (9th & 10th) | 9.5/10 (11th)</p>
                  </div>
                </div>
                <div className="space-y-2 font-body text-sm text-midnight">
                  <p className="text-lg font-display font-bold mb-3">Standardized Tests</p>
                  <p className="font-medium">SAT: 1520 (760 Verbal, 760 Math)</p>
                  <p className="font-medium">IELTS: 9.0 Overall</p>
                  <p className="text-xs text-midnight/60">9.0 Reading <span className="font-normal">|</span> 9.0 Listening <span className="font-normal">|</span> 8.0 Writing <span className="font-normal">|</span> 9.0 Speaking</p>
                  <p className="font-medium mt-3">AP Scores</p>
                  <p className="text-xs text-midnight/60">Microeconomics: 5 <span className="font-normal">|</span> Statistics: 4 <span className="font-normal">|</span> Computer Science A: 3</p>
                </div>
              </div>

              {/* Right side - School Image */}
              <div className="md:col-span-5 bg-bridal overflow-hidden">
                <img src="school.png" alt="Tran Dai Nghia High School" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Research & Media Recognition */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* SARC Research Proposal */}
            <a
              href="https://drive.google.com/file/d/1jFtER0jMvVTYKKlKrNtLj1gcwFvBYyfL/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white magazine-shadow editorial-card overflow-hidden border-l-3 border-sapphire hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-[4/3] bg-bridal overflow-hidden">
                <img src="sarc.png" alt="SARC Research Proposal" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-display font-bold text-midnight mb-1">SARC Research Proposal</h4>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">High School Academic Research Competition 2025</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Research proposal exploring innovative approaches in academic inquiry.
                </p>
              </div>
            </a>

            {/* VnExpress IELTS Article */}
            <a
              href="https://vnexpress.net/nu-sinh-lop-11-dat-9-0-ielts-4864404.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white magazine-shadow editorial-card overflow-hidden border-l-3 border-midnight hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-[4/3] bg-bridal overflow-hidden">
                <img src="personal-images/ielts.webp" alt="IELTS 9.0" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-display font-bold text-midnight mb-1">VnExpress Feature</h4>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">Media Recognition</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Featured for achieving 9.0 overall in IELTS as an 11th grade student.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`min-h-screen flex items-center justify-center px-5 py-16 bg-white-gradient relative transition-all duration-700 ${visibleSections.has('projects') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[2.625rem] md:text-[3.25rem] font-display font-bold text-midnight">Capstone Project</h2>
              <div className="h-[1px] w-32 bg-sapphire animate-line-wipe"></div>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Capstone Project Card */}
            <div className="bg-petal magazine-shadow editorial-card p-8 border-l-3 border-sapphire" style={{ width: '800px' }}>
              <div className="aspect-video bg-bridal rounded-sm mb-6 overflow-hidden">
                <img src="personal-images/capstone.png" alt="Capstone Project" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-display font-bold text-midnight mb-3">11CA3 Capstone Project</h3>
              <p className="text-midnight/60 text-base font-body mb-6">A comprehensive web development project showcasing HTML, CSS, and JavaScript skills.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">HTML</span>
                <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">CSS</span>
                <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">JavaScript</span>
              </div>
              <a href="https://jens-codesphere.github.io/11CA3-capstone-project/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-midnight text-white font-body font-semibold rounded-sm hover:bg-sapphire transition-colors">
                <ExternalLink size={16} />
                <span>View Project</span>
              </a>
            </div>
          </div>
          <div className="mt-24 flex justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-auto px-8 py-4 bg-midnight text-white font-body font-semibold rounded-sm text-center hover:bg-bridal transition-all duration-300 hover:-translate-y-1 tracking-wider text-base"
            >
              EXPLORE MY GITHUB REPOSITORIES
            </a>
          </div>
        </div>
      </section>

      {/* Honors & Awards Section */}
      <section id="honors" className={`min-h-screen flex items-center justify-center px-5 py-16 bg-bridal relative transition-all duration-700 ${visibleSections.has('honors') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[2.625rem] md:text-[3.25rem] font-display font-bold text-midnight">Honors & Awards</h2>
              <div className="h-[1px] w-32 bg-sapphire animate-line-wipe"></div>
            </div>
            <p className="text-base text-sapphire font-body leading-relaxed max-w-3xl">
              This is where I highlight the clubs, initiatives, and projects I participated in that shaped my high school experience - from academic communities to creative pursuits.
            </p>
          </div>

          <div className="masonry-grid mb-8">
            <div className="masonry-item">
              <div className="bg-white magazine-shadow editorial-card p-6 border-l-3 border-midnight">
                <Trophy size={28} className="text-sapphire mb-3" />
                <h3 className="text-xl font-display font-bold text-midnight mb-1">First Prize</h3>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">City-level English Olympiad</p>
                <p className="text-midnight/60 text-xs font-body mb-2">9th Grade | May 2023</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Achieved first place in the competitive city-level English Olympiad competition.
                </p>
              </div>
            </div>

            <div className="masonry-item">
              <div className="bg-petal magazine-shadow editorial-card p-6 border-l-3 border-sapphire">
                <Award size={28} className="text-midnight mb-3" />
                <h3 className="text-xl font-display font-bold text-midnight mb-1">Merit Scholarship</h3>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">Tran Dai Nghia High School</p>
                <p className="text-midnight/60 text-xs font-body mb-2">Top 20 Students | December 2024</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Recognized as one of the top 20 students with annual merit-based scholarship.
                </p>
              </div>
            </div>

            <div className="masonry-item">
              <div className="bg-white magazine-shadow editorial-card p-6 border-l-3 border-midnight">
                <Music size={28} className="text-sapphire mb-3" />
                <h3 className="text-xl font-display font-bold text-midnight mb-1">Bronze Medal</h3>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">Festival Piano Talent</p>
                <p className="text-midnight/60 text-xs font-body mb-2">Piano Competition | March 2024</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Awarded bronze medal in the competitive piano talent competition.
                </p>
              </div>
            </div>

            <div className="masonry-item">
              <div className="bg-white magazine-shadow editorial-card p-6 border-l-3 border-sapphire">
                <Trophy size={28} className="text-midnight mb-3" />
                <h3 className="text-xl font-display font-bold text-midnight mb-1">AP Scholar Award</h3>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">College Board</p>
                <p className="text-midnight/60 text-xs font-body mb-2">July 2025</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Earned AP Scholar recognition for performance on AP examinations.
                </p>
              </div>
            </div>

            <div className="masonry-item">
              <div className="bg-petal magazine-shadow editorial-card p-6 border-l-3 border-midnight">
                <Award size={28} className="text-sapphire mb-3" />
                <h3 className="text-xl font-display font-bold text-midnight mb-1">ASIAROPE 2025</h3>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">Silver & Bronze Medals</p>
                <p className="text-midnight/60 text-xs font-body mb-2">English & Science | May 2025</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Silver medal in English Category 6 and Bronze medal in Science Category 6.
                </p>
              </div>
            </div>

            <div className="masonry-item">
              <div className="bg-white magazine-shadow editorial-card p-6 border-l-3 border-sapphire">
                <Music size={28} className="text-midnight mb-3" />
                <h3 className="text-xl font-display font-bold text-midnight mb-1">ABRSM Distinction</h3>
                <p className="text-sapphire font-body text-xs mb-2 uppercase tracking-wider">Piano Performance</p>
                <p className="text-midnight/60 text-xs font-body mb-2">March 2025</p>
                <p className="text-midnight/80 leading-relaxed font-body text-sm">
                  Achieved Pass with Distinction in ABRSM Piano Performance Examinations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Honors Gallery Marquee - Full Width */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-midnight py-8 -mt-12">
        <div className="overflow-hidden w-full h-[300px]">
          <div className="flex animate-marquee-rtl h-full gap-4">
            <img src="honors/hsg.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/excellent-11.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/excellent-9.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/ap-scholar.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/piano-talent.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/asiarope-bronze.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/asiarope-silver.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/Certificate_BAO NGOCNGUYEN HOANGPianoPerformance Grade 5.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/Certificate_BAO NGOCNGUYEN HOANGPianoPerformance Grade 6.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/hsg-vertical.jpg" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/hsg.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/excellent-11.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/excellent-9.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/ap-scholar.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/piano-talent.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/asiarope-bronze.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/asiarope-silver.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/Certificate_BAO NGOCNGUYEN HOANGPianoPerformance Grade 5.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/Certificate_BAO NGOCNGUYEN HOANGPianoPerformance Grade 6.png" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
            <img src="honors/hsg-vertical.jpg" alt="Honor" className="h-full w-auto object-cover flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Extracurriculars Section */}
      <section id="extracurriculars" className={`min-h-screen flex items-center justify-center px-5 py-16 bg-white-gradient relative transition-all duration-700 ${visibleSections.has('extracurriculars') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[2.625rem] md:text-[3.25rem] font-display font-bold text-midnight">Extracurriculars</h2>
              <div className="h-[1px] w-32 bg-sapphire animate-line-wipe"></div>
            </div>
            <p className="text-base text-sapphire font-body leading-relaxed max-w-3xl">
              This is where I highlight the clubs, initiatives, and projects I participated in that shaped my high school experience - from academic communities to creative pursuits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* The Gifted Battlefield */}
            <div className="bg-white magazine-shadow-lg editorial-card border-l-3 border-midnight overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img src="logos/tgb.jpg" alt="The Gifted Battlefield" className="w-12 h-12 object-contain rounded flex-shrink-0" />
                  <h3 className="text-2xl font-display font-bold text-midnight leading-tight">The Gifted Battlefield</h3>
                </div>
                <p className="text-sapphire font-body text-xs mb-3 uppercase tracking-wider">Member of English | Oct 2023 - Oct 2025</p>
                <p className="text-midnight/80 leading-relaxed mb-4 font-body text-sm">
                  Academic English project focused on developing comprehensive learning materials.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Academic English</span>
                  <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Mock Tests</span>
                  <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Articles</span>
                </div>
                <button
                  onClick={() => openDetail('gifted-battlefield')}
                  className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-xs"
                >
                  <ImageIcon size={16} />
                  <span>View more</span>
                </button>
              </div>
            </div>

            {/* Music Club */}
            <div className="bg-white magazine-shadow-lg p-6 editorial-card border-l-3 border-sapphire">
              <div className="flex items-center gap-3 mb-3">
                <img src="logos/tdn-music-club.jpg" alt="TDN Music Club" className="w-12 h-12 object-contain rounded flex-shrink-0" />
                <h3 className="text-2xl font-display font-bold text-midnight leading-tight">TDN Music Club</h3>
              </div>
              <p className="text-sapphire font-body text-xs mb-3 uppercase tracking-wider">Vocalist | Oct 2024 - Present</p>
              <p className="text-midnight/80 leading-relaxed mb-4 font-body text-sm">
                Performing as vocalist and dancer in school and city-level events.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Vocalist</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Dancer</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">5-8 Performances</span>
              </div>
              <button
                onClick={() => openDetail('music-club')}
                className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-xs"
              >
                <ImageIcon size={16} />
                <span>View more</span>
              </button>
            </div>

            {/* Improve English */}
            <div className="bg-white magazine-shadow-lg p-6 editorial-card border-l-3 border-sapphire">
              <div className="flex items-center gap-3 mb-3">
                <img src="logos/improve-english.png" alt="Improve English" className="w-12 h-12 object-contain rounded flex-shrink-0" />
                <h3 className="text-2xl font-display font-bold text-midnight leading-tight">Improve English</h3>
              </div>
              <p className="text-sapphire font-body text-xs mb-3 uppercase tracking-wider">Member of Content | Jan - Aug 2024</p>
              <p className="text-midnight/80 leading-relaxed mb-4 font-body text-sm">
                Developed topic-specific English vocabulary lists and educational resources.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Vocabulary</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Content Writing</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Education</span>
              </div>
              <button
                onClick={() => openDetail('improve-english')}
                className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-xs"
              >
                <ImageIcon size={16} />
                <span>View more</span>
              </button>
            </div>

            {/* Hear.Us.Now */}
            <div className="bg-petal magazine-shadow-lg p-6 editorial-card border-l-3 border-midnight">
              <div className="flex items-center gap-3 mb-3">
                <img src="logos/hear-us-now.png" alt="Hear.Us.Now" className="w-12 h-12 object-contain rounded flex-shrink-0" />
                <h3 className="text-2xl font-display font-bold text-midnight leading-tight">Hear.Us.Now</h3>
              </div>
              <p className="text-sapphire font-body text-xs mb-3 uppercase tracking-wider">Volunteer | May 2025 - Present</p>
              <p className="text-midnight/80 leading-relaxed mb-4 font-body text-sm">
                Volunteering with workshops supporting deaf and hearing-impaired community.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Volunteering</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Teaching</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Community</span>
              </div>
              <button
                onClick={() => openDetail('hear-us-now')}
                className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-xs"
              >
                <ImageIcon size={16} />
                <span>View more</span>
              </button>
            </div>

            {/* Self-Paced Learner - Moved from Projects */}
            <div className="bg-petal magazine-shadow-lg p-6 editorial-card border-l-3 border-midnight">
              <div className="flex items-center gap-3 mb-3">
                <img src="logos/coding.jpg" alt="Self-Paced Coding" className="w-12 h-12 object-contain rounded flex-shrink-0" />
                <h3 className="text-2xl font-display font-bold text-midnight leading-tight">Self-Paced Coding</h3>
              </div>
              <p className="text-sapphire font-body text-xs mb-3 uppercase tracking-wider">Student | Oct 2024 - Present</p>
              <p className="text-midnight/80 leading-relaxed mb-4 font-body text-sm">
                Self-studying programming fundamentals through Codecademy and Forage courses.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Responsive Design</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Algorithms</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Database</span>
              </div>
              <button
                onClick={() => openDetail('coding')}
                className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-xs"
              >
                <ImageIcon size={16} />
                <span>View more</span>
              </button>
            </div>

            {/* Piano Performance */}
            <div className="bg-white magazine-shadow-lg p-6 editorial-card border-l-3 border-midnight">
              <div className="flex items-center gap-3 mb-3">
                <img src="logos/piano.jpg" alt="Piano Performance" className="w-12 h-12 object-contain rounded flex-shrink-0" />
                <h3 className="text-2xl font-display font-bold text-midnight leading-tight">Piano Performance</h3>
              </div>
              <p className="text-sapphire font-body text-xs mb-3 uppercase tracking-wider">Student | Oct 2015 - Present (9+ Years)</p>
              <p className="text-midnight/80 leading-relaxed mb-4 font-body text-sm">
                Building strong foundation in performance and theory over nearly a decade.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">9+ Years</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">5+ Concerts</span>
                <span className="px-2 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">ABRSM</span>
              </div>
              <button
                onClick={() => openDetail('piano')}
                className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-xs"
              >
                <ImageIcon size={16} />
                <span>View more</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className={`min-h-screen flex items-center justify-center px-5 py-16 bg-bridal relative transition-all duration-700 ${visibleSections.has('leadership') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[2.625rem] md:text-[3.25rem] font-display font-bold text-midnight">Leadership Experience</h2>
              <div className="h-[1px] w-32 bg-midnight animate-line-wipe"></div>
            </div>
            <p className="text-base text-sapphire font-body leading-relaxed max-w-3xl">
              This is where I demonstrate the times that I stepped into leadership - organizing student initiatives, setting directions, and shaping collaborative projects.
            </p>
          </div>

          <div className="space-y-6">
            {/* MAJOR Conquest */}
            <div className="bg-white magazine-shadow-lg editorial-card overflow-hidden">
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-3 bg-midnight flex items-center justify-center p-8">
                  <img src="logos/major-conquest.jpg" alt="MAJOR Conquest" className="w-[80%] h-auto object-contain" />
                </div>
                <div className="md:col-span-9 p-8">
                  <h3 className="text-2xl font-display font-bold text-midnight mb-2">MAJOR Conquest</h3>
                  <p className="text-sapphire font-body text-xs mb-4 uppercase tracking-wider">Founder | Aug 2024 - May 2025</p>
                  <p className="text-midnight/80 leading-relaxed mb-4 font-body">
                    Founded and led an educational initiative guiding students nationwide in major selection and career orientation.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">70+ Members</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">6,000+ Followers</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Weekly Podcasts</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Career Handbook</span>
                  </div>
                  <button
                    onClick={() => openDetail('major-conquest')}
                    className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-sm"
                  >
                    <ImageIcon size={18} />
                    <span>View more</span>
                  </button>
                </div>
              </div>
            </div>

            {/* IniatiaRe Community */}
            <div className="bg-white magazine-shadow-lg editorial-card overflow-hidden">
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-3 bg-midnight flex items-center justify-center p-8">
                  <img src="logos/initiare.jpg" alt="IniatiaRe Community" className="w-[80%] h-auto object-contain" />
                </div>
                <div className="md:col-span-9 p-8">
                  <h3 className="text-2xl font-display font-bold text-midnight mb-2">IniatiaRe Community</h3>
                  <p className="text-sapphire font-body text-xs mb-4 uppercase tracking-wider">Vice President | Jan 2025 - Oct 2025</p>
                  <p className="text-midnight/80 leading-relaxed mb-4 font-body">
                    Co-leading a science-based volunteering club delivering scientific knowledge through interactive activities.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Teaching Trips</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Science Workshops</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Fundraising</span>
                  </div>
                  <button
                    onClick={() => openDetail('initiare')}
                    className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-sm"
                  >
                    <ImageIcon size={18} />
                    <span>View more</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Khan Academy Vietnam */}
            <div className="bg-white magazine-shadow-lg editorial-card overflow-hidden">
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-3 bg-midnight flex items-center justify-center p-8">
                  <img src="logos/khan-academy.jpg" alt="Khan Academy Vietnam" className="w-[80%] h-auto object-contain" />
                </div>
                <div className="md:col-span-9 p-8">
                  <h3 className="text-2xl font-display font-bold text-midnight mb-2">Khan Academy Vietnam</h3>
                  <p className="text-sapphire font-body text-xs mb-4 uppercase tracking-wider">Open Class Ambassador | Jun 2025 - Present</p>
                  <p className="text-midnight/80 leading-relaxed mb-4 font-body">
                    Leading weekly tutoring sessions teaching computer programming fundamentals to young learners.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">50+ Learners</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">20+ Lessons</span>
                    <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Programming</span>
                  </div>
                  <button
                    onClick={() => openDetail('khan-academy')}
                    className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-sm"
                  >
                    <ImageIcon size={18} />
                    <span>View more</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className={`min-h-screen flex items-center justify-center px-5 py-16 bg-white-gradient relative transition-all duration-700 ${visibleSections.has('experience') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[2.625rem] md:text-[3.25rem] font-display font-bold text-midnight">Work Experience</h2>
              <div className="h-[1px] w-32 bg-sapphire animate-line-wipe"></div>
            </div>
            <p className="text-base text-sapphire font-body leading-relaxed max-w-3xl">
              This is where I share part-time jobs that gave me hands-on experience and practical skills for my personal growth.
            </p>
          </div>

          <div className="bg-white magazine-shadow-lg editorial-card overflow-hidden">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-3 bg-midnight flex items-center justify-center p-8">
                <img src="logos/innova.jpg" alt="Innova Market Insights" className="w-[80%] h-auto object-contain" />
              </div>
              <div className="md:col-span-9 p-8">
                <h3 className="text-2xl font-display font-bold text-midnight mb-2">Innova Market Insights</h3>
                <p className="text-sapphire font-body text-xs mb-4 uppercase tracking-wider">Data Entry Assistant | 02/2024 - Present</p>
                <p className="text-midnight/80 leading-relaxed mb-4 font-body">
                  Entered data from images of personal care products, ensuring accuracy and efficiency.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">2M - 6M VND Monthly</span>
                  <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Financial Independence</span>
                  <span className="px-3 py-1 tag text-midnight text-xs font-body font-semibold rounded-sm">Data Entry</span>
                </div>
                <button
                  onClick={() => openDetail('work')}
                  className="flex items-center gap-2 text-midnight hover:text-sapphire transition-colors font-body font-semibold text-sm"
                >
                  <ImageIcon size={18} />
                  <span>View more</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-5 bg-midnight text-white">
        <div className="absolute inset-0 pattern-lines opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10">
            <div className="text-center mb-8">
              <div className="font-body text-base leading-tight mb-6">
                <p className="text-white/90">
                  Ho Chi Minh City, Vietnam <span className="text-sapphire mx-3">|</span> (+84) 902 942 450 <span className="text-sapphire mx-3">|</span> nguyenhoang.baongoc2502@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-3 bg-sapphire hover:bg-bridal transition-all rounded-sm text-white hover:text-midnight font-body font-semibold text-sm">
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-3 bg-sapphire hover:bg-bridal transition-all rounded-sm text-white hover:text-midnight font-body font-semibold text-sm">
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-3 bg-sapphire hover:bg-bridal transition-all rounded-sm text-white hover:text-midnight font-body font-semibold text-sm">
                <Facebook size={18} />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <div className="border-t border-sapphire/30 pt-6 text-center">
            <p className="text-bridal font-body text-sm">
              © 2025 Nguyen Hoang Bao Ngoc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-midnight text-white rounded-sm magazine-shadow-lg hover:bg-sapphire transition-all hover:-translate-y-1 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Detail Modal */}
      {activeDetail && detailsData[activeDetail] && (
        <DetailModal
          isOpen={!!activeDetail}
          onClose={closeDetail}
          galleryItems={galleryData[activeDetail]}
          title={
            activeDetail === 'major-conquest' ? 'MAJOR Conquest' :
            activeDetail === 'initiare' ? 'IniatiaRe Community' :
            activeDetail === 'khan-academy' ? 'Khan Academy Vietnam' :
            activeDetail === 'work' ? 'Innova Market Insights' :
            activeDetail === 'coding' ? 'Coding – Self-Paced Learning' :
            activeDetail === 'gifted-battlefield' ? 'The Gifted Battlefield' :
            activeDetail === 'music-club' ? 'TDN Music Club' :
            activeDetail === 'piano' ? 'Piano – Music: Instrumental' :
            activeDetail === 'improve-english' ? 'Improve English' :
            activeDetail === 'hear-us-now' ? 'Hear.Us.Now' : ''
          }
          subtitle={
            activeDetail === 'major-conquest' ? 'Founder | 08/2024 – 05/2025' :
            activeDetail === 'initiare' ? 'Vice President | 01/2025 – Present' :
            activeDetail === 'khan-academy' ? 'Open Class Ambassador | 06/2025 – Present' :
            activeDetail === 'work' ? 'Data Entry Assistant | 02/2024 - Present' :
            activeDetail === 'coding' ? 'Self-paced Learner | 10/2024 – Present' :
            activeDetail === 'gifted-battlefield' ? 'Member of English | 10/2023 – 10/2025' :
            activeDetail === 'music-club' ? 'Vocalist | 10/2024 – Present' :
            activeDetail === 'piano' ? 'Student | 10/2015 – Present' :
            activeDetail === 'improve-english' ? 'Member of Content | 01/2024 – 08/2024' :
            activeDetail === 'hear-us-now' ? 'Volunteer | 05/2025 – Present' : ''
          }
          content={detailsData[activeDetail]}
        />
      )}
    </div>
    </>
  );
}

export default App;
