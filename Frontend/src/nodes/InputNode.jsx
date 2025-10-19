// src/nodes/InputNode.jsx
import { useState, useEffect } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import InputIcon from "@mui/icons-material/Input";

export default function InputNode({ id, data, onDelete }) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

 
  const [variables, setVariables] = useState([]);

  
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
    const found = [...currName.matchAll(regex)].map((m) => m[1]);
    setVariables(found);
  }, [currName]);

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode
      id={id}
      title="Input Node"
      inputs={variables} 
      outputs={["value"]}
      onDelete={onDelete}
    >
      {/* Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#555", display: "flex", alignItems: "center", gap: "4px" }}>
          <InputIcon fontSize="small" style={{ color: "#2563eb" }} />
          Source Input
        </span>
        <span
          title="Handles Not defined yet"
          style={{ display: "inline-block", cursor: "pointer" }}
        >
          <DeleteIcon
            fontSize="small"
            onClick={() => onDelete && onDelete(id)}
          />
        </span>
      </div>

      {/* Node Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Name Field */}
        <label style={{ fontSize: "13px", display: "flex", flexDirection: "column" }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            placeholder="Enter name or {{variable}}"
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "4px 6px",
              marginTop: "4px",
              outline: "none",
              fontSize: "13px",
            }}
          />
        </label>

        {/* Type Selector */}
        <label style={{ fontSize: "13px", display: "flex", flexDirection: "column" }}>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "4px 6px",
              marginTop: "4px",
              outline: "none",
              fontSize: "13px",
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
