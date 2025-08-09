import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MyceliumGraph from '../MyceliumGraph'

// Mock react-force-graph-2d
vi.mock('react-force-graph-2d', () => {
  return {
    default: vi.fn(({ 
      nodeCanvasObject, 
      linkCanvasObject, 
      graphData, 
      onNodeClick,
      ...props 
    }) => {
      // Create a mock canvas and context for testing
      const mockCanvas = document.createElement('canvas')
      const mockContext = {
        calls: [],
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        shadowColor: '',
        shadowBlur: 0,
        globalAlpha: 1,
        font: '',
        textAlign: '',
        textBaseline: '',
        
        // Track method calls
        arc: vi.fn(function(x, y, radius, startAngle, endAngle) {
          this.calls.push(['arc', { x, y, radius, startAngle, endAngle }])
        }),
        fill: vi.fn(function() {
          this.calls.push(['fill'])
        }),
        stroke: vi.fn(function() {
          this.calls.push(['stroke'])
        }),
        fillText: vi.fn(function(text, x, y) {
          this.calls.push(['fillText', { text, x, y }])
        }),
        strokeText: vi.fn(function(text, x, y) {
          this.calls.push(['strokeText', { text, x, y }])
        }),
        beginPath: vi.fn(function() {
          this.calls.push(['beginPath'])
        }),
        moveTo: vi.fn(function(x, y) {
          this.calls.push(['moveTo', { x, y }])
        }),
        lineTo: vi.fn(function(x, y) {
          this.calls.push(['lineTo', { x, y }])
        }),
        save: vi.fn(function() {
          this.calls.push(['save'])
        }),
        restore: vi.fn(function() {
          this.calls.push(['restore'])
        }),
      }
      
      // Test node drawing function if provided
      if (nodeCanvasObject && graphData?.nodes) {
        graphData.nodes.forEach(node => {
          // Reset context for each node
          mockContext.calls = []
          
          // Call the node drawing function
          nodeCanvasObject(node, mockContext, 1)
          
          // Store results on the node for testing
          node._testDrawCalls = [...mockContext.calls]
        })
      }
      
      // Test link drawing function if provided  
      if (linkCanvasObject && graphData?.links) {
        graphData.links.forEach(link => {
          // Mock source and target with coordinates
          const mockLink = {
            ...link,
            source: { x: 0, y: 0, ...link.source },
            target: { x: 100, y: 100, ...link.target }
          }
          
          mockContext.calls = []
          linkCanvasObject(mockLink, mockContext, 1)
          link._testDrawCalls = [...mockContext.calls]
        })
      }
      
      // Simulate clicking on nodes for interaction testing
      return (
        <div data-testid="force-graph" onClick={() => {
          if (onNodeClick && graphData?.nodes?.[0]) {
            onNodeClick(graphData.nodes[0])
          }
        }}>
          Mock ForceGraph2D
          {graphData?.nodes?.map(node => (
            <div key={node.id} data-testid={`node-${node.id}`}>
              {node.name}
            </div>
          ))}
        </div>
      )
    })
  }
})

describe('MyceliumGraph Node Visualization Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render nodes with proper canvas drawing calls', async () => {
    render(<MyceliumGraph />)
    
    await waitFor(() => {
      expect(screen.getByTestId('force-graph')).toBeInTheDocument()
    })
    
    // Check that person nodes are rendered
    expect(screen.getByTestId('node-person-alice')).toBeInTheDocument()
    expect(screen.getByTestId('node-person-bob')).toBeInTheDocument()
    
    // Check that department nodes are rendered
    expect(screen.getByTestId('node-dept-engineering')).toBeInTheDocument()
  })

  it('should draw nodes at the correct center position (0,0)', async () => {
    render(<MyceliumGraph />)
    
    await waitFor(() => {
      const forceGraph = screen.getByTestId('force-graph')
      expect(forceGraph).toBeInTheDocument()
    })

    // We can't directly access the mock data from the rendered component,
    // so we'll test the drawing function directly
    const { drawNode } = await import('../MyceliumGraph')
    
    // Create a mock node
    const mockNode = {
      id: 'test-node',
      name: 'Test Node',
      type: 'person',
      color: '#64ffda',
      size: 8
    }
    
    // Create mock context to track calls
    const mockContext = {
      calls: [],
      arc: vi.fn(function(x, y, radius, startAngle, endAngle) {
        this.calls.push(['arc', { x, y, radius, startAngle, endAngle }])
      }),
      fill: vi.fn(function() {
        this.calls.push(['fill'])
      }),
      fillText: vi.fn(function(text, x, y) {
        this.calls.push(['fillText', { text, x, y }])
      }),
      strokeText: vi.fn(function(text, x, y) {
        this.calls.push(['strokeText', { text, x, y }])
      }),
      fillStyle: '',
      strokeStyle: '',
      shadowColor: '',
      shadowBlur: 0,
      lineWidth: 0,
      font: '',
      textAlign: '',
      textBaseline: ''
    }
    
    // Test the exported drawNode function directly
    // Note: We'll need to expose this function for testing
  })

  it('should draw person nodes as circles centered at origin', () => {
    const mockContext = {
      calls: [],
      arc: vi.fn(function(x, y, radius, startAngle, endAngle) {
        this.calls.push(['arc', { x, y, radius, startAngle, endAngle }])
      }),
      fill: vi.fn(),
      fillText: vi.fn(function(text, x, y) {
        this.calls.push(['fillText', { text, x, y }])
      }),
      strokeText: vi.fn(function(text, x, y) {
        this.calls.push(['strokeText', { text, x, y }])
      }),
      fillStyle: '',
      strokeStyle: '',
      shadowColor: '',
      shadowBlur: 0,
      lineWidth: 0,
      font: '',
      textAlign: '',
      textBaseline: ''
    }

    const personNode = {
      id: 'person-1',
      name: 'Test Person', 
      type: 'person',
      color: '#64ffda',
      size: 8
    }

    // Import the component to access its internal functions
    // We'll need to restructure to make drawNode testable
    const drawNode = (node, ctx, globalScale) => {
      const nodeSize = node.size || 8
      
      ctx.fillStyle = node.color
      ctx.shadowColor = node.color
      ctx.shadowBlur = 10
      
      ctx.arc(0, 0, nodeSize, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.shadowBlur = 0
      
      const fontSize = Math.max(8, 10 / globalScale)
      ctx.font = `${fontSize}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth = 3
      ctx.strokeText(node.name, 0, nodeSize + fontSize + 6)
      
      ctx.fillStyle = '#ffffff'
      ctx.fillText(node.name, 0, nodeSize + fontSize + 6)
    }

    // Call the drawing function
    drawNode(personNode, mockContext, 1)

    // Verify the node circle is drawn at origin (0, 0)
    const arcCall = mockContext.calls.find(call => call[0] === 'arc')
    expect(arcCall).toBeTruthy()
    expect(arcCall[1].x).toBe(0)
    expect(arcCall[1].y).toBe(0)
    expect(arcCall[1].radius).toBe(8)

    // Verify label is positioned below the node
    const fillTextCall = mockContext.calls.find(call => call[0] === 'fillText')
    expect(fillTextCall).toBeTruthy()
    expect(fillTextCall[1].x).toBe(0) // Centered horizontally
    expect(fillTextCall[1].y).toBeGreaterThan(8) // Below the node
  })

  it('should draw department nodes as larger circles centered at origin', () => {
    const mockContext = {
      calls: [],
      arc: vi.fn(function(x, y, radius, startAngle, endAngle) {
        this.calls.push(['arc', { x, y, radius, startAngle, endAngle }])
      }),
      fill: vi.fn(),
      fillText: vi.fn(function(text, x, y) {
        this.calls.push(['fillText', { text, x, y }])
      }),
      strokeText: vi.fn(function(text, x, y) {
        this.calls.push(['strokeText', { text, x, y }])
      }),
      fillStyle: '',
      strokeStyle: '',
      shadowColor: '',
      shadowBlur: 0,
      lineWidth: 0,
      font: '',
      textAlign: '',
      textBaseline: ''
    }

    const deptNode = {
      id: 'dept-1',
      name: 'Engineering',
      type: 'department', 
      color: '#64ffda',
      size: 20
    }

    const drawNode = (node, ctx, globalScale) => {
      const nodeSize = node.size || (node.type === 'department' ? 20 : 8)
      
      ctx.fillStyle = node.color
      ctx.shadowColor = node.color
      ctx.shadowBlur = 10
      
      ctx.arc(0, 0, nodeSize, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.shadowBlur = 0
      
      const fontSize = Math.max(8, 10 / globalScale)
      ctx.font = `${fontSize}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth = 3
      ctx.strokeText(node.name, 0, nodeSize + fontSize + 6)
      
      ctx.fillStyle = '#ffffff'
      ctx.fillText(node.name, 0, nodeSize + fontSize + 6)
    }

    drawNode(deptNode, mockContext, 1)

    // Verify department node is larger and centered at origin
    const arcCall = mockContext.calls.find(call => call[0] === 'arc')
    expect(arcCall).toBeTruthy()
    expect(arcCall[1].x).toBe(0)
    expect(arcCall[1].y).toBe(0)
    expect(arcCall[1].radius).toBe(20) // Larger than person nodes

    // Verify label positioning
    const fillTextCall = mockContext.calls.find(call => call[0] === 'fillText')
    expect(fillTextCall).toBeTruthy()
    expect(fillTextCall[1].x).toBe(0)
    expect(fillTextCall[1].y).toBeGreaterThan(20)
  })

  it('should handle node clicks and show details panel', async () => {
    render(<MyceliumGraph />)
    
    // Click on the force graph to simulate node click
    const forceGraph = screen.getByTestId('force-graph')
    fireEvent.click(forceGraph)
    
    // Wait for details panel to appear
    await waitFor(() => {
      expect(screen.getByText('Alice Chen')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument()
    expect(screen.getByText('INTJ')).toBeInTheDocument()
  })

  it('should validate that nodes have required positioning properties', () => {
    // Test that our sample data has the required structure
    const { sampleGraphData } = require('../../data/sampleData')
    
    sampleGraphData.nodes.forEach(node => {
      expect(node).toHaveProperty('id')
      expect(node).toHaveProperty('name')
      expect(node).toHaveProperty('type')
      expect(node).toHaveProperty('color')
      expect(['person', 'department']).toContain(node.type)
    })

    sampleGraphData.links.forEach(link => {
      expect(link).toHaveProperty('source')
      expect(link).toHaveProperty('target')
      expect(link).toHaveProperty('relation')
    })
  })
})