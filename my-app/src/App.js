import React, { useState } from 'react'; //import useState ใช้เก็บค่าที่กรอก
import './App.css'; //ใส่css

function App() {
  const [text, setText] = useState('');
  const [boxes, setBoxes] = useState([]); // [{ text: '...', checked: false }]
  const [deletedBoxes, setDeletedBoxes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const checkedBoxes = boxes.filter((box) => box.checked);

  const handleSubmit = (e) => { //ปุ่มAdd Task
    e.preventDefault();
    if (text.trim() !== '') {
      setBoxes([...boxes, { text, checked: false }]);
      setText('');
    }
  };

  const handleCheckboxChange = (index) => { //checkedbox
    const updated = [...boxes];
    updated[index].checked = !updated[index].checked;
    setBoxes(updated);
  };

  const handleEdit = (index) => { //Edit
    setEditingIndex(index);
    setEditText(boxes[index].text);
  };

  const handleSave = () => { //Save
    const updated = [...boxes];
    updated[editingIndex].text = editText;
    setBoxes(updated);
    setEditingIndex(null);
    setEditText('');
  };

  const handleCancelEdit = () => { //Cancel Edit
    setEditingIndex(null);
    setEditText('');
  };

  const handleDelete = (index) => { //Delete
    const removed = boxes[index];
    setBoxes(boxes.filter((_, i) => i !== index));
    setDeletedBoxes([...deletedBoxes, removed]);
  };

  const handleRestore = (index) => { //Restore
    const restored = deletedBoxes[index];
    setDeletedBoxes(deletedBoxes.filter((_, i) => i !== index));
    setBoxes([...boxes, restored]);
  };

  return (
    <div className="App">
      
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What is the task today?"
        />
        <button type="submit" disabled={text.trim() === ''} style={{ opacity: text.trim() === '' ? 0.5 : 1 }}>
          Add Task
        </button>
      </form>

      <div className="box-wrapper">
        {/* กล่องซ้าย */}
        <div className="box-column">
          <h2 style={{ marginTop: '20px' }}>
          {checkedBoxes.length}/{boxes.length} Todos completed
          </h2>
          {boxes.map((item, index) => (
            <div className="box" key={`all-${index}`}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              {editingIndex === index ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={handleSave}
                    disabled={editText.trim() === boxes[editingIndex].text.trim()}
                    style={{
                      opacity: editText.trim() === boxes[editingIndex].text.trim() ? 0.5 : 1,
                    }}
                  >
                    บันทึก
                  </button>
                  <button onClick={handleCancelEdit}>ยกเลิก</button>
                </>
              ) : (
                <>
                  <span className={item.checked ? 'crossed' : ''}>{item.text}</span>
                  <div className="btn-group">
                    <button onClick={() => handleEdit(index)}>✏️</button>
                    <button onClick={() => handleDelete(index)}>🗑️</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* กล่องขวา */}
        <div className="box-column">
        <h2>
        {deletedBoxes.length} Deleted
        </h2>
          {deletedBoxes.map((item, index) => (
            <div className="box deleted" key={index}>
              <input type="checkbox" checked={item.checked} readOnly />
              <span className={item.checked ? 'crossed' : ''}>
                {item.text}
              </span>
              <button onClick={() => handleRestore(index)}>↩️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;