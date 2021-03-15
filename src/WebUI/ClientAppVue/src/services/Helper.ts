export default function checkForEmptyObject(value: object): boolean {
  return Object.keys(value).length === 0;
}
