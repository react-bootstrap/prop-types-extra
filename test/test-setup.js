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
  /* eslint-disable no-console */
  sinon.stub(console, 'error').callsFake((msg) => {
    let expected = false;

    console.error.expected.forEach((about) => {
      if (msg.indexOf(about) !== -1) {
        console.error.warned[about] = true;
        expected = true;
      }
    });

    if (expected) {
      return;
    }

    console.error.threw = true;
    throw new Error(msg);
  });

  console.error.expected = [];
  console.error.warned = Object.create(null);
  console.error.threw = false;
  /* eslint-enable no-console */
});

afterEach(() => {
  /* eslint-disable no-console */
  const { expected, warned, threw } = console.error;
  console.error.restore();

  if (!threw && expected.length) {
    expect(warned).to.have.keys(expected);
  }
  /* eslint-enable no-console */
});
