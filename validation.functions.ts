/**
 * check if is NaN
 */
export function isNaN(obj: unknown): boolean {
  return !isNumber(obj);
}

/**
 * check if is empty array
 */
export function isEmptyArray<T>(array: readonly T[]): boolean {
  if (checkUndefined(array))
    return true;

  return array.length < 1;
}

/**
 * check if is number
 */
export function isNumber(obj: unknown): obj is number {
  if (checkUndefined(obj))
    return false;

  // NOTE : null return 0
  //        it's why we check it before !
  return !isNaN(Number(obj));
}

/**
 * check if the value is a string
 *
 * Exemple :
 * '12' => true
 *  12  => false
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * check is the value is null or undefined
 */
export function checkUndefined(obj: unknown): obj is null | undefined {
  return obj === undefined
    || obj === null;
}


export function isDefinedArgumentOrThrow(arg: unknown): arg is null {
  if (checkUndefined(arg))
    throw new Error("null parameter");

  return true;
}
