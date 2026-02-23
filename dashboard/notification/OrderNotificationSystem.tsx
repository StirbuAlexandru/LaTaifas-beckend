'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';

interface Order {
  id: string;
  status: string;
}

const OrderNotificationSystem = () => {
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Verifică comenzi noi
  const checkForNewOrders = async () => {
    try {
      const response = await fetch('/api/orders?status=pending');
      const data = await response.json();
      
      if (data.success) {
        const pendingOrders = data.data.orders;
        const currentPendingCount = pendingOrders.length;
        
        // Dacă avem mai multe comenzi pending decât înainte
        if (lastOrderCount > 0 && currentPendingCount > lastOrderCount) {
          const newOrdersCount = currentPendingCount - lastOrderCount;
          
          // Redă sunetul
          playNotificationSound();
          
          // Afișează notificare
          setNotificationMessage(`🔔 ${newOrdersCount} comandă nouă în așteptare!`);
          setShowNotification(true);
          
          // Ascunde notificarea după 10 secunde
          setTimeout(() => {
            setShowNotification(false);
          }, 10000);
          
          // Notificare browser
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Comandă Nouă!', {
              body: `Aveți ${newOrdersCount} comandă nouă în așteptare`,
              icon: '/favicon.svg'
            });
          }
        }
        
        setLastOrderCount(currentPendingCount);
      }
    } catch (err) {
      console.error('Eroare la verificarea comenzilor:', err);
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      // Setează volumul la maxim
      audioRef.current.volume = 1.0;
      
      // Redă sunetul de 5 ori (cu pauză de 1 secundă între ele = ~5 secunde total)
      let playCount = 0;
      const maxPlays = 5;
      
      const playBeep = () => {
        if (playCount < maxPlays) {
          audioRef.current?.play().catch(err => {
            console.error('Eroare la redarea sunetului:', err);
          });
          playCount++;
          if (playCount < maxPlays) {
            setTimeout(playBeep, 1000); // Repetă la fiecare secundă
          }
        }
      };
      
      playBeep();
    }
  };

  useEffect(() => {
    // Inițializează elementul audio
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIFWa56+efTRAMT6jj8LdjHAU1kdD01H0tBSF1xO7ekjwODFqz5OyrWBYKQ5zd77BsJAUqgMrv3IU2Bxhmu+rqok4RDEyn4u69YhwGNpHQ8taCLQUgdcPp4Y47DwxYsOPwtFkXCkOb3O+xbiQFKoDK7d2FNgcYZrrn7KFOEQxMp+Ltu2IcBjaR0PPVgi0FIHbD6d+OOw8MW6/g77VaGApDm9zvsG4kBSmAyuzczTYHGGa56+mhThEMTKff7b5iHAY2kdDy1oItBSB2w+ngjjsODFuw4O+1WRgKQ5vc77BuJAUpgcrs3M02BxhmuerpoE4RDEyn3+2+YhwGNpHQ8taCLQUgdsPp4I47Dgxbr+HvtVkYCkKb3e+wbiQFKYHK7d3NNgcYZrnr6qBOEQxMp9/tvmIcBjaR0PLWgi0FIHbD6eCOOw4MW7Dg77VZGApCm93vsG4kBSmByuzczTYHGGa66+qgThEMTKff7b5iHAY2kdDy1oItBSB2w+ngjjsODFqw4e+1WRgKQpvd77BuJAUpgcrs3M02Bxhmuurqok4RDEyn3+2+YhwGNpHQ8taCLQUgdsPp4I47Dgxar+HvtVkYCkKb3e+wbiQFKYHK7dzNNgcYZrnq66JOEQxMp9/tvmIcBjaR0PLWgi0FIHbD6eCOOw4MWrDh77VZGApCm93vsG4kBSmByuzczTYHGGa66uqiThEMTKff7b5iHAY2kdDy1oItBSB2w+ngjjsODFqw4e+1WRgKQpvd77BuJAUpgcrs3M02Bxhmuurqok4RDEyn3+2+YhwGNpHQ8taCLQUgdsPp4I47Dgxar+HvtVkYCkKb3e+wbiQFKYHK7dzNNgcYZrnq66JOEQxMp9/tvmIcBjaR0PLWgi0FIHbD6eCOOw4MWrDh77VZGApCm93vsG4kBSmByuzczTYHGGa66uqiThEMTKff7b5iHAY2kdDy1oItBSB2w+ngjjsODFqw4e+1WRgKQpvd77BuJAUpgcrs3M02Bxhmuurqok4RDEyn3+2+Yhw=');
    
    // Cere permisiune pentru notificări
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Prima verificare
    checkForNewOrders();
    
    // Polling - verifică la fiecare 10 secunde
    pollIntervalRef.current = setInterval(() => {
      checkForNewOrders();
    }, 10000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Re-check când se schimbă lastOrderCount
    if (lastOrderCount === 0) {
      checkForNewOrders();
    }
  }, [lastOrderCount]);

  return (
    <>
      {/* Notificare flotantă - apare peste orice pagină din dashboard */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-bounce">
          <div className="p-6 bg-white dark:bg-white border-4 border-green-500 rounded-lg shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Bell className="h-12 w-12 text-green-600 animate-bounce" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  COMANDĂ NOUĂ!
                </h3>
                <p className="text-lg text-gray-700 font-semibold">
                  {notificationMessage}
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="flex-shrink-0 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderNotificationSystem;
