// src/components/Dragnode.jsx
import React from "react";

// You can import icons directly here (or pass them as props)
import InputIcon from "@mui/icons-material/Input";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import OutputIcon from "@mui/icons-material/Output";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SearchIcon from "@mui/icons-material/Search";
import Agent from "@mui/icons-material/Psychology";
import Marge from "@mui/icons-material/merge";
import AWS from "@mui/icons-material/Cloud";


export const Dragnode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
    event.dataTransfer.effectAllowed = "move";
    event.target.style.cursor = "grabbing";
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = "grab";
  };

  // Select icon based on node type
  const getIcon = (type) => {
    switch (type) {
      case "customInput":
        return <InputIcon fontSize="small" className="text-gray-600" />;
      case "llm":
        return <SmartToyIcon fontSize="small" className="text-gray-600" />;
      case "customOutput":
        return <OutputIcon fontSize="small" className="text-gray-600" />;
      case "text":
        return <TextFieldsIcon fontSize="small" className="text-gray-600" />;
      case "websearch":
        return <SearchIcon fontSize="small" className="text-gray-600"/>;  
      case "aws":
        return <AWS fontSize="small" className="text-gray-600"/>;
      case "marge":
        return <Marge fontSize="small" className="text-gray-600"/>;  
      case "agent":
        return <Agent fontSize="small" className="text-gray-600"/>;          
    }
  };

  return (
    <div
      className={type}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      style={{
        cursor: "grab",
        minWidth: "90px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        border: "1px solid #1C2536",
        background: "white",
        padding: "6px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)")}
    >
      {/* Icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {getIcon(type)}
        
        <span style={{ color: "#000", fontSize: "13px", fontWeight: "500" }}>
          {label}
        </span>
      </div>
    </div>
  );
};
