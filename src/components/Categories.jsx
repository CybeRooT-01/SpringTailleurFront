

const Categories = () => {
  return (
    <div className="container custom-container">
      <div className="row d-flex align-items-center">
        <div className="col-md-6">
          <h3>Categorie</h3>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "180px"}}
          >
            <option defaultValue>type de categorie</option>
            <option value="VENTE">vente</option>
            <option value="CONFECTION">confection</option>
          </select>
          <span className="form-check-label ms-2">edit </span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              style={{ width: "50px", height: "20px" }}
            />
            <label className="form-check-label ms-2">Ajout</label>
          </div>
        </div>
      </div>
      <div className="row d-flex align-items-center mt-4">
        <h4 className="col-md-4">Libelle</h4>
        <div className="col-md-4">
          <input type="text" className="form-control input" />
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary todisable" disabled>
            Ok
          </button>
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Liste des catégories</h5>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-danger" id="btnSupprimer" disabled>
            Supprimer
          </button>
        </div>
      </div>
      <div className="container text-center">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="tocheckall"
                  />
                </div>
              </th>
              <th scope="col">Libelle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input all"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </div>
              </td>
              <td className="libelle">okaay</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-center"></div>
      </div>
    </div>
  );
};

export default Categories;
