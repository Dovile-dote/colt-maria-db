import { useContext } from 'react';
import ColorContext from './ColorContext';

function Color({ color }) {
  const { setDeleteData } = useContext(ColorContext);

  const handleDelete = () => {
    setDeleteData(color);
  };

  return (
    <li>
      <div className="colors-aprasas">
        <div className="spalva" style={{ backgroundColor: color.color }}></div>

        <div className="buttons">
          {color.total ? (
            <b>{'(' + color.total + ')'}</b>
          ) : (
            <button className="delete" onClick={handleDelete}>
              <svg>
                <use href="#delete" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Color;
