import { LanguagesEdge, Repository } from '../../types/repositories';
import './RepositoryCard.css';

interface RepositoryCardProps {
  repository: Repository;
}

function RepositoryCard({repository}: RepositoryCardProps) {
  return (
    <div className="repository-card">
      <h2 className="repository-card-title">{repository.name}</h2>
      <p>{`Stars: ${repository.stargazerCount}`}</p>
      <p>{`Updated at: ${new Date(repository.updatedAt).toLocaleDateString()}`}</p>
      <p><b>Owner:</b> <a href={repository.owner.url}>{repository.owner.login}</a></p>
      <img
        src={repository.owner.avatarUrl}
        alt="owner`s avatar"
        width={100}
        height={100}
      />
      {Boolean(repository.languages.edges.length) && 
        <div className="repository-languages-section" >
          <h3>Languages</h3>
          <ul className="repository-languages-list">
            {repository.languages.edges.map((el: LanguagesEdge, index: number) => (
              <li
                className="repository-languages-item"
                key={index}
              >{el.node.name}
              </li>
            )
            )}
          </ul>
        </div>
      }
      <div className="repository-card-description">
        <h3>Description</h3>
        <p>{repository.shortDescriptionHTML}</p>
      </div>
    </div>
  );
}

export default RepositoryCard;