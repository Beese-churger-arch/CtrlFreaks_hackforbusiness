import React from 'react';
import AssistantCore from './AssistantCore';

export default function CustomerAssistant() {
  const prompt =
    'You are an e‑commerce assistant. Help users find products, track orders, and compare dynamic pricing.';
  return <AssistantCore systemPrompt={prompt} />;
}
