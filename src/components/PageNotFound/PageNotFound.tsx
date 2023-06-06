import { NavLink } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="container page-not-found">
      <h1>Page Not Found</h1>
      <NavLink to="/">Main</NavLink>
    </div>
  );
}

export default PageNotFound;