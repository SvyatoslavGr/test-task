import SearchInput from '../SearchInput/SearchInput';
import RepositoryList from '../RepositoryList/RepositoryList';
import './MainPage.css';

function MainPage() {
  return (
    <div className="container main-page">
      <SearchInput />
      <RepositoryList />
    </div>
  );
}

export default MainPage;