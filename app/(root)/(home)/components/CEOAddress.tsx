'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export default function CEOAddress() {





  return (
    <section className="py-16 bg-black h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Message from Our CEO</h2>
        <div className="max-w-4xl mx-auto relative bg-black rounded-lg overflow-hidden">
        <iframe
    src="https://www.youtube.com/embed/fA4Jx67iQLg"

    width="100%"
    height="auto"
    className="w-full aspect-video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>


        </div>
      </div>
    </section>
  );
}
