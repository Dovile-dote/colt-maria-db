import { useContext } from 'react';
import { useState } from 'react';
import rand from '../Functions/rand';
import ColtContext from './ColtContext';

function Create() {
  const { setCreateData, colors } = useContext(ColtContext);

  const kodoElem = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'Y',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'Z',
    'W',
    'X',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let kodas = '';
  for (let i = 0; i < 8; i++) {
    kodas += kodoElem[rand(0, kodoElem.length - 1)];
  }

  const [registrationCode, setRegistrationCode] = useState(kodas);
  const [isBusy, setIsBusy] = useState(1);
  const [lastUseTime, setLastUseTime] = useState('');
  const [totalRideKilometres, setTotalRideKilometres] = useState(0);
  const [color, setColor] = useState('0');
  const [radio, setRadio] = useState('0');

  const handleCreate = () => {
    const data = {
      registrationCode,
      isBusy,
      lastUseTime,
      totalRideKilometres,
      color,
      radio,
    };
    console.log(data);
    setCreateData(data);
    setRegistrationCode(kodas);
    setIsBusy(1);
    setLastUseTime('');
    setTotalRideKilometres(0);
    setColor('0');
    setRadio('0');
  };

  // const radioChange = (e) => {
  //   setRadio(e.target.value);
  //   setColor(c.id);
  //   console.log(radio)
  // }

  return (
    <>
      <div className="rodykle">
        <div className="kv">
          <h2>
            Select <br /> Colt <br />
            Color!
          </h2>
        </div>
        <div className="tr"></div>
      </div>
      <div className="selektas">
        {colors
          ? colors.map((c, i) => (
              <>
                <input
                  key={i}
                  type="radio"
                  name="r"
                  id={c.id}
                  value={c.color}
                  onChange={(e) => (setRadio(e.target.value), setColor(c.id))}
                  checked={radio === String(c.color)}
                ></input>
                <label htmlFor={c.id}>
                  <svg style={{ fill: c.color }}>
                    <use href="#deme" />
                  </svg>{' '}
                </label>
              </>
            ))
          : null}

        {/* <select onChange={(e) => setColor(e.target.value)} value={color}>
            <option value="0" disabled>
              Select Color
            </option>
            {colors
              ? colors.map((c) => (
                  <option key={c.id} value={c.id}>
                    <p>{c.color}</p>
                  </option>
                ))
              : null}
          </select> */}
      </div>
      <button className="pagr" onClick={handleCreate}>
        <span>NEW COLT</span>
      </button>
    </>
  );
}
export default Create;
