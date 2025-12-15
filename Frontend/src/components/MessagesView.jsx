import React, { useState } from 'react';

// Sample Conversation Data
const conversations = [
    { id: 1, user: "Plumb Perfect Co.", lastMessage: "We confirmed the new cartridge is in stock.", time: "10:30 AM", unread: 2, avatar: '🔧' },
    { id: 2, user: "Jane's Cleaning Co.", lastMessage: "Are you available for Friday 3 PM?", time: "Yesterday", unread: 0, avatar: '🧹' },
    { id: 3, user: "Electrician Mike", lastMessage: "The circuit breaker installation estimate is attached.", time: "2 days ago", unread: 0, avatar: '💡' },
    { id: 4, user: "Handy Manny", lastMessage: "I'll be running a bit late, maybe 15 minutes.", time: "1 hour ago", unread: 1, avatar: '🔨' },
];

// Sample Message History for the first conversation
const messageHistory = [
    { id: 1, sender: 'Plumb Perfect Co.', text: "Hi Alex, we're checking the availability of the faucet cartridge now. The job ID is #4592.", time: "10:00 AM" },
    { id: 2, sender: 'You', text: "Thanks, please let me know if you can get the exact replacement. I need it done before Friday.", time: "10:05 AM" },
    { id: 3, sender: 'Plumb Perfect Co.', text: "We found the exact replacement. We can proceed with the booking. Sending the final quote now.", time: "10:30 AM" },
    { id: 4, sender: 'You', text: "Great, I've accepted the quote. See you tomorrow at 10:00 AM.", time: "10:35 AM" },
];


function MessagesView({ onNavigateToDashboard }) {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [messageInput, setMessageInput] = useState('');

    // Function to navigate back to the Dashboard using the passed prop
    const navigateToDashboard = () => {
        if (onNavigateToDashboard) {
            onNavigateToDashboard();
        }
    };


    // --- Styles for the Message Layout ---

    const containerStyle = {
        display: 'flex',
        minHeight: 'calc(100vh - 80px)', // Ensures full height below the header
        backgroundColor: '#f7f9fc',
    };

    const sidebarStyle = {
        width: '350px',
        minWidth: '300px',
        backgroundColor: '#fff',
        borderRight: '1px solid #eee',
        padding: '20px 0',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
        overflowY: 'auto',
    };

    const chatAreaStyle = {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fcfcfc',
    };

    const chatHeaderStyle = {
        padding: '20px 30px',
        borderBottom: '1px solid #eee',
        backgroundColor: 'white',
        fontWeight: '600',
        fontSize: '1.2rem',
        color: '#333',
        zIndex: 10,
    };
    
    // --- Message List Item Styles ---

    const convItemStyle = (conv) => ({
        padding: '15px 25px',
        borderBottom: '1px solid #f9f9f9',
        cursor: 'pointer',
        backgroundColor: selectedConversation.id === conv.id ? '#e6f0ff' : 'white',
        borderLeft: selectedConversation.id === conv.id ? '5px solid #007bff' : '5px solid transparent',
        transition: 'background-color 0.2s',
    });

    const unreadBadgeStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '50%',
        padding: '3px 7px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center'
    };

    // --- Chat Bubble Styles ---

    const bubbleBaseStyle = {
        maxWidth: '70%',
        padding: '10px 15px',
        borderRadius: '18px',
        marginBottom: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        fontSize: '0.95rem',
    };

    const bubbleUserStyle = {
        ...bubbleBaseStyle,
        alignSelf: 'flex-end',
        backgroundColor: '#007bff',
        color: 'white',
        borderBottomRightRadius: '2px',
    };

    const bubbleProviderStyle = {
        ...bubbleBaseStyle,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        color: '#333',
        borderBottomLeftRadius: '2px',
    };

    const handleSendMessage = () => {
        if (messageInput.trim() !== '') {
            // Placeholder: In a real app, you would send this to Firestore
            console.log(`Sending message to ${selectedConversation.user}: ${messageInput}`);
            setMessageInput(''); // Clear input
        }
    };


    return (
        <div style={containerStyle} className="main-booking-area">
            
            {/* Left Sidebar: Conversation List */}
            <div style={sidebarStyle}>
                <h2 style={{ padding: '0 25px 15px', color: '#333', borderBottom: '1px solid #eee' }}>Inbox</h2>

                {/* --- New Button to Navigate to Dashboard --- */}
                <button 
                    onClick={navigateToDashboard} 
                    style={{ 
                        width: 'calc(100% - 50px)', 
                        margin: '10px 25px 20px', 
                        padding: '12px 10px', 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    &larr; Back to Dashboard
                </button>
                {/* ------------------------------------------- */}
                
                {conversations.map(conv => (
                    <div 
                        key={conv.id} 
                        style={convItemStyle(conv)}
                        onClick={() => setSelectedConversation(conv)}
                        role="button"
                        tabIndex="0"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: selectedConversation.id === conv.id ? 'bold' : '600', color: selectedConversation.id === conv.id ? '#007bff' : '#333' }}>
                                {conv.user}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#999' }}>{conv.time}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                            <p style={{ color: '#666', fontSize: '0.9rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flexGrow: 1 }}>
                                {conv.lastMessage}
                            </p>
                            {conv.unread > 0 && <span style={unreadBadgeStyle}>{conv.unread}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Area: Chat History and Input */}
            <div style={chatAreaStyle}>
                <div style={chatHeaderStyle}>
                    {selectedConversation.user}
                </div>
                
                {/* Message Scroll Area */}
                <div style={{ flexGrow: 1, padding: '20px 30px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    
                    {messageHistory.map((msg, index) => {
                        const isUser = msg.sender === 'You';
                        return (
                            <div 
                                key={index} 
                                style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', width: '100%' }}
                            >
                                <div style={isUser ? bubbleUserStyle : bubbleProviderStyle}>
                                    {!isUser && <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '3px', color: isUser ? 'white' : '#007bff' }}>{msg.sender}</div>}
                                    {msg.text}
                                    <div style={{ fontSize: '0.7rem', color: isUser ? 'rgba(255, 255, 255, 0.7)' : '#999', marginTop: '5px', textAlign: isUser ? 'right' : 'left' }}>{msg.time}</div>
                                </div>
                            </div>
                        );
                    })}
                    {/* Add a spacer at the end to ensure the last message isn't blocked by the input */}
                    <div style={{ height: '10px' }}></div> 

                </div>

                {/* Input Area */}
                <div style={{ padding: '20px 30px', borderTop: '1px solid #eee', backgroundColor: 'white', display: 'flex' }}>
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                        style={{ flexGrow: 1, padding: '10px 15px', border: '1px solid #ddd', borderRadius: '8px', marginRight: '10px', fontSize: '1rem' }} 
                    />
                    <button 
                        onClick={handleSendMessage}
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', opacity: messageInput.trim() === '' ? 0.7 : 1 }}
                        disabled={messageInput.trim() === ''}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessagesView;