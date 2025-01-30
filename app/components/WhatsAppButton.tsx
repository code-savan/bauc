'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+2348035933363';
  const message = 'Hello! I would like to know more about your real estate investment solutions.';

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-4 mb-4 w-72 transform transition-all duration-300 ease-in-out">
          <div className="text-sm text-gray-600 mb-4">
            Hello! How can we help you today? Click below to start a WhatsApp chat with our team.
          </div>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block font-space-mono hover:bg-green-600 transition-colors w-full text-center"
          >
            Start a Conversation
          </a>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.87 21l3.32-1.06c1.54.95 3.36 1.5 5.31 1.5 5.52 0 10-4.48 10-10S17.52 2 12 2zm.97 14.95c-1.02 0-2.03-.26-2.91-.75l-.42-.25-2.78.89.9-2.61-.27-.42c-.54-.94-.83-2.01-.83-3.11 0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6z"/>
        </svg> */}
        <Image src={"/whatsappwhite.png"} alt='whatsapp' width={35} height={35} />
      </button>
    </div>
  );
}
