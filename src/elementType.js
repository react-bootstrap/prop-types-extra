import React from 'react';

import createChainableTypeChecker from './utils/createChainableTypeChecker';

function elementType(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const propType = typeof propValue;
  
  if (React.isValidElement(propValue)) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of type ReactElement ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      'or a ReactClass).'
    );
  }
  
  const isSpecial = propValue && propValue.$$typeof;
  if (propType !== 'function' && propType !== 'string' && !isSpecial) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      ', component class, or function component).'
    );
  }

  return null;
}

export default createChainableTypeChecker(elementType);
