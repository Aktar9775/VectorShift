// src/nodes/WebSearchNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const SEARCH_ENGINES = ["Google", "Bing", "DuckDuckGo", "Yahoo","Edge"];

export default function WebSearchNode({ id, data, onDelete }) {
  const [nodeName, setNodeName] = useState(
    data?.nodeName || id.replace("customWebSearch-", "websearch_")
  );
  const [searchEngine, setSearchEngine] = useState(data?.searchEngine || "Google");
  const [query, setQuery] = useState(data?.query || "");
  const [numResults, setNumResults] = useState(data?.numResults || 5);

  return (
    <BaseNode
      id={id}
      title="Web Search"
      inputs={["trigger"]}
      outputs={["results"]}
      onDelete={onDelete}
    >
    
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
          <SearchIcon fontSize="small" className="text-gray" />
          Web Search
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
          Search
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="border border-gray-300 rounded px-1 py-0.5 mt-1 focus:ring-1 focus:ring-gray-400 outline-none"
          />
        </label>

        {/* Search Engine Tabs */}
        <div className="flex gap-2 mt-1">
          {SEARCH_ENGINES.map((engine) => (
            <button
              key={engine}
              onClick={() => setSearchEngine(engine)}
              className={`px-2 py-1 text-sm rounded border ${
                searchEngine === engine
                  ? "bg-gray-500 text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {engine}
            </button>
          ))}
        </div>

       
       
      </div>
    </BaseNode>
  );
}
