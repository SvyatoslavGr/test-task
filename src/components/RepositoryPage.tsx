import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { Repository } from '../types/repositories';
import { RepositoriesEdge } from '../types/repositories';
import { Language } from '../types/repositories';
import { LanguagesEdge } from '../types/repositories';
import { NavLink } from 'react-router-dom';

function RepositoryPage() {
  const navigate = useNavigate();
  const { repositoryId } = useParams();
  const userRepositories = useSelector((state: RootState) => state.RepositoriesReducer.userRepositories);
  const searchedRepositories = useSelector((state: RootState) => state.RepositoriesReducer.searchedRepositories);
  const isLoading = useSelector(((state: RootState) => state.RepositoriesReducer.loading));
  const isSearched = useSelector(((state: RootState) => state.RepositoriesReducer.isSearched));
  const repositories = isSearched ? searchedRepositories : userRepositories;
  const repository = repositories.find((rep: Repository) => rep.id === repositoryId);

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {
        repository && 
          <div className='repository-card'>
            <h2>{repository.name}</h2>
            <p>{`Stars: ${repository.stargazerCount}`}</p>
            <p>{`Updated at: ${new Date(repository.updatedAt).toLocaleDateString()}`}</p>
            <p>{`Owner: ${repository.owner.login}`}</p>
            <img
              src={repository.owner.avatarUrl}
              alt='owner`s avatar'
            />
            {repository.languages.edges.length && 
              <div>
                <h3>Languages</h3>
                <ul>
                  {repository.languages.edges.map((el: LanguagesEdge) => (
                    <li>{el.node.name}</li>
                  )
                  )}
                </ul>
              </div>
            }
            <p>{repository.shortDescriptionHTML}</p>
          </div>
      }
    </div>
  )
}

export default RepositoryPage