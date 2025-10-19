// src/nodes/AgentNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";

const AGENT_TYPES = ["GPT", "Rule-Based", "Custom"];

export default function AgentNode({ id, data, onDelete }) {
  const [nodeName, setNodeName] = useState(
    data?.nodeName || id.replace("customAgent-", "agent_")
  );
  const [agentType, setAgentType] = useState(data?.agentType || "GPT");
  const [initialPrompt, setInitialPrompt] = useState(data?.initialPrompt || "");
  const [outputLabel, setOutputLabel] = useState(data?.outputLabel || "response");

  return (
    <BaseNode
      id={id}
      title="Conversational Agent"
      inputs={["trigger", "userInput"]}
      outputs={[outputLabel]}
      onDelete={onDelete}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
          <ChatIcon fontSize="small" className="text-indigo-600" />
          Conversational Agent
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
          Name:
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-indigo-400 outline-none"
          />
        </label>

        {/* Agent Type Tabs */}
        <div className="flex gap-2 mt-1">
          {AGENT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setAgentType(type)}
              className={`px-2 py-1 text-sm rounded border ${
                agentType === type
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Initial Prompt */}
        <label className="flex flex-col text-sm mt-2">
          Initial Prompt:
          <textarea
            value={initialPrompt}
            onChange={(e) => setInitialPrompt(e.target.value)}
            placeholder="Enter initial message or system prompt"
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-indigo-400 outline-none resize-none"
            rows={3}
          />
        </label>

        {/* Output Label */}
        <label className="flex flex-col text-sm">
          Output Label:
          <input
            type="text"
            value={outputLabel}
            onChange={(e) => setOutputLabel(e.target.value)}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-indigo-400 outline-none"
          />
        </label>
      </div>
    </BaseNode>
  );
}
