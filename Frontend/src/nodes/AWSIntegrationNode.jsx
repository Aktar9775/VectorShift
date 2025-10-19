// src/nodes/AWSIntegrationNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudIcon from "@mui/icons-material/Cloud"; // AWS cloud icon

export default function AWSIntegrationNode({ id, data, onDelete }) {
  const [nodeName, setNodeName] = useState(
    data?.nodeName || id.replace("customAWS-", "aws_")
  );
  const [service, setService] = useState(data?.service || "S3");
  const [region, setRegion] = useState(data?.region || "us-east-1");
  const [accessKey, setAccessKey] = useState(data?.accessKey || "");

  const handleNameChange = (e) => setNodeName(e.target.value);
  const handleServiceChange = (e) => setService(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);
  const handleAccessKeyChange = (e) => setAccessKey(e.target.value);

  return (
    <BaseNode
      id={id}
      title="AWS Integration"
      inputs={["trigger"]} // Node can receive a trigger
      outputs={["result"]} // Output result
      onDelete={onDelete}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
          <CloudIcon fontSize="small" className="text-orange-600" />
          AWS Integration
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
        {/* Name */}
        <label className="flex flex-col text-sm">
          Name:
          <input
            type="text"
            value={nodeName}
            onChange={handleNameChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-orange-400 outline-none"
          />
        </label>

        {/* Service */}
        <label className="flex flex-col text-sm">
          AWS Service:
          <select
            value={service}
            onChange={handleServiceChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-orange-400 outline-none"
          >
            <option value="S3">S3</option>
            <option value="DynamoDB">DynamoDB</option>
            <option value="Lambda">Lambda</option>
            <option value="SNS">SNS</option>
          </select>
        </label>

        {/* Region */}
        <label className="flex flex-col text-sm">
          Region:
          <input
            type="text"
            value={region}
            onChange={handleRegionChange}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-orange-400 outline-none"
          />
        </label>

        {/* Access Key */}
        <label className="flex flex-col text-sm">
          Access Key:
          <input
            type="text"
            value={accessKey}
            onChange={handleAccessKeyChange}
            placeholder="Enter AWS Access Key"
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-orange-400 outline-none"
          />
        </label>
      </div>
    </BaseNode>
  );
}
