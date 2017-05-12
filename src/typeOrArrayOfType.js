import React from 'react';

/**
 * Create a propType that matches the provided prop type or an
 * array of that prop type.
 */
export default function typeOrArrayOfType(type) {
  return React.PropTypes.oneOfType([
    type,
    React.PropTypes.arrayOf(type),
  ]);
}
