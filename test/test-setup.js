/* eslint no-console: 0 */

import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);

global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;

beforeEach(() => {
  sinon.stub(console, 'warn');
});

afterEach(() => {
  if (typeof console.warn.restore === 'function') {
    assert(!console.warn.called, () =>
      `${console.warn.getCall(0).args[0]} \nIn '${this.currentTest.fullTitle()}'`
    );
    console.warn.restore();
  }
});

describe('Process environment for tests', () => {
  it('Should be development for React console warnings', () => {
    assert.notEqual(process.env.NODE_ENV, 'production');
  });
});
