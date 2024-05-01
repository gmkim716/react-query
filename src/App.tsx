import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Example from "./components/example";

// 쿼리 클라이언트 생성
const queryClient = new QueryClient();

export default function App() {
  return (
    // QueryClientProvider로 감싸기
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
