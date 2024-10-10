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
  
  const [shapeType, setShapeType] = useState('rectangle');
  
  const openWorkspaceModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setSelectedImage(workspace.imageUrl); // Set the image URL of the selected workspace selected workspace
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
      setCurrentRegion({ x: startX, y: startY, width: 0, height: 0 });
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
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        regionsToDraw.forEach(region => {
          ctx.strokeRect(region.x, region.y, region.width, region.height); // Draw each region
        });
      }
    }
  };

  // Reset Regions: This function clears the regions from the state and redraws the canvas.
  const resetRegions = () => {
    setRegions([]); // Clear the regions state
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      }
    }
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
      
      <div>
        <label>Shape: </label>
        <select value={shapeType} onChange={(e) => setShapeType(e.target.value)}>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
        </select>
      </div>
    
    </div>
  );
};

export default App;

