// src/components/BookingTabs.jsx

function BookingTabs({ activeTab, onTabChange }) {
  
  const getStyle = (tabName) => {
    return {
      padding: '8px 20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
      fontWeight: 'bold',
      backgroundColor: activeTab === tabName ? '#007bff' : 'transparent',
      color: activeTab === tabName ? 'white' : '#666',
      borderColor: activeTab === tabName ? '#007bff' : '#ccc',
    };
  };

  return (
    <div className="booking-tabs" style={{ marginBottom: '10px' }}>
      <button 
        onClick={() => onTabChange('upcoming')} 
        style={getStyle('upcoming')}
      >
        Upcoming Bookings
      </button>
      <button 
        onClick={() => onTabChange('past')} 
        style={getStyle('past')}
      >
        Past Bookings
      </button>
    </div>
  );
}

export default BookingTabs;