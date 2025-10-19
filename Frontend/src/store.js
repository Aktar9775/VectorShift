// store.js
import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

// Node ID counters (outside store to prevent re-renders)
const nodeIDs = {};

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  // Remove node + connected edges
  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
    });
  },

  // Generate unique node IDs
  getNodeID: (type) => {
    if (!nodeIDs[type]) nodeIDs[type] = 0;
    nodeIDs[type] += 1;
    return `${type}-${nodeIDs[type]}`;
  },

  // Add a new node
  addNode: (node) => set({ nodes: [...get().nodes, node] }),

  // Update nodes on change
  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  // Update edges on change
  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  // Connect nodes
  onConnect: (connection) =>
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        get().edges
      ),
    }),

  // Update a specific field in a node
  updateNodeField: (nodeId, fieldName, fieldValue) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    }),
}));
