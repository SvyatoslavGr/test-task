import { Dispatch } from "redux";
import { RepositoriesAction, RepositoriesActionTypes, RepositoriesEdge, Repository, SearchedRepositoriesResponse, UserRepositoriesResponse } from "../types/repositories";
import { SEARCHED_REPOSITORIES_QUERY, USER_REPOSITORIES_QUERY } from "../utils/queries";

export const setUserRepositoriesAction = () => async (dispatch: Dispatch<RepositoriesAction>) => {
  try {
    dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES })
    const userRepositoriesQuery = USER_REPOSITORIES_QUERY;
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
      },
      body: JSON.stringify({ query: userRepositoriesQuery }),
    });

    if (!response.ok) {
      throw new Error('Error fetching data')
    }
    const result = (await response.json()) as UserRepositoriesResponse;
    const array = result.data.viewer.repositories.edges.map((el: RepositoriesEdge): Repository => el.node);

    dispatch({ type: RepositoriesActionTypes.SET_USER_REPOSITORIES, payload: array });
  } catch (error) {
    // console.error(error);
    if (error instanceof Error) {
      alert(error.message)
    }
  }
};

export const setSearchedRepositoriesAction = (searchValue: string) => async (dispatch: Dispatch<RepositoriesAction>) => {
  try {
    if (!searchValue) {
      dispatch({ type: RepositoriesActionTypes.CLEAR_SEARCHED })
      return;
    }
    console.log('dispatch occured');
    dispatch({ type: RepositoriesActionTypes.FETCHING_REPOSITORIES })
    const queryString = `${searchValue} in:name sort:stars-desc`;
    const searchQuery = SEARCHED_REPOSITORIES_QUERY;
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
      },
      body: JSON.stringify({ query: searchQuery, variables: { queryString } }),
    });
    if (!response.ok) {
      throw new Error('Error fetching data')
    }
    const result = (await response.json()) as SearchedRepositoriesResponse
    const array = result.data.search.edges.map((el: RepositoriesEdge): Repository => el.node);

    dispatch({ type: RepositoriesActionTypes.SET_SEARCHED_REPOSITORIES, payload: array });
  } catch (error) {
    // console.error(error);
    if (error instanceof Error) {
      alert(error.message)
    }
  }
};