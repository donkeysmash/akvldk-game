import shuffle from 'fisher-yates-shuffle';

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
export function genRandomIndicies(size: number): number[] {
  let result = [];
  if (size === 0) {
    return result;
  }
  for (let i = 0; i < size; i++) {
    result.push(i);
  }
  return shuffle(result);
}