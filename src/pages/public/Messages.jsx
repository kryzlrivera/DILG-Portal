import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  const [personnelList, setPersonnelList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('dilgCurrentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const storedPersonnel = JSON.parse(localStorage.getItem('dilgPersonnelData') || '[]');
    setPersonnelList(storedPersonnel.filter(p => p.status === 'Active'));

    const storedMessages = JSON.parse(localStorage.getItem('dilgMessagesData') || '{}');
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, selectedPerson]);

  if (currentUser === null && !localStorage.getItem('dilgCurrentUser')) {
    return <Navigate to="/login" replace />;
  }

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedPerson || !currentUser) return;

    const newMessage = {
      id: `MSG${Date.now()}`,
      text: inputValue,
      senderId: currentUser.id || currentUser.email,
      timestamp: new Date().toISOString()
    };

    const threadId = `${currentUser.id || currentUser.email}_${selectedPerson.id}`;
    
    const updatedMessages = {
      ...messages,
      [threadId]: [...(messages[threadId] || []), newMessage]
    };

    setMessages(updatedMessages);
    localStorage.setItem('dilgMessagesData', JSON.stringify(updatedMessages));
    setInputValue('');

    // Simulate auto-reply from personnel for demonstration
    setTimeout(() => {
      const autoReply = {
        id: `MSG${Date.now() + 1}`,
        text: `Hello! This is an automated response from ${selectedPerson.fullName}. I have received your message and will get back to you shortly.`,
        senderId: selectedPerson.id,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => {
        const newThreadMessages = [...(prev[threadId] || []), autoReply];
        const newMsgs = { ...prev, [threadId]: newThreadMessages };
        localStorage.setItem('dilgMessagesData', JSON.stringify(newMsgs));
        return newMsgs;
      });
    }, 1500);
  };

  const currentThreadId = currentUser && selectedPerson ? `${currentUser.id || currentUser.email}_${selectedPerson.id}` : null;
  const currentChat = currentThreadId ? (messages[currentThreadId] || []) : [];

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages-page">
      <div className="messages-sidebar">
        <div className="messages-sidebar-header">
          <h2>Personnel Contacts</h2>
        </div>
        <ul className="personnel-list">
          {personnelList.length === 0 ? (
            <li className="personnel-item" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No personnel available
            </li>
          ) : (
            personnelList.map(person => (
              <li
                key={person.id}
                className={`personnel-item ${selectedPerson?.id === person.id ? 'active' : ''}`}
                onClick={() => handleSelectPerson(person)}
              >
                <div className="personnel-item-name">{person.fullName}</div>
                <div className="personnel-item-title">{person.title}</div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="messages-main">
        {selectedPerson ? (
          <>
            <div className="messages-main-header">
              <h3>{selectedPerson.fullName}</h3>
              <p>{selectedPerson.department}</p>
            </div>
            <div className="messages-chat-area" ref={chatAreaRef}>
              {currentChat.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
                  Send a message to start the conversation with {selectedPerson.fullName}.
                </div>
              ) : (
                currentChat.map(msg => {
                  const isSentByMe = msg.senderId === (currentUser.id || currentUser.email);
                  return (
                    <div key={msg.id} className={`message-bubble ${isSentByMe ? 'sent' : 'received'}`}>
                      <div className="message-text">{msg.text}</div>
                      <span className="message-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  );
                })
              )}
            </div>
            <div className="messages-input-area">
              <form className="messages-input-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="messages-send-btn" disabled={!inputValue.trim()}>
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a personnel from the sidebar to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
