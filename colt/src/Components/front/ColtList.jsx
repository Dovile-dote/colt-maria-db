import Pasp from './Pasp';
import { useContext } from 'react';
import FrontContext from './FrontContext';

function ColtList() {
  const { paspirtukai } = useContext(FrontContext);

  return (
    <>
      <div className="listo-fonas">
        <div className="flex">
          <h2>List of Colt's</h2>
        </div>

        <ul>
          {paspirtukai
            ? paspirtukai.map((p) => <Pasp key={p.id} paspirtukas={p}></Pasp>)
            : null}
        </ul>
      </div>
    </>
  );
}

export default ColtList;
