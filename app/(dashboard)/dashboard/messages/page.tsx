'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Mail, MailOpen, Trash2, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ro } from 'date-fns/locale';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
  read_at?: string;
  replied_at?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' ? '/api/contact' : `/api/contact?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' }),
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sigur vrei să ștergi acest mesaj?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mesaje Contact
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {unreadCount} mesaje necitite
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Toate
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Necitite ({unreadCount})
        </Button>
        <Button
          variant={filter === 'read' ? 'default' : 'outline'}
          onClick={() => setFilter('read')}
        >
          Citite
        </Button>
        <Button
          variant="outline"
          onClick={fetchMessages}
          className="ml-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reîmprospătează
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Se încarcă mesajele...</p>
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nu există mesaje</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                className={`cursor-pointer transition-colors ${
                  selectedMessage?.id === msg.id
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : msg.status === 'unread'
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === 'unread') {
                    handleMarkAsRead(msg.id);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {msg.status === 'unread' ? (
                        <Mail className="h-4 w-4 text-blue-600" />
                      ) : (
                        <MailOpen className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="font-semibold text-sm">{msg.name}</span>
                    </div>
                    <Badge variant={msg.status === 'unread' ? 'default' : 'secondary'}>
                      {msg.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(msg.created_at), {
                      addSuffix: true,
                      locale: ro,
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedMessage.subject}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        De la: {selectedMessage.name} ({selectedMessage.email})
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(selectedMessage.created_at).toLocaleString('ro-RO')}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(selectedMessage.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button asChild>
                      <a href={`mailto:${selectedMessage.email}`}>
                        Răspunde prin Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Mail className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Selectează un mesaj pentru a-l vizualiza</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
