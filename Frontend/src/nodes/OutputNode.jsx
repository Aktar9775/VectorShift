// src/nodes/OutputNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OutputNode({ id, data, onDelete }) {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <BaseNode
      id={id}
      title="Output Node"
      inputs={["input1"]}
      outputs={[]} // No outputs for OutputNode
      onDelete={onDelete}
    >
      {/* Node Content */}
      <div className="flex flex-col gap-2">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-600">Output Settings</span>
           <span title="Handles Not defined yet" style={{ display: "inline-block", cursor: "pointer" }}>
        <DeleteIcon
          fontSize="small"
          onClick={() => onDelete && onDelete(id)}
        />
      </span>

        </div>

        {/* Name Input */}
        <label className="flex flex-col text-sm">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </label>

        {/* Type Dropdown */}
        <label className="flex flex-col text-sm">
          Type:
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-blue-400 outline-none"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
