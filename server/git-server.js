'use strict';

const express = require('express');
const simpleGit = require('simple-git');
const path = require('path');

const app = express();
const port = 3001; // Set your preferred port
const git = simpleGit();

// Serve static files (e.g., images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint to commit and push images
app.post('/commit-images', async (req, res) => {
  try {
    const folderPath = path.join(__dirname, 'images');
    
    // Add images to git
    await git.add(`${folderPath}/*`);

    // Commit the changes
    await git.commit('Added/Updated images');

    // Push to the remote repository
    await git.push();

    res.status(200).send('Images committed and pushed successfully');
  } catch (error) {
    console.error('Error committing images:', error);
    res.status(500).send('Failed to commit images');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Git server running on port ${port}`);
});

