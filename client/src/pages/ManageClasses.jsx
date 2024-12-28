import React, { useState } from 'react';

const ManageClasses = () => {
  const [classes, setClasses] = useState(['IX', 'X', 'XI', 'XII']);
  const [sections, setSections] = useState(['A', 'B', 'C']);
  const [newClass, setNewClass] = useState('');
  const [newSection, setNewSection] = useState('');

  const addClass = () => {
    if (newClass && !classes.includes(newClass)) {
      setClasses([...classes, newClass]);
      setNewClass('');
    }
  };

  const addSection = () => {
    if (newSection && !sections.includes(newSection)) {
      setSections([...sections, newSection]);
      setNewSection('');
    }
  };

  const removeClass = (classToRemove) => {
    setClasses(classes.filter(c => c !== classToRemove));
  };

  const removeSection = (sectionToRemove) => {
    setSections(sections.filter(s => s !== sectionToRemove));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Classes and Sections</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Classes</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            placeholder="New Class"
            className="border rounded px-2 py-1"
          />
          <button onClick={addClass} className="bg-blue-500 text-white px-4 py-2 rounded">Add Class</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {classes.map(cls => (
            <div key={cls} className="flex justify-between items-center p-2 border rounded">
              <span>{cls}</span>
              <button onClick={() => removeClass(cls)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Sections</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="New Section"
            className="border rounded px-2 py-1"
          />
          <button onClick={addSection} className="bg-blue-500 text-white px-4 py-2 rounded">Add Section</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {sections.map(section => (
            <div key={section} className="flex justify-between items-center p-2 border rounded">
              <span>{section}</span>
              <button onClick={() => removeSection(section)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;

