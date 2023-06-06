import { Dispatch } from "redux";
import { RepositoriesAction, RepositoriesActionTypes, RepositoriesEdge, Repository, SearchedRepositoriesResponse, UserRepositoriesResponse } from "../types/repositories";
import { SEARCHED_REPOSITORIES_QUERY, USER_REPOSITORIES_QUERY } from "../utils/queries";

let abortController = new AbortController();

export const setUserRepositoriesAction = () => async (dispatch: Dispatch<RepositoriesAction>) => {
  try {
    dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES });
    const userRepositoriesQuery = USER_REPOSITORIES_QUERY;
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_PERSONAL_ACCESS_TOKEN}`,
      },
      signal: abortController.signal,
      body: JSON.stringify({ query: userRepositoriesQuery }),
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    const result = (await response.json()) as UserRepositoriesResponse;
    const array = result.data.viewer.repositories.edges.map((el: RepositoriesEdge): Repository => el.node);

    dispatch({ type: RepositoriesActionTypes.SET_USER_REPOSITORIES, payload: array });
  } catch (error) {

    console.error(error);
    dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES_ERROR });
  }
};

export const setSearchedRepositoriesAction = (searchValue: string) => async (dispatch: Dispatch<RepositoriesAction>) => {
  try {
    dispatch({ type: RepositoriesActionTypes.SET_QUERY, payload: searchValue });
    abortController.abort();
    abortController = new AbortController();

    if (!searchValue) {
      dispatch({ type: RepositoriesActionTypes.CLEAR_SEARCHED });
      dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES_ERROR });
      dispatch({ type: RepositoriesActionTypes.SET_PAGE, payload: 1 });
      return;
    }

    dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES });
    
    const queryString = `${searchValue} in:name sort:stars-desc`;
    const searchQuery = SEARCHED_REPOSITORIES_QUERY;
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_PERSONAL_ACCESS_TOKEN}`,
      },
      signal: abortController.signal,
      body: JSON.stringify({ query: searchQuery, variables: { queryString } }),
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const result = (await response.json()) as SearchedRepositoriesResponse;
    const array = result.data.search.edges.map((el: RepositoriesEdge): Repository => el.node);

    dispatch({ type: RepositoriesActionTypes.SET_SEARCHED_REPOSITORIES, payload: array });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('abort');
      return;
    }

    console.error(error);
    dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES_ERROR });
  }
};