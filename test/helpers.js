export function isChainableAndNullOK(validatorUnderTest) {
  it('Should validate OK with undefined or null values', () => {
    assert.isNull(validatorUnderTest({}, 'p', 'Component'));
    assert.isNull(validatorUnderTest({ p: null }, 'p', 'Component'));
  });

  it('Should be able to chain', () => {
    const err = validatorUnderTest.isRequired({}, 'p', 'Component');
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Required prop');
    assert.include(err.message, 'was not specified in');
  });
}
