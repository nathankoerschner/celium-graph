import { describe, it, expect } from 'vitest'

/**
 * Tests to verify that links properly connect to nodes at their visual positions
 */
describe('Link-Node Connection Alignment Tests', () => {
  
  // Mock the link drawing function from MyceliumGraph
  const createMockDrawLink = () => {
    return (link, ctx, globalScale) => {
      const { source, target, relation, strength = 1 } = link
      
      if (!source || !target) return
      
      // Calculate link properties based on relation type
      let strokeStyle = '#64ffda'
      let lineWidth = 1
      
      switch (relation) {
        case 'belongs-to':
          strokeStyle = '#64ffda'
          lineWidth = 2
          break
        case 'collaboration':
          strokeStyle = '#ff6b6b'
          lineWidth = 1.5
          break
        case 'introvert-connection':
        case 'extrovert-connection':
          strokeStyle = '#4ecdc4'
          lineWidth = 1
          break
        case 'openness-similarity':
        case 'creative-synergy':
          strokeStyle = '#ffd93d'
          lineWidth = 1
          break
        case 'complementary-traits':
          strokeStyle = '#6c5ce7'
          lineWidth = 1
          break
        default:
          strokeStyle = '#64ffda'
      }
      
      // Set drawing properties
      ctx.strokeStyle = strokeStyle
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = 0.7 + 0.3 * strength
      ctx.shadowColor = strokeStyle
      ctx.shadowBlur = 5
      
      // Draw straight line
      ctx.beginPath()
      ctx.moveTo(source.x, source.y)
      ctx.lineTo(target.x, target.y)
      ctx.stroke()
      
      // Reset properties
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }
  }

  const createMockContext = () => ({
    calls: [],
    properties: {},
    
    // Canvas drawing methods
    beginPath() { this.calls.push(['beginPath']) },
    moveTo(x, y) { this.calls.push(['moveTo', { x, y }]) },
    lineTo(x, y) { this.calls.push(['lineTo', { x, y }]) },
    stroke() { this.calls.push(['stroke']) },
    
    // Property setters
    set strokeStyle(value) { 
      this.properties.strokeStyle = value
      this.calls.push(['setStrokeStyle', value])
    },
    set lineWidth(value) { 
      this.properties.lineWidth = value
      this.calls.push(['setLineWidth', value])
    },
    set globalAlpha(value) { 
      this.properties.globalAlpha = value
      this.calls.push(['setGlobalAlpha', value])
    },
    set shadowColor(value) { 
      this.properties.shadowColor = value
      this.calls.push(['setShadowColor', value])
    },
    set shadowBlur(value) { 
      this.properties.shadowBlur = value
      this.calls.push(['setShadowBlur', value])
    },
    
    // Getters
    get strokeStyle() { return this.properties.strokeStyle },
    get lineWidth() { return this.properties.lineWidth },
    get globalAlpha() { return this.properties.globalAlpha },
    get shadowColor() { return this.properties.shadowColor },
    get shadowBlur() { return this.properties.shadowBlur },
  })

  it('should draw links that connect to exact node positions', () => {
    const drawLink = createMockDrawLink()
    const mockContext = createMockContext()
    
    // Create test nodes with specific positions
    const sourceNode = { id: 'source', x: 100, y: 100 }
    const targetNode = { id: 'target', x: 300, y: 200 }
    
    const link = {
      source: sourceNode,
      target: targetNode,
      relation: 'belongs-to',
      strength: 1
    }
    
    drawLink(link, mockContext, 1)
    
    // Find the drawing calls
    const moveToCall = mockContext.calls.find(call => call[0] === 'moveTo')
    const lineToCall = mockContext.calls.find(call => call[0] === 'lineTo')
    
    expect(moveToCall).toBeDefined()
    expect(lineToCall).toBeDefined()
    
    // Verify link starts at source node position
    expect(moveToCall[1].x).toBe(100)
    expect(moveToCall[1].y).toBe(100)
    
    // Verify link ends at target node position  
    expect(lineToCall[1].x).toBe(300)
    expect(lineToCall[1].y).toBe(200)
  })

  it('should handle different relationship types with appropriate styling', () => {
    const drawLink = createMockDrawLink()
    
    const relationshipTests = [
      { relation: 'belongs-to', expectedColor: '#64ffda', expectedWidth: 2 },
      { relation: 'collaboration', expectedColor: '#ff6b6b', expectedWidth: 1.5 },
      { relation: 'introvert-connection', expectedColor: '#4ecdc4', expectedWidth: 1 },
      { relation: 'openness-similarity', expectedColor: '#ffd93d', expectedWidth: 1 },
      { relation: 'complementary-traits', expectedColor: '#6c5ce7', expectedWidth: 1 }
    ]
    
    relationshipTests.forEach(({ relation, expectedColor, expectedWidth }) => {
      const mockContext = createMockContext()
      
      const link = {
        source: { x: 0, y: 0 },
        target: { x: 100, y: 100 },
        relation,
        strength: 1
      }
      
      drawLink(link, mockContext, 1)
      
      // Check that correct styling was applied
      const strokeStyleCall = mockContext.calls.find(call => call[0] === 'setStrokeStyle')
      const lineWidthCall = mockContext.calls.find(call => call[0] === 'setLineWidth')
      
      expect(strokeStyleCall[1]).toBe(expectedColor)
      expect(lineWidthCall[1]).toBe(expectedWidth)
    })
  })

  it('should verify links connect to node centers, not edges', () => {
    const drawLink = createMockDrawLink()
    const mockContext = createMockContext()
    
    // Test with nodes that have size information
    const sourceNode = { 
      id: 'source', 
      x: 100, 
      y: 100, 
      type: 'person',
      size: 8 
    }
    const targetNode = { 
      id: 'target', 
      x: 200, 
      y: 150, 
      type: 'department',
      size: 20 
    }
    
    const link = {
      source: sourceNode,
      target: targetNode,
      relation: 'belongs-to'
    }
    
    drawLink(link, mockContext, 1)
    
    const moveToCall = mockContext.calls.find(call => call[0] === 'moveTo')
    const lineToCall = mockContext.calls.find(call => call[0] === 'lineTo')
    
    // Links should connect to the center coordinates of nodes
    // (The force-directed graph library handles edge calculations)
    expect(moveToCall[1].x).toBe(sourceNode.x)
    expect(moveToCall[1].y).toBe(sourceNode.y)
    expect(lineToCall[1].x).toBe(targetNode.x)
    expect(lineToCall[1].y).toBe(targetNode.y)
  })

  it('should handle missing or invalid node positions gracefully', () => {
    const drawLink = createMockDrawLink()
    const mockContext = createMockContext()
    
    const invalidLinks = [
      { source: null, target: { x: 100, y: 100 } },
      { source: { x: 100, y: 100 }, target: null },
      { source: { x: NaN, y: 100 }, target: { x: 200, y: 200 } },
      { source: { x: 100, y: 100 }, target: { x: 200, y: NaN } }
    ]
    
    invalidLinks.forEach((link, index) => {
      const testContext = createMockContext()
      
      // Should not throw an error
      expect(() => {
        drawLink(link, testContext, 1)
      }).not.toThrow()
      
      // Should not make any drawing calls for invalid links
      if (link.source === null || link.target === null) {
        expect(testContext.calls.length).toBe(0)
      }
    })
  })

  it('should apply strength-based visual effects correctly', () => {
    const drawLink = createMockDrawLink()
    
    const strengthTests = [0.2, 0.5, 0.8, 1.0]
    
    strengthTests.forEach(strength => {
      const mockContext = createMockContext()
      
      const link = {
        source: { x: 0, y: 0 },
        target: { x: 100, y: 100 },
        relation: 'collaboration',
        strength
      }
      
      drawLink(link, mockContext, 1)
      
      // Check that alpha is correctly calculated based on strength
      const alphaCall = mockContext.calls.find(call => call[0] === 'setGlobalAlpha')
      const expectedAlpha = 0.7 + 0.3 * strength
      
      expect(alphaCall[1]).toBeCloseTo(expectedAlpha, 2)
    })
  })

  it('should ensure consistent drawing order for proper layering', () => {
    const drawLink = createMockDrawLink()
    const mockContext = createMockContext()
    
    const link = {
      source: { x: 50, y: 50 },
      target: { x: 150, y: 150 },
      relation: 'belongs-to',
      strength: 0.8
    }
    
    drawLink(link, mockContext, 1)
    
    // Verify the expected order of drawing operations
    const callTypes = mockContext.calls.map(call => call[0])
    
    // Should set properties first, then draw
    expect(callTypes).toContain('setStrokeStyle')
    expect(callTypes).toContain('setLineWidth')
    expect(callTypes).toContain('beginPath')
    expect(callTypes).toContain('moveTo')
    expect(callTypes).toContain('lineTo')
    expect(callTypes).toContain('stroke')
    
    // Properties should be reset at the end
    const resetAlphaIndex = callTypes.lastIndexOf('setGlobalAlpha')
    const strokeIndex = callTypes.indexOf('stroke')
    expect(resetAlphaIndex).toBeGreaterThan(strokeIndex)
  })

  it('should calculate correct link distances for validation', () => {
    // Helper function to calculate distance between two points
    const calculateDistance = (p1, p2) => {
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      return Math.sqrt(dx * dx + dy * dy)
    }
    
    const testCases = [
      { p1: { x: 0, y: 0 }, p2: { x: 3, y: 4 }, expectedDistance: 5 },
      { p1: { x: 100, y: 100 }, p2: { x: 200, y: 200 }, expectedDistance: Math.sqrt(20000) },
      { p1: { x: -50, y: -50 }, p2: { x: 50, y: 50 }, expectedDistance: Math.sqrt(20000) }
    ]
    
    testCases.forEach(({ p1, p2, expectedDistance }) => {
      const distance = calculateDistance(p1, p2)
      expect(distance).toBeCloseTo(expectedDistance, 1)
    })
  })
})