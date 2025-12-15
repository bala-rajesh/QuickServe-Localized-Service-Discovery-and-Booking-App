// src/components/Summary.jsx

function Summary({ className }) {
  return (
    <aside className={className}>
      
      {/* Summary Card */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Summary</h3>
        <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>Total Services Booked: <b>12</b></p>
        <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>Upcoming This Week: <b style={{ color: '#007bff' }}>2</b></p>
      </div>
      
      {/* Need Help Card */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <p style={{ fontSize: '28px', margin: '10px 0', color: '#007bff' }}>❓</p>
        <h4 style={{ color: '#333' }}>Need Help?</h4>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Find answers to common questions or contact our support team.</p>
        <button style={{ 
          backgroundColor: '#f7f9fc', 
          color: '#007bff', 
          padding: '8px 15px', 
          border: '1px solid #007bff', 
          borderRadius: '5px', 
          cursor: 'pointer',
          marginTop: '15px'
        }}>
          Visit FAQ
        </button>
      </div>
    </aside>
  );
}

export default Summary;