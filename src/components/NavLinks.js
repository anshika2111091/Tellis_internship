import React from 'react';

const NavLinks = ({ data, activeSection }) => {
  const handleClick = (id, e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    const section = document.getElementById(id);
    if (section) {
      // Calculate the offset if you have a fixed header
      const headerOffset = 180; // Adjust this value according to your header height
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - headerOffset;
  
      // Scroll to the adjusted position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ul className="navlist">
      {data.length > 0 ? (
        data.map((item) => {
          const sectionId = item.category.toLowerCase().replace(/ /g, '-');
          return (
            <li key={item.id}>
              <a
                href={`#${sectionId}`}
                className={activeSection === sectionId ? 'active' : ''}
                onClick={(e) => handleClick(sectionId, e)}
              >
                {item.category}
              </a>
            </li>
          );
        })
      ) : (
        <li>No services available</li>
      )}
    </ul>
  );
};

export default NavLinks;
