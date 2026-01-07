import React from 'react';

const DEFAULT_AVATAR = 'https://via.placeholder.com/45/007bff/ffffff?text=User';

function BookingCard({
  id,
  providerName,
  serviceType,
  date,
  time,
  price,
  status,
  providerImage,
  onDetailsClick,
  onRescheduleClick,
  onCancelClick
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
    <div className="booking-card">
      {/* Header section with Provider info and Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={providerImage || DEFAULT_AVATAR}
            alt={providerName}
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', overflow: 'hidden' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 className="booking-card-title" style={{ margin: 0, fontSize: '1rem', fontWeight: 600, lineHeight: '1.2' }}>{providerName}</h4>
            <div className="booking-card-subtitle" style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.2', marginTop: '4px' }}>{serviceType}</div>
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
          className="btn-details"
        >
          Details
        </button>

        {/* Reschedule button only for 'Booked', Cancel for 'Booked' and 'In Progress' */}
        {(status === 'Booked' || status === 'In Progress') && (
          <>
            {status === 'Booked' && (
              <button
                onClick={onRescheduleClick}
                className="btn-reschedule"
              >
                Reschedule
              </button>
            )}
            <button
              onClick={onCancelClick}
              className="btn-cancel"
              style={{
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div >
  );
}

export default BookingCard;