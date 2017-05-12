/* eslint no-console: 0 */
import React from 'react';
import deprecated from '../src/deprecated';

export function shouldError(about) {
  console.error.called.should.be.true();
  console.error.calledWithMatch(about).should.be.true();
  console.error.reset();
}

describe('deprecated', () => {
  beforeEach(() => {
    deprecated._resetWarned(); // eslint-disable-line no-underscore-dangle

    // because 'warning' package uses console.error instead of console.warn
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  function validate(prop) {
    return deprecated(React.PropTypes.string, 'Read more at link')({ pName: prop }, 'pName', 'ComponentName');
  }

  it('should warn about deprecation and validate OK', () => {
    const err = validate('value');
    shouldError('"pName" property of "ComponentName" has been deprecated.\nRead more at link');
    assert.notInstanceOf(err, Error);
  });

  it('should warn about deprecation and throw validation error when property value is not OK', () => {
    const err = validate({});
    shouldError('"pName" property of "ComponentName" has been deprecated.\nRead more at link');
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Invalid undefined `pName` of type `object` supplied to `ComponentName`');
  });

  it('should not emit the same warning more than once', () => {
    validate('value');
    validate('value');
    console.error.should.have.been.calledOnce();
    shouldError('deprecated');
  });
});
