// src/nodes/MergeNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import MergeTypeIcon from "@mui/icons-material/Functions"; // Icon representing operation

const OPERATIONS = ["Concatenate", "Sum", "Average"];

export default function MergeNode({ id, data, onDelete }) {
  const [nodeName, setNodeName] = useState(
    data?.nodeName || id.replace("customMerge-", "merge_")
  );
  const [operation, setOperation] = useState(data?.operation || "Concatenate");
  const [outputLabel, setOutputLabel] = useState(data?.outputLabel || "result");

  return (
    <BaseNode
      id={id}
      title="Merge Node"
      inputs={["input1", "input2"]} // Can extend dynamically
      outputs={[outputLabel]}
      onDelete={onDelete}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
          <MergeTypeIcon fontSize="small" className="text-purple-600" />
          Merge Node
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
        {/* Node Name */}
        <label className="flex flex-col text-sm">
          Node
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-purple-400 outline-none"
          />
        </label>

        {/* Operation Selector */}
        <div className="flex gap-2 mt-1">
          {OPERATIONS.map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op)}
              className={`px-2 py-1 text-sm rounded border ${
                operation === op
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Output Label */}
        <label className="flex flex-col text-sm">
          Output Label:
          <input
            type="text"
            value={outputLabel}
            onChange={(e) => setOutputLabel(e.target.value)}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-purple-400 outline-none"
          />
        </label>
      </div>
    </BaseNode>
  );
}
