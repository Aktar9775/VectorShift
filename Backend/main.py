from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque
import json, os
from datetime import datetime

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# stores all pipelines
PIPELINE_LOG_FILE = "pipelines.json"

# Make sure file exists
if not os.path.exists(PIPELINE_LOG_FILE):
    with open(PIPELINE_LOG_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)  


@app.get("/")
def home():
    return {"message": "Hello from FastAPI backend!"}


@app.get("/pipelines")
def get_all_pipelines():
    """Return all saved pipelines"""
    with open(PIPELINE_LOG_FILE, "r", encoding="utf-8") as f:
        pipelines = json.load(f)
    return {"pipelines": pipelines}


@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    """Save a new pipeline submission"""
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    submitted_at = data.get("submittedAt", datetime.now().isoformat())




    # DAG Check
    graph = defaultdict(list)
    indegree = defaultdict(int)
    for e in edges:
        src, tgt = e["source"], e["target"]
        graph[src].append(tgt)
        indegree[tgt] += 1

    queue = deque([n["id"] for n in nodes if indegree[n["id"]] == 0])
    visited = 0
    while queue:
        node = queue.popleft()
        visited += 1
        for nb in graph[node]:
            indegree[nb] -= 1
            if indegree[nb] == 0:
                queue.append(nb)

    is_dag = visited == len(nodes)



    # Load existing pipelines
    with open(PIPELINE_LOG_FILE, "r", encoding="utf-8") as f:
        pipelines = json.load(f)



    # Append new pipeline
    new_pipeline = {
        "submittedAt": submitted_at,
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag,
        "nodes": nodes,
        "edges": edges,
    }
    pipelines.append(new_pipeline)



    # Save back 
    with open(PIPELINE_LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(pipelines, f, indent=4)

    print(f"Pipeline saved at {submitted_at}")

    return {
        "message": "Pipeline parsed and saved successfully!",
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag,
    }
