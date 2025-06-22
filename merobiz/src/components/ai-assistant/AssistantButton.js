import React, { useState } from 'react';
import CustomerAssistant from './CustomerAssistant';
import AdminAssistant from './AdminAssistant';

export default function AssistantButton() {
  const [show, setShow] = useState(false);
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <>
      <button className="assistant-toggle" onClick={() => setShow(!show)}>
        🤖 Chat
      </button>
      {show && (isAdmin ? <AdminAssistant /> : <CustomerAssistant />)}
    </>
  );
}
