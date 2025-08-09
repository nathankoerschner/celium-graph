import '@testing-library/jest-dom'

// Mock canvas for tests
global.HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: new Array(4) }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    fill: () => {},
    arc: () => {},
    strokeText: () => {},
    quadraticCurveTo: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    setLineDash: () => {},
    measureText: () => ({ width: 0 }),
  }
}