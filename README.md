# Mycelium Organization Graph

An interactive, mycelium-inspired organizational graph built with React that visualizes team structures and personality connections.

## Features

- **Interactive Force-Directed Graph**: Drag, zoom, and pan to explore the organizational network
- **Dual Node Types**: 
  - Department nodes (hexagonal, larger) representing organizational units
  - Person nodes (organic circular) representing team members
- **Personality Integration**: Displays Myers-Briggs, Big Five (OCEAN), and Enneagram data
- **Mycelium-Inspired Design**: Organic edges, glowing effects, and branching connections
- **Dynamic Connections**: Different edge types for department membership, collaboration, and personality similarities
- **Interactive Details Panel**: Click nodes to view detailed information and personality metrics

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Start the development server with `npm run dev`
2. Open http://localhost:5173 in your browser
3. Interact with the graph:
   - **Click** nodes to see detailed information
   - **Drag** nodes to reposition them
   - **Zoom** and **pan** to navigate the network
   - **Click background** to deselect and zoom to fit

## Data Structure

The graph uses a JSON format with nodes and links:

```javascript
{
  "nodes": [
    {
      "id": "person-1",
      "type": "person",
      "name": "Alice Chen",
      "role": "Senior Engineer",
      "mbti": "INTJ",
      "ocean": { "openness": 0.85, ... },
      "enneagram": "5w4"
    },
    {
      "id": "dept-1",
      "type": "department", 
      "name": "Engineering"
    }
  ],
  "links": [
    {
      "source": "person-1",
      "target": "dept-1",
      "relation": "belongs-to",
      "strength": 1.0
    }
  ]
}
```

## Edge Types

- **belongs-to**: Department membership (solid, bright)
- **collaboration**: Cross-functional collaboration (red, medium)
- **personality connections**: Various psychological similarities (colored, dashed)
- **complementary-traits**: Balancing personality differences (purple, dotted)

## Customization

Edit `/src/data/sampleData.js` to modify the organizational structure and personality data.

## Technology Stack

- React 18
- Vite
- react-force-graph
- D3.js
- CSS3 with custom animations and effects

## Browser Support

Modern browsers with Canvas and WebGL support recommended for optimal performance.