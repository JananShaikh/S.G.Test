import React, { useState } from 'react';
import './Menu.scss';

const Menu: React.FC = () => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showCloneSubMenu, setShowCloneSubMenu] = useState(false);

  const toggleWorkspaceMenu = () => setShowWorkspaceMenu(!showWorkspaceMenu);
  const toggleCloneSubMenu = () => setShowCloneSubMenu(!showCloneSubMenu);

  return (
    <div className="menu">
      <ul>
        <li>
          File
          <ul className="submenu">
            <li>Open Image</li>
            <li>
              Workspace
              <button onClick={toggleWorkspaceMenu}>▼</button>
              {showWorkspaceMenu && (
                <ul className="submenu">
                  <li>Open</li>
                  <li>Save</li>
                  <li>Version</li>
                  <li>
                    Clone
                    <button onClick={toggleCloneSubMenu}>▶</button>
                    {showCloneSubMenu && (
                      <ul className="submenu">
                        <li>Open</li>
                        <li>Save</li>
                        <li>Version</li>
                        <li>Exit</li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

