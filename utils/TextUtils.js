export function concatAsCSV(arr) {
  // Use Array.filter() to remove null and emply string
  const filteredArray = arr.filter((str) => str !== null && str !== "");
  // Use Array.join() method with a comma as the separator
  const csvString = filteredArray.join(", ");
  return csvString;
}
