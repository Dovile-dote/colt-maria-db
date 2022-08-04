import { useContext } from 'react';
import { useState } from 'react';
import ColorContext from './ColorContext';

function Create() {
  const { setCreateData } = useContext(ColorContext);

  const [color, setColor] = useState('');

  const handleCreate = () => {
    const data = { color };
    setCreateData(data);
    setColor('');
  };

  return (
    <>
      <div className="color">
        <h2>Create new color</h2>

        <input
          type="color"
          onChange={(e) => setColor(String(e.target.value))}
          value={color}
        />
        <button onClick={handleCreate}>
          <span>NEW color</span>
        </button>
      </div>
    </>
  );
}
export default Create;
