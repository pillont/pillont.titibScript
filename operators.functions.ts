import { combineLatest, forkJoin, Observable, ObservableInput, ObservedValueOf, of, partition, UnaryFunction } from "rxjs";
import { map, mergeMap, shareReplay } from "rxjs/operators";
import { checkUndefined, isEmptyArray } from "./validation.functions";

/**
 * operator to map an array
 * @param expression : apply to each elements of the array
 *
 * EXAMPLE :
 * of(['a','b','c']).pipe(
 *     mapArray(str => str.toUpperCase())
 * )
 * ==> ['A','B','C']
 */
export function mapArray<T, U>(expression: (val: T) => U)
  : UnaryFunction<Observable<T[]>, Observable<U[]>> {
  return (values$): Observable<U[]> => {
    return values$.pipe(
      map(array => array?.map(value => expression(value)) ?? []),
    );
  };
}

/**
 * operator to map an array
 * @param expressionAsync : apply to each elements of the array
 *
 * EXAMPLE :
 * of(['a','b','c']).pipe(
 *     mapArray(async str => str.toUpperCase())
 * )
 * ==> ['A','B','C']
 */
export function mergeMapArray<T, U>(expressionAsync: (val: T) => Promise<U>)
  : UnaryFunction<Observable<T[]>, Observable<U[]>> {
  return (values$): Observable<U[]> =>
    values$.pipe(
      this.mapArray(value => expressionAsync(value)),
      mergeMap(array => forkJoin(array)),
    );
}

/**
 * partition without multi subscription
 */
export function safePartition<T>(
  source$: Observable<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: unknown
): [Observable<T>, Observable<T>] {
  const safeSource$ = shareObs(source$);
  return partition(safeSource$, predicate, thisArg);
}

/**
 * forkJoin without empty source mistake
 */
export function safeForkJoin<T>(
  sources$: Observable<T>[]
): Observable<T[]> {
  if (sources$.some(obs => checkUndefined(obs)))
    throw new Error("null observable in forkJoin !");

  if (isEmptyArray(sources$))
    return of([]);

  return forkJoin(sources$);
}

/**
 * combineLatest without empty source mistake
 */
export function safeCombineLatest<O extends ObservableInput<unknown>>(
  sources$: O[]
): Observable<ObservedValueOf<O>[]> {
  if (sources$.some(obs => checkUndefined(obs)))
    throw new Error("null observable in combineLastest !");

  if (isEmptyArray(sources$))
    return of([]);

  return combineLatest(sources$);
}

/**
 * apply shareReplay(1)
 */
export function shareObs<T>(
  source$: Observable<T>
): Observable<T> {
  return source$.pipe(
    shareReplay(1),
  );
}
