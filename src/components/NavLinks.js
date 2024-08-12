import React from 'react'

const NavLinks = ({data,activeSection}) => {
   const handleClick = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth', block: 'start'  });
  };
  return (
    <ul className='navlist'>
    {data.length > 0 ? (
      data.map((item) => {
        const sectionId = item.category.toLowerCase().replace(/ /g, '-');
       return <li key={item.id}>
          <a
            href={`#${item.category.toLowerCase().replace(/ /g, '-')}`}
            className={activeSection === item.category.toLowerCase().replace(/ /g, '-') ? 'active' : ''}
            onClick={() => handleClick(sectionId)}
          >
            {item.category}
          </a>
        </li>
})
    ) : (
      <li>No services available</li>
    )}
  </ul>
  )
}

export default NavLinks
