export function errMsg(props, propName, componentName, msgContinuation) {
  return `Invalid prop '${propName}' of value '${props[propName]}'` +
    ` supplied to '${componentName}'${msgContinuation}`;
}

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
export function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName) {
    const name = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          `Required prop '${propName}' was not specified in '${name}'.`
        );
      }
    } else {
      return validate(props, propName, name);
    }
    return null;
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
