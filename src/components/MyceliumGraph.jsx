import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { sampleGraphData } from "../data/sampleData";
import "./MyceliumGraph.css";

import * as d3 from "d3-force";
const MyceliumGraph = () => {
  const fgRef = useRef(null);

  useEffect(() => {
    const fg = fgRef.current;
    fg.d3Force("charge").strength(-160).distanceMax(360);
    fg.d3Force("link")
      .distance((l) => (l.type === "dept" ? 200 : 100))
      .strength(0.5);
    fg.d3Force(
      "collide",
      d3.forceCollide((n) => getNodeSize(n) + 2),
    ); // prevents node overlap
    // optional: cluster people around their department
    // fg.d3Force('deptRadial', d3.forceRadial(n => n.dept?.radius||0, n.dept?.x||0, n.dept?.y||0).strength(0.05));
  }, []);
  const [graphData, setGraphData] = useState(sampleGraphData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 100, // Account for header
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Initialize graph positioning
  useEffect(() => {
    if (fgRef.current) {
      // Wait for graph to stabilize, then zoom to fit
      setTimeout(() => {
        fgRef.current.zoomToFit(1000, 50);
      }, 2000);
    }
  }, [graphData]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    // Center the camera on the clicked node
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(8, 2000);
    }
  };

  const handleNodeHover = (node) => {
    document.body.style.cursor = node ? "pointer" : "default";
  };

  const handleBackgroundClick = () => {
    setSelectedNode(null);
    if (fgRef.current) {
      fgRef.current.zoomToFit(1000);
    }
  };

  const getNodeSize = (node) => {
    if (node.type === "department") {
      return node.size || 12;
    }
    return node.size || 4;
  };

  const drawNode = (node, ctx, globalScale) => {
    const r = getNodeSize(node);

    ctx.fillStyle = node.color;
    ctx.shadowColor = node.color;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);

    ctx.fill();

    ctx.shadowBlur = 0;

    const fontSize = Math.max(8, 10 / globalScale);
    ctx.font = `${fontSize}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = 3;
    ctx.strokeText(node.name, node.x, node.y + r + fontSize + 6);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(node.name, node.x, node.y + r + fontSize + 6);
  };

  const drawLink = (link, ctx, globalScale) => {
    const { source, target, relation, strength = 1 } = link;

    if (!source || !target) return;

    // Calculate link properties based on relation type
    let strokeStyle = "#64ffda";
    let lineWidth = 1;

    switch (relation) {
      case "belongs-to":
        strokeStyle = "#64ffda";
        lineWidth = 2;
        break;
      case "collaboration":
        strokeStyle = "#ff6b6b";
        lineWidth = 1.5;
        break;
      case "introvert-connection":
      case "extrovert-connection":
        strokeStyle = "#4ecdc4";
        lineWidth = 1;
        break;
      case "openness-similarity":
      case "creative-synergy":
        strokeStyle = "#ffd93d";
        lineWidth = 1;
        break;
      case "complementary-traits":
        strokeStyle = "#6c5ce7";
        lineWidth = 1;
        break;
      case "high-conscientiousness":
        strokeStyle = "#90ee90";
        lineWidth = 1;
        break;
      case "leadership-connection":
        strokeStyle = "#ffa500";
        lineWidth = 1.5;
        break;
      case "mentorship":
        strokeStyle = "#20b2aa";
        lineWidth = 1.2;
        break;
      default:
        strokeStyle = "#64ffda";
    }

    // Set drawing properties
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = 0.7 + 0.3 * strength;
    ctx.shadowColor = strokeStyle;
    ctx.shadowBlur = 5;

    // Draw straight line (simplified)
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();

    // Reset properties
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  return (
    <div className="mycelium-graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#121212"
        nodeCanvasObject={drawNode}
        nodeCanvasObjectMode={() => "replace"}
        nodePointerAreaPaint={(node, color, ctx) => {
          const r = getNodeSize(node); // same as drawNode
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);

          ctx.fillStyle = color; // required: lib samples this color
          ctx.fill();
        }}
        linkCanvasObject={drawLink}
        linkCurvature={(l) => (l.type === "interDept" ? 0.5 : 0.9)}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={handleBackgroundClick}
        nodeRelSize={1}
        linkWidth={0}
        nodeLabel=""
        cooldownTicks={300}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.15}
        d3ReheatSimulation={false}
        linkDistance={200}
        linkStrength={0.3}
        chargeStrength={-500}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />

      {/* Legend/Key */}
      <div className="legend-container">
        <div className="legend-section">
          <h4>Departments</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#64ffda"}}></div>
              <span>Engineering</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#ff6b6b"}}></div>
              <span>Design</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#4ecdc4"}}></div>
              <span>Product</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#45b7d1"}}></div>
              <span>Marketing</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#a8e6cf"}}></div>
              <span>Sales</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#ffb347"}}></div>
              <span>HR</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{backgroundColor: "#dda0dd"}}></div>
              <span>Finance</span>
            </div>
          </div>
        </div>

        <div className="legend-section">
          <h4>Connections</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#64ffda", width: "20px", height: "2px"}}></div>
              <span>Department</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#ff6b6b", width: "20px", height: "1.5px"}}></div>
              <span>Collaboration</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#4ecdc4", width: "20px", height: "1px"}}></div>
              <span>Personality Match</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#ffd93d", width: "20px", height: "1px"}}></div>
              <span>Creative Synergy</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#6c5ce7", width: "20px", height: "1px"}}></div>
              <span>Complementary</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#ffa500", width: "20px", height: "1.5px"}}></div>
              <span>Leadership</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{backgroundColor: "#20b2aa", width: "20px", height: "1.2px"}}></div>
              <span>Mentorship</span>
            </div>
          </div>
        </div>
      </div>

      {selectedNode && (
        <div className="node-details-panel">
          <button
            className="close-button"
            onClick={() => setSelectedNode(null)}
          >
            ×
          </button>
          <h3>{selectedNode.name}</h3>
          {selectedNode.type === "person" && (
            <div className="person-details">
              <p>
                <strong>Role:</strong> {selectedNode.role}
              </p>
              <p>
                <strong>Department:</strong> {selectedNode.department}
              </p>
              <p>
                <strong>MBTI:</strong> {selectedNode.mbti}
              </p>
              <p>
                <strong>Enneagram:</strong> {selectedNode.enneagram}
              </p>
              {selectedNode.ocean && (
                <div className="ocean-scores">
                  <h4>Big Five (OCEAN) Scores:</h4>
                  <div className="trait-bars">
                    {Object.entries(selectedNode.ocean).map(
                      ([trait, score]) => (
                        <div key={trait} className="trait-bar">
                          <span className="trait-name">
                            {trait.charAt(0).toUpperCase() + trait.slice(1)}:
                          </span>
                          <div className="bar-container">
                            <div
                              className="bar-fill"
                              style={{ width: `${score * 100}%` }}
                            ></div>
                          </div>
                          <span className="trait-score">
                            {Math.round(score * 100)}%
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedNode.type === "department" && (
            <div className="department-details">
              <p>
                <strong>Type:</strong> Department
              </p>
              <p>
                Core organizational unit representing the {selectedNode.name}{" "}
                function.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyceliumGraph;
