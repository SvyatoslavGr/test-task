import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Repository } from '../../types/repositories';
import RepositoryCard from '../RepositoryCard/RepositoryCard';
import './RepositoryPage.css';

function RepositoryPage() {
  const navigate = useNavigate();
  const { repositoryId } = useParams();
  const userRepositories = useSelector((state: RootState) => state.RepositoriesReducer.userRepositories);
  const searchedRepositories = useSelector((state: RootState) => state.RepositoriesReducer.searchedRepositories);
  const isSearched = useSelector(((state: RootState) => state.RepositoriesReducer.isSearched));
  const repositories = isSearched ? searchedRepositories : userRepositories;
  const repository = repositories.find((rep: Repository) => rep.id === repositoryId);

  return (
    <div className="container repository-page">
      <button
        className="btn-back"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {
        repository ? (
          <RepositoryCard repository={repository}/>
        ) : (
          <p>No such repository</p>
        )
      }
    </div>
  );
}

export default RepositoryPage;