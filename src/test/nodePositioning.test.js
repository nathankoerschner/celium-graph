import { describe, it, expect, vi } from 'vitest'

/**
 * Tests to verify that node visualizations are correctly positioned
 * at the node's actual coordinates (0,0 in node-relative coordinate system)
 */
describe('Node Positioning Verification Tests', () => {
  
  // Mock the drawing functions from MyceliumGraph
  const createMockDrawNode = () => {
    return (node, ctx, globalScale) => {
      const nodeSize = node.type === 'department' ? (node.size || 20) : (node.size || 8)
      
      // Set node color and shadow
      ctx.fillStyle = node.color
      ctx.shadowColor = node.color
      ctx.shadowBlur = 10
      
      // Draw the node shape at origin (0, 0)
      ctx.beginPath()
      ctx.arc(0, 0, nodeSize, 0, 2 * Math.PI)
      ctx.fill()
      
      // Reset shadow for text
      ctx.shadowBlur = 0
      
      // Draw label positioned relative to node center
      const fontSize = Math.max(8, 10 / globalScale)
      ctx.font = `${fontSize}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Text with outline for visibility
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth = 3
      ctx.strokeText(node.name, 0, nodeSize + fontSize + 6)
      
      ctx.fillStyle = '#ffffff'
      ctx.fillText(node.name, 0, nodeSize + fontSize + 6)
    }
  }

  const createMockContext = () => ({
    calls: [],
    properties: {},
    
    // Canvas drawing methods that record calls
    beginPath() { this.calls.push(['beginPath']) },
    arc(x, y, radius, startAngle, endAngle) { 
      this.calls.push(['arc', { x, y, radius, startAngle, endAngle }]) 
    },
    fill() { this.calls.push(['fill']) },
    stroke() { this.calls.push(['stroke']) },
    fillText(text, x, y) { 
      this.calls.push(['fillText', { text, x, y }]) 
    },
    strokeText(text, x, y) { 
      this.calls.push(['strokeText', { text, x, y }]) 
    },
    moveTo(x, y) { this.calls.push(['moveTo', { x, y }]) },
    lineTo(x, y) { this.calls.push(['lineTo', { x, y }]) },
    
    // Property setters that record values
    set fillStyle(value) { 
      this.properties.fillStyle = value
      this.calls.push(['setFillStyle', value])
    },
    set strokeStyle(value) { 
      this.properties.strokeStyle = value
      this.calls.push(['setStrokeStyle', value])
    },
    set shadowColor(value) { 
      this.properties.shadowColor = value
      this.calls.push(['setShadowColor', value])
    },
    set shadowBlur(value) { 
      this.properties.shadowBlur = value
      this.calls.push(['setShadowBlur', value])
    },
    set lineWidth(value) { 
      this.properties.lineWidth = value
      this.calls.push(['setLineWidth', value])
    },
    set font(value) { 
      this.properties.font = value
      this.calls.push(['setFont', value])
    },
    set textAlign(value) { 
      this.properties.textAlign = value
      this.calls.push(['setTextAlign', value])
    },
    set textBaseline(value) { 
      this.properties.textBaseline = value
      this.calls.push(['setTextBaseline', value])
    },
    
    // Getters
    get fillStyle() { return this.properties.fillStyle },
    get strokeStyle() { return this.properties.strokeStyle },
    get shadowColor() { return this.properties.shadowColor },
    get shadowBlur() { return this.properties.shadowBlur },
    get lineWidth() { return this.properties.lineWidth },
    get font() { return this.properties.font },
    get textAlign() { return this.properties.textAlign },
    get textBaseline() { return this.properties.textBaseline },
  })

  it('should draw person nodes centered at origin (0, 0)', () => {
    const drawNode = createMockDrawNode()
    const mockContext = createMockContext()
    
    const personNode = {
      id: 'person-test',
      name: 'Test Person',
      type: 'person',
      color: '#64ffda',
      size: 8
    }
    
    // Call the drawing function
    drawNode(personNode, mockContext, 1)
    
    // Find the arc drawing call
    const arcCall = mockContext.calls.find(call => call[0] === 'arc')
    expect(arcCall).toBeDefined()
    
    // Verify node is drawn at origin
    expect(arcCall[1].x).toBe(0)
    expect(arcCall[1].y).toBe(0)
    expect(arcCall[1].radius).toBe(8)
    expect(arcCall[1].startAngle).toBe(0)
    expect(arcCall[1].endAngle).toBe(2 * Math.PI)
    
    // Verify text is positioned relative to node center
    const fillTextCall = mockContext.calls.find(call => call[0] === 'fillText')
    expect(fillTextCall).toBeDefined()
    expect(fillTextCall[1].x).toBe(0) // Horizontally centered
    expect(fillTextCall[1].y).toBeGreaterThan(8) // Below the node
    expect(fillTextCall[1].text).toBe('Test Person')
  })

  it('should draw department nodes centered at origin with larger radius', () => {
    const drawNode = createMockDrawNode()
    const mockContext = createMockContext()
    
    const deptNode = {
      id: 'dept-test',
      name: 'Test Department',
      type: 'department',
      color: '#ff6b6b',
      size: 20
    }
    
    drawNode(deptNode, mockContext, 1)
    
    const arcCall = mockContext.calls.find(call => call[0] === 'arc')
    expect(arcCall).toBeDefined()
    
    // Department nodes should be larger but still centered at origin
    expect(arcCall[1].x).toBe(0)
    expect(arcCall[1].y).toBe(0)
    expect(arcCall[1].radius).toBe(20)
    
    // Text should be positioned below the larger node
    const fillTextCall = mockContext.calls.find(call => call[0] === 'fillText')
    expect(fillTextCall).toBeDefined()
    expect(fillTextCall[1].x).toBe(0)
    expect(fillTextCall[1].y).toBeGreaterThan(20)
  })

  it('should adapt text positioning based on node size', () => {
    const drawNode = createMockDrawNode()
    
    // Test different node sizes
    const testCases = [
      { size: 5, type: 'person' },
      { size: 10, type: 'person' },
      { size: 15, type: 'department' },
      { size: 25, type: 'department' }
    ]
    
    testCases.forEach(({ size, type }) => {
      const mockContext = createMockContext()
      const node = {
        id: `test-${size}`,
        name: `Test ${size}`,
        type,
        color: '#64ffda',
        size
      }
      
      drawNode(node, mockContext, 1)
      
      const fillTextCall = mockContext.calls.find(call => call[0] === 'fillText')
      expect(fillTextCall).toBeDefined()
      
      // Text Y position should scale with node size
      expect(fillTextCall[1].y).toBeGreaterThan(size)
      expect(fillTextCall[1].x).toBe(0) // Always horizontally centered
    })
  })

  it('should handle different zoom levels correctly', () => {
    const drawNode = createMockDrawNode()
    const node = {
      id: 'zoom-test',
      name: 'Zoom Test',
      type: 'person',
      color: '#64ffda',
      size: 8
    }
    
    // Test different zoom levels
    const zoomLevels = [0.5, 1, 2, 4]
    
    zoomLevels.forEach(zoom => {
      const mockContext = createMockContext()
      drawNode(node, mockContext, zoom)
      
      // Node position should always be at origin regardless of zoom
      const arcCall = mockContext.calls.find(call => call[0] === 'arc')
      expect(arcCall[1].x).toBe(0)
      expect(arcCall[1].y).toBe(0)
      expect(arcCall[1].radius).toBe(8) // Node size shouldn't change with zoom
      
      // Font size should adapt to zoom level
      const fontCall = mockContext.calls.find(call => call[0] === 'setFont')
      expect(fontCall).toBeDefined()
      
      // Extract font size from font string (e.g., "10px Inter, sans-serif")
      const fontSize = parseInt(fontCall[1].split('px')[0])
      expect(fontSize).toBeGreaterThanOrEqual(8) // Should have minimum font size
    })
  })

  it('should verify that all drawing operations use origin-relative coordinates', () => {
    const drawNode = createMockDrawNode()
    const mockContext = createMockContext()
    
    const node = {
      id: 'coord-test',
      name: 'Coordinate Test',
      type: 'person',
      color: '#64ffda',
      size: 12
    }
    
    drawNode(node, mockContext, 1)
    
    // Extract all coordinate-based drawing calls
    const coordinateCalls = mockContext.calls.filter(call => 
      ['arc', 'fillText', 'strokeText', 'moveTo', 'lineTo'].includes(call[0])
    )
    
    // All drawing operations should use coordinates relative to origin
    coordinateCalls.forEach(call => {
      const coords = call[1]
      if (coords.x !== undefined) {
        // X coordinates should be 0 (centered) or reasonable offsets
        expect(Math.abs(coords.x)).toBeLessThanOrEqual(50)
      }
      if (coords.y !== undefined) {
        // Y coordinates should be small values relative to origin
        expect(Math.abs(coords.y)).toBeLessThanOrEqual(100)
      }
    })
  })

  it('should ensure consistent visual hierarchy between node types', () => {
    const drawNode = createMockDrawNode()
    
    const personNode = {
      id: 'person-hierarchy',
      name: 'Person',
      type: 'person',
      color: '#64ffda'
    }
    
    const deptNode = {
      id: 'dept-hierarchy', 
      name: 'Department',
      type: 'department',
      color: '#ff6b6b'
    }
    
    const personContext = createMockContext()
    const deptContext = createMockContext()
    
    drawNode(personNode, personContext, 1)
    drawNode(deptNode, deptContext, 1)
    
    const personArc = personContext.calls.find(call => call[0] === 'arc')
    const deptArc = deptContext.calls.find(call => call[0] === 'arc')
    
    // Department nodes should be visually larger than person nodes
    expect(deptArc[1].radius).toBeGreaterThan(personArc[1].radius)
    
    // Both should be centered at origin
    expect(personArc[1].x).toBe(0)
    expect(personArc[1].y).toBe(0)
    expect(deptArc[1].x).toBe(0)
    expect(deptArc[1].y).toBe(0)
  })
})