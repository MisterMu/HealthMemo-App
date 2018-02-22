export function findSum (arr) {
  let tmp = 0;
  arr.map((item) => {
    tmp += item;
  });
  return tmp;
}

export function findMean (arr) {
  return findSum(arr) / arr.length; 
}