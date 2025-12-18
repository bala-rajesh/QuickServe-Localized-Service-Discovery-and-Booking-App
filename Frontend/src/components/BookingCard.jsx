import React from 'react';

const DEFAULT_AVATAR = 'https://via.placeholder.com/45/007bff/ffffff?text=User'; 

function BookingCard({ providerName, serviceType, date, time, status, statusColor, providerImage }) {
  const cardStyle = {
    flex: '0 0 48%', 
    maxWidth: 'calc(50% - 12.5px)', 
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  };

  const statusStyle = {
    backgroundColor: statusColor || '#6c757d',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 600,
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={providerImage || DEFAULT_AVATAR} alt={providerName} style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '15px', objectFit: 'cover' }} />
          <div>
            <h4 style={{ margin: 0 }}>{providerName}</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{serviceType}</p>
          </div>
        </div>
        <span style={statusStyle}>{status}</span>
      </div>

      <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '15px 0', fontSize: '0.9rem', color: '#444' }}>
        <span style={{ fontWeight: 'bold' }}>🗓️ {date}</span>
        <span style={{ fontWeight: 'bold' }}>⏱️ {time}</span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white' }}>
          View Details
        </button>
        {status === 'Booked' && (
          <>
            <button style={{ padding: '8px 15px', border: '1px solid #007bff', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white', color: '#007bff' }}>
              Reschedule
            </button>
            <button style={{ padding: '8px 15px', border: '1px solid #f44336', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white', color: '#f44336' }}>
              Cancel
            </button>
          </>
        )}
        {status === 'In Progress' && (
          <button style={{ padding: '8px 15px', border: '1px solid #333', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#333', color: 'white' }}>
            Contact Provider
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;