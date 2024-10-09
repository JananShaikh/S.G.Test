import React, { useState } from 'react';
import './Menu.scss';

interface MenuProps {
  onImageSelect: (image: string) => void;  // To pass selected image to the parent (App)
  onOpenWorkspace: () => void; // New prop for opening the workspace modal
}

const Menu: React.FC<MenuProps> = ({ onImageSelect, onOpenWorkspace }) => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showCloneMenu, setShowCloneMenu] = useState(false);

  const toggleFileMenu = () => setShowFileMenu(!showFileMenu);
  const toggleWorkspaceMenu = () => setShowWorkspaceMenu(!showWorkspaceMenu);
  const toggleCloneMenu = () => setShowCloneMenu(!showCloneMenu);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string); // Pass the image to App
      };
      reader.readAsDataURL(file);
    }
  };

  // Placeholder handlers for other actions
  //const handleOpenWorkspace = () => alert("Workspace > Open clicked");
  const handleSaveWorkspace = () => alert("Workspace > Save clicked");
  const handleVersionWorkspace = () => alert("Workspace > Version clicked");
  const handleCloneOpen = () => alert("Clone > Open clicked");
  const handleCloneSave = () => alert("Clone > Save clicked");
  const handleCloneVersion = () => alert("Clone > Version clicked");
  const handleCloneExit = () => alert("Clone > Exit clicked");

  return (
    <div className="menu">
      <ul>
        <li>
          <button onClick={toggleFileMenu}>File</button>
          {showFileMenu && (
            <ul className="submenu">
              <li>
                <label htmlFor="image-upload" className="image-upload-btn">Open Image</label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </li>
              <li>
                <button onClick={toggleWorkspaceMenu}>Workspace</button>
                {showWorkspaceMenu && (
                  <ul className="submenu">
                    <li><button onClick={onOpenWorkspace}>Open</button></li>
                    <li><button onClick={handleSaveWorkspace}>Save</button></li>
                    <li><button onClick={handleVersionWorkspace}>Version</button></li>
                    <li>
                      <button onClick={toggleCloneMenu}>Clone</button>
                      {showCloneMenu && (
                        <ul className="submenu">
                          <li><button onClick={handleCloneOpen}>Open</button></li>
                          <li><button onClick={handleCloneSave}>Save</button></li>
                          <li><button onClick={handleCloneVersion}>Version</button></li>
                          <li><button onClick={handleCloneExit}>Exit</button></li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;

