import React from 'react';
import elementType from '../src/elementType';
import { isChainableAndUndefinedOK } from './helpers.js';

describe('elementType', () => {
  function validate(prop) {
    return elementType({ p: prop }, 'p', 'TestComponent');
  }

  isChainableAndUndefinedOK(elementType);

  it('Should validate OK with elementType values', () => {
    assert.isNull(validate('span'));
    assert.isNull(validate(() => {}));
  });

  it('Should return error with not a string or function values', () => {
    const err = validate({});
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Expected an Element `type` such as a tag name or return value of React.createClass(...)');
  });

  it('Should return error with react element', () => {
    const err = validate(React.createElement('span'));
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Expected an Element `type`, not an actual Element');
  });
});
