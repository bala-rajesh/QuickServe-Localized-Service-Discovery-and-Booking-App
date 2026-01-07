function Summary({ className, stats }) {
  return (
    <aside className={className}>
      <div style={{ 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between' 
      }}>
        {/* Summary horizontal card */}
        <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            flex: '1', 
            minWidth: '300px' 
        }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 700 }}>Service Summary</h3>
          <div style={{ display: 'flex', gap: '30px' }}>
              <p>Total Booked: <b style={{ fontSize: '1.2rem' }}>{stats?.totalBooked || 0}</b></p>
              <p>This Week: <b style={{ color: '#2563eb', fontSize: '1.2rem' }}>{stats?.thisWeek || 0}</b></p>
          </div>
        </div>
        
        {/* Help card horizontal */}
        <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            flex: '1', 
            minWidth: '300px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
        }}>
          <p style={{ fontSize: '32px', margin: 0 }}>❓</p>
          <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Need Help?</h4>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Contact support for assistance.</p>
          </div>
          <button style={{ 
            padding: '10px 24px', 
            border: '1px solid #2563eb', 
            borderRadius: '8px', 
            color: '#2563eb',
            background: 'none',
            cursor: 'pointer'
          }}>Visit FAQ</button>
        </div>
      </div>
    </aside>
  );
}

export default Summary;