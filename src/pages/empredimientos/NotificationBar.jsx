import React, { useState } from 'react';

function NotificationBar(props) {
  const [notification, setNotification] = useState(props.notification);

  return (
    <div style={{
        backgroundColor: 'lightgray',
        padding: '10px',
        textAlign: 'center',
        fontSize: '14px',
       
        bottom: '0',
        width: '100%',
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        {notification}
      </div>
  );
}

export default NotificationBar;
