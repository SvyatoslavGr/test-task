export enum RepositoriesActionTypes {
  FETCHING_REPOSITORIES = "FETCHING_REPOSITORIES",
  FETCHING_REPOSITORIES_ERROR = "FETCHING_REPOSITORIES_ERROR",
  SET_USER_REPOSITORIES = "SET_USER_REPOSITORIES",
  SET_SEARCHED_REPOSITORIES = "SET_SEARCHED_REPOSITORIES",
  CLEAR_SEARCHED = "UNSET_SEARCHED",
  SET_PAGE = "SET_PAGE",
  SET_QUERY = "SET_QUERY",
}

interface FetchingRepositoriesAction {
  type: RepositoriesActionTypes.FETCHING_REPOSITORIES;
}

interface FetchingRepositoriesErrorAction {
  type: RepositoriesActionTypes.FETCHING_REPOSITORIES_ERROR;
}

export interface SetUserRepositories {
  type: RepositoriesActionTypes.SET_USER_REPOSITORIES;
  payload: Repository[];
}

export interface SetSearchedRepositories {
  type: RepositoriesActionTypes.SET_SEARCHED_REPOSITORIES;
  payload: Repository[];
}

interface ClearSearchedAction {
  type: RepositoriesActionTypes.CLEAR_SEARCHED;
}

export interface SetPage {
  type: RepositoriesActionTypes.SET_PAGE;
  payload: number;
}

export interface SetQuery {
  type: RepositoriesActionTypes.SET_QUERY;
  payload: string;
}

export type RepositoriesAction = FetchingRepositoriesAction | FetchingRepositoriesErrorAction | SetUserRepositories | SetSearchedRepositories | ClearSearchedAction | SetPage | SetQuery

export interface RepositoriesState {
  userRepositories: Repository[];
  userRepositoriesByPages: Repository[][];
  searchedRepositories: Repository[];
  searchedRepositoriesByPages: Repository[][];
  loading: boolean;
  isSearched: boolean;
  currentPage: number;
  searchQuery: string;
}

export interface UserRepositoriesResponse {
  data: Data;
}

export interface SearchedRepositoriesResponse {
  data: SearchedData;
}

export interface Data {
  viewer: Viewer;
}

export interface SearchedData {
  search: Search;
}

export interface Search {
  edges: RepositoriesEdge[];
}

export interface Viewer {
  repositories: Repositories;
}

export interface Repositories {
  totalCount?: number;
  edges:      RepositoriesEdge[];
}

export interface RepositoriesEdge {
  node: Repository;
}

export interface Repository {
  id:                   string;
  name:                 string;
  shortDescriptionHTML: string;
  stargazerCount:       number;
  url:                  string;
  updatedAt:            Date;
  languages:            Languages;
  owner:                Owner;
}

export interface Languages {
  edges: LanguagesEdge[];
}

export interface LanguagesEdge {
  node: Language;
}

export interface Language {
  name: string;
}

export interface Owner {
  login:     string;
  avatarUrl: string;
  url:       string;
}