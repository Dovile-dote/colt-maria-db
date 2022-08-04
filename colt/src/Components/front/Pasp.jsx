import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function Pasp({ paspirtukas }) {
  const { setCreateComment } = useContext(FrontContext);

  const [com, setCom] = useState('');

  const handleComment = () => {
    setCreateComment({ com, coltId: paspirtukas.id });
    setCom('');
  };

  console.log(paspirtukas);

  return (
    <li>
      <div className="aprasas">
        <div className="flex">
          <b className="colt-nr color-svg">
            <span id={paspirtukas.registrationCode}>Colt: </span>{' '}
            {paspirtukas.registrationCode}
            {/* </b> */}
            {/* <b className="color-svg"> */}
            <svg style={{ fill: paspirtukas.color }}>
              <use href="#deme" />
            </svg>{' '}
          </b>
          <div className="busy colt-nr">
            <div
              className={
                paspirtukas.isBusy ? 'burbuliukas' : 'burbuliukas-busy'
              }
            ></div>{' '}
            <b
              style={{
                marginLeft: paspirtukas.isBusy ? '10px' : '35px',
                marginRight: '20px',
              }}
            >
              {paspirtukas.isBusy ? 'Available' : 'Busy'}
            </b>
          </div>
        </div>{' '}
        <ul className="komentarai">
          {paspirtukas.comments
            ? paspirtukas.comments
                .slice(0, -5)
                .split('-^o^-,')
                .map((c, i) => (
                  <li key={i}>
                    <div className="komentaras">{c}</div>
                  </li>
                ))
            : null}
        </ul>
        <div className="comment-place">
          <textarea
            value={com}
            onChange={(e) => setCom(e.target.value)}
            rows="7"
            placeholder="Leave your comment here..."
          ></textarea>
          <button className="com" onClick={handleComment}>
            <span>COMMENT</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Pasp;
