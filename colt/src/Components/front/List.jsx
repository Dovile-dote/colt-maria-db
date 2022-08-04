import Color from './Color';
import { useContext } from 'react';
import FrontContext from './FrontContext';

function List() {
  const { colors } = useContext(FrontContext);

  return (
    <>
      <div className="flex">
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
