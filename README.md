# React Query

## Summary

`서버 상태를 관리하기 위한 라이브러리`

## 특징

다른 상태관리 라이브러리(Redux, Zustand, Recoil) 등이 있음에도 React Query를 사용해야 하는 이유?

> 비동기 및 서버 상태 관리에 적합한 상태 관리의 필요성

### 서버 상태

- 클라이언트에서 제어되지 않는 위치에서 관리
- 데이터 fetch, update를 위해 비동기 API 필요
- 소유권이 공유되기 때문에, 사용자가 모르는 사이에 다른 사용자에 의해 데이터가 변경 가능
- out of date가 발생 가능성

### 서버 상태에서 발생하는 문제

- 캐싱
- 동일한 데이터 요청 중복 제거
- out of date 시점 확인 필요
- out of date 된 데이터를 백그라운드에서 업데이트
- pagination, lazy loading 등 성능 최적화
  서버 상태 메모리, GC 관리 등

### stale-while-revalidate

- HTTP 캐싱에 사용
- React Query에서도 사용되는 매커니즘

**캐싱된 데이터를 사용자에게 제공, 비동기적으로 컨텐츠를 서버에서 revalidate**

#### 캐싱 여부에 따른 데이터 전달

1. 캐싱되지 않은 경우: user > loading > data fetch
2. 캐싱된 경우: user > cached data > data fetch

## 사용법

### QueryClient

- 모든 쿼리에 대한 상태, 캐시를 가지고 있는 클래스
- QueryClientProvider로 컴포넌트를 감싸면 하위 컴포넌트에서 QueryClient에 접근 가능

```tsx
const queryClient = new QueryClient();

function App() {
  <QueryClientProvider client={queryClient}>
    <Todos />
  </QueryClientProvider>;
}
```

```tsx
export const queryClient = new QueryClient({
  defaultOptions: {  // 전역 옵션 설정
    // 주요 개념 1: queries
    queries: {
      staleTime: 1000*60,
      retry: 1,
    }
    // 주요 개념 2: mutation
    mutations: {
      retry: 1,
    }
  }
})
```

### 1. Queries

서버에서 데이터를 받아올 때 사용하는 기능

```tsx
import { useQuery } from "@tanstack/react-query";

const query = useQuery({
  queryKey: ["todo"], // 'todo'라는 key로 mapping
  queryFn: fetchTodo, // promise를 반환하는 함수(fetch, axios 등)
});
```

#### Queries Options

- enabled: 자동으로 query 실행 여부
- retry: query 동작 실패 시 자동으로 몇번 만큼 재시도할 지 설정하는 옵션
- select: response 값에서 필요한 값만을 추출할 수 있도록 하는 옵션
  ```tsx
  {select: data => {id: data.id, data: data.data}}
  ```
- refetchInterval: 주기적으로 refetch하는 간결 설정 옵션
- throwOnError: error boundary로 에러를 전파할 지 결정하는 옵션

#### Query Returns

- data: 마지막으로 resolved된 (최신) 데이터
- error: 에러가 발생했을 때 반환하는 에러 객체
- isLoading: 최초의 fetch가 in-flight 상태일 때 true 반환
- isFetching; fetchi가 실행될 때마다 true 반환

### 2. Mutations

서버의 데이터를 수정할 때 사용

```tsx
import { useMutation } from "@tanstack/react-qeury";

const query = useMutation({
  queryFn: fetchTodo,
});
```

#### Mutations Options

- onMutate: mutate 함수가 실행되기 전에 실행되는 함수, optimistic update(좋아요 기능 등)에 사용

#### Mutations Returns

- mutate: mutation 함수를 실행시키는 함수

### useSuspenseQuery

React의 Suspense for Data Fetching API(데이터를 불러오는 동안 fallback UI를 대신 보여주는 기능)을 사용하기 위한 hook

- v5로 버전 업 되면서 이전 버전과 약간의 사용법이 달라짐: 필요 시 검색 할 것

### React Query의 데이터 저장 방법

`Context API`를 사용하기 때문에 queryClient에서 관리되는 데이터를 전역적으로 사용 가능

useQuery가 실행되면 생성된 Query 인스턴스와 함께 key값으로 mapping을 진행, 이후에 fetch된 데이터를 query 객체 내부에 저장한다

context를 사용했기 때문에 저장된 캐시값은 다른 컴포넌트에서도 사용할 수 있다
