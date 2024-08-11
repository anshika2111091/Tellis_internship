import React from 'react'

const NavLinks = ({data,activeSection}) => {
  return (
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
  )
}

export default NavLinks
