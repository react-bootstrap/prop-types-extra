import React from 'react';
import { isValidElementType } from 'react-is';

import createChainableTypeChecker from './utils/createChainableTypeChecker';


function elementType(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];

  if (React.isValidElement(propValue)) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of type ReactElement ` +
      `supplied to \`${componentName}\`,expected an element type (a string ` +
      ', component class, or function component).'
    );
  }

  if (!isValidElementType(propValue)) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      ', component class, or function component).'
    );
  }

  return null;
}

export default createChainableTypeChecker(elementType);
