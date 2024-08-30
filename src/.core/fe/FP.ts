export const zip = <T, U>(arr1: readonly T[], arr2: readonly U[]) => {
  const arr = Array.from({ length: Math.max(arr1.length, arr2.length) });

  return arr.reduce((acc: (T | U)[][], _, i) => [...acc, [arr1[i], arr2[i]]], []);
};
