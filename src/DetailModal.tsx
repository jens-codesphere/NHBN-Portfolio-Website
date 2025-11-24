import { X, BookOpen, ExternalLink, Facebook, Youtube, Music as MusicIcon, Globe, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  content: {
    overview: string;
    contributions: string[];
    resources?: string;
  };
  galleryItems?: GalleryItem[];
}

export function DetailModal({ isOpen, onClose, title, subtitle, content, galleryItems }: DetailModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  const highlightNumbers = (text: string) => {
    return text.split(/(\d+\+?)/g).map((part, index) => {
      if (/\d+\+?/.test(part)) {
        return (
          <span key={index} className="text-sapphire font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const highlightProjectName = (text: string) => {
    const projectNames = [
      'MAJOR Conquest',
      'IniatiaRe Community',
      'Khan Academy Vietnam',
      'Innova Market Insights',
      'The Gifted Battlefield',
      'TDN Music Club',
      'Improve English',
      'Hear.Us.Now'
    ];
    let parts: (string | JSX.Element)[] = [text];

    projectNames.forEach(projectName => {
      const newParts: (string | JSX.Element)[] = [];
      parts.forEach((part, partIndex) => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${projectName})`, 'g');
          const splitParts = part.split(regex);
          splitParts.forEach((splitPart, splitIndex) => {
            if (splitPart === projectName) {
              newParts.push(
                <span key={`${partIndex}-${splitIndex}`} className="text-sapphire font-bold">
                  {splitPart}
                </span>
              );
            } else if (splitPart) {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) =>
      typeof part === 'string' ? highlightNumbers(part) : <span key={index}>{part}</span>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-midnight/80 backdrop-blur-sm' : 'bg-midnight/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 transform ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        style={{ backgroundColor: '#e9f3ff' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-midnight text-white p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 pattern-dots"></div>
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-4xl font-display font-bold mb-3 animate-fade-in">{title}</h2>
              <p className="text-bridal text-sm uppercase tracking-widest font-body font-semibold">{subtitle}</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-white/20 rounded-full transition-all hover:rotate-90 duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)', backgroundColor: '#e9f3ff' }}>
          <div className="p-8 space-y-6">
            {/* Gallery Marquee Slider */}
            {galleryItems && galleryItems.length > 0 && title !== 'The Gifted Battlefield' && title !== 'Hear.Us.Now' && (
              <div className="mb-8">
                <div className="overflow-hidden w-full h-[250px] rounded-xl">
                  <div className={`flex h-full gap-4 ${title === 'Piano – Music: Instrumental' ? 'animate-marquee-rtl-small' : 'animate-marquee-rtl'}`}>
                    {title === 'TDN Music Club' ? (
                      (() => {
                        const images = [
                          "personal-images/from-the-start.png",
                          "personal-images/music-club.png",
                          "personal-images/red-aodai.jpg",
                          "personal-images/heathens.png",
                          "personal-images/fes.png",
                          "personal-images/memories.png",
                          "personal-images/live-session.png",
                          "personal-images/group.png"
                        ];
                        return [...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'Improve English' ? (
                      (() => {
                        const images = [
                          "project-images/improve-english/ie-1.jpg",
                          "project-images/improve-english/ie-2.jpg",
                          "project-images/improve-english/ie-3.jpg",
                          "project-images/improve-english/ie-4.jpg",
                          "project-images/improve-english/ie-5.jpg",
                          "project-images/improve-english/ie-6.jpg",
                          "project-images/improve-english/ie-7.jpg",
                          "project-images/improve-english/ie-8.jpg"
                        ];
                        return [...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'IniatiaRe Community' ? (
                      (() => {
                        const images = [
                          "project-images/initiare/ini1.png",
                          "project-images/initiare/ini2.png",
                          "project-images/initiare/ini3.png",
                          "project-images/initiare/Screenshot 2025-10-18 at 2.52.28 PM.png",
                          "project-images/initiare/Screenshot 2025-10-18 at 3.05.31 PM.png",
                          "project-images/initiare/Screenshot 2025-10-18 at 3.09.31 PM.png",
                          "project-images/initiare/Screenshot 2025-10-18 at 3.16.21 PM.png"
                        ];
                        return [...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'MAJOR Conquest' ? (
                      (() => {
                        const images = [
                          "project-images/mcq/mcq-1.png",
                          "project-images/mcq/mcq-2.png",
                          "project-images/mcq/mcq-3.png",
                          "project-images/mcq/mcq-4.png",
                          "project-images/mcq/mcq-5.png",
                          "project-images/mcq/mcq-6.png",
                          "project-images/mcq/mcq-7.png",
                          "project-images/mcq/mcq-8.png",
                          "project-images/mcq/mcq-9.png",
                        ];
                        return [...images, ...images, ...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'Khan Academy Vietnam' ? (
                      (() => {
                        const images = [
                          "project-images/khan-academy/course-intro.jpg",
                          "project-images/khan-academy/khan-1.png",
                          "project-images/khan-academy/khan-2.png",
                          "project-images/khan-academy/khan-3.png",
                          "project-images/khan-academy/khan-4.png",
                          "project-images/khan-academy/khan-5.png",
                          "project-images/khan-academy/khan-6.png"
                        ];
                        return [...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'Innova Market Insights' ? (
                      (() => {
                        const images = [
                          "project-images/innova/innova-1.png",
                          "project-images/innova/innova-2.png",
                          "project-images/innova/innova-3.png",
                          "project-images/innova/innova-4.png",
                          "project-images/innova/innova-5.png"
                        ];
                        return [...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'Piano – Music: Instrumental' ? (
                      (() => {
                        const images = [
                          "project-images/piano/got-talent.png",
                          "project-images/piano/music-garden.png",
                          "project-images/piano/piano-talent.png"
                        ];
                        return images.map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : title === 'Coding – Self-Paced Learning' ? (
                      (() => {
                        const images = [
                          "project-images/coding/coding-1.png",
                          "project-images/coding/coding-2.png",
                          "project-images/coding/coding-3.png",
                          "project-images/coding/coding-4.png",
                          "project-images/coding/coding-5.png",
                          "project-images/coding/coding-6.png",
                          "project-images/coding/coding-7.png"
                        ];
                        return [...images, ...images, ...images, ...images].map((src, index) => (
                          <img key={index} src={src} alt="Gallery moment" className="h-full w-auto object-cover rounded-lg flex-shrink-0" style={{ minWidth: '200px' }} />
                        ));
                      })()
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Static Gallery for The Gifted Battlefield */}
            {galleryItems && galleryItems.length > 0 && title === 'The Gifted Battlefield' && (
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-4 w-full">
                  <img src="project-images/tgb/all.png" alt="Gallery moment" className="w-full h-[200px] object-cover rounded-lg" />
                  <img src="project-images/tgb/badge.jpg" alt="Gallery moment" className="w-full h-[200px] object-cover rounded-lg" />
                  <img src="project-images/tgb/heart.jpg" alt="Gallery moment" className="w-full h-[200px] object-cover rounded-lg" />
                </div>
              </div>
            )}

            {/* Static Gallery for Hear.Us.Now */}
            {galleryItems && galleryItems.length > 0 && title === 'Hear.Us.Now' && (
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-4 w-full">
                  <img src="project-images/hear-us-now/hun-workshop.png" alt="Gallery moment" className="w-full h-[200px] object-cover rounded-lg" />
                  <img src="project-images/hear-us-now/hun-workshop2.png" alt="Gallery moment" className="w-full h-[200px] object-cover rounded-lg" />
                  <img src="project-images/hear-us-now/hun-workshop3.png" alt="Gallery moment" className="w-full h-[200px] object-cover rounded-lg" />
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Overview Card */}
              <div className="rounded-xl p-6 shadow-lg border border-transparent hover:border-midnight hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-midnight">Overview</h3>
                </div>
                <p className="text-midnight/80 leading-relaxed font-body text-[15px]">
                  {highlightProjectName(content.overview)}
                </p>
              </div>

              {/* Key Contributions Card */}
              <div className="rounded-xl p-6 shadow-lg border border-transparent hover:border-midnight hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Star size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-midnight">Key Contributions</h3>
                </div>
                <ul className="space-y-4">
                  {content.contributions.map((contribution, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-2 h-2 rounded-full bg-sapphire flex-shrink-0 mt-2"></div>
                      <span className="text-midnight/80 leading-relaxed font-body text-[15px] group-hover:text-midnight transition-colors flex-1">
                        {highlightNumbers(contribution)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Card */}
              {content.resources && (
                <div className="rounded-xl p-6 shadow-lg border border-transparent hover:border-midnight hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#ffffff' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-midnight">Resources</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {title === 'The Gifted Battlefield' && (
                      <a href="https://www.facebook.com/giftedbat.edu.vn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </a>
                    )}
                    {title === 'TDN Music Club' && (
                      <>
                        <a href="https://www.facebook.com/clbvannghetdn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <Facebook size={18} />
                          <span>Facebook</span>
                        </a>
                        <a href="https://www.youtube.com/@clbvannghetdn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <Youtube size={18} />
                          <span>YouTube</span>
                        </a>
                      </>
                    )}
                    {title === 'Improve English' && (
                      <a href="https://www.facebook.com/ImproveEnglish2208" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </a>
                    )}
                    {title === 'Hear.Us.Now' && (
                      <>
                        <a href="https://www.facebook.com/humansofHear.Us.Now" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <Facebook size={18} />
                          <span>Facebook</span>
                        </a>
                        <a href="https://hearusnow.vn/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <Globe size={18} />
                          <span>Website</span>
                        </a>
                      </>
                    )}
                    {title === 'MAJOR Conquest' && (
                      <>
                        <a href="https://www.facebook.com/majorconquest.mcq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <Facebook size={18} />
                          <span>Facebook</span>
                        </a>
                        <a href="https://open.spotify.com/show/4MatvkvCpuqjfjM3f5nfub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <MusicIcon size={18} />
                          <span>Spotify</span>
                        </a>
                        <a href="https://drive.google.com/file/d/1AKgxhLe_2U7Q3M-BJygp_YNpWm3G8JU7/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <BookOpen size={18} />
                          <span>Handbook</span>
                        </a>
                      </>
                    )}
                    {title === 'IniatiaRe Community' && (
                      <a href="https://www.facebook.com/InitiaReCommunity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </a>
                    )}
                    {title === 'Khan Academy Vietnam' && (
                      <>
                        <a href="https://www.facebook.com/vietnamkhanacademy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <Facebook size={18} />
                          <span>Facebook</span>
                        </a>
                        <a href="https://www.khanacademy.org/join/GC9W6SDZ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <BookOpen size={18} />
                          <span>Course</span>
                        </a>
                        <a href="https://drive.google.com/drive/folders/1XVCXil2svgRLG7J48XaKXR-xa9FIezzG" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                          <BookOpen size={18} />
                          <span>Slides</span>
                        </a>
                      </>
                    )}
                    {title === 'Innova Market Insights' && (
                      <a href="https://www.innovamarketinsights.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                        <Globe size={18} />
                        <span>Website</span>
                      </a>
                    )}
                    {title === 'Piano – Music: Instrumental' && (
                      <a href="https://drive.google.com/drive/folders/1Ny2xTHOsvohNCU80Mv5dd2Y6OSWE_ZXh?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight border-2 border-midnight font-body font-semibold rounded-full hover:bg-midnight hover:text-white hover:border-white transition-all duration-300">
                        <BookOpen size={18} />
                        <span>Resources</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}