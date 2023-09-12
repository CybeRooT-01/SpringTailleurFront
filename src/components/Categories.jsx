import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/categories.css";
const Categories = () => {
  const url = "http://localhost:8080/api/categorie";
  const [data, setData] = useState();
  const [etat, setEtat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [typeCategorie, setTypeCategorie] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [categorieLibelle, setCategorieLibelle] = useState("");
  const EtatAjoutOrEdit = () => {
    setEtat(!etat);
  };
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Ajouter = () => {
    let data2 = {
      libelle: inputValue,
      typeCategories: typeCategorie,
    };
    axios.post(url, data2).then((response) => {
      setData([response.data.data, ...data]);
    });
  };
  const modifier = () => {
    const categorie = data.find((item) => item.libelle === categorieLibelle);
    const urlUpdate = url + "/" + categorie.id;
    const dataUpdate = {
      libelle: inputValue,
      typeCategories: typeCategorie,
    };
    axios.put(urlUpdate, dataUpdate).then((response) => {
      response.data.data.id = categorie.id;
      const newData = response.data.data;
      const newDataTab = [...data];
      const index = newDataTab.findIndex((item) => item.id === newData.id);
      newDataTab[index] = newData;
      setData(newDataTab);
      setInputValue("");
    });
  };
  const AjoutOrEdit = () => {
    if (etat) {
      Ajouter();
    } else {
      modifier();
    }
  };
  const getTypeCategorie = (e) => {
    setTypeCategorie(e.target.value);
  };
  const getInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const getChecked = (e) => {
    const itemId = e.target.id;
    const isChecked = e.target.checked;
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[itemId] = isChecked;
    setCheckedItems(updatedCheckedItems);
    const selectedIds = Object.keys(updatedCheckedItems).filter(
      (key) => updatedCheckedItems[key]
    );
    if (selectedIds.length === data.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };
  const checkAll = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    const updatedCheckedItems = {};
    data.forEach((item) => {
      updatedCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(updatedCheckedItems);
  };

  const supprimer = () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    const selectedIdsInt = selectedIds.map((idToInt) => parseInt(idToInt));

    axios.delete(url, { data: selectedIdsInt }).then((response) => {
      if (response.data.status === 200) {
        data.forEach((item) => {
          if (selectedIds.includes(item.id.toString())) {
            document.getElementById(item.id).checked = false;
            document
              .getElementById(item.id)
              .parentNode.parentNode.parentNode.remove();
          }
        });
        const newData = data.filter((item) => !selectedIds.includes(item.id));
        setData(newData);
        setAllChecked(false);
        setCheckedItems({});
      }
    });
  };
  const chargerLibelle = (e) => {
    const libelle = e.target.innerHTML;
    if (!etat) {
      setInputValue(libelle);
      setCategorieLibelle(libelle);
    } else {
      return;
    }
  };

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
            style={{ width: "180px" }}
            onChange={getTypeCategorie}
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
              onChange={EtatAjoutOrEdit}
            />
            <label className="form-check-label ms-2">Ajout</label>
          </div>
        </div>
      </div>
      <div className="row d-flex align-items-center mt-4">
        <h4 className="col-md-4">Libelle</h4>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control input"
            onInput={getInputValue}
            value={inputValue}
          />
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-primary todisable"
            onClick={AjoutOrEdit}
            disabled={
              inputValue === "" ||
              typeCategorie === "" ||
              data.find((item) => item.libelle === inputValue)
                ? true
                : false
            }
          >
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
          <button
            onClick={supprimer}
            className="btn btn-danger"
            id="btnSupprimer"
            disabled={Object.values(checkedItems).includes(true) ? false : true}
          >
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
                    checked={allChecked}
                    onChange={checkAll}
                  />
                </div>
              </th>
              <th scope="col">Libelle</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input all"
                        type="checkbox"
                        value=""
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onChange={getChecked}
                      />
                    </div>
                  </td>
                  <td className="libelle" onClick={chargerLibelle}>
                    {item.libelle}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center"></div>
      </div>
    </div>
  );
};
export default Categories;
