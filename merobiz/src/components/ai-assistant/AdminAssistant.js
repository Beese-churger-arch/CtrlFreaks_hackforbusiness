import React from 'react';
import AssistantCore from './AssistantCore';

export default function AdminAssistant() {
  const prompt =
    'You are the store admin assistant. Provide sales reports, low-stock alerts, restocking suggestions, and top categories stats.';
  return <AssistantCore systemPrompt={prompt} />;
}
