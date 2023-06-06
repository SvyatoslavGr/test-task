import { Repository } from '../../types/repositories';
import { NavLink } from 'react-router-dom';

interface RepositoryListItemProps {
  repository: Repository;
  page: number;
  number: number
}

function RepositoryListItem({repository, page, number}: RepositoryListItemProps) {
  return (
    <div className="repositories-item">
      <span className="repositories-item-number">{`${(page - 1) * 10 + number}.`}</span>
      <h2 className="repositories-item-title"><NavLink to={`/repositories/${repository.id}`}>{repository.name}</NavLink></h2>
      <p>{`Stars: ${repository.stargazerCount}`}</p>
      <p>{`Updated at: ${new Date(repository.updatedAt).toLocaleDateString()}`}</p>
      <a
        href={repository.url}
        target="_blank"
      >
        {repository.url}
      </a>
    </div>
  );
}

export default RepositoryListItem;