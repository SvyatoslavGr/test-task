import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Repository } from '../types/repositories';
import Spinner from './Spinner';
import { NavLink } from 'react-router-dom';

interface RepositoryListProps {
  currentPage: number;
  searchValue: string
}

function RepositoryList({ currentPage, searchValue }: RepositoryListProps) {
  const userRepositories = useSelector((state: RootState) => state.RepositoriesReducer.userRepositoriesByPages);
  const searchedRepositories = useSelector((state: RootState) => state.RepositoriesReducer.searchedRepositoriesByPages);
  const isLoading = useSelector(((state: RootState) => state.RepositoriesReducer.loading));
  const isSearched = useSelector(((state: RootState) => state.RepositoriesReducer.isSearched));
  const repositories = isSearched ? searchedRepositories : userRepositories;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {repositories.length ? repositories[currentPage - 1].map((el: Repository) => (
        <div
          key={el.id}
          className='item'
        >
          <h2><NavLink to={`/repositories/${el.id}`}>{el.name}</NavLink></h2>
          <p>{`Stars: ${el.stargazerCount}`}</p>
          <p>{`Updated at: ${new Date(el.updatedAt).toLocaleDateString()}`}</p>
          <a
            href={el.url}
            target="_blank"
          >
            {el.url}
          </a>
        </div>
      )
      ) : (
        <p>Nothing found</p>
      )}
    </div>
  )
}

export default RepositoryList