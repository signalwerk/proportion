import React, { useState, useMemo } from "react";
import { Transforms, createEditor } from "slate";
import {
  Slate,
  Editable,
  useEditor,
  useSelected,
  useFocused,
  withReact
} from "slate-react";
import { withHistory } from "slate-history";

import { Button, Icon, Toolbar } from "./components";
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
        <InsertPointRef />
      </Toolbar>
      <Editable
        renderElement={props => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  );
};

const withPointRefs = editor => {
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === "pointRef" ? true : isVoid(element);
  };

  return editor;
};

const insertPointRef = (editor, data) => {
  const text = { text: "" };
  const pointRef = { type: "pointRef", data, children: [text] };
  Transforms.insertNodes(editor, pointRef);
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

const PointRef = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span {...attributes}>
      <span contentEditable={false}>
        <span
          className={`PointRef PointRef${
            selected ? "--selected" : "--notselected"
          } PointRef${focused ? "--focused" : "--notfocused"}`}
        >
          {element.data.id}.{element.data.attr}
        </span>
      </span>
      {children}
    </span>
  );
};

const InsertPointRef = () => {
  const editor = useEditor();
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault();
        insertPointRef(editor, {
          id: "8a7",
          attr: "y"
        });
      }}
    >
      <Icon>⚫️</Icon>
    </Button>
  );
};

const isImageUrl = url => {
  return true;
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
