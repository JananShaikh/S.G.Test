import React, { useRef,useState } from 'react';
import './App.scss';  // Ensure this is imported to style the layout
import Menu from './components/Menu';

interface Workspace {
  id: number;
  name: string;
  imageUrl: string; // New field for image URL
}

interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
  shape: 'rectangle' | 'circle'; // Add shape type to the region
}

const mockWorkspaces: Workspace[] = [
  { id: 1, name: 'Workspace 1', imageUrl: 'https://via.placeholder.com/150' }, // Example image
  { id: 2, name: 'Workspace 2', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF' },
  { id: 3, name: 'Workspace 3', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF' },
];

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
 
  const [showModal, setShowModal] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  
  const [regions, setRegions] = useState<Region[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  
  const [shape, setShape] = useState<'rectangle' | 'circle'>('rectangle'); // Track selected shape
  
  const openWorkspaceModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setSelectedImage(workspace.imageUrl); // Set the image URL of the selected workspace selected workspace
    setRegions([]); // Clear regions when a new image is selected
    clearCanvas(); // Ensure the canvas is cleared when a new image is selected
    closeModal(); // Close modal after selecting
    
  };
  
  // Function to handle the image change passed from Menu
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setRegions([]); // Clear regions when a new image is selected
    clearCanvas(); // Ensure the canvas is cleared when a new image is selected
  };
  
  // Function to clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
      }
    }
  };
  
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!selectedImage) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const startX = event.clientX - rect.left;
      const startY = event.clientY - rect.top;

      setDrawing(true);
      setCurrentRegion({ x: startX, y: startY, width: 0, height: 0, shape});
    }
  };
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!drawing || !currentRegion) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      const newRegion = {
        ...currentRegion,
        width: currentX - currentRegion.x,
        height: currentY - currentRegion.y,
      };
      setCurrentRegion(newRegion);
      drawRegions([...regions, newRegion]); // Preview the shape while drawing
    }
  };
  
  const handleMouseUp = () => {
    if (drawing && currentRegion) {
      setRegions([...regions, currentRegion]); // Save the new region
    }
    setDrawing(false);
    setCurrentRegion(null);
  };

  const drawRegions = (regionsToDraw: Region[]) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx && selectedImage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        regionsToDraw.forEach(region => {
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;

          if (region.shape === 'rectangle') {
            // Draw rectangle
            ctx.strokeRect(region.x, region.y, region.width, region.height);
          } else if (region.shape === 'circle') {
            // Draw circle (using the smallest dimension for radius)
            const radius = Math.min(Math.abs(region.width), Math.abs(region.height)) / 2;
            const centerX = region.x + region.width / 2;
            const centerY = region.y + region.height / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
          }
        });
      }
    }
  };

  // Reset Regions: This function clears the regions from the state and redraws the canvas.
  const resetRegions = () => {
    setRegions([]); // Clear the regions state
    clearCanvas(); // Clear the canvas
  };

  return (
    <div className="App">
      <header className="header">
        <Menu 
          onImageSelect={handleImageSelect} 
          onOpenWorkspace={openWorkspaceModal} // Pass function to Menu
        />
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Select a Workspace</h3>
              <ul>
                {workspaces.map((workspace) => (
                  <li key={workspace.id}>
                    <button onClick={() => handleWorkspaceSelect(workspace)}>
                      {workspace.name}
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
        <div className="right-buttons">
          <button>Share</button>
          <button>Version</button>
        </div>
      </header>

      {selectedImage && (
        <div className="image-container" style={{ position: 'relative' }}>
          <img src={selectedImage} alt="Selected" />
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              border: '1px solid black',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
      )}
      
      {/* Add a Reset Button */}
      <button onClick={resetRegions}>Reset Regions</button>
      
      <div className="controls">
        <label>
          <input
            type="radio"
            value="rectangle"
            checked={shape === 'rectangle'}
            onChange={() => setShape('rectangle')}
          />
          Rectangle
        </label>
        <label>
          <input
            type="radio"
            value="circle"
            checked={shape === 'circle'}
            onChange={() => setShape('circle')}
          />
          Circle
        </label>
      </div>
    
    </div>
  );
};

export default App;

