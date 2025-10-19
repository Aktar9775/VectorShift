// src/nodes/TextNode.jsx
import { useState, useEffect, useRef } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
// import InputIcon from "@mui/icons-material/Input";

export default function TextNode({ id, data, onDelete }) {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [currText]);

  // Detect variables like {{input}}
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
    const found = [...currText.matchAll(regex)].map((m) => m[1]);
    setVariables(found);
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text Node"
      inputs={variables}       // create handles dynamically
      outputs={["output1"]}
      onDelete={onDelete}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-600">Text Input</span>
        <div className="flex gap-1 text-gray-500">
          {/* <InputIcon fontSize="small" /> */}
          <span title="Handles Not defined yet" style={{ display: "inline-block", cursor: "pointer" }}>
        <DeleteIcon
          fontSize="small"
          onClick={() => onDelete && onDelete(id)}
        />
      </span>

        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        className="w-full min-h-[40px] border border-gray-300 rounded p-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
    </BaseNode>
  );
}
