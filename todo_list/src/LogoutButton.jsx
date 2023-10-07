import React from 'react';

function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    onLogout();
    alert('Logout Successfully');
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
