export async function fetchTodos() {
  const res = await fetch('https://api.github.com/repos/TanStack/query');
  if (!res.ok) {
    throw new Error('failed to fetch todos');
  }
  return res.json(); 
}