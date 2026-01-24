'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('❌ A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Modern */}
      <section className="relative py-16 md:py-20 pt-24 md:pt-28 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20"></div>
        
        {/* Decorative subtle elements */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-red-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-red-200 shadow-sm mb-6 animate-fadeInUp">
            <MessageCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Suntem Aici Pentru Tine</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span className="text-red-600">Contact</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Ai întrebări sau feedback? Ne-ar plăcea să te auzim. Contactează-ne prin oricare dintre <span className="font-semibold text-red-600">canalele de mai jos</span>.
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 pb-12 md:pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-gray-900 text-xl md:text-2xl font-bold flex items-center gap-3">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Informații Contact
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-start group hover:bg-red-50/50 p-4 rounded-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Adresă</h3>
                    <p className="text-base text-gray-600">Calea Unirii, Burdujeni, nr 80, Suceava, Romania</p>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Telefon</h3>
                    <a href="tel:0753077063" className="text-base text-gray-600 hover:text-red-600 transition-colors font-medium">0753 077 063</a>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-red-50/50 p-4 rounded-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Email</h3>
                    <a href="mailto:lataifas23@gmail.com" className="text-base text-gray-600 hover:text-red-600 transition-colors font-medium">lataifas23@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-600 to-red-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Program Livrări</h3>
                    <p className="text-base text-gray-600">Luni - Duminică: 9:30 - 21:30</p>
                </div>
              </div>
            </CardContent>
            </Card>
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-gray-900 text-xl md:text-2xl font-bold flex items-center gap-3">
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-lg">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  Trimite-ne un Mesaj
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {submitSuccess ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    ✅ Mesaj Trimis cu Succes!
                  </h3>
                  <p>Vă mulțumim că ne-ați contactat. Vă vom răspunde cât mai curând posibil.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-semibold">Nume</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                          required
                          className="bg-white border-2 border-gray-200 focus:border-red-500 text-gray-900 transition-colors duration-300"
                          placeholder="Numele tău"
                        />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900 font-semibold">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          required
                          className="bg-white border-2 border-gray-200 focus:border-red-500 text-gray-900 transition-colors duration-300"
                          placeholder="email@exemplu.ro"
                        />
                    </div>
                  </div>
                  
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-900 font-semibold">Subiect</Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
                        required
                        className="bg-white border-2 border-gray-200 focus:border-red-500 text-gray-900 transition-colors duration-300"
                        placeholder="Subiectul mesajului"
                      />
                  </div>
                  
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900 font-semibold">Mesaj</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                        required
                        className="bg-white border-2 border-gray-200 focus:border-red-500 text-gray-900 transition-colors duration-300 resize-none"
                        placeholder="Scrie-ne mesajul tău aici..."
                      />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Se trimite...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        Trimite Mesajul
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section - Full Width */}
        <Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-gray-900 text-xl md:text-2xl font-bold flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              Locația Noastră
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-100" style={{ height: '350px', minHeight: '300px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.632766810396!2d26.27813467624322!3d47.672130071195966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734fbf80f20d665%3A0xdff62d466e23ba9b!2sCalea%20Unirii%2080%2C%20Suceava%20720141!5e0!3m2!1sro!2sro!4v1765557813029!5m2!1sro!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locația La Taifas"
            ></iframe>
          </div>
          <div className="flex items-center gap-2 mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-100">
            <MapPin className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-base text-gray-700 font-medium">
              Calea Unirii, Burdujeni, nr 80, Suceava, Romania
            </p>
          </div>
        </CardContent>
        </Card>

        {/* Informații Firmă - La final pe mobil conform preferințelor */}
        <div className="mt-8 pt-6 border-t-2 border-red-100 text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-100 max-w-lg mx-auto shadow-sm">
            <h4 className="font-bold text-red-600 text-lg mb-2">VINUM NOBILIS SRL</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-gray-600 text-sm">
              <span className="bg-white px-3 py-1 rounded-full border border-red-100 shadow-sm">CUI: RO45346331</span>
              <span className="bg-white px-3 py-1 rounded-full border border-red-100 shadow-sm">Nr. Reg. Com: J33/2276/13.12.2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
