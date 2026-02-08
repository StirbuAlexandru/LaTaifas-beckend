'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  phone_number: string;
  text_color?: string;
  is_active: boolean;
  created_at: string;
}

const EvenimentePage = () => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/evenimente');
      const result = await response.json();

      if (result.success) {
        setActiveEvent(result.data.activeEvent);
        setPastEvents(result.data.pastEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Se incarca...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Active Event - Full Screen with Hero */}
      {activeEvent && (
        <section className="relative h-screen w-full">
          {/* Background Image */}
          <Image
            src={activeEvent.image_url}
            alt={activeEvent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0">
            <div className="container mx-auto px-4 pt-20 md:pt-32 h-full flex flex-col justify-between">
              {/* Top Section */}
              <div>
                {/* Badge - Left aligned */}
                <div className="mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full border-2 border-white/30 shadow-lg">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider">Evenimente</span>
                  </div>
                </div>

                {/* Event Details - Top portion */}
                <div className="max-w-4xl">
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    <span className="text-xs md:text-sm font-semibold text-white">{formatDate(activeEvent.event_date)}</span>
                  </div>
                  
                  <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-2xl`} style={{ color: activeEvent.text_color || '#111827' }}>
                    {activeEvent.title}
                  </h2>
                  
                  <p className={`text-base md:text-lg lg:text-xl drop-shadow-lg leading-relaxed`} style={{ color: activeEvent.text_color || '#111827' }}>
                    {activeEvent.description}
                  </p>
                </div>
              </div>

              {/* Call Button - Bottom */}
              <div className="pb-20 md:pb-24 lg:pb-32">
                <a href={`tel:${activeEvent.phone_number}`}>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-5 md:px-10 md:py-7 rounded-xl font-semibold inline-flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-2xl text-base md:text-lg w-full md:w-auto justify-center">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    Sună pentru rezervare
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {!activeEvent && (
        <>
          <section className="py-20 pt-28 md:pt-32 bg-gradient-to-br from-red-50 via-orange-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border-2 border-red-100 mb-4">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Evenimente</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">Evenimente</span> La Taifas
                </h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mb-6 rounded-full"></div>
                
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Descopera evenimentele noastre speciale si rezerva-ti locul
                </p>
              </div>
            </div>
          </section>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center text-gray-600">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Nu sunt evenimente active momentan</p>
            </div>
          </div>
        </>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Evenimente <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">Trecute</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-red-200 group"
                >
                  {/* Image */}
                  <div className="relative h-[250px]">
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full mb-3">
                      <Calendar className="h-3 w-3 text-gray-600" />
                      <span className="text-xs font-semibold text-gray-600">
                        {formatDate(event.event_date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EvenimentePage;
