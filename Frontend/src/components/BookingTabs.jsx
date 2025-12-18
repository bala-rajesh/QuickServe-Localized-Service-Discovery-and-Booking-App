function BookingTabs({ activeTab, onTabChange }) {
  const tabs = ['All', 'Booked', 'In Progress', 'Cancelled', 'Rejected'];
  
  const getStyle = (tabName) => ({
    padding: '8px 20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
    backgroundColor: activeTab === tabName ? '#007bff' : 'transparent',
    color: activeTab === tabName ? 'white' : '#666',
    borderColor: activeTab === tabName ? '#007bff' : '#ccc',
  });

  return (
    <div className="booking-tabs" style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap' }}>
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onTabChange(tab)} style={getStyle(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export default BookingTabs;