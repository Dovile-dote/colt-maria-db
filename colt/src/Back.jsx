import { useEffect, useState } from 'react';
import './App.scss';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';
import ColtContext from './Components/ColtContext';
import axios from 'axios';
import ColorContext from './Components/colors/ColorContext';
import CreateColors from './Components/colors/Create';
import ListColors from './Components/colors/List';

function Back() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  ///////////////////PASAPIRTUKAI/////////////////////
  const [paspirtukai, setPaspirtukai] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [sum, setSum] = useState(0);

  ///////////////////SPALVOS/////////////////////
  const [colors, setColors] = useState(null);
  const [colorsCreateData, setColorsCreateData] = useState(null);
  const [colorsDeleteData, setColorsDeleteData] = useState(null);

  ///////////////////PASPIRTUKAI/////////////////////
  // read
  useEffect(() => {
    axios
      .get('http://localhost:3003/coltai')
      .then((res) => setPaspirtukai(res.data));
  }, [lastUpdate]);

  // create
  useEffect(() => {
    if (null === createData) return;
    axios.post('http://localhost:3003/coltai', createData).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createData]);

  // delete
  useEffect(() => {
    if (null === deleteData) return;
    axios.delete('http://localhost:3003/coltai/' + deleteData.id).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [deleteData]);

  // edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/coltai/' + editData.id, editData)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  ////////////////////SPALVOS///////////////////////

  // create colors
  useEffect(() => {
    if (null === colorsCreateData) return;
    axios.post('http://localhost:3003/spalvos', colorsCreateData).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [colorsCreateData]);

  // read colors
  useEffect(() => {
    axios.get('http://localhost:3003/spalvos').then((res) => {
      // console.log(res.data);
      setColors(res.data);
    });
  }, [lastUpdate]);

  // delete color
  useEffect(() => {
    if (null === colorsDeleteData) return;
    axios
      .delete('http://localhost:3003/spalvos/' + colorsDeleteData.id)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [colorsDeleteData]);

  // delete comment
  const handleDeleteComment = (id) => {
    axios.delete('http://localhost:3003/komentarai/' + id).then((_) => {
      setLastUpdate(Date.now());
    });
  };

  //////////////KITA/////////////////////
  // statistic
  useEffect(() => {
    if (null === paspirtukai) return;

    setSum(0);
    for (let i = 0; i < paspirtukai.length; i++) {
      setSum((s) => s + paspirtukai[i].totalRideKilometres);
    }
  }, [paspirtukai]);
  return (
    <ColtContext.Provider
      value={{
        paspirtukai,
        setCreateData,
        setDeleteData,
        setModalData,
        modalData,
        setEditData,
        colors,
        handleDeleteComment,
      }}
    >
      <ColorContext.Provider
        value={{
          setCreateData: setColorsCreateData,
          colors,
          setDeleteData: setColorsDeleteData,
        }}
      >
        <div className="fonas">
          <div className="App">
            <h1>Colt</h1>
            <div className="main">
              <div className="order">
                <Create />
                <div className="statistic">
                  <h2>Statistic</h2>
                  <h3>
                    {' '}
                    You have: <span>
                      {paspirtukai && paspirtukai.length}
                    </span>{' '}
                    Colts.
                  </h3>
                  <h3>
                    {' '}
                    Total ride: <span>{sum.toFixed(2)}</span> km
                  </h3>
                </div>{' '}
                <CreateColors />
                <ListColors />
              </div>
              <div className="list">
                {/* <div className={paspirtukai !== null ? 'list' : 'nera'}> */}
                <List />
              </div>
            </div>
            <Edit />
          </div>
        </div>
      </ColorContext.Provider>
    </ColtContext.Provider>
  );
}

export default Back;
