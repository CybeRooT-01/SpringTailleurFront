import { NavLink } from "react-router-dom";
const Navigation = () => {
    return (
      <>
        <ul className="nav justify-content-center navbar">
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
              Categories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ArticleConfections">
              Articles de confections
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ArticleVente">
              Article de vente
            </NavLink>
          </li>
        </ul>
      </>
    );
};

export default Navigation;
