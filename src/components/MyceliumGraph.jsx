import { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-2d";
import { sampleGraphData } from "../data/sampleData";
import "./MyceliumGraph.css";
import { UnrealBloomPass } from "https://esm.sh/three/examples/jsm/postprocessing/UnrealBloomPass.js";

import * as d3 from "d3-force";
const MyceliumGraph = () => {
  const fgRef = useRef(null);

  useEffect(() => {
  }, []);
  const [graphData, setGraphData] = useState(sampleGraphData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [animationTime, setAnimationTime] = useState(0);

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

  // Animation loop for dynamic glow effects
  useEffect(() => {
    let animationId;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000; // Convert to seconds
      setAnimationTime(currentTime);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
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
    setHoveredNode(node);
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
    const isHovered = hoveredNode === node;

    // Create unique animation phase for each node based on its ID
    const nodePhase = (node.id ? node.id.charCodeAt(8) : 0) * 0.1;
    const time = animationTime + nodePhase;

    // Dynamic glow calculations
    const basePulse = 0.8 + 0.2 * Math.sin(time * 1.5); // Breathing effect
    const organicVariation = 0.9 + 0.1 * Math.sin(time * 2.3 + nodePhase); // Organic movement
    const microFlicker = 0.95 + 0.05 * Math.sin(time * 8 + nodePhase); // Subtle flicker

    // Combine all animation factors
    const glowIntensity = basePulse * organicVariation * microFlicker;

    // Base glow effect with animation
    const baseGlowSize = isHovered ? 25 : 12 + 8 * glowIntensity;
    const glowAlpha = isHovered ? 1 : 0.6 + 0.3 * glowIntensity;

    ctx.fillStyle = node.color;
    ctx.shadowColor = node.color;
    ctx.shadowBlur = baseGlowSize;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.globalAlpha = glowAlpha;

    // helper: triangle wave in [0,1]
    const pingPong = (t) => 1 - Math.abs((t % 1) * 2 - 1);

    if (!isHovered) {
      const period = 6.8; // seconds per expand+contract
      const minR = r + 4,
        maxR = r + 14;

      const phase = (time + nodePhase * 0.5) / period;
      const p = pingPong(phase); // 0 → 1 → 0

      const outerRingSize = minR + (maxR - minR) * p;

      // Alpha fades in mid-animation, 0 at collapse/expand edges
      const outerRingAlpha = Math.sin(p * Math.PI);

      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = outerRingAlpha;

      ctx.beginPath();
      ctx.arc(node.x, node.y, outerRingSize, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      // Enhanced hover effect with multiple rings
      const hoverRing1 = r + 8 + 4 * Math.sin(time * 3 + nodePhase);
      const hoverRing2 = r + 16 + 6 * Math.sin(time * 2 + nodePhase);

      // Inner hover ring
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.4 + 0.2 * Math.sin(time * 2.5);

      ctx.beginPath();
      ctx.arc(node.x, node.y, hoverRing1, 0, 2 * Math.PI);
      ctx.stroke();

      // Outer hover ring
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.2 + 0.1 * Math.sin(time * 1.8);

      ctx.beginPath();
      ctx.arc(node.x, node.y, hoverRing2, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Reset alpha for main node
    ctx.globalAlpha = 1;

    // Draw main node
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fill();

    // Reset shadow
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
    let lineWidth = .3;
    let pulseSpeed = 1;
    let pulseCount = 1;

    switch (relation) {
      case "belongs-to":
        strokeStyle = "#64ffda";
        lineWidth = 2;
        pulseSpeed = 0.5;
        pulseCount = 1;
        break;
      case "collaboration":
        strokeStyle = "#ff6b6b";
        lineWidth = 1.5;
        pulseSpeed = 1.2;
        pulseCount = 2;
        break;
      case "introvert-connection":
      case "extrovert-connection":
        strokeStyle = "#4ecdc4";
        lineWidth = 1;
        pulseSpeed = 0.8;
        pulseCount = 1;
        break;
      case "openness-similarity":
      case "creative-synergy":
        strokeStyle = "#ffd93d";
        lineWidth = 1;
        pulseSpeed = 1.5;
        pulseCount = 3;
        break;
      case "complementary-traits":
        strokeStyle = "#6c5ce7";
        lineWidth = 1;
        pulseSpeed = 0.6;
        pulseCount = 1;
        break;
      case "high-conscientiousness":
        strokeStyle = "#90ee90";
        lineWidth = 1;
        pulseSpeed = 0.4;
        pulseCount = 1;
        break;
      case "leadership-connection":
        strokeStyle = "#ffa500";
        lineWidth = 1.5;
        pulseSpeed = 1.8;
        pulseCount = 2;
        break;
      case "mentorship":
        strokeStyle = "#20b2aa";
        lineWidth = 1.2;
        pulseSpeed = 0.7;
        pulseCount = 1;
        break;
      default:
        strokeStyle = "#64ffda";
        pulseSpeed = 1;
        pulseCount = 1;
    }

    // Draw base line with reduced opacity and rounded caps
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = 0.3 + 0.2 * strength;
    ctx.shadowColor = strokeStyle;
    ctx.shadowBlur = 3;
    ctx.lineCap = "round";

    // Calculate curved path
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point for curve (perpendicular to line)
    const curvature = 0.3; // Adjust this value to control curve amount (0 = straight, higher = more curved)
    const controlOffset = distance * curvature;
    const controlX = (source.x + target.x) / 2 + dy / distance * controlOffset;
    const controlY = (source.y + target.y) / 2 - dx / distance * controlOffset;
    
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.quadraticCurveTo(controlX, controlY, target.x, target.y);
    ctx.stroke();

    // Calculate line properties for pulse animation (reuse curve calculations)
    // dx, dy, distance, controlX, controlY already calculated above

    // Create unique phase for this link
    const linkPhase =
      (source.id + target.id)
        .split("")
        .reduce((a, b) => a + b.charCodeAt(0), 0) * 0.01;

    // Draw animated pulses
    for (let i = 0; i < pulseCount; i++) {
      const pulsePhase =
        (animationTime * pulseSpeed + linkPhase + i * 1.2) % 2.5; // Faster 2.5-second cycle

      // Only show pulse for part of the cycle
      if (pulsePhase < 2) {
        // Calculate position along the curve
        const progress = pulsePhase / 2; // 0 to 1 along the curve
        
        // Use quadratic Bezier curve formula: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
        const t = progress;
        const oneMinusT = 1 - t;
        
        const pulseX = oneMinusT * oneMinusT * source.x + 
                      2 * oneMinusT * t * controlX + 
                      t * t * target.x;
        const pulseY = oneMinusT * oneMinusT * source.y + 
                      2 * oneMinusT * t * controlY + 
                      t * t * target.y;

        // Pulse appearance - brighter and bigger at center, fading at edges
        const fadeIn = Math.min(progress * 6, 1); // faster fade in
        const fadeOut = Math.min((1 - progress) * 6, 1); // faster fade out
        const pulseFade = fadeIn * fadeOut;

        // Check for periodic large pulse (every ~8 seconds)
        const largePulsePhase = (animationTime * pulseSpeed + linkPhase) % 8;
        const isLargePulse = largePulsePhase < 0.3; // Large pulse for brief moment

        // Adjust size and opacity based on pulse type
        const baseSize = isLargePulse ? 4 : 2;
        const maxSize = isLargePulse ? 7 : 3;
        const baseOpacity = isLargePulse ? 0.6 : 0.3;

        // Draw pulse as a glowing circle
        ctx.globalAlpha = pulseFade * baseOpacity;
        ctx.fillStyle = strokeStyle;
        ctx.shadowColor = strokeStyle;
        ctx.shadowBlur = isLargePulse ? 12 : 6;

        ctx.beginPath();
        ctx.arc(
          pulseX,
          pulseY,
          baseSize + pulseFade * (maxSize - baseSize),
          0,
          2 * Math.PI,
        );
        ctx.fill();
      }
    }

    // Reset properties
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  return (
    <div className="mycelium-graph-container">
      <ForceGraph3D
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
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={handleBackgroundClick}
        nodeRelSize={1}
        linkWidth={0}
        linkCurvature={1}
        nodeLabel="id"
        cooldownTicks={300}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.15}
        d3ReheatSimulation={false}
        linkDistance={7000}
        linkStrength={0.1}
        chargeStrength={-100}
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
              <div
                className="legend-dot"
                style={{ backgroundColor: "#64ffda" }}
              ></div>
              <span>Engineering</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ backgroundColor: "#ff6b6b" }}
              ></div>
              <span>Design</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ backgroundColor: "#4ecdc4" }}
              ></div>
              <span>Product</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ backgroundColor: "#45b7d1" }}
              ></div>
              <span>Marketing</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ backgroundColor: "#a8e6cf" }}
              ></div>
              <span>Sales</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ backgroundColor: "#ffb347" }}
              ></div>
              <span>HR</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ backgroundColor: "#dda0dd" }}
              ></div>
              <span>Finance</span>
            </div>
          </div>
        </div>

        <div className="legend-section">
          <h4>Connections</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#64ffda",
                  width: "20px",
                  height: "2px",
                }}
              ></div>
              <span>Department</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#ff6b6b",
                  width: "20px",
                  height: "1.5px",
                }}
              ></div>
              <span>Collaboration</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#4ecdc4",
                  width: "20px",
                  height: "1px",
                }}
              ></div>
              <span>Personality Match</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#ffd93d",
                  width: "20px",
                  height: "1px",
                }}
              ></div>
              <span>Creative Synergy</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#6c5ce7",
                  width: "20px",
                  height: "1px",
                }}
              ></div>
              <span>Complementary</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#ffa500",
                  width: "20px",
                  height: "1.5px",
                }}
              ></div>
              <span>Leadership</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-line"
                style={{
                  backgroundColor: "#20b2aa",
                  width: "20px",
                  height: "1.2px",
                }}
              ></div>
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
