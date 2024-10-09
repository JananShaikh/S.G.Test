import React, { useState } from 'react';
import './App.scss';  // Ensure this is imported to style the layout
import Menu from './components/Menu';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to handle the image change passed from Menu
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="App">
      <header className="header">
        <Menu onImageSelect={handleImageSelect} />
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

