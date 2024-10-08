import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavLinks from './components/NavLinks';
import Heading from './components/Heading';
import Services from './components/Services';
import Arrows from './components/Arrows';

function App() {
  const [data, setData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const observerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(null); 

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data.services))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.mainsection');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          
          const link = document.querySelector(`a[href="#${sectionId}"]`);
          const linkRect = link.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          
          if (linkRect.left < navRect.left) {
            setScrollDirection('left');
          } else if (linkRect.right > navRect.right) {
            setScrollDirection('right');
          }
        }
      });
    }, options);

    sections.forEach(section => {
      observerRef.current.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observerRef.current.unobserve(section);
      });
    };
  }, [data]);

  const handleLinkClick = (sectionId) => {
    observerRef.current.disconnect();  // Temporarily disable the observer
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
    setTimeout(() => {
      const sections = document.querySelectorAll('.mainsection');
      sections.forEach(section => {
        observerRef.current.observe(section);
      });
    }, 1000); // Re-enable observer after scrolling completes
  };

  useEffect(() => {
    if (scrollDirection) {
      const scrollAmount = scrollDirection === 'left' ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollDirection(null); 
    }
  }, [scrollDirection]);

  const scrollLeft = () => {
    navRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    navRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className='app'>
      <div className='fixed'>
       <Heading/>
        <div className='navbar'>
          <nav className='nav' ref={navRef}>
          <NavLinks data={data} activeSection={activeSection} onLinkClick={handleLinkClick}/>
          </nav>
        <Arrows scrollRight={scrollRight} scrollLeft={scrollLeft}/>
        </div>
      </div>
    <Services data={data}/>
    </div>
  );
}

export default App;
