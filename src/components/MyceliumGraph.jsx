import { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { sampleGraphData } from "../data/sampleData";
import "./MyceliumGraph.css";
import * as THREE from "three";

import * as d3 from "d3-force";
const MyceliumGraph = () => {
  const fgRef = useRef(null);

  useEffect(() => {
    const fg = fgRef.current;
    if (fg) {
      // Set up 3D forces only - no bloom effect
      fg.d3Force("charge").strength(-300).distanceMax(500);
      fg.d3Force("link")
        .distance((l) => (l.type === "dept" ? 150 : 80))
        .strength(0.4);
      fg.d3Force(
        "collide",
        d3.forceCollide((n) => getNodeSize(n) + 5),
      );
    }
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

  // Very simple animation loop for hover effects only
  useEffect(() => {
    let animationId;

    const animate = () => {
      // Update only hover opacity (very simple)
      if (fgRef.current) {
        const scene = fgRef.current.scene();
        if (scene) {
          scene.traverse((object) => {
            if (object.userData && object.userData.material) {
              object.userData.material.opacity = object.userData.isHovered()
                ? 1.0
                : 0.8;
            }
          });
        }
      }

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

  const createNodeObject = (node) => {
    const r = getNodeSize(node);
    const isHovered = hoveredNode === node;

    // Simple sphere geometry
    const geometry = new THREE.SphereGeometry(r, 16, 12);

    // Simple material with basic properties
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(node.color),
      transparent: true,
      opacity: isHovered ? 1.0 : 0.8,
    });

    const sphere = new THREE.Mesh(geometry, material);

    // Store reference for hover updates
    sphere.userData = {
      node,
      isHovered: () => hoveredNode === node,
      material,
    };

    return sphere;
  };

  const createLinkObject = (link) => {
    const { source, target, relation, strength = 1 } = link;

    if (!source || !target) return null;

    // Get link properties - New color palette
    // #00fff0 (Cyan), #FFD700 (Gold), #E0E0E0 (Light Gray), #1F1B24 (Dark), #101822 (Darker), #4B0082 (Indigo)
    let color = "#00fff0";
    let lineWidth = 1;
    let pulseSpeed = 1;
    let pulseCount = 1;

    switch (relation) {
      case "belongs-to":
        color = "#E0E0E0"; // Light gray for hierarchical connections
        lineWidth = 2;
        pulseSpeed = 0.5;
        pulseCount = 1;
        break;
      case "collaboration":
        color = "#FFD700"; // Gold for active collaboration
        lineWidth = 1.5;
        pulseSpeed = 1.2;
        pulseCount = 2;
        break;
      case "introvert-connection":
      case "extrovert-connection":
        color = "#4B0082"; // Indigo for personality connections
        lineWidth = 1;
        pulseSpeed = 0.8;
        pulseCount = 1;
        break;
      case "openness-similarity":
      case "creative-synergy":
        color = "#00fff0"; // Bright cyan for creative connections
        lineWidth = 1;
        pulseSpeed = 1.5;
        pulseCount = 3;
        break;
      case "complementary-traits":
        color = "#4B0082"; // Indigo for complementary traits
        lineWidth = 1;
        pulseSpeed = 0.6;
        pulseCount = 1;
        break;
      case "high-conscientiousness":
        color = "#E0E0E0"; // Light gray for conscientiousness
        lineWidth = 1;
        pulseSpeed = 0.4;
        pulseCount = 1;
        break;
      case "leadership-connection":
        color = "#FFD700"; // Gold for leadership
        lineWidth = 1.5;
        pulseSpeed = 1.8;
        pulseCount = 2;
        break;
      case "mentorship":
        color = "#00fff0"; // Cyan for mentorship
        lineWidth = 1.2;
        pulseSpeed = 0.7;
        pulseCount = 1;
        break;
      default:
        color = "#E0E0E0"; // Light gray default
        pulseSpeed = 1;
        pulseCount = 1;
    }

    // Create curved path
    const start = new THREE.Vector3(source.x, source.y, source.z || 0);
    const end = new THREE.Vector3(target.x, target.y, target.z || 0);
    const middle = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);

    // Add curvature by offsetting the middle point
    const direction = new THREE.Vector3().subVectors(end, start);
    const perpendicular = new THREE.Vector3(
      -direction.y,
      direction.x,
      direction.z * 0.3,
    ).normalize();
    middle.add(perpendicular.multiplyScalar(direction.length() * 0.2));

    // Create curve
    const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.4 + 0.2 * strength,
      linewidth: lineWidth,
    });

    const line = new THREE.Line(geometry, material);

    // Create pulse spheres group
    const pulseGroup = new THREE.Group();

    // Store data for animation
    line.userData = {
      curve,
      color,
      pulseSpeed,
      pulseCount,
      linkPhase:
        (String(source.id) + String(target.id))
          .split("")
          .reduce((a, b) => a + b.charCodeAt(0), 0) * 0.01,

      pulseGroup,
    };

    const linkGroup = new THREE.Group();
    linkGroup.add(line);
    linkGroup.add(pulseGroup);

    return line;
  };

  return (
    <div className="mycelium-graph-container">
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#101822"
        nodeThreeObject={createNodeObject}
        linkThreeObject={createLinkObject}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={handleBackgroundClick}
        nodeRelSize={1}
        linkWidth={0}
        linkCurvature={.31}
      linkCurveRotation={.11}
      linkDirectionalParticles={1}
      linkDirectionalParticleOffset={.1}
      linkDirectionalParticleSpeed={.0081}
      linkDirectionalParticleWidth={4}
      linkDirectionalParticleColor = {'#00FFF0'}
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
