'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function OrdersCleanupPage() {
  const [checking, setChecking] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [cleanupResult, setCleanupResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    try {
      setChecking(true);
      setError(null);
      setCheckResult(null);

      const response = await fetch('/api/orders/cleanup');
      const data = await response.json();

      if (data.success) {
        setCheckResult(data);
      } else {
        setError(data.error || 'Eroare la verificare');
      }
    } catch (err: any) {
      setError('Eroare la conectarea cu serverul');
      console.error('Check error:', err);
    } finally {
      setChecking(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm('Ești sigur că vrei să ștergi comenzile mai vechi de 30 de zile? Această acțiune nu poate fi anulată!')) {
      return;
    }

    try {
      setCleaning(true);
      setError(null);
      setCleanupResult(null);

      const response = await fetch('/api/orders/cleanup', {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setCleanupResult(data);
        // Refresh check result
        await handleCheck();
      } else {
        setError(data.error || 'Eroare la ștergere');
      }
    } catch (err: any) {
      setError('Eroare la conectarea cu serverul');
      console.error('Cleanup error:', err);
    } finally {
      setCleaning(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Curățare Comenzi Vechi
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Gestionează și șterge automat comenzile mai vechi de 30 de zile pentru a economisi spațiu
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {cleanupResult && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-300">
            ✅ {cleanupResult.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informații despre Curățare Automată</CardTitle>
          <CardDescription>
            Comenzile mai vechi de 30 de zile vor fi șterse automat pentru a economisi spațiu în baza de date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">📋 Reguli de ștergere:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Comenzile create acum mai mult de 30 de zile sunt eligibile pentru ștergere</li>
              <li>Produsele din comandă (order_items) sunt șterse automat împreună cu comanda</li>
              <li>Această acțiune este ireversibilă</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm">⚙️ Opțiuni de rulare:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><strong>Manual:</strong> Folosește butoanele de mai jos pentru verificare și ștergere</li>
              <li><strong>Automat:</strong> Configurează un cron job în Supabase (vezi instrucțiuni în fișierul SQL)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Check Result Card */}
      {checkResult && (
        <Card>
          <CardHeader>
            <CardTitle>Rezultat Verificare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium">Comenzi vechi găsite:</span>
                <span className="text-2xl font-bold text-blue-600">{checkResult.count}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium">Data limită:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(checkResult.cutoffDate).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {checkResult.orders && checkResult.orders.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Comenzi care vor fi șterse:</h4>
                  <div className="max-h-60 overflow-y-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left">Număr Comandă</th>
                          <th className="px-4 py-2 text-left">Data Creării</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkResult.orders.map((order: any) => (
                          <tr key={order.id} className="border-t dark:border-gray-700">
                            <td className="px-4 py-2">{order.order_number}</td>
                            <td className="px-4 py-2">
                              {new Date(order.created_at).toLocaleDateString('ro-RO')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleCheck}
          disabled={checking}
          variant="outline"
          className="gap-2"
        >
          {checking ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Se verifică...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Verifică Comenzi Vechi
            </>
          )}
        </Button>

        <Button
          onClick={handleCleanup}
          disabled={cleaning || !checkResult || checkResult.count === 0}
          variant="destructive"
          className="gap-2"
        >
          {cleaning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Se șterge...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              Șterge Comenzi Vechi
            </>
          )}
        </Button>
      </div>

      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Configurare Curățare Automată</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Opțiunea 1: Cron Job în Supabase (Recomandat)</h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>Mergi în Supabase Dashboard</li>
              <li>Navighează la <strong>Database → Cron Jobs</strong></li>
              <li>Click pe <strong>New Cron Job</strong></li>
              <li>SQL Command: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">SELECT cleanup_old_orders();</code></li>
              <li>Schedule: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">0 2 * * *</code> (rulează zilnic la 2:00 AM)</li>
              <li>Click <strong>Create</strong></li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Opțiunea 2: Manual (Aici în Dashboard)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Folosește butoanele de mai sus pentru a verifica și șterge manual comenzile vechi ori de câte ori este necesar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
