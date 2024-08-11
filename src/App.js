import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(null); // Track scroll direction

  useEffect(() => {
    fetch('http://localhost:3000/services')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.mainsection');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
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
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [data]);

  useEffect(() => {
    if (scrollDirection) {
      const scrollAmount = scrollDirection === 'left' ? -450 : 450;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollDirection(null); // Reset scroll direction
    }
  }, [scrollDirection]);

  const scrollLeft = () => {
    navRef.current.scrollBy({ left: -450, behavior: 'smooth' });
  };

  const scrollRight = () => {
    navRef.current.scrollBy({ left: 450, behavior: 'smooth' });
  };

  return (
    <div className='app'>
      <div className='fixed'>
        <div className='head'>
          <h1 className='heading'>Select services</h1>
        </div>
        <div className='navbar'>
          <nav className='nav' ref={navRef}>
            <ul className='navlist'>
              {data.length > 0 ? (
                data.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.category.toLowerCase().replace(/ /g, '-')}`}
                      className={activeSection === item.category.toLowerCase().replace(/ /g, '-') ? 'active' : ''}
                    >
                      {item.category}
                    </a>
                  </li>
                ))
              ) : (
                <li>No services available</li>
              )}
            </ul>
          </nav>
          <div className='arrows'>
            <button className='left-arrow' onClick={scrollLeft}>&lt;</button>
            <button className='right-arrow' onClick={scrollRight}>&gt;</button>
          </div>
        </div>
      </div>
      <div className='services'>
        {data.map(item => (
          <section id={item.category.toLowerCase().replace(/ /g, '-')} className='mainsection' key={item.id}>
            <h2 className='sectionheading'>{item.category}</h2>
            {item.items.map((child, index) => (
              <div key={index} className='content'>
                <div className='subcontent'>
                  <h3 className='title'>{child.title}</h3>
                  <p className='duration'>{child.duration}</p>
                  <p className='description'>{child.description}</p>
                  <p className='price'>{child.price || "$85"}</p>
                </div>
                <p className='plus'>+</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export default App;
