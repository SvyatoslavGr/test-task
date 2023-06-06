import React, { useCallback } from 'react';
import { RepositoriesActionTypes, Repository } from '../../types/repositories';
import { useDispatch } from 'react-redux';
import './Paginator.css';

interface PaginatorProps {
  page: number;
  repositories: Repository[][];
}

function Paginator({page, repositories}: PaginatorProps) {
  const dispatch = useDispatch();
  
  const clickHandler = useCallback((_e: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    if (page !== pageNumber) {
      dispatch({type: RepositoriesActionTypes.SET_PAGE, payload: pageNumber});
    }
  }, [page, dispatch]);

  return (
    <ul className="pagination-list">
      {repositories.length > 0 && repositories.map((_el: Repository[], index: number) => (
        <li
          key={index}
          className="pagination-item"
        >
          <button
            className={page === index+1 ? 'page page-current' : 'page'}
            type="button"
            onClick={(e)=>clickHandler(e, index+1)}
          >{index+1}
          </button>
        </li>
      )
      )}
    </ul>
  );
}

export default Paginator;