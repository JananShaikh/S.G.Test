import React, { useState } from 'react';
import './App.scss';  // Ensure this is imported to style the layout
import Menu from './components/Menu';

interface Workspace {
  id: number;
  name: string;
}

const mockWorkspaces: Workspace[] = [
  { id: 1, name: 'Workspace 1' },
  { id: 2, name: 'Workspace 2' },
  { id: 3, name: 'Workspace 3' },
];

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  
  const openWorkspaceModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWorkspaceSelect = (workspace: Workspace) => {
    alert(`Selected: ${workspace.name}`);
    closeModal(); // Close modal after selecting
  };
  
  // Function to handle the image change passed from Menu
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="App">
      <header className="header">
        <Menu 
          onImageSelect={handleImageSelect} 
          onOpenWorkspace={openWorkspaceModal} // Pass function to Menu
        />
        {selectedImage && (
          <div className="image-frame">
            <img src={selectedImage} alt="Selected" />
          </div>
        )}
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

      {/* Display the selected image below the header */}
      {selectedImage && (
        <div className="image-frame">
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default App;

