import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchInput from './SearchInput';
import RepositoryList from './RepositoryList';
import Paginator from './Paginator';

function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
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