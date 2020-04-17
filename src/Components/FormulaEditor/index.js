import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, useEditor, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { Toolbar } from "./components";
import { withPointRefs, PointRef, insertPointRef, InsertPointRefBtn } from "./pointRef";
import "./styles.css";

const Editor = () => {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(
    () => withPointRefs(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Toolbar>
        <InsertPointRefBtn />
      </Toolbar>
      <Editable
        renderElement={props => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  );
};

const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "pointRef":
      return <PointRef {...props} />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "5 + sqrt("
      }
    ]
  },
  {
    type: "pointRef",
    data: {
      id: "8a7",
      attr: "x"
    },
    children: [{ text: "" }]
  },
  {
    type: "paragraph",
    children: [
      {
        text: ") * 3"
      }
    ]
  }
];

export default Editor;
