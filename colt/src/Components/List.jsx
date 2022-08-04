import Pasp from './Pasp';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import ColtContext from './ColtContext';

function List() {
  const { paspirtukai } = useContext(ColtContext);
  // console.log(paspirtukai);

  const [copy, setCopy] = useState([]);

  useEffect(() => {
    if (null === paspirtukai) {
      return;
    }
    setCopy([...paspirtukai]);
  }, [paspirtukai]);

  const sortByKm = () => {
    setCopy(
      [...copy].sort((a, b) => a.totalRideKilometres - b.totalRideKilometres)
    );
    console.log(copy);
  };

  const sortByTime = () => {
    setCopy(
      [...copy].sort(
        (a, b) =>
          Number(b.lastUseTime.replace(/-/gi, '0')) -
          Number(a.lastUseTime.replace(/-/gi, '0'))
      )
    );
    console.log(copy);
  };

  const resetSort = () => {
    setCopy([...paspirtukai]);
  };

  return (
    <>
      {/* <div className={copy.length !== 0 ? 'listo-fonas' : 'nera'}> */}
      <div className="listo-fonas">
        <div className="flex">
          <h2>List of Colt's</h2>
          <div className="selectorius">
            <button onClick={sortByKm}> sort by KM</button>
            <button onClick={sortByTime}>sort by TIME</button>
            <button onClick={resetSort}>reset</button>
          </div>
        </div>

        <ul>
          {copy.map((p) => (
            <Pasp key={p.id} paspirtukas={p}></Pasp>
          ))}
        </ul>
      </div>
    </>
  );
}

export default List;
