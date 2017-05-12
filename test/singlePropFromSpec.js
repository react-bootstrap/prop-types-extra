import singlePropFrom from '../src/singlePropFrom';

describe('singlePropFrom', () => {
  function validate(testProps) {
    return singlePropFrom('children', 'value')(testProps, 'value', 'Component');
  }

  it('Should validate OK if only one listed prop in used', () => {
    const testProps = { value: 5 };

    assert.isNull(validate(testProps));
  });

  it('Should return error if multiple of the listed properties have values', () => {
    const err = validate({ value: 5, children: 5 });
    assert.instanceOf(err, Error);
    assert.include(err.message, 'only one of the following may be provided: value and children');
  });
});
