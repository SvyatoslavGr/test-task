import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Repository } from '../types/repositories';
import { SetURLSearchParams } from 'react-router-dom';



interface PaginatorProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: SetURLSearchParams;
  searchValue: string;
  
}

function Paginator({ currentPage, setCurrentPage, setSearchParams, searchValue }: PaginatorProps) {
  const userRepositories = useSelector((state: RootState) => state.RepositoriesReducer.userRepositoriesByPages);
  const searchedRepositories = useSelector((state: RootState) => state.RepositoriesReducer.searchedRepositoriesByPages);
  const isLoading = useSelector(((state: RootState) => state.RepositoriesReducer.loading));
  const isSearched = useSelector(((state: RootState) => state.RepositoriesReducer.isSearched));
  const repositories = isSearched ? searchedRepositories : userRepositories;
  
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    // if (!(e.target instanceof HTMLButtonElement)) {
    //   return;
    // }
    // const buttonElem = e.target;
    
    setCurrentPage(pageNumber);
    // setSearchParams({'page': pageNumber.toString()});
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className='page-list'>
      {repositories.length > 0 && repositories.map((el: Repository[], index: number, array: Repository[][]) => (
        <li key={index}>
          <button
            data-page={index+1}
            className={currentPage === index+1 ? 'page page-current' : 'page'}
            type="button"
            onClick={(e)=>clickHandler(e, index+1)}
          >{index+1}
          </button>
        </li>
      )
      )}
    </ul>
  )
}

export default Paginator