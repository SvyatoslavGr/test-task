import React, { useEffect, useState } from 'react'
import './App.css'
import SearchInput from './components/SearchInput'
import { useDispatch } from 'react-redux'
import { setUserRepositoriesAction } from './redux/repositories.action';
import type {} from 'redux-thunk/extend-redux';
import RepositoryList from './components/RepositoryList';
import Paginator from './components/Paginator';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import RepositoryPage from './components/RepositoryPage';

function App() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [value, setValue] = useState('');
  // const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserRepositoriesAction());
  
    // return () => {
    //   second
    // }
  }, []);
  

  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      />
      <Route
        path='/repositories/:repositoryId'
        element={<RepositoryPage />}
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  )
}

export default App
