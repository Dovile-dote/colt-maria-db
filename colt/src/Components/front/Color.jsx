function Color({ color }) {
  console.log(color);
  return (
    <li>
      <div className="spalvu-sarasas">
        <b className="color-svg">
          <svg style={{ fill: color.color }}>
            <use href="#deme" />
          </svg>{' '}
        </b>
        <ul>
          {color.pasp_nr
            ? color.pasp_nr.split(',').map((c, i) => (
                <li key={i}>
                  <a href={'#' + c}>{c}</a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </li>
  );
}

export default Color;
