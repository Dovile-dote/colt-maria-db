import Color from './Color';
import { useContext } from 'react';
import ColorContext from './ColorContext';

function List() {
  const { colors } = useContext(ColorContext);

  return (
    <>
      <div className="colors-list">
        <h2>List of Colors</h2>
        <ul>
          {colors
            ? colors.map((c) => <Color key={c.id} color={c}></Color>)
            : null}
        </ul>
      </div>
    </>
  );
}

export default List;
