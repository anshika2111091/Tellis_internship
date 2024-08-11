import React from 'react'
import ServiceItem from './ServiceItem';

const Services = ({data}) => {
  return (
    <div className='services'>
        {data.map(item => (
          <section id={item.category.toLowerCase().replace(/ /g, '-')} className='mainsection' key={item.id}>
            <h2 className='sectionheading'>{item.category}</h2>
           <ServiceItem item={item}/>
          </section>
        ))}
      </div>
  )
}

export default Services
