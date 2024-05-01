import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todos from './todos';

// 쿼리 클라이언트 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
