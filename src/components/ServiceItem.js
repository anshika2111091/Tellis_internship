

const ServiceItem = ({item}) => {
  return (
    <>
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
            </>
  )
}

export default ServiceItem
