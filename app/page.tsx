"use client";
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, Download, Menu, X, ExternalLink, Code, MapPin, Trophy, Target, Rocket, BookOpen, Globe, Layers, Award, ChevronDown, ChevronRight, Sparkles, Zap, MessageCircle, GraduationCap, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);




  // State for form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(''); // 'sending', 'success', 'error'

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_jjwxlze'; // Get from EmailJS dashboard
  const EMAILJS_TEMPLATE_ID = 'template_3ke32uy'; // Get from EmailJS dashboard
  const EMAILJS_PUBLIC_KEY = '7MC_iQg1tSY_zEnZb'; // Get from EmailJS dashboard

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        e.target,
        EMAILJS_PUBLIC_KEY
      );

      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setFormStatus('error');
    }
  };

  const roles = [
    'Full-Stack Developer',
    'Competitive Programmer',
    'Problem Solver',
    'MERN Stack Expert'
  ];

  // Resume download handler
  const handleResumeDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/Kabir_Hossain_ATS_CV.pdf'; // Your resume file in public folder
    link.download = 'Kabir_Hossain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fallback if file doesn't exist
    console.log('Resume downloaded! Make sure to place "Kabir_Hossain_Resume.pdf" in your public folder.');
  };

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const role = roles[currentRole];
    const interval = setInterval(() => {
      if (currentIndex <= role.length) {
        setDisplayedText(role.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentRole]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#tech-stack' },
    { name: 'CP Stats', href: '#cp-stats' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const skills = {
    'Frontend': [
      { name: 'React.js', level: 90, icon: '⚛️' },
      { name: 'Next.js', level: 85, icon: '▲' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'JavaScript', level: 90, icon: '🟨' },
      { name: 'TypeScript', level: 75, icon: '🔷' },
      { name: 'HTML/CSS', level: 95, icon: '📱' }
    ],
    'Backend': [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express.js', level: 85, icon: '🚂' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Firebase', level: 75, icon: '🔥' },
      { name: 'REST APIs', level: 85, icon: '🔌' },
      { name: 'PostgreSQL', level: 70, icon: '🐘' }
    ],
    'Programming': [
      { name: 'C++', level: 90, icon: '⚡' },
      { name: 'JavaScript', level: 90, icon: '🟨' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'DSA', level: 85, icon: '🧮' },
      { name: 'Problem Solving', level: 88, icon: '🎯' }
    ]
  };

  const cpStats = [
    { platform: 'Codeforces', rating: '1400+', solved: '500+', color: 'from-blue-500 to-purple-600' },
    { platform: 'LeetCode', rating: '1800+', solved: '300+', color: 'from-yellow-500 to-orange-600' },
    { platform: 'HackerRank', stars: '⭐⭐⭐⭐⭐', solved: '200+', color: 'from-green-500 to-teal-600' }
  ];

  const projects = [
    {
      id: 1,
      name: 'LocalChefBazaar',
      tagline: 'Marketplace for Local Home-Cooked Meals',
      image: 'https://i.ibb.co.com/CsMCsMPm/Screenshot-100.png',
      shortDesc: 'A full-stack MERN marketplace platform connecting home chefs with customers',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Stripe', 'JWT'],
      fullDesc: 'LocalChefBazaar is a comprehensive marketplace platform that empowers home chefs to showcase their culinary skills and earn income while providing customers with access to fresh, healthy, and affordable homemade meals. The platform features role-based access control, secure payment integration, real-time order tracking, and modern UI/UX design.',
      liveLink: 'https://localchefbazaar-31da8.web.app',
      githubLink: 'https://github.com/nerobkabir/Local-Chef-Bazar-Client.git',
      challenges: 'Implementing real-time order updates, managing multiple user roles (Chef, Customer, Admin), secure payment processing with Stripe, and handling image uploads efficiently.',
      improvements: 'Add AI-powered meal recommendations, in-app messaging system, subscription models, mobile app version, and advanced analytics dashboard.',
      features: [
        'Role-based authentication (User/Chef/Admin)',
        'Stripe payment integration',
        'Real-time order tracking',
        'Meal review & rating system',
        'Admin dashboard with analytics',
        'Chef revenue tracking'
      ]
    },
    {
      id: 2,
      name: 'Artify',
      tagline: 'Creative Artwork Showcase Platform',
      image: 'https://i.ibb.co.com/Qv5S0Tfr/Screenshot-132.png',
      shortDesc: 'A modern platform for artists to upload and display creative artworks',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Swiper.js'],
      fullDesc: 'Artify is a creative platform where artists can showcase their artworks, explore other artist galleries, filter by categories, and interact with the community. The platform focuses on elegant UI, smooth user experience, and powerful content management features.',
      liveLink: 'https://bejewelled-panda-60b4b5.netlify.app',
      githubLink: 'https://github.com/nerobkabir/Showcase-flartform-client.git',
      challenges: 'Implementing secure JWT authentication, managing artwork uploads with proper validation, creating an intuitive favorites system, and ensuring responsive design across all devices.',
      improvements: 'Add social sharing features, artist collaboration tools, virtual gallery tours, NFT integration, and commission request system.',
      features: [
        'Artwork upload with image processing',
        'Advanced search & category filtering',
        'Favorites & bookmark system',
        'User authentication (Email & Google)',
        'Fully responsive UI',
        'Private routes for user content'
      ]
    },
    {
      id: 3,
      name: 'Hero Apps',
      tagline: 'Modern App Showcase Platform',
      image: 'https://i.ibb.co.com/Y7XpZFPF/Screenshot-130.png',
      shortDesc: 'An app discovery and management platform with installation tracking',
      tech: ['React.js', 'Tailwind CSS', 'React Router', 'LocalStorage', 'Lucide React'],
      fullDesc: 'Hero Apps is a modern React-based application that allows users to explore, install, and manage various trending apps. It provides an intuitive interface for discovering popular applications, viewing detailed information, and managing installed apps with real-time feedback.',
      liveLink: 'https://candid-monstera-42301f.netlify.app',
      githubLink: 'https://github.com/nerobkabir/Hero-Apps.git',
      challenges: 'Creating a seamless app installation/uninstall system with LocalStorage, implementing real-time toast notifications, and building an intuitive sorting/filtering interface.',
      improvements: 'Add user accounts with sync capabilities, app reviews & ratings, search functionality, dark mode, and backend API integration.',
      features: [
        'App installation/uninstall system',
        'Real-time toast notifications',
        'Sort by download count',
        'App details view',
        'Persistent data with LocalStorage',
        'Responsive mobile-friendly design'
      ]
    }
  ];

  const currentWork = [
    { icon: '🌟', text: 'Exploring Next.js and advanced React patterns' },
    { icon: '💻', text: 'Solving problems on Codeforces & LeetCode' },
    { icon: '📖', text: 'Deepening DSA & Design Patterns knowledge' }
  ];

  const scrollToSection = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced Animated Background with Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div
          className="absolute w-[600px] h-[600px] rounded-full transition-all duration-500 ease-out opacity-40"
          style={{
            background: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)',
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
            transform: `translate(0, ${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-float opacity-30"></div>
        <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px] animate-float-delayed opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/2 w-60 h-60 bg-pink-500/10 rounded-full blur-[70px] animate-float-slow opacity-25"></div>

        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-400/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}

        <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)"></div>
      </div>

      {/* Ultra Modern Navbar */}
      {/* Ultra Modern Sleek Navbar */}
      <nav className="fixed top-3 left-0 right-0 z-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Glassmorphism Container with Floating Effect */}
          <div className="relative group">
            {/* Animated Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500 animate-pulse"></div>
            
            {/* Main Navbar Container */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Subtle Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              
              {/* Gradient Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
                {/* Logo Section - Minimalist & Bold */}
                <div className="relative group/logo cursor-pointer">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/logo:opacity-30 blur-lg transition-all duration-500"></div>
                  
                  <div className="relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 group-hover/logo:border-white/30 transition-all duration-300">
                    {/* Animated Icon */}
                    <div className="relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover/logo:scale-110 group-hover/logo:rotate-12 transition-all duration-300">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover/logo:opacity-50 blur-md transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Brand Text */}
                    <div className="hidden sm:block">
                      <div className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                        KABIR
                      </div>
                      <div className="text-[10px] text-gray-400 tracking-widest -mt-1">DEVELOPER</div>
                    </div>
                  </div>
                </div>

                {/* Desktop Navigation - Clean & Modern */}
                <div className="hidden lg:flex items-center gap-2">
                  {navItems.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="relative group/nav px-5 py-2.5 overflow-hidden"
                    >
                      {/* Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover/nav:from-blue-500/10 group-hover/nav:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                      
                      {/* Active Indicator Line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover/nav:w-3/4 transition-all duration-300 rounded-full"></div>
                      
                      {/* Text */}
                      <span className="relative text-sm font-medium text-gray-300 group-hover/nav:text-white transition-colors duration-300 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"></span>
                        {item.name}
                      </span>
                    </button>
                  ))}

                  {/* CTA Button - Eye-catching */}
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="relative group/cta ml-3 px-6 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center gap-2 text-white">
                      <Sparkles size={16} />
                      <span>Let's Talk</span>
                      <ArrowUpRight size={16} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
                    </span>
                  </button>
                </div>

                {/* Mobile Menu Button - Sleek Animation */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden relative p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group/menu"
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'w-full'}`}></span>
                    <span className={`h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'w-4 ml-auto'}`}></span>
                    <span className={`h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'w-5 ml-auto'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Elegant Dropdown */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 animate-slideDown">
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
                
                <div className="relative space-y-2">
                  {navItems.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full group relative overflow-hidden animate-fadeIn"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                            {item.name}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Mobile CTA */}
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full mt-4 group relative overflow-hidden"
                  >
                    <div className="relative px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles size={18} />
                        <span>Get In Touch</span>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 md:px-26 pt-35 relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

            <div className="flex-1 text-center md:text-left space-y-6 animate-fadeInUp">
              <p className="text-blue-400 text-lg flex items-center justify-center md:justify-start gap-2 font-medium">
                <Zap className="w-5 h-5 animate-pulse" /> Hello, I'm
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Kabir Hossain
              </h1>

              <div className="h-12">
                <p className="text-xl md:text-2xl text-gray-300 font-medium">
                  {displayedText}
                  <span className="animate-blink">|</span>
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Feni, Bangladesh</span>
              </div>

              <p className="text-gray-300 max-w-xl leading-relaxed">
                Passionate Full-Stack Developer & Competitive Programmer focused on
                building scalable, high-performance web applications with modern
                technologies.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="px-7 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition"
                >
                  <Mail size={18} /> Get In Touch
                </button>

                <button
                  onClick={handleResumeDownload}
                  className="px-7 py-3 bg-white/5 border border-white/20 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition"
                >
                  <Download size={18} /> Download Resume
                </button>
              </div>

              {/* Social Media with Advanced Design */}
              <div className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <span className="text-sm text-gray-400">Follow me on</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="flex gap-4 justify-center md:justify-start">
                  {[
                    {
                      icon: Github,
                      label: 'GitHub',
                      color: 'hover:bg-gray-800',
                      borderColor: 'border-gray-700',
                      gradient: 'from-gray-800 to-gray-900',
                      link: 'https://github.com/nerobkabir'
                    },
                    {
                      icon: Linkedin,
                      label: 'LinkedIn',
                      color: 'hover:bg-blue-700',
                      borderColor: 'border-blue-700',
                      gradient: 'from-blue-700 to-blue-800',
                      link: 'https://www.linkedin.com/in/kabir-hossain123'
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      color: 'hover:bg-red-600',
                      borderColor: 'border-red-600',
                      gradient: 'from-red-600 to-red-700',
                      link: 'mailto:nerob2308@gmail.com'
                    },
                    {
                      icon: MessageCircle,
                      label: 'WhatsApp',
                      color: 'hover:bg-green-600',
                      borderColor: 'border-green-600',
                      gradient: 'from-green-600 to-green-700',
                      link: 'https://wa.me/8801856846615'
                    },
                    {
                      icon: Trophy,
                      label: 'Codeforces',
                      color: 'hover:bg-orange-600',
                      borderColor: 'border-orange-600',
                      gradient: 'from-orange-600 to-orange-700',
                      link: 'https://codeforces.com/profile/kabir_hossain'
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      aria-label={social.label}
                    >
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>

                      {/* Main Button */}
                      <div className={`
                  relative w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border ${social.borderColor}
                  flex items-center justify-center transition-all duration-300
                  group-hover:scale-110 group-hover:shadow-xl group-hover:border-transparent
                  ${social.color}
                `}>
                        <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />

                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                          {social.label}
                          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                        </div>

                        {/* Ring Animation */}
                        <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-white/30 transition-all duration-500"></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center animate-fadeInUp">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>

                {/* Main Avatar Container - Moderately Sized */}
                <div className="relative w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src="/kabir.png"
                      alt="Kabir Hossain"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full flex items-center justify-center text-7xl md:text-8xl';
                        fallback.textContent = '👨‍💻';
                        e.target.parentNode.appendChild(fallback);
                      }}
                    />
                  </div>
                  <div className="absolute -inset-2 rounded-full border-2 border-blue-500/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Adjust floating elements position */}
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 animate-float-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Interactive Design */}
      <section id="about" className="py-24 md:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Animated Section Title */}
          <div className="relative mb-16 md:mb-20 text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                About Me
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get to know more about my journey, skills, and what drives me
            </p>
          </div>

          {/* Interactive Timeline Layout */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 transform md:-translate-x-1/2"></div>

            {/* Timeline Points */}
            <div className="space-y-12 md:space-y-20">
              {/* Card 1 - Left */}
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className="md:flex items-center gap-8">
                  {/* Left Side (Image/Icon) */}
                  <div className="md:w-1/2 md:pr-8 flex justify-center md:justify-end mb-8 md:mb-0">
                    <div className="relative group/icon">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/icon:border-blue-500/50 transition-all duration-300">
                        <Code className="w-12 h-12 text-blue-400 group-hover/icon:scale-110 group-hover/icon:rotate-12 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Right Side (Text) */}
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-blue-500/10">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full mb-4">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-blue-400 text-sm font-medium">Background</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
                      <p className="text-gray-300 leading-relaxed">
                        I'm <span className="text-blue-400 font-semibold">Kabir Hossain</span>, a passionate Full-Stack Developer and Competitive Programmer.
                        I thrive on solving complex algorithmic challenges and building dynamic, user-centric web applications using modern technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Right */}
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Content Card */}
                <div className="md:flex items-center gap-8">
                  {/* Left Side (Text) */}
                  <div className="md:w-1/2 md:pr-8 order-2 md:order-1">
                    <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-purple-500/50 transition-all duration-300 shadow-xl shadow-purple-500/10">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 rounded-full mb-4">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-purple-400 text-sm font-medium">Methodology</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">My Approach</h3>
                      <p className="text-gray-300 leading-relaxed">
                        With a strong foundation in data structures and algorithms, I focus on creating
                        <span className="text-purple-400 font-semibold"> scalable, efficient solutions</span>.
                        I'm constantly learning new frameworks and best practices to build applications that
                        make a real impact in people's lives.
                      </p>
                    </div>
                  </div>

                  {/* Right Side (Image/Icon) */}
                  <div className="md:w-1/2 md:pl-8 order-1 md:order-2 mb-8 md:mb-0">
                    <div className="relative group/icon">
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/icon:border-purple-500/50 transition-all duration-300">
                        <Target className="w-12 h-12 text-purple-400 group-hover/icon:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Left */}
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Content Card */}
                <div className="md:flex items-center gap-8">
                  {/* Left Side (Image/Icon) */}
                  <div className="md:w-1/2 md:pr-8 flex justify-center md:justify-end mb-8 md:mb-0">
                    <div className="relative group/icon">
                      <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/icon:border-pink-500/50 transition-all duration-300">
                        <GraduationCap className="w-12 h-12 text-pink-400 group-hover/icon:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Right Side (Text) */}
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-pink-500/50 transition-all duration-300 shadow-xl shadow-pink-500/10">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 rounded-full mb-4">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                        <span className="text-pink-400 text-sm font-medium">Education</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Academic Background</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        <span className="text-pink-400 font-semibold">Diploma in Computer Science & Technology</span>.
                        Currently expanding expertise through practical projects and competitive programming.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="px-3 py-1.5 bg-blue-500/10 rounded-full">
                          <span className="text-blue-400 text-sm">Web Development</span>
                        </div>
                        <div className="px-3 py-1.5 bg-purple-500/10 rounded-full">
                          <span className="text-purple-400 text-sm">Competitive Programming</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Work Section with Interactive Cards */}
          <div className="mt-24 md:mt-32">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full border border-white/10 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                  <Rocket className="w-5 h-5 text-blue-400 relative" />
                </div>
                <span className="text-blue-400 text-sm font-medium">Current Focus</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Currently</span> Working On
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Here's a glimpse into my current projects and learning journey
              </p>
            </div>

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentWork.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 h-full">
                    {/* Icon with Animation */}
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl group-hover:animate-bounce">{item.icon}</span>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>

                    {/* Progress Indicator */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs text-blue-400 font-medium">
                          {Math.floor(Math.random() * 40 + 60)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.floor(Math.random() * 40 + 60)}%`,
                            animationDelay: `${index * 0.2}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Projects Completed', value: '10+', color: 'blue' },
                { label: 'CP Problems Solved', value: '300+', color: 'purple' },
                { label: 'Technologies Used', value: '10+', color: 'pink' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center group hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute bottom-40 right-10 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-20 w-3 h-3 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Tech Stack Section - Modern Design */}
      <section id="tech-stack" className="py-3 md:py-3 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full border border-white/10 mb-6 backdrop-blur-sm">
              <Layers className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium tracking-wide">TECH STACK</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Technology</span> Arsenal
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Tools and technologies I use to bring ideas to life
            </p>

            {/* Decorative Elements */}
            <div className="absolute -top-10 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-5 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Tech Stack Container with Image-like Layout */}
          <div className="relative space-y-12">
            {/* JavaScript Ecosystem Card */}
            <div className="group relative">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-yellow-500/30 transition-all duration-500 overflow-hidden">
                {/* Card Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-yellow-300">JS</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">JavaScript Ecosystem</h3>
                        <p className="text-gray-400 text-sm">Full-Stack JavaScript Development</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-yellow-500/10 rounded-full">
                      <span className="text-yellow-400 text-sm font-medium">8 Technologies</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-sm">Mastery Level</span>
                      <span className="text-yellow-400 text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Tech Grid - Enhanced with Icons */}
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'JavaScript', icon: '🟨', level: 90, color: 'yellow' },
                      { name: 'TypeScript', icon: '🔷', level: 85, color: 'blue' },
                      { name: 'React', icon: '⚛️', level: 88, color: 'cyan' },
                      { name: 'Nest.js', icon: '🏰', level: 82, color: 'red' },
                      { name: 'Node.js', icon: '🟢', level: 87, color: 'green' },
                      { name: 'Express', icon: '🚂', level: 85, color: 'gray' },
                      { name: 'MongoDB', icon: '🍃', level: 83, color: 'green' },
                    ].map((tech, index) => (
                      <div
                        key={index}
                        className="group/tech relative bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-yellow-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <span className="font-medium text-white text-sm">{tech.name}</span>
                          </div>
                          <div className="text-yellow-400 font-bold text-sm">{tech.level}%</div>
                        </div>

                        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-1000"
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Others Card */}
            <div className="group relative">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-green-500/30 transition-all duration-500 overflow-hidden">
                {/* Card Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-green-300">🛠️</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Tools & Others</h3>
                        <p className="text-gray-400 text-sm">Development & Deployment Tools</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-green-500/10 rounded-full">
                      <span className="text-green-400 text-sm font-medium">9 Technologies</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-sm">Mastery Level</span>
                      <span className="text-green-400 text-sm font-medium">88%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                        style={{ width: '88%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Tech Grid - Enhanced with Icons */}
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Git', icon: '📁', level: 90, color: 'orange' },
                      { name: 'GitHub', icon: '🐙', level: 92, color: 'gray' },
                      { name: 'VS Code', icon: '💻', level: 95, color: 'blue' },
                      { name: 'Postman', icon: '📬', level: 85, color: 'orange' },
                      { name: 'Figma', icon: '🎨', level: 80, color: 'pink' },
                      { name: 'Vercel', icon: '▲', level: 88, color: 'black' },
                      { name: 'Netlify', icon: '🌐', level: 85, color: 'green' },
                      { name: 'NPM', icon: '📦', level: 90, color: 'red' },
                      { name: 'Vite', icon: '⚡', level: 87, color: 'yellow' },
                    ].map((tech, index) => (
                      <div
                        key={index}
                        className="group/tech relative bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <span className="font-medium text-white text-sm">{tech.name}</span>
                          </div>
                          <div className="text-green-400 font-bold text-sm">{tech.level}%</div>
                        </div>

                        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Programming Languages Card */}
            <div className="group relative">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
                {/* Card Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-purple-300">💻</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Programming Languages</h3>
                        <p className="text-gray-400 text-sm">Languages I code in</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-purple-500/10 rounded-full">
                      <span className="text-purple-400 text-sm font-medium">4 Languages</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-sm">Mastery Level</span>
                      <span className="text-purple-400 text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Tech Grid - Enhanced with Icons */}
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'C++', icon: '⚡', level: 90, color: 'blue' },
                      { name: 'JavaScript', icon: '🟨', level: 90, color: 'yellow' },
                      { name: 'Python', icon: '🐍', level: 75, color: 'green' },
                      { name: 'TypeScript', icon: '🔷', level: 75, color: 'blue' },
                    ].map((tech, index) => (
                      <div
                        key={index}
                        className="group/tech relative bg-white/5 hover:bg-white/10 rounded-xl p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-3">{tech.icon}</div>
                          <div className="text-xl font-bold text-white mb-2">{tech.name}</div>
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${i < Math.floor(tech.level / 20) ? `bg-${tech.color}-400` : 'bg-white/10'}`}
                                ></div>
                              ))}
                            </div>
                            <span className={`text-${tech.color}-400 font-medium`}>{tech.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r from-${tech.color}-500 to-${tech.color}-400 transition-all duration-1000`}
                              style={{ width: `${tech.level}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stats Summary */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'JS Technologies', value: '7', color: 'yellow', icon: '🟨' },
              { label: 'Tools & Others', value: '9', color: 'green', icon: '🛠️' },
              { label: 'Languages', value: '4', color: 'purple', icon: '💻' },
              { label: 'Total Stack', value: '20+', color: 'blue', icon: '🧩' },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-3xl ${stat.color === 'yellow' ? 'text-yellow-400' :
                      stat.color === 'green' ? 'text-green-400' :
                        stat.color === 'purple' ? 'text-purple-400' :
                          'text-blue-400'
                    }`}>
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold ${stat.color === 'yellow' ? 'text-yellow-400' :
                      stat.color === 'green' ? 'text-green-400' :
                        stat.color === 'purple' ? 'text-purple-400' :
                          'text-blue-400'
                    }`}>
                    {stat.value}
                  </div>
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute top-1/4 left-5 animate-float opacity-30">
            <span className="text-4xl">⚛️</span>
          </div>
          <div className="absolute top-1/3 right-10 animate-float-delayed opacity-30">
            <span className="text-4xl">🐳</span>
          </div>
          <div className="absolute bottom-1/4 left-20 animate-float-slow opacity-30">
            <span className="text-4xl">🛠️</span>
          </div>
        </div>
      </section>


      {/* CP Stats with Links */}
      <section id="cp-stats" className="py-20 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Coding Profiles
              </span>
            </h2>

            <p className="text-gray-400 max-w-md mx-auto">
              Connect with me on competitive programming platforms
            </p>
          </div>

          {/* Platform Cards with Links */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Codeforces */}
            <a
              href="https://codeforces.com/profile/kabir_hossain"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-gradient-to-br from-blue-900/10 to-blue-900/5 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold">CF</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Codeforces</h3>
                      <div className="text-sm text-blue-400">@kabir_hossain</div>
                    </div>
                  </div>
                  <div className="text-blue-400 group-hover:translate-x-1 transition-transform duration-300">→</div>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-400 text-sm">Current Rating</div>
                      <div className="text-blue-400 font-bold text-lg">1074</div>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[28%] h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Max: 1074 (Newbie)</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-400 text-sm">Problems Solved</div>
                      <div className="text-green-400 font-bold text-lg">179</div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 flex-1 rounded-sm bg-blue-500/30 group-hover:bg-blue-500/50 transition-all duration-300"
                          style={{ opacity: 0.3 + (i * 0.07) }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">132 solved last year</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
                  <div className="text-sm text-gray-400">Registered: 15 months ago</div>
                  <div className="text-sm text-blue-400">Visit Profile</div>
                </div>
              </div>
            </a>

            {/* LeetCode */}
            <a
              href="https://leetcode.com/u/kabirhossain/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-gradient-to-br from-yellow-900/10 to-yellow-900/5 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-400 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold">LC</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">LeetCode</h3>
                      <div className="text-sm text-yellow-400">@kabirhossain</div>
                    </div>
                  </div>
                  <div className="text-yellow-400 group-hover:translate-x-1 transition-transform duration-300">→</div>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-400 text-sm">Problems Solved</div>
                      <div className="text-yellow-400 font-bold text-lg">36/801</div>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[4.5%] h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-400 text-sm">Recent Activity</div>
                      <div className="text-green-400 font-bold text-lg">38</div>
                    </div>
                    <div className="text-sm text-gray-400">Submissions in past year</div>
                    <div className="flex gap-1 mt-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 flex-1 rounded-sm bg-yellow-500/30 group-hover:bg-yellow-500/50 transition-all duration-300"
                          style={{ opacity: 0.3 + (i * 0.07) }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
                  <div className="text-sm text-gray-400">0 problems this month</div>
                  <div className="text-sm text-yellow-400">Visit Profile</div>
                </div>
              </div>
            </a>

            {/* CodeChef */}
            <a
              href="https://www.codechef.com/users/happy_resin_95"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-gradient-to-br from-red-900/10 to-red-900/5 rounded-xl p-6 border border-red-500/20 hover:border-red-400 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold">CC</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">CodeChef</h3>
                      <div className="text-sm text-red-400">@happy_rein_95</div>
                    </div>
                  </div>
                  <div className="text-red-400 group-hover:translate-x-1 transition-transform duration-300">→</div>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-400 text-sm">Current Rating</div>
                      <div className="text-red-400 font-bold text-lg">1064</div>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[27%] h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Highest: 1064 (Div 4)</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-400 text-sm">Global Rank</div>
                      <div className="text-green-400 font-bold text-lg">#119,244</div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 flex-1 rounded-sm bg-red-500/30 group-hover:bg-red-500/50 transition-all duration-300"
                          style={{ opacity: 0.3 + (i * 0.07) }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Country Rank: #3,174</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
                  <div className="text-sm text-gray-400">From Bangladesh</div>
                  <div className="text-sm text-red-400">Visit Profile</div>
                </div>
              </div>
            </a>
          </div>

          {/* Total Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '215+', label: 'Total Problems', icon: '🧠', color: 'blue' },
              { value: '8', label: 'Max Streak', icon: '🔥', color: 'orange' },
              { value: '15+', label: 'Contests', icon: '🏆', color: 'purple' },
              { value: '3,174', label: 'Country Rank', icon: '🇧🇩', color: 'green' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color === 'blue' ? 'text-blue-400' :
                    stat.color === 'orange' ? 'text-orange-400' :
                      stat.color === 'purple' ? 'text-purple-400' : 'text-green-400'
                  }`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Personal Info Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <span className="text-gray-400 text-sm">📍 Bangladesh | 🎓 Student</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">
              Actively participating in competitive programming for 15+ months.
              Consistently solving problems across multiple platforms with 8 days max streak.
              Focused on improving algorithmic thinking and problem-solving skills.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section - Simple & Unique Design */}
      <section id="projects" className="py-5 md:py-5 px-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>

        <div className="max-w-6xl mx-auto relative">
          {/* Section Header with Minimalist Design */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-blue-500 rounded-full"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Featured <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Projects
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Real-world applications built with modern technologies
            </p>
          </div>

          {/* Projects Grid - Clean Card Design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative"
                onClick={() => setSelectedProject(project)}
              >
                {/* Card with Subtle Gradient Border */}
                <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 h-full">

                  {/* Project Image with Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Tech Count Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full border border-white/20">
                        <Code className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-300">{project.tech.length} techs</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-5">
                    {/* Title & Tagline */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {project.name}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                      <p className="text-blue-400 text-sm font-medium">{project.tagline}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                      {project.shortDesc}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/10 group-hover:border-blue-500/30 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-3 py-1.5 bg-white/3 rounded-lg text-xs text-gray-400">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2 group/view">
                        <span>Explore</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5 transition-transform duration-300" />
                      </button>

                      <div className="flex gap-2">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group/github"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4 text-gray-400 group-hover/github:text-white transition-colors duration-300" />
                        </a>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group/live"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover/live:text-green-400 transition-colors duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all duration-300 group cursor-pointer">
              <span className="text-gray-300 group-hover:text-white">View All Projects</span>
              <ChevronDown className="w-4 h-4 text-blue-400 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal - Clean Split Layout */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-black animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Visual */}
              <div className="lg:w-2/5 relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/70 lg:to-transparent"></div>

                {/* Project Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.name}</h3>
                  <p className="text-blue-400 text-sm">{selectedProject.tagline}</p>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto">
                <div className="space-y-8">
                  {/* About Project */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white">About Project</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.fullDesc}</p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Key Features</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-pink-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Technologies Used</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Improvements */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <Target className="w-3 h-3 text-red-400" />
                        </div>
                        <h5 className="font-semibold text-white">Challenges</h5>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.challenges}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Rocket className="w-3 h-3 text-green-400" />
                        </div>
                        <h5 className="font-semibold text-white">Future Plans</h5>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.improvements}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 group"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 border border-white/20 hover:border-blue-500"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section with EmailJS Integration */}
      <section id="contact" className="py-20 md:py-24 px-4 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-float opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[90px] animate-float-delayed opacity-30"></div>
          <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-pink-500/10 rounded-full blur-[80px] animate-float-slow opacity-25"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Animated Section Header */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
              <div className="relative px-8 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-blue-400 font-medium text-sm md:text-base flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                  CONTACT
                </span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient bg-[length:200%_200%]">
                  Connect
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span>
              </span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Got a project in mind? Let's turn your ideas into reality!
            </p>
          </div>

          {/* Contact Grid with Floating Cards */}
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              {/* Contact Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    value: 'nerob2308@gmail.com',
                    link: 'mailto:nerob2308@gmail.com',
                    color: 'blue',
                    gradient: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    value: '+880 1856 846615',
                    link: 'tel:+8801856846615',
                    color: 'purple',
                    gradient: 'from-purple-500 to-purple-600'
                  },
                  {
                    icon: MessageCircle,
                    title: 'WhatsApp',
                    value: '+880 1856 846615',
                    link: 'https://wa.me/8801856846615',
                    color: 'green',
                    gradient: 'from-green-500 to-green-600'
                  },
                  {
                    icon: MapPin,
                    title: 'Location',
                    value: 'Feni, Bangladesh',
                    color: 'pink',
                    gradient: 'from-pink-500 to-pink-600'
                  }
                ].map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    target={method.link ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 p-5 transition-all duration-500 hover:border-${method.color}-500/50 hover:shadow-2xl hover:shadow-${method.color}-500/20 overflow-hidden`}
                  >
                    {/* Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Content */}
                    <div className="relative flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className={`w-6 h-6 text-${method.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">{method.title}</p>
                        <p className={`text-white text-base font-medium group-hover:text-${method.color}-400 transition-colors duration-300`}>
                          {method.value}
                        </p>
                      </div>
                      {method.link && (
                        <ArrowUpRight className={`w-5 h-5 text-${method.color}-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`} />
                      )}
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Connect Section */}
              <div className="bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Quick Connect
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Prefer direct messaging? Connect with me on these platforms:
                </p>

                <div className="flex gap-4">
                  {[
                    {
                      icon: Github,
                      label: 'GitHub',
                      link: 'https://github.com/nerobkabir',
                      color: 'gray',
                      hover: 'hover:bg-gray-800',
                      gradient: 'from-gray-800 to-gray-900'
                    },
                    {
                      icon: Linkedin,
                      label: 'LinkedIn',
                      link: 'https://www.linkedin.com/in/kabir-hossain123',
                      color: 'blue',
                      hover: 'hover:bg-blue-700',
                      gradient: 'from-blue-700 to-blue-800'
                    },
                    {
                      icon: MessageCircle,
                      label: 'Messenger',
                      link: 'https://m.me/...', // Add your Facebook Messenger link
                      color: 'blue',
                      hover: 'hover:bg-blue-600',
                      gradient: 'from-blue-600 to-blue-700'
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative flex-1 min-w-[100px] p-4 rounded-xl border border-white/10 ${social.hover} transition-all duration-300 hover:scale-105`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex flex-col items-center gap-2">
                        <social.icon className={`w-6 h-6 text-${social.color}-400 group-hover:text-white transition-colors duration-300`} />
                        <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">
                          {social.label}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time Indicator */}
              <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-400 font-medium">Response Time</span>
                  <span className="text-sm text-gray-400">Usually within hours</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  ⚡ Super responsive for project inquiries and collaborations
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative">
              {/* Floating Form Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-blue-500/10">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                <h3 className="text-2xl font-bold text-white mb-2">Send me a message</h3>
                <p className="text-gray-400 mb-8">Fill out the form below and I'll get back to you soon</p>

                <form
                  id="contact-form"
                  onSubmit={(e) => handleFormSubmit(e)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></div>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-pink-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10"
                      placeholder="Project Inquiry / Collaboration"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                      Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-green-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10 resize-none"
                      placeholder="Hello Kabir, I'd like to discuss a project with you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <span className="text-green-400 text-sm">✓</span>
                        </div>
                        <div>
                          <p className="text-green-400 font-medium">Message sent successfully!</p>
                          <p className="text-green-400/70 text-sm">I'll get back to you within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <span className="text-red-400 text-sm">✕</span>
                        </div>
                        <div>
                          <p className="text-red-400 font-medium">Failed to send message</p>
                          <p className="text-red-400/70 text-sm">Please try again or contact me directly</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 group relative overflow-hidden ${formStatus === 'sending'
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02]'
                      }`}
                  >
                    {formStatus === 'sending' ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Mail className="w-5 h-5" />
                          Send Message
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </>
                    )}
                  </button>

                  <p className="text-gray-500 text-sm text-center">
                    Your information is secure. I respect your privacy and won't share your details.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>

        {/* Animated Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 via-purple-500 via-pink-500 to-transparent animate-gradient bg-[length:200%_200%]"></div>

        <div className="relative py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
              {/* Logo & Description */}
              <div className="text-center lg:text-left">
                <div className="relative group mb-4">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {'<KH/>'}
                  </div>
                </div>

                <p className="text-gray-400 text-lg max-w-md">
                  Building digital experiences with code, creativity & coffee
                </p>

                <div className="flex items-center gap-3 mt-4 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 text-sm">Available for projects</span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                  <ul className="space-y-3">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => scrollToSection(item.href)}
                          className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Connect</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://github.com/nerobkabir" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/kabir-hossain123" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a href="mailto:nerob2308@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Projects</h4>
                  <ul className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <li key={project.id}>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm text-left"
                        >
                          {project.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Links & Back to Top */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/10">
              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/nerobkabir', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/kabir-hossain123', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:nerob2308@gmail.com', label: 'Email' },
                  { icon: MessageCircle, href: 'https://wa.me/8801856846615', label: 'WhatsApp' },
                  { icon: Trophy, href: 'https://codeforces.com/profile/kabir_hossain', label: 'Codeforces' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300">
                      <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Kabir Hossain. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Crafted with React, Tailwind CSS & lots of inspiration
                </p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <span className="text-gray-400 group-hover:text-white text-sm">Back to Top</span>
                <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-10 pt-8 border-t border-white/10">
              {[
                'React.js',
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Node.js',
                'MongoDB',
                'Firebase',
                'Git'
              ].map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(-15px);
          }
          66% {
            transform: translateY(15px) translateX(15px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-25px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-25px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: var(--skill-width);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 4s ease infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 9s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-twinkle {
          animation: twinkle 5s ease-in-out infinite;
        }
        
        .animate-expandWidth {
          animation: expandWidth 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;