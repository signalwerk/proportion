import React from "react";
import { Transforms } from "slate";
import { useSelected, useFocused, useEditor } from "slate-react";
import { Icon, Button } from "./components";

export const withPointRefs = editor => {
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === "pointRef" ? true : isVoid(element);
  };

  return editor;
};

export const PointRef = ({ attributes, children, element }) => {
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
          <span className="PointRef__type">P</span>.<span className="PointRef__id">{element.data.id}</span>.<span className="PointRef__attr">{element.data.attr}</span>
        </span>
      </span>
      {children}
    </span>
  );
};

export const insertPointRef = (editor, data) => {
  const text = { text: "" };
  const pointRef = { type: "pointRef", data, children: [text] };
  Transforms.insertNodes(editor, pointRef);
};

export const InsertPointRefBtn = () => {
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
