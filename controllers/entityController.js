// controllers/entityController.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'entities.json');

function readData() {
    try {
      const rawData = fs.readFileSync(dataPath);
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error reading data:', error.message);
      return { entities: [] }; // Return an empty array or handle the error appropriately
    }
  }
  
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
  getAllEntities: (req, res) => {
    const entities = readData().entities;
    res.json(entities);
  },

  getEntityById: (req, res) => {
    const entityId = req.params.id;
    const entities = readData().entities;
    const entity = entities.find((e) => e.id === entityId);

    if (entity) {
      res.json(entity);
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  },

  createEntity: (req, res) => {
    const newEntity = req.body;
    const entities = readData().entities;
    entities.push(newEntity);
    writeData({ entities });
    res.json(newEntity);
  },

  updateEntity: (req, res) => {
    const entityId = req.params.id;
    const updatedEntity = req.body;
    const entities = readData().entities;
    const index = entities.findIndex((e) => e.id === entityId);

    console.log('Entity ID:', entityId);
    console.log('Updated Entity:', updatedEntity);
    console.log('Current Entities:', entities);

    if (index !== -1) {
      entities[index] = { ...entities[index], ...updatedEntity };
      writeData({ entities });
      res.json(entities[index]);
    } else {
      console.log('Entity not found');
      res.status(404).json({ message: 'Entity not found' });
    }
  },
  

  deleteEntity: (req, res) => {
    const entityId = req.params.id;
    const entities = readData().entities;
    const filteredEntities = entities.filter((e) => e.id !== entityId);

    if (filteredEntities.length < entities.length) {
      writeData({ entities: filteredEntities });
      res.json({ message: 'Entity deleted successfully' });
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  },
};
