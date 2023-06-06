import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { setUserRepositoriesAction } from './redux/repositories.action';
import type {} from 'redux-thunk/extend-redux';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import RepositoryPage from './components/RepositoryPage/RepositoryPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const userRepositories = useSelector((state: RootState) => state.RepositoriesReducer.userRepositoriesByPages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userRepositories.length) {
      dispatch(setUserRepositoriesAction());
    }
  }, []);
  
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="/repositories/:repositoryId"
        element={<RepositoryPage />}
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
