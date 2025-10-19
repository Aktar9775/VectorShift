// src/nodes/BaseNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function BaseNode({
  id,
  title,
  inputs = [],
  outputs = [],
  onDelete,
  children,
}) {
  return (
    <div className="relative p-3 min-w-[180px] rounded-xl border border-gray-300 bg-white shadow-md">
      {/* Title */}
      <h3 className="text-center text-sm font-semibold mb-2">{title}</h3>

      {/* Delete Button */}
      

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={index}
          type="target"
          id={`${id}-${input}`}
          position={Position.Left}
          className="!bg-blue-500"
        />
      ))}

      {/* Inner content (like textarea, inputs, etc.) */}
      <div>{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={index}
          type="source"
          id={`${id}-${output}`}
          position={Position.Right}
          className="!bg-green-500"
        />
      ))}
    </div>
  );
}
