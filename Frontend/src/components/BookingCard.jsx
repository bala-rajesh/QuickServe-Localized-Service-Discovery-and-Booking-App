import React from 'react';

const DEFAULT_AVATAR = 'https://via.placeholder.com/45/007bff/ffffff?text=User'; 

function BookingCard({ 
  providerName, 
  serviceType, 
  date, 
  time, 
  price,
  status, 
  providerImage, 
  onDetailsClick, 
  onRescheduleClick 
}) {
  // Logic to determine badge colors based on status
  const getStatusBg = (s) => {
    if (s === 'Booked') return '#e8f5e9';
    if (s === 'In Progress') return '#fff8e1';
    if (s === 'Rejected') return '#ffebee';
    return '#f1f5f9';
  };
  
  const getStatusTextColor = (s) => {
    if (s === 'Booked') return '#2e7d32';
    if (s === 'In Progress') return '#f57f17';
    if (s === 'Rejected') return '#d32f2f';
    return '#475569';
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    }
    return dateString;
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      {/* Header section with Provider info and Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={providerImage || DEFAULT_AVATAR} 
            alt={providerName} 
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{providerName}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{serviceType}</p>
          </div>
        </div>
        <span style={{
          backgroundColor: getStatusBg(status),
          color: getStatusTextColor(status),
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>{status}</span>
      </div>

      {/* Date and Time Details */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        padding: '12px 0', 
        borderTop: '1px solid #f1f5f9', 
        borderBottom: '1px solid #f1f5f9', 
        fontSize: '0.85rem' 
      }}>
        <span>🗓️ <b>{formatDate(date)}</b></span>
        <span>⏱️ <b>{formatTime(time)}</b></span>
        <span>💰 <b>₹{price}</b></span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={onDetailsClick} 
          style={{ 
            flex: 1, 
            padding: '8px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            backgroundColor: 'white',
            fontWeight: '600',
            transition: 'background 0.2s'
          }}
        >
          Details
        </button>
        
        {/* Reschedule button only appears if status is 'Booked' */}
        {status === 'Booked' && (
          <button 
            onClick={onRescheduleClick} 
            style={{ 
              flex: 1, 
              padding: '8px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              backgroundColor: '#2563eb', 
              color: 'white',
              fontWeight: '600'
            }}
          >
            Reschedule
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;