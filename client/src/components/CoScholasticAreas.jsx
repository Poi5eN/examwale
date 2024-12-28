import React, { useState } from 'react';

const CoScholasticAreas = ({ initialAreas = [], onUpdate }) => {
  const [areas, setAreas] = useState(initialAreas);

  const addArea = () => {
    const newArea = { id: Date.now().toString(), name: '', grade: '' };
    setAreas([...areas, newArea]);
    onUpdate([...areas, newArea]);
  };

  const updateArea = (id, field, value) => {
    const updatedAreas = areas.map(area =>
      area.id === id ? { ...area, [field]: value } : area
    );
    setAreas(updatedAreas);
    onUpdate(updatedAreas);
  };

  const removeArea = (id) => {
    const updatedAreas = areas.filter(area => area.id !== id);
    setAreas(updatedAreas);
    onUpdate(updatedAreas);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Co-Scholastic Areas</h3>
      {areas.map(area => (
        <div key={area.id} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={area.name}
            onChange={(e) => updateArea(area.id, 'name', e.target.value)}
            placeholder="Area Name"
            className="border rounded px-2 py-1"
          />
          <select
            value={area.grade}
            onChange={(e) => updateArea(area.id, 'grade', e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <button
            onClick={() => removeArea(area.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addArea}
        className="bg-green-500 text-white px-2 py-1 rounded"
      >
        Add Area
      </button>
    </div>
  );
};

export default CoScholasticAreas;

