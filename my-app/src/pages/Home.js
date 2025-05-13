import React, { useState, useEffect } from 'react';
import '../App.css';
import { Input, Button, Card, Typography, Checkbox, Divider, Space, Row, Col, message } from 'antd';
import { RollbackOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

const { Title, Text } = Typography;

function Home() {
  const [text, setText] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const todosRef = collection(db, "todos");

  useEffect(() => {
    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      const newTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBoxes(newTodos);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      await addDoc(todosRef, {
        text,
        checked: false,
        deleted: false
      });
      setText('');
      message.success("Task added");
    }
  };

  const handleCheckboxChange = async (id, currentValue) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      checked: !currentValue
    });
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSave = async () => {
    const docRef = doc(db, "todos", editingId);
    await updateDoc(docRef, {
      text: editText
    });
    setEditingId(null);
    setEditText('');
    message.success("Task updated");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      deleted: true
    });
    message.info("Task deleted");
  };

  const handleRestore = async (id) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      deleted: false
    });
    message.success("Task restored");
  };

  const checkedBoxes = boxes.filter((box) => box.checked && !box.deleted);
  const activeBoxes = boxes.filter((box) => !box.deleted);
  const deletedBoxes = boxes.filter((box) => box.deleted);

  console.log("box",boxes )

  return (
    <div style={{ padding: '40px'}}>

      <form onSubmit={handleSubmit}>
        <Space style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <Input
            placeholder="What is the task today?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button color="#EDF2FJ"  htmlType="submit" disabled={text.trim() === ''}>
            Add Task
          </Button>
        </Space>
      </form>

      {/* แถวของกล่อง */}
      <Row justify="center" gutter={[24, 24]}>
        {/* กล่องซ้าย */}
        <Col xs={24} sm={20} md={10} lg={8}>
          <Title level={4}>{checkedBoxes.length}/{activeBoxes.length} Todos Completed</Title>
          <Divider />
          {activeBoxes.map((item) => (
            <Card
              key={item.id}
              size="small"
              style={{ 
                marginBottom: 12,
                minHeight: 100,
               }}
            >
              <div style={{ padding: '16px', height: '100%' }}>
                <Row align="middle" justify="space-between" style={{ height: '100%' }} >
                  <Col>
                    <Space>
                      <Checkbox
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(item.id, item.checked)}
                      />
                      {editingId === item.id ? (
                        <Input
                          size="small"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={{ width: 200 }}
                        />
                      ) : (
                        <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                          {item.text}
                        </span>
                      )}
                    </Space>
                  </Col>

                  <Col>
                    {editingId === item.id ? (
                      <Space>
                        <Button
                          type="primary"
                          size="small"
                          onClick={handleSave}
                          disabled={editText.trim() === item.text.trim()}
                        >
                          Save
                        </Button>
                        <Button size="small" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </Space>
                    ) : (
                      <Space>
                        <FormOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleEdit(item.id, item.text)}
                        />
                        <DeleteOutlined
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDelete(item.id)}
                        />
                      </Space>
                    )}
                  </Col>
                </Row>
              </div>
              
            </Card>
          ))}

        </Col>

        {/* กล่องขวา */}
        <Col xs={24} sm={20} md={10} lg={8}>
          <Title level={4}>{deletedBoxes.length} Deleted Tasks</Title>
          <Divider />
          {deletedBoxes.map((item) => (
            <Card
              key={item.id}
              size="small"
              style={{ 
                marginBottom: 12,
                minHeight: 100               
               }}
            >
              <div style={{ padding: '16px', height: '100%' }}>
                <Row align="middle" justify="space-between">
                  <Col>
                    <Space>
                      <Checkbox checked={item.checked} disabled />
                      <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                        {item.text}
                      </span>
                    </Space>
                  </Col>
                  <Col>
                    <RollbackOutlined
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRestore(item.id)}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          ))}

        </Col>
      </Row>
    </div>
  );
}

export default Home;
