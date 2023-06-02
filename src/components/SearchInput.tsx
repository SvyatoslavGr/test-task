/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchedRepositoriesAction } from '../redux/repositories.action';
import useDebounce from '../utils/useDebounce';

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
}

function SearchInput({value, setValue}: SearchInputProps) {
  
  const dispatch = useDispatch();
  const { debounce } = useDebounce();
  const debounced = debounce(dispatch, 500)
  const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(e.target.value);
    
    debounced(setSearchedRepositoriesAction(e.target.value));
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={changeHandler}
        value={value}
      />
    </div>
  )
}

export default SearchInput