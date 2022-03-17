/* eslint-disable @typescript-eslint/no-explicit-any */
export function areMapsTheSame(
  map1: Map<string, any>,
  map2: Map<string, any>
): boolean {
  let testVal;
  let areTheSame = true;
  if (map1.size !== map2.size) {
    return false;
  }
  map1.forEach((value, key) => {
    testVal = map2.get(key);
    // in cases of an undefined value, make sure the key
    // actually exists on the object so there are no false positives
    if (testVal !== value || (testVal === undefined && !map2.has(key))) {
      areTheSame = false;
    }
  });
  return areTheSame;
}
