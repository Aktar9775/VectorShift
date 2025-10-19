// src/nodes/LLMNode.jsx
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import SmartToyIcon from "@mui/icons-material/SmartToy";
export default function LLMNode({ id, data, onDelete }) {
  return (
    <BaseNode
      id={id}
      title="LLM Node"
      inputs={["system", "prompt"]}
      outputs={["response"]}
      onDelete={onDelete}
    >
      {/* Content inside the node */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-600">
          Large Language Model
        </span>
         <span title="Handles Not defined yet" style={{ display: "inline-block", cursor: "pointer" }}>
        <DeleteIcon
          fontSize="small"
          onClick={() => onDelete && onDelete(id)}
        />
      </span>

      </div>

      <div className="text-xs text-gray-700 bg-gray-100 rounded p-2">
       <SmartToyIcon className="text-blue-600" fontSize="large" />
        <span className="text-xs text-gray-600 mt-1">GPT</span>
      </div>
    </BaseNode>
  );
}
