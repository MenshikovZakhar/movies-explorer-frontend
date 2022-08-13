import React from 'react';
import './MoreButton.css';

const MoreButton = ({ type, children }) => {
  return (
    <section className='more'>
      <button className="more__button" type={type}>
        {children}
      </button>
    </section>
  );
}

export default MoreButton;