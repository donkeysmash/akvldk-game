/**
 * start <= target < end
 * @param target
 * @param start inclusive
 * @param end exclusive
 */
export function withinRange(target: number, start: number, end: number): boolean {
  if (target >= start && target < end) {
    return true;
  } else {
    return false;
  }
}

/**
 * returns randomized number sequence starting at 0
 * @param size size of the array
 */
export function genRandomIndices(size: number): number[] {
  let result = [];
  if (size === 0) {
    return result;
  }
  for (let i = 0; i < size; i++) {
    result.push(i);
  }
  return fyShuffle(result);
}

/**
 * returns a new array with shuffled order
 * @param arr to be shuffled reference
 * @param random seed
 */
export function fyShuffle<T>(arr: Array<T>, random = Math.random): Array<T> {
  let length = arr.length;
  let clone = arr.slice(0);
  let shuffled = [];

  while(length--) {
    shuffled.push(clone.splice(Math.floor(random() * length), 1).shift());
  }

  return shuffled;
}