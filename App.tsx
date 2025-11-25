/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Mail, Phone, Linkedin, Globe, Download, Monitor, PenTool, Video, Box, Braces, Brain, Camera, BookOpenText, Film } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ArtistCard';
import { Project, Skill, Experience } from './types';

// --- DATA ---

const SKILLS_DATA = [
  { name_es: 'Photoshop', name_en: 'Photoshop', level: 90, icon: Camera },
  { name_es: 'Illustrator', name_en: 'Illustrator', level: 85, icon: PenTool },
  { name_es: 'InDesign', name_en: 'InDesign', level: 60, icon: BookOpenText },
  { name_es: 'After Effects', name_en: 'After Effects', level: 70, icon: Video },
  { name_es: 'DaVinci Resolve', name_en: 'DaVinci Resolve', level: 60, icon: Film },
  { name_es: 'Blender', name_en: 'Blender', level: 75, icon: Box },
  { name_es: 'Cinema 4D', name_en: 'Cinema 4D', level: 60, icon: Box },
  { name_es: 'IA Generativa', name_en: 'Generative AI', level: 55, icon: Brain },
  { name_es: 'Desarrollo Web', name_en: 'Web Development', level: 30, icon: Braces },
];

const EXPERIENCE_DATA = [
  { 
    company: 'CloseUp Comunicaciones', 
    role_es: 'Diseñador gráfico', 
    role_en: 'Graphic Designer',
    period: '2025', 
    logo: 'https://iili.io/fdyBHiP.md.png' 
  },
  { 
    company: 'Native Media Work', 
    role_es: 'Diseñador gráfico', 
    role_en: 'Graphic Designer',
    period: '2024', 
    logo: 'https://iili.io/fdyB20F.md.png' 
  },
  { 
    company: 'Vintage Publicidad', 
    role_es: 'Diseñador gráfico', 
    role_en: 'Graphic Designer',
    period: '2017 - 2023', 
    logo: 'https://iili.io/fdyBdf1.md.png' 
  },
  { 
    company: 'Parabola Studios', 
    role_es: 'Diseñador gráfico', 
    role_en: 'Graphic Designer',
    period: '2014 - 2016', 
    logo: 'https://iili.io/fdyB9WB.md.png' 
  },
];

const PROJECTS_DATA = [
  { 
    id: '1', 
    title_es: 'Key Visuals',
    title_en: 'Key Visuals',
    client: 'ASTRIX', 
    category_es: 'Campañas',
    category_en: 'Campaigns',
    year: '2017 - 2018',
    images: ['/assets/work-img/astrix-kv-1-edit.jpg', '/assets/work-img/astrix-kv-2.jpg', '/assets/work-img/astrix-kv-3.jpg'], // Simulating gallery with duplicate
    description_es: 'Diseño de Key Visuals para líneas de productos Astrix (OLA, LIZ). Enfoque en composición vibrante de productos y visuales de alto impacto.',
    description_en: 'Key visual design for Astrix product lines (OLA, LIZ). Focus on vibrant product compositing and high-impact visuals.'
  },
  { 
    id: '2', 
    title_es: 'Contenido RRSS',
    title_en: 'Social Media Content',
    client: 'ASTRIX', 
    category_es: 'Redes Sociales',
    category_en: 'Social Media',
    year: '2017 - 2019',
    images: ['/assets/work-img/astrix-rrss-1.jpg', '/assets/work-img/astrix-rrss-2.jpg', '/assets/work-img/astrix-rrss-3.jpg', '/assets/work-img/astrix-rrss-4.jpg', '/assets/work-img/astrix-rrss-5.jpg', '/assets/work-img/astrix-rrss-6.jpg', '/assets/work-img/astrix-rrss-7.jpg'],
    description_es: 'Contenido para redes sociales para las marcas de la familia Astrix (ahora Unilever).',
    description_en: 'Social media content strategy for OLA and LIZ brands, featuring "Gala es el mejor shampoo" and meme-style engagement posts.'
  },
  { 
    id: '3', 
    title_es: 'Key Visuals Retail',
    title_en: 'Retail Key Visuals',
    client: 'KETAL', 
    category_es: 'Campaña',
    category_en: 'Campaign',
    year: '2023',
    images: ['/assets/ketal-kv.jpg'],
    description_es: 'Visuales de marketing retail para Ketal Hipermercados, incluyendo "2do Aguinaldo" y "Amiga nos quedamos sin piqueos".',
    description_en: 'Retail marketing visuals for Ketal Hipermercados, including "2do Aguinaldo" and "Amiga nos quedamos sin piqueos".'
  },
  { 
    id: '4', 
    title_es: 'Campañas Mensuales',
    title_en: 'Monthly Campaigns',
    client: 'KETAL', 
    category_es: 'Ilustración',
    category_en: 'Illustration',
    year: '2023',
    images: ['/assets/ketal-campaign.jpg'],
    description_es: 'Diseño de personajes y campañas mensuales temáticas, presentando el concepto de superhéroe "Mayo Espectacular".',
    description_en: 'Character design and thematic monthly campaigns, featuring the "Mayo Espectacular" superhero concept.'
  },
  { 
    id: '5', 
    title_es: 'Guerreros Solidarios',
    title_en: 'Guerreros Solidarios',
    client: 'La Boliviana Ciacruz', 
    category_es: 'Campaña',
    category_en: 'Campaign',
    year: '2023',
    images: ['/assets/lbc-guerreros.jpg'],
    description_es: 'Dirección de arte para la campaña "Guerreros Solidarios", destacando historias de coraje, nobleza y fortaleza.',
    description_en: 'Art direction for the "Guerreros Solidarios" campaign, highlighting stories of courage, nobility, and strength.'
  },
  { 
    id: '6', 
    title_es: 'Contenido RRSS',
    title_en: 'Social Media Content',
    client: 'La Boliviana Ciacruz', 
    category_es: 'Redes Sociales',
    category_en: 'Social Media',
    year: '2023',
    images: ['/assets/lbc-rrss.jpg'],
    description_es: 'Gestión integral de redes sociales para productos de seguros (Auto, Hogar) con una estética limpia y corporativa.',
    description_en: 'Comprehensive social media management for insurance products (Auto, Hogar) with a clean, corporate aesthetic.'
  },
  { 
    id: '7', 
    title_es: 'Publicidad Corporativa',
    title_en: 'Corporate Advertising',
    client: 'AXS', 
    category_es: 'Branding',
    category_en: 'Branding',
    year: '2024',
    images: ['/assets/axs-corp.jpg'],
    description_es: 'Visuales publicitarios corporativos de alta tecnología para AXS, enfatizando conectividad, velocidad y tecnología futura.',
    description_en: 'High-tech corporate advertising visuals for AXS, emphasizing connectivity, speed, and future tech.'
  },
  { 
    id: '8', 
    title_es: 'Social Media & Promo',
    title_en: 'Social Media & Promo',
    client: 'AXS', 
    category_es: 'Redes Sociales',
    category_en: 'Social Media',
    year: '2024',
    images: ['/assets/axs-rrss.jpg'],
    description_es: 'Diseños dinámicos para redes sociales de planes de internet, "El Poder de 1 Bs" y promociones de servicios de streaming.',
    description_en: 'Dynamic social media designs for internet plans, "El Poder de 1 Bs", and streaming service promotions.'
  },
  { 
    id: '9', 
    title_es: 'Branding & Souvenirs',
    title_en: 'Branding & Souvenirs',
    client: 'AXS', 
    category_es: 'Merchandising',
    category_en: 'Merch',
    year: '2024',
    images: ['/assets/axs-branding.jpg'],
    description_es: 'Diseño de merchandising incluyendo camisetas, tazas y packaging para eventos corporativos y patrocinios de carnaval.',
    description_en: 'Merchandise design including T-shirts, mugs, and packaging for corporate events and carnival sponsorships.'
  },
  { 
    id: '10', 
    title_es: 'Diseño de Stands',
    title_en: 'Stand Design',
    client: 'AXS', 
    category_es: '3D / Eventos',
    category_en: '3D / Event',
    year: '2024',
    images: ['/assets/axs-stands.jpg'],
    description_es: 'Visualización 3D y diseño espacial para centros de experiencia y stands comerciales de AXS.',
    description_en: '3D visualization and spatial design for AXS experience centers and commercial stands.'
  },
  { 
    id: '11', 
    title_es: 'Stickers WhatsApp',
    title_en: 'WhatsApp Stickers',
    client: 'AXS', 
    category_es: 'Ilustración',
    category_en: 'Illustration',
    year: '2024',
    images: ['/assets/axs-stickers.jpg'],
    description_es: 'Set de ilustraciones personalizadas para stickers de WhatsApp utilizados en marketing digital y servicio al cliente.',
    description_en: 'Custom illustration set for WhatsApp stickers used in digital marketing and customer service.'
  },
  { 
    id: '12', 
    title_es: 'Dental Social Media',
    title_en: 'Dental Social Media',
    client: 'INNOVASALUD', 
    category_es: 'Redes Sociales',
    category_en: 'Social Media',
    year: '2024',
    images: ['/assets/innovasalud.jpg', '/assets/innovasalud2.jpg', '/assets/innovasalud3.jpg'],
    description_es: 'Gráficos limpios y accesibles para redes sociales de servicios de salud dental, campañas de blanqueamiento y publicaciones estacionales.',
    description_en: 'Clean, approachable social media graphics for dental health services, whitening campaigns, and seasonal posts.'
  },
  { 
    id: '13', 
    title_es: 'Salvar Los Bosques',
    title_en: 'Save The Forests',
    client: 'PRO PACHA', 
    category_es: 'Campaña',
    category_en: 'Campaign',
    year: '2023',
    images: ['/assets/propacha.jpg'],
    description_es: 'Campaña de conciencia ambiental "Juntos podemos salvar los bosques" presentando bomberos voluntarios y fotografía de naturaleza.',
    description_en: 'Environmental awareness campaign "Juntos podemos salvar los bosques" featuring volunteer firefighters and nature photography.'
  },
  { 
    id: '14', 
    title_es: 'Set "Mi Casa Es Tu Casa"',
    title_en: '"Mi Casa Es Tu Casa" Set',
    client: 'ATB', 
    category_es: '3D / Set Design',
    category_en: '3D / Set Design',
    year: '2024',
    images: ['/assets/atb-set.jpg'],
    description_es: 'Rediseño de set virtual para el programa de TV "Mi Casa Es Tu Casa", creado en Blender/Cinema 4D.',
    description_en: 'Virtual set redesign for the TV program "Mi Casa Es Tu Casa", created in Blender/Cinema 4D.'
  },
  { 
    id: '15', 
    title_es: 'Activación Expofarma',
    title_en: 'Expofarma Activation',
    client: 'BAGÓ', 
    category_es: 'Eventos',
    category_en: 'Event',
    year: '2025',
    images: ['/assets/bago-expofarma.jpg'],
    description_es: 'Diseño de stand de activación para Refrianex en Expofarma 2025, con zonas de fotos interactivas.',
    description_en: 'Event activation booth design for Refrianex at Expofarma 2025, featuring interactive photo zones.'
  },
  { 
    id: '16', 
    title_es: 'Conferencia & Stand',
    title_en: 'Conference & Stand',
    client: 'BDP', 
    category_es: '3D / Eventos',
    category_en: '3D / Event',
    year: '2025',
    images: ['/assets/bdp-event.jpg'],
    description_es: 'Montaje de escenario y diseño de stand para eventos del Banco de Desarrollo Productivo, específicamente para "La Paz Expone 2025".',
    description_en: 'Stage setup and stand design for Banco de Desarrollo Productivo events, specifically for "La Paz Expone 2025".'
  },
];

const TEXT_CONTENT = {
  es: {
    nav: [
      { label: 'Sobre mí', id: 'about' },
      { label: 'Portafolio', id: 'portfolio' },
      { label: 'Habilidades', id: 'skills' },
      { label: 'Experiencia', id: 'experience' },
      { label: 'Contacto', id: 'contact' },
    ],
    heroRole: "Portafolio de diseño gráfico 2025",
    aboutTitle: "¡Hola!",
    aboutLeft: "Soy un diseñador gráfico creativo, con 8 años de experiencia en agencias.",
    aboutRight: "Tengo experiencia diseñando piezas tradicionales y digitales, buen ojo para el diseño, excelente ortografía y pasión por aprender.",
    portfolioTitle: "PORTAFOLIO",
    portfolioSubtitle: "Una selección de mis trabajos.",
    skillsTitle: "HABILIDADES",
    languagesTitle: "IDIOMAS",
    langEs: "Español",
    langEsDesc: "Idioma nativo",
    langEn: "Inglés",
    langEnDesc: "Nivel Avanzado (C2 Proficient)",
    langEnCertUrl: "https://cert.efset.org/e6BUJA",
    langEnCertText: "Certificado EF SET",
    experienceTitle: "EXPERIENCIA",
    contactTitle: "¡CONTÁCTAME!",
    emailLabel: "Correo",
    phoneLabel: "Teléfono",
    downloadCv: "Descargar CV",
    graphicDesign: "Diseño Gráfico"
  },
  en: {
    nav: [
      { label: 'About', id: 'about' },
      { label: 'Portfolio', id: 'portfolio' },
      { label: 'Skills', id: 'skills' },
      { label: 'Experience', id: 'experience' },
      { label: 'Contact', id: 'contact' },
    ],
    heroRole: "Graphic Design Portfolio 2025",
    aboutTitle: "Hello!",
    aboutLeft: "I am a creative graphic designer with 8 years of agency experience.",
    aboutRight: "I have experience designing traditional and digital pieces, a good eye for design, excellent spelling, and a passion for learning.",
    portfolioTitle: "PORTFOLIO",
    portfolioSubtitle: "A selection of my work.",
    skillsTitle: "SKILLS",
    languagesTitle: "LANGUAGES",
    langEs: "Spanish",
    langEsDesc: "Native",
    langEn: "English",
    langEnDesc: "Fluent (C2 Proficient)",
    langEnCertUrl: "https://cert.efset.org/e6BUJA",
    langEnCertText: "EF SET Certificate",
    experienceTitle: "EXPERIENCE",
    contactTitle: "CONTACT ME!",
    emailLabel: "Email",
    phoneLabel: "Phone",
    downloadCv: "Download CV",
    graphicDesign: "Graphic Design"
  }
};

// --- COMPONENTS ---

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const t = TEXT_CONTENT[language];

  // Transform data based on selected language
  const projects = PROJECTS_DATA.map(p => ({
    ...p,
    title: language === 'es' ? p.title_es : p.title_en,
    category: language === 'es' ? p.category_es : p.category_en,
    description: language === 'es' ? p.description_es : p.description_en
  }));

  const skills = SKILLS_DATA.map(s => ({
    ...s,
    name: language === 'es' ? s.name_es : s.name_en
  }));

  const experience = EXPERIENCE_DATA.map(e => ({
    ...e,
    role: language === 'es' ? e.role_es : e.role_en
  }));

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    
    if (direction === 'next') {
      // If there are more images in current project, go to next image
      if (currentImageIndex < selectedProject.images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else {
        // Go to next project
        const nextIndex = (currentIndex + 1) % projects.length;
        setSelectedProject(projects[nextIndex]);
        setCurrentImageIndex(0);
      }
    } else {
      // If not first image, go to prev image
      if (currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
      } else {
        // Go to previous project, start at its last image (optional, or first)
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        const prevProject = projects[prevIndex];
        setSelectedProject(prevProject);
        setCurrentImageIndex(prevProject.images.length - 1);
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#6BCB77] selection:text-black cursor-auto md:cursor-none overflow-x-hidden bg-[#282828] font-sans">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-6 z-50">
          <div className="font-heading text-xl font-bold tracking-tighter text-white">
            <img 
              src="/assets/greengo-doodle-01-standing.svg" 
              alt="AV Logo" 
              className="h-12 w-auto drop-shadow-md" 
            />
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
             <button 
               onClick={() => setLanguage('es')}
               className={`text-xs font-bold transition-colors ${language === 'es' ? 'text-[#6BCB77]' : 'text-white hover:text-white/80'}`}
               data-hover="true"
             >
               ESPAÑOL
             </button>
             <span className="text-white/30">|</span>
             <button 
               onClick={() => setLanguage('en')}
               className={`text-xs font-bold transition-colors ${language === 'en' ? 'text-[#6BCB77]' : 'text-white hover:text-white/80'}`}
               data-hover="true"
             >
               ENGLISH
             </button>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {t.nav.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#6BCB77] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-[#282828]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {t.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-3xl font-heading font-bold text-white hover:text-[#6BCB77] transition-colors uppercase bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION (Dark) */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 pb-20">
        <motion.div 
          style={{ y }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl"
        >
          <div className="relative inline-block mt-12 md:mt-0 w-full flex justify-center">
             <motion.img 
                src="/assets/hero-h1.svg" 
                alt="Augusto Valverde" 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-[90%] md:max-w-4xl object-contain relative z-20 drop-shadow-2xl"
             />
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
            className="w-32 md:w-64 h-2 md:h-4 bg-[#6BCB77] mt-4 md:mt-8 mb-6 relative z-20"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl font-light uppercase tracking-[0.3em] text-gray-300 relative z-20"
          >
            {t.heroRole}
          </motion.p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#6BCB77] to-transparent" />
        </motion.div>
      </header>

      {/* 2. ABOUT SECTION (Dark) */}
      <section id="about" className="relative z-10 pb-40 pt-20 bg-[#282828]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
           
           {/* Left Bubble (Desktop) / Top Bubble (Mobile) */}
           <div className="w-full md:w-1/3 relative order-1">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white text-[#282828] p-6 rounded-3xl shadow-xl relative mb-4 md:mb-8"
              >
                {/* Desktop Pointer (Right) */}
                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent"></div>
                {/* Mobile Pointer (Bottom) */}
                <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[20px] border-t-white border-r-[10px] border-r-transparent"></div>

                <h3 className="text-xl font-bold mb-2 text-[#6BCB77]">{t.aboutTitle}</h3>
                <p className="text-base font-medium leading-relaxed">
                  {t.aboutLeft}
                </p>
              </motion.div>
           </div>
           
           {/* Center Character */}
           <div className="w-full md:w-1/3 flex justify-center order-2">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
               >
                 <img 
                    src="/assets/greengo-doodle-02-greeting.svg" 
                    alt="Greeting Character"
                    className="w-48 md:w-64 object-contain"
                 />
               </motion.div>
           </div>

           {/* Right Bubble (Desktop) / Bottom Bubble (Mobile) */}
           <div className="w-full md:w-1/3 relative order-3">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white text-[#282828] p-6 rounded-3xl shadow-xl relative mt-4 md:mt-0"
              >
                 {/* Desktop Pointer (Left) */}
                 <div className="hidden md:block absolute top-1/2 -left-4 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-white border-b-[10px] border-b-transparent"></div>
                 {/* Mobile Pointer (Top) */}
                 <div className="md:hidden absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-b-[20px] border-b-white border-r-[10px] border-r-transparent"></div>

                 <p className="text-base font-medium leading-relaxed">
                  {t.aboutRight}
                </p>
              </motion.div>
           </div>

        </div>
      </section>

      {/* 3. PORTFOLIO GRID (Light) */}
      <section 
        id="portfolio" 
        className="relative z-20 pt-32 pb-40 bg-[#F0F4F8] text-[#282828] rounded-t-[3rem] md:rounded-t-[5rem] -mt-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          {/* Centered Header for Portfolio */}
          <div className="mb-16 text-center flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold text-[#282828] leading-none mb-6 break-words">
               {t.portfolioTitle}
            </h2>
            <p className="text-[#282828]/70 max-w-md text-lg">
              {t.portfolioSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION (Dark) */}
      <section 
        id="skills" 
        className="relative z-30 pt-32 pb-40 bg-[#282828] text-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-20 shadow-[0_-20px_60px_rgba(0,0,0,0.2)]"
      >
         <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold text-white mb-4 break-words hyphens-auto">{t.skillsTitle}</h2>
              <div className="w-24 h-2 bg-[#6BCB77] mx-auto rounded-full"></div>
            </div>

            {/* Software Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-16">
                  {skills.map((skill, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex justify-between items-end mb-2">
                         <div className="flex items-center gap-2">
                            {skill.icon && <skill.icon className="w-4 h-4 text-[#6BCB77]" />}
                            <span className="font-bold">{skill.name}</span>
                         </div>
                         <span className="text-xs text-[#6BCB77]">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${skill.level}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1, delay: 0.5 }}
                           className="h-full bg-[#6BCB77] rounded-full"
                         />
                      </div>
                    </motion.div>
                  ))}
            </div>

            {/* Languages - Moved to bottom */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-heading font-bold mb-8 text-[#6BCB77] text-center md:text-left">{t.languagesTitle}</h3>
                <div className="flex flex-col md:flex-row justify-around gap-8">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl flex-1">
                    <img src="/assets/flag-es.svg" alt="Español" className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white/20" />
                    <div>
                      <h4 className="font-bold text-lg">{t.langEs}</h4>
                      <p className="text-white/50 text-sm">{t.langEsDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl flex-1">
                    <img src="/assets/flag-en.svg" alt="Inglés" className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white/20" />
                    <div>
                      <h4 className="font-bold text-lg">{t.langEn}</h4>
                      <p className="text-white/50 text-sm">{t.langEnDesc}{" "}
                      <a href={t.langEnCertUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        {t.langEnCertText}
                      </a></p>
                    </div>
                  </div>
                </div>
            </div>
         </div>
      </section>

      {/* 5. EXPERIENCE SECTION (Light) */}
      <section 
        id="experience" 
        className="relative z-40 pt-32 pb-40 bg-[#F0F4F8] text-[#282828] rounded-t-[3rem] md:rounded-t-[5rem] -mt-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold text-[#282828] mb-4 break-words hyphens-auto">{t.experienceTitle}</h2>
            <div className="w-24 h-2 bg-[#6BCB77] mx-auto rounded-full"></div>
          </div>

          <div className="relative border-l-2 border-[#282828]/10 ml-4 md:ml-0 md:pl-0 space-y-12">
             {experience.map((exp, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="md:flex items-center gap-8 relative group"
               >
                 {/* Timeline Dot */}
                 <div className="absolute left-[-9px] top-0 md:relative md:left-auto md:top-auto w-4 h-4 bg-[#6BCB77] rounded-full border-4 border-[#F0F4F8] group-hover:scale-150 transition-transform"></div>
                 
                 {/* Content */}
                 <div className="ml-8 md:ml-0 flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Logo */}
                    {exp.logo && (
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-full overflow-hidden flex items-center justify-center p-1 border border-gray-100">
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain rounded-full" />
                      </div>
                    )}
                    
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-bold font-heading uppercase tracking-tighter leading-tight break-words">{exp.company}</h3>
                        <span className="text-sm font-mono text-[#6BCB77] font-bold bg-[#6BCB77]/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0 whitespace-nowrap">{exp.period}</span>
                      </div>
                      <p className="text-[#6BCB77] font-heading font-bold tracking-widest uppercase text-sm md:text-base mt-1 break-words">{exp.role}</p>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT FOOTER (Dark) */}
      <footer 
        id="contact" 
        className="relative z-50 py-24 bg-[#282828] text-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
             
             {/* Phone Character - Top on Mobile, Right on Desktop */}
             <motion.div 
               className="order-1 md:order-2"
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
             >
                <img 
                  src="/assets/greengo-doodle-05-phone.svg" 
                  alt="Phone Character" 
                  className="w-48 md:w-64 object-contain"
                />
             </motion.div>

             {/* Contact Info - Bottom on Mobile, Left on Desktop */}
             <div className="flex-1 text-center md:text-left order-2 md:order-1">
                <div className="inline-block relative mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold text-white">
                      {t.contactTitle}
                    </h2>
                    <motion.div 
                       className="absolute -bottom-4 left-0 w-full h-4 bg-[#6BCB77]"
                       initial={{ scaleX: 0 }}
                       whileInView={{ scaleX: 1 }}
                       viewport={{ once: true }}
                    />
                 </div>

                 <div className="grid md:grid-cols-2 gap-8 mb-16 text-left max-w-2xl mx-auto md:mx-0">
                    <a href="mailto:augustovalverdegraphics@gmail.com" target="_blank" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-white/10">
                       <div className="bg-white text-[#282828] p-3 rounded-full group-hover:bg-[#6BCB77] group-hover:text-black transition-colors">
                          <Mail className="w-6 h-6" />
                       </div>
                       <div>
                          <span className="block text-xs font-bold text-white/50 uppercase tracking-wider">{t.emailLabel}</span>
                          <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">augustovalverdegraphics<br />@gmail.com</span>
                       </div>
                    </a>

                    <a href="https://wa.me/59176518529" target="_blank" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-white/10">
                       <div className="bg-white text-[#282828] p-3 rounded-full group-hover:bg-[#6BCB77] group-hover:text-black transition-colors">
                          <Phone className="w-6 h-6" />
                       </div>
                       <div>
                          <span className="block text-xs font-bold text-white/50 uppercase tracking-wider">{t.phoneLabel}</span>
                          <span className="font-bold text-lg">+591 76518529</span>
                       </div>
                    </a>
                 </div>

                 <div className="flex justify-center md:justify-start gap-6">
                    <a href="https://www.linkedin.com/in/augusto-valverde-dg/" target="_blank" className="bg-white text-[#282828] px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#6BCB77] hover:text-black transition-colors flex items-center gap-2">
                       <Linkedin className="w-5 h-5" /> LinkedIn
                    </a>
                    <a href="https://www.behance.net/augustovalverdegraph" target="_blank" className="bg-white text-[#282828] px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#6BCB77] hover:text-black transition-colors flex items-center gap-2">
                       <Globe className="w-5 h-5" /> Behance
                    </a>
                 </div>
             </div>
           </div>

           
           <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs font-mono text-white/40">
              <span>© 2025 Augusto Valverde.</span>

           </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#282828] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <div className="absolute bottom-6 right-6 z-20 flex gap-4">
                 <button
                  onClick={(e) => { e.stopPropagation(); navigateProject('prev'); }}
                  className="p-4 rounded-full bg-black/50 text-white hover:bg-[#6BCB77] hover:text-black transition-colors backdrop-blur-sm"
                  data-hover="true"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject('next'); }}
                  className="p-4 rounded-full bg-black/50 text-white hover:bg-[#6BCB77] hover:text-black transition-colors backdrop-blur-sm"
                  data-hover="true"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Image Side */}
              <div className="w-full md:w-2/3 h-[40vh] md:h-[80vh] relative overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedProject.id + currentImageIndex} // Key ensures animation triggers on image change
                    src={selectedProject.images[currentImageIndex]} 
                    alt={selectedProject.title} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if image is missing
                      e.currentTarget.src = 'https://placehold.co/800x600/282828/6BCB77?text=Image+Not+Found';
                    }}
                  />
                </AnimatePresence>
                
                {/* Gallery Indicators */}
                <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                  {selectedProject.images.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-[#6BCB77]' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col bg-[#282828] relative">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-[#6BCB77] font-mono text-sm tracking-widest uppercase mb-4 block">
                     {selectedProject.client} — {selectedProject.year}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-none mb-6 text-white">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="h-1 w-12 bg-[#6BCB77] mb-8" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider text-white/60">
                       {selectedProject.category}
                     </span>
                     <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider text-white/60">
                       {t.graphicDesign}
                     </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
