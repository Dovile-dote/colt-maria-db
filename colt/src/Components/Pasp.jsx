import { useContext } from 'react';
import ColtContext from './ColtContext';

function Pasp({ paspirtukas }) {
  const { setDeleteData, setModalData, handleDeleteComment } =
    useContext(ColtContext);

  const handleDelete = () => {
    setDeleteData(paspirtukas);
    console.log(paspirtukas);
  };

  const handleEdit = () => {
    console.log(paspirtukas);
    setModalData(paspirtukas);
  };
  return (
    <li>
      <div className="aprasas">
        <div>
          <p>
            {' '}
            <b>Registration code: {paspirtukas.registrationCode}</b>
          </p>
          <p>
            <b>Total Ride: </b> {paspirtukas.totalRideKilometres.toFixed(2)}{' '}
            <b> Km</b>
          </p>

          <b>Last use time: {paspirtukas.lastUseTime}</b>
          <br />
          <b className="color-svg">
            Color:
            <svg style={{ fill: paspirtukas.color }}>
              <use href="#deme" />
            </svg>{' '}
          </b>
        </div>
        <div className="busy">
          <b>{paspirtukas.isBusy ? 'Available' : 'Busy'}</b>
          <div
            className={paspirtukas.isBusy ? 'burbuliukas' : 'burbuliukas-busy'}
          ></div>
        </div>

        <div className="buttons">
          <button onClick={handleEdit}>
            <svg>
              <use href="#edit" />
            </svg>
          </button>
          <button className="delete" onClick={handleDelete}>
            <svg>
              <use href="#delete" />
            </svg>
          </button>
        </div>
      </div>
      <ul>
        {paspirtukas.comments
          ? paspirtukas.comments
              .slice(0, -5)
              .split('-^o^-,')
              .map((c, i) => (
                <li key={i}>
                  <div className="komentaras">{c}</div>
                  <button
                    className="delete-kom"
                    type="button"
                    onClick={() =>
                      handleDeleteComment(paspirtukas.coms_id.split(',')[i])
                    }
                  >
                    <svg>
                      <use href="#delete" />
                    </svg>
                  </button>
                </li>
              ))
          : null}
      </ul>
    </li>
  );
}

export default Pasp;
