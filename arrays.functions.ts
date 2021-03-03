/**
 * get index of element existing only in left array
 * @param left : array to find except
 * @param other : to compare
 */
export function getLeftExceptIndexes<T>(left: T[], other: T[]): number[] {
  left ??= [];
  other ??= [];

  return left
    .map((val, i) => ({
      value: val,
      index: i,
    }))
    .filter(pair => !existIn(other, pair.value))
    .map(pair => pair.index);
}

/**
 * check if element exist in array
 */
export function existIn<T>(array: T[], value: T): boolean {
  array ??= [];
  return array.indexOf(value) !== -1;
}

/**
 * get elements only existing in one array
 */
export function getExcepts<T>(leftArray: T[], rightArray: T[]): T[] {
  const leftIndexes = getLeftExceptIndexes(leftArray, rightArray);
  const rightIndexes = getLeftExceptIndexes(rightArray, leftArray);

  return leftIndexes.map(i => leftArray[i])
    .concat(rightIndexes.map(i => rightArray[i]));
}
