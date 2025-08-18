import { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-2d";
import { sampleGraphData } from "../data/sampleData";
import "./MyceliumGraph.css";

// Color palette constants
const COLORS = {
  CYAN: "#00fff0", // Primary accent
  GOLD: "#FFD700", // Secondary accent
  LIGHT_GRAY: "#E0E0E0", // Text/labels
  DARK_PURPLE: "#1F1B24", // Dark background
  DARKER_PURPLE: "#101822", // Darker background
};

const MyceliumGraph = () => {
  const fgRef = useRef(null);

  useEffect(() => {}, []);
  const [graphData, setGraphData] = useState(sampleGraphData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [animationTime, setAnimationTime] = useState(0);
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 100,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation loop for synchronized breathing network
  useEffect(() => {
    let animationId;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000;
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
      return 4;
    }
    return 1.5;
  };

  const drawNode = (node, ctx, globalScale) => {
    const r = getNodeSize(node);
    const isHovered = hoveredNode === node;

    // Simple glow effect
    ctx.fillStyle = node.color;
    ctx.shadowColor = node.color;
    ctx.shadowBlur = isHovered ? 15 : 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw main node
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw label
    const fontSize = Math.max(8, 10 / globalScale);
    ctx.font = `${fontSize}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = COLORS.LIGHT_GRAY;
    ctx.fillText(node.name, node.x, node.y + r + fontSize + 6);
  };

  const drawLink = (link, ctx, globalScale) => {
    const { source, target, relation } = link;

    if (!source || !target) return;

    // Link styling
    const strokeStyle = relation === "belongs-to" ? COLORS.CYAN : COLORS.GOLD; // TODO
    const lineWidth = relation === "belongs-to" ? 0.3 : 0.2;

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = 0.6;
    ctx.lineCap = "round";

    // Calculate curved path
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let curvature =
      link?.source?.id && link?.target?.id
        ? (link.target.id.charCodeAt(7) / 1000) * 3
        : 0.2;

    if (Number.isNaN(curvature)) {
      curvature = 0.2;
    }

    const controlOffset = distance * curvature;
    const controlX =
      (source.x + target.x) / 2 + (dy / distance) * controlOffset;
    const controlY =
      (source.y + target.y) / 2 - (dx / distance) * controlOffset;

    // Draw curved line
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.quadraticCurveTo(controlX, controlY, target.x, target.y);
    ctx.stroke();

    // Synchronized moving elements (breathing network effect)
    const breathingCycle = 4; // 4 second cycle
    const globalPhase = (animationTime / breathingCycle) % 1; // 0 to 1

    // Create 2-3 moving elements per link
    for (let i = 0; i < 1; i++) {
      const elementPhase = (globalPhase + i * 0.5) % 1; // Offset elements

      // Calculate position along curve
      const t = elementPhase;
      const oneMinusT = 1 - t;

      const elementX =
        oneMinusT * oneMinusT * source.x +
        2 * oneMinusT * t * controlX +
        t * t * target.x;
      const elementY =
        oneMinusT * oneMinusT * source.y +
        2 * oneMinusT * t * controlY +
        t * t * target.y;

      // Draw moving element
      const fadeIn = Math.min(elementPhase * 4, 1);
      const fadeOut = Math.min((1 - elementPhase) * 4, 1);
      const elementAlpha = fadeIn * fadeOut * 0.8;

      ctx.globalAlpha = elementAlpha;
      ctx.fillStyle = strokeStyle;
      ctx.shadowColor = strokeStyle;
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.arc(elementX, elementY, 0.5, 0, 2 * Math.PI);
      ctx.fill();
    }

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
        backgroundColor={COLORS.DARKER_PURPLE}
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
        linkCurvature={0.2}
        nodeLabel="id"
        cooldownTicks={100}
        linkDistance={100}
        chargeStrength={-300}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />

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
