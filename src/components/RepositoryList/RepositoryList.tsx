import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Repository } from '../../types/repositories';
import Spinner from '../Spinner/Spinner';
import Paginator from '../Paginator/Paginator';
import RepositoryListItem from './RepositoryListItem';
import './RepositoryList.css';

function RepositoryList() {
  const isLoading = useSelector(((state: RootState) => state.RepositoriesReducer.loading));
  const page = useSelector(((state: RootState) => state.RepositoriesReducer.currentPage));
  const userRepositories = useSelector((state: RootState) => state.RepositoriesReducer.userRepositoriesByPages);
  const searchedRepositories = useSelector((state: RootState) => state.RepositoriesReducer.searchedRepositoriesByPages);
  const isSearched = useSelector(((state: RootState) => state.RepositoriesReducer.isSearched));
  
  const repositories = isSearched ? searchedRepositories : userRepositories;
  
  if (isLoading) {
    return (
      <div className="repositories-spinner-wrapper">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="repositories-wrapper">
      <div className="repositories-list">
        {repositories.length ? repositories[page - 1].map((el: Repository, index: number) => (
          <RepositoryListItem
            repository={el}
            page={page}
            key={el.id}
            number={index+1}
          />
        )
        ) : (
          <p>Nothing found</p>
        )}
      </div>
      <Paginator
        page={page}
        repositories={repositories}
      />
    </div>
  );
}

export default RepositoryList;