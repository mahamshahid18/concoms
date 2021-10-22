import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { CompanyList } from '../modules/company-list';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CompanyList />
    </QueryClientProvider>
  );
}

export default App;
