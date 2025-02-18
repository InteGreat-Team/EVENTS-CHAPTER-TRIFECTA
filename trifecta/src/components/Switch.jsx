import React, { forwardRef } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { lighten } from 'polished';

const Switch = forwardRef((props, ref) => {
  // Lighten by 50%
  const lighterColor = lighten(0.2, props.color1 || '#FF0000');

  return (
    <label className="cursor-pointer">
      <input type="checkbox" className="hidden" ref={ref} {...props} />
      <div
        style={{
          width: '3.5rem',
          height: '2rem',
          backgroundColor: props.checked ? props.color1 : lighterColor,
          borderRadius: '1rem',
          display: 'flex',
          justifyContent: props.checked ? 'flex-end' : 'flex-start', // Move to right if checked, left if unchecked
          alignItems: 'center',
          padding: '0.1rem', // Reduce padding for the sliding effect
          transition: 'background-color 0.3s ease-in-out' // Apply transition only for background-color
        }}
      >
        <div style={{
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          transform: props.checked ? 'translateX(0rem)' : 'translateX(0)', // Move to right if checked, left if unchecked
          transition: 'transform 0.3s ease-in-out' // Apply transition for transform property
        }}>
          {props.checked ? <FaCheck size={20} /> : <FaTimes size={20} />}
        </div>
      </div>
    </label>
  );
});

export default Switch;
