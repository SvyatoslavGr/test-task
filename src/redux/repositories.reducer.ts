import { RepositoriesState, RepositoriesAction, RepositoriesActionTypes } from "../types/repositories";
import devideIntoChunks from "../utils/devideIntoChunks";

const initialState: RepositoriesState = {
  userRepositories: [],
  userRepositoriesByPages: [],
  searchedRepositories: [],
  searchedRepositoriesByPages: [],
  loading: false,
  isSearched: false,
  currentPage: 1,
  searchQuery: '',
};

const RepositoriesReducer = (state = initialState, action: RepositoriesAction): RepositoriesState => {

  switch (action.type) {
    case RepositoriesActionTypes.FETCHING_REPOSITORIES:
      return { ...state, loading: true };

    case RepositoriesActionTypes.FETCHING_REPOSITORIES_ERROR:
      return { ...state, loading: false };

    case RepositoriesActionTypes.CLEAR_SEARCHED:
      return { ...state, isSearched: false };

    case RepositoriesActionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };

    case RepositoriesActionTypes.SET_QUERY:
      return { ...state, searchQuery: action.payload };

    case RepositoriesActionTypes.SET_USER_REPOSITORIES:
      return { ...state, loading: false, userRepositories: action.payload, userRepositoriesByPages: devideIntoChunks(action.payload, 10) };

    case RepositoriesActionTypes.SET_SEARCHED_REPOSITORIES:
      return { ...state, loading: false, isSearched: true, currentPage: 1, searchedRepositories: action.payload, searchedRepositoriesByPages: devideIntoChunks(action.payload, 10) };

    default:
      return state;
  }
};

export default RepositoriesReducer;
