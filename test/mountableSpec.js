import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react/lib/ReactTestUtils';
import mountable from '../src/mountable';
import { isChainableAndNullOK } from './helpers.js';

describe('mountable', () => {
  function validate(prop) {
    return mountable({ p: prop }, 'p', 'Component');
  }

  isChainableAndNullOK(mountable);

  it('Should return error with non mountable values', () => {
    const err = validate({});
    assert.instanceOf(err, Error);
    assert.include(err.message, 'expected a DOM element or an object that has a `render` method');
  });

  it('Should return undefined with mountable values', () => {
    assert.isNull(validate(document.createElement('div')));
    assert.isNull(validate(document.body));
    assert.isNull(validate(ReactTestUtils.renderIntoDocument(<div />)));
  });
});
