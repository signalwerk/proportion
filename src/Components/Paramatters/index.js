import React, { Fragment, useState, useEffect } from "react";

import {
  Contour,
  Point,
  PointType,
  Operators
} from "../../modules/paramatters.lib";
import SVG from "../../modules/paramatters.lib/src/SVG";
import FormulaEditor from "../FormulaEditor";

const { add } = Operators;

const c = new Contour();

// const p1 = new Point(15, 5).type(PointType.line);

const dimension = 50;

const p0 = new Point({
  type: PointType.move,
  x: 10,
  y: 10
});

const p1 = new Point({
  type: PointType.line,
  x: add(p0.$x(), dimension),
  y: p0.$y()
});

const p2 = new Point({
  type: PointType.line,
  x: add(p0.$x(), dimension),
  y: add(p0.$y(), dimension)
});

const p3 = new Point({
  type: PointType.line,
  x: p0.$x(),
  y: add(p0.$y(), dimension)
});

c.points
  .push(p0)
  .push(p1)
  .push(p2)
  .push(p3);
c.close();

const Paramatters = () => {
  console.log("render Paramatters");

  const [data, setData] = useState([]);

  function handleClick(e) {
    e.preventDefault();
    p0.x(p0.x() + 5).y(p0.y() + 5);
  }

  // With the second parameter
  useEffect(() => {
    c.register(() => {
      setData([c.resolve()]);
    });
    setData([c.resolve()]);
  }, [c.id]);

  return (
    <Fragment>
      <h3>Paramatters {Date.now()}</h3>
      <button onClick={handleClick}>change</button>
      <svg width="100" height="100">
        <g>
          <SVG data={data} />
        </g>
      </svg>
      <br />
      <br />
      <br />
      <br />
      <FormulaEditor />
    </Fragment>
  );
};

export default Paramatters;
