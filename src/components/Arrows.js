

const Arrows = ({scrollRight,scrollLeft}) => {
  return (
    <div className='arrows'>
    <button className='left-arrow' onClick={scrollLeft}>&lt;</button>
    <button className='right-arrow' onClick={scrollRight}>&gt;</button>
  </div>
  )
}

export default Arrows
