import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchInput from './SearchInput';
import RepositoryList from './RepositoryList';
import Paginator from './Paginator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function MainPage() {
  const page = useSelector((state: RootState) => state.RepositoriesReducer.currentPage);
  const query = useSelector((state: RootState) => state.RepositoriesReducer.searchQuery);
  const [currentPage, setCurrentPage] = useState(page);
  const [value, setValue] = useState(query);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <SearchInput
        value={value}
        setValue={setValue}
      />
      <RepositoryList
        currentPage={currentPage}
        searchValue={value}
      />
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSearchParams={setSearchParams}
        searchValue={value}
      />
    </div>
  )
}

export default MainPage