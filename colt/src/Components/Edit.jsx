import { useEffect, useState, useContext } from 'react';
import ColtContext from './ColtContext';

function Edit() {
  const { modalData, setModalData, setEditData, colors } =
    useContext(ColtContext);

  console.log(modalData);
  const [registrationCode, setRegistrationCode] = useState('');
  const [isBusy, setIsBusy] = useState(1);
  const [lastUseTime, setLastUseTime] = useState('');
  const [totalRideKilometres, setTotalRideKilometres] = useState(0);
  const [color, setColor] = useState('0');
  const [radio1, setRadio1] = useState('0');

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setRegistrationCode(modalData.registrationCode);
    setIsBusy(modalData.isBusy);
    setLastUseTime(modalData.lastUseTime);
    setTotalRideKilometres('');
    setColor(colors.filter((g) => modalData.color === g.color)[0]?.id ?? 0);
    // console.log('spalvos id' + color);
    // console.log(modalData);
    console.log('modal color ' + modalData.color);
    setRadio1(modalData.color);
    // console.log(modalData);
    console.log('color indexas yra: ' + color);
    console.log('radio yra ' + radio1);
  }, [modalData]);

  console.log('radio po setinimo yra ' + radio1);

  const handleEdit = () => {
    const data = {
      registrationCode,
      isBusy,
      lastUseTime,
      totalRideKilometres:
        Number(modalData.totalRideKilometres) + Number(totalRideKilometres),
      color,
      id: modalData.id,
      // radio,
    };
    setRadio1();
    setEditData(data);
    setModalData(null);
  };

  if (null === modalData) {
    return null;
  }

  return (
    <div className="editas">
      <div className="edito-content">
        <div className="edito-header">
          <h3>Edit</h3>
          <button
            type="button"
            className="close"
            onClick={() => setModalData(null)}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Registration code: <b>{registrationCode}</b>
          </p>
          <p>
            Last use time: <b>{modalData.lastUseTime}</b>
          </p>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setLastUseTime(e.target.value)}
            value={lastUseTime}
          />
          <p>
            Total ride: <b>{modalData.totalRideKilometres} km</b>
          </p>
          <div className="km">
            <label>Today ride: </label>
            <input
              type="text"
              onChange={(e) => {
                setTotalRideKilometres(e.target.value);
              }}
              value={totalRideKilometres}
              placeholder={'km'}
            />
            <span>km</span>
          </div>
          <div className="selektas">
            {colors
              ? colors.map((c) => (
                  <>
                    <input
                      key={c.id}
                      type="radio"
                      name="r"
                      id={c.id + 2}
                      value={c.color}
                      // value={radio}
                      onChange={(e) => (
                        setRadio1(e.target.value),
                        setColor(c.id),
                        console.log(
                          'rodyk ka nors ' + e.target.value + ' id ' + c.id
                        ),
                        console.log(e.target.value),
                        console.log(radio1),
                        console.log(c.color)
                      )}
                      checked={radio1 === c.color}
                    ></input>
                    <label htmlFor={c.id + 2}>
                      <svg style={{ fill: c.color }}>
                        <use href="#deme" />
                      </svg>{' '}
                    </label>
                  </>
                ))
              : null}
          </div>
          <div>
            BUSY
            <input
              type="checkbox"
              onChange={() => {
                // cbClick('a');
                setIsBusy((s) => (s ? 0 : 1));
                console.log('klick');
                console.log(isBusy);
              }}
              checked={!isBusy}
            ></input>
          </div>
        </div>

        <div className="edito-footer">
          <button type="button" onClick={() => setModalData(null)}>
            Close
          </button>
          <button type="button" onClick={handleEdit}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
