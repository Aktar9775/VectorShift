// src/nodes/InputNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import InputIcon from "@mui/icons-material/Input"; // Optional visual icon

export default function InputNode({ id, data, onDelete }) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode
      id={id}
      title="Input Node"
      inputs={[]} 
      outputs={["value"]} 
      onDelete={onDelete}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
          <InputIcon fontSize="small" className="text-blue-600" />
          Source Input
        </span>
        <span title="Handles Not defined yet" style={{ display: "inline-block", cursor: "pointer" }}>
        <DeleteIcon
          fontSize="small"
          onClick={() => onDelete && onDelete(id)}
        />
      </span>




      </div>

      {/* Node Content */}
      <div className="flex flex-col gap-2">
        {/* Name Field */}
        <label className="flex flex-col text-sm">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </label>

        {/* Type Selector */}
        <label className="flex flex-col text-sm">
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-blue-400 outline-none"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
