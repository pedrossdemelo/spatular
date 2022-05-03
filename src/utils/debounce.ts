export default function debounce(
  callback: (...args: any[]) => any,
  delay: number,
) {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
}
