export function find(key, ...values) {
  if (values.length === 1) return global.docs.find((doc) => doc[key] === values[0]);

  const results = [];
  for (const value of values) {
    results.push(global.docs.find(doc => doc[key] === value));
  }

  return results;
}
