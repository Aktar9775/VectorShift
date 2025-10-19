// submit.js

export const handleSubmit = async (nodes, edges) => {
  try {
    const pipelineData = {
      nodes,
      edges,
      submittedAt: new Date().toISOString(),
    };

    console.log("📤 Sending pipeline data to FastAPI:", pipelineData);

    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pipelineData),
    });

    if (!response.ok) {
      throw new Error(`❌ Server error: ${response.status}`);
    }

    const result = await response.json();

    console.log("✅ Server response:", result);
    alert(
      `✅ Pipeline submitted!\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`
    );
  } catch (error) {
    console.error("❌ Error submitting pipeline:", error);
    alert("Failed to submit pipeline. Check console for details.");
  }
};
