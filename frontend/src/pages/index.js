import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ChatInterface from '../components/Chat/ChatInterface';
import React from "react";

export default function Home() {
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing chat ID in localStorage
    const savedChatId = localStorage.getItem('chatId');
    if (savedChatId) {
      setChatId(savedChatId);
    }
    setLoading(false);
  }, []);

  const handleNewChat = (newChatId) => {
    setChatId(newChatId);
    localStorage.setItem('chatId', newChatId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mental Health Chatbot</title>
        <meta name="description" content="A personal mental health chatbot to help you cope with stress and anxiety" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary-700">
            Mental Health Support Chatbot
          </h1>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <ChatInterface 
              initialChatId={chatId} 
              onNewChat={handleNewChat} 
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}