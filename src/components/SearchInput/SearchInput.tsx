/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedRepositoriesAction } from '../../redux/repositories.action';
import useDebounce from '../../utils/useDebounce';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './SearchInput.css';

function SearchInput() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.RepositoriesReducer.searchQuery);
  const [value, setValue] = useState(query);
  const { debounce } = useDebounce();
  const debounced = debounce(dispatch, 500);

  const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounced(setSearchedRepositoriesAction(e.target.value));
  }, [debounced]);

  return (
    <div className="search-input-wrapper">
      <label
        className="search-label"
        htmlFor="search"
      >
        Search for GitHub repositories:
      </label>
      <input
        className="search-input"
        id="search"
        type="text"
        onChange={changeHandler}
        value={value}
      />
    </div>
  );
}

export default SearchInput;