import React, { useCallback } from "react";
import { Dragnode } from "./Dragnode";
import { handleSubmit } from "./submit";
import { useStore } from "./store";

// Material UI icons
import InputIcon from "@mui/icons-material/Input";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloudIcon from "@mui/icons-material/Cloud";
import OutputIcon from "@mui/icons-material/Output";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoogleIcon from "@mui/icons-material/Google";

export default function ToolbarItem() {
  // ✅ Directly access Zustand’s getState (no subscriptions, no re-render loop)
  const get = useStore.getState;

  // ✅ Memoized handler — reads current nodes/edges only when clicked
  const handleClick = useCallback(() => {
    const { nodes, edges } = get();
    handleSubmit(nodes, edges);
  }, [get]);

  return (
    <div className="p-3 bg-gray-100 border-b border-gray-300 shadow-sm">
      <div className="flex flex-wrap items-center justify-between">
        {/* Node Buttons */}
        <div className="flex flex-wrap gap-2">
          <Dragnode type="customInput" label="Input" icon={InputIcon} />
          <Dragnode type="llm" label="LLM" icon={SmartToyIcon} />
          <Dragnode type="customOutput" label="Output" icon={OutputIcon} />
          <Dragnode type="text" label="Text" icon={TextFieldsIcon} />
          <Dragnode type="aws" label="AWS" icon={CloudIcon} />
          <Dragnode type="websearch" label="Web Search" icon={SearchIcon} />
          <Dragnode type="marge" label="Marge" icon={YouTubeIcon} />
          <Dragnode type="agent" label="Agent" icon={GoogleIcon} />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
