import { useQuery } from "@tanstack/react-query";

export default function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => {
      return fetch("https://api.github.com/repos/TanStack/query").then(
        (res) => {
          if (!res.ok) {
            throw new Error("failed to fetch todos");
          }
          return res.json();
        }
      );
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
