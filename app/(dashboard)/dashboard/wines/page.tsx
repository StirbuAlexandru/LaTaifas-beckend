'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Plus, Wine as WineIcon } from 'lucide-react';
import { calculateFinalPrice } from '@/utils/discountCalculator';

interface Wine {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  discountActive?: boolean;
  image?: string;
  wineType?: string;
  region?: string;
  alcoholContent?: number;
  volume?: number;
  year?: number;
  producer?: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

const WinesPage = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWineType, setSelectedWineType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWines = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/wines?page=${currentPage}&limit=50`);
      const result = await response.json();

      if (result.success) {
        setWines(result.data.wines);
        setFilteredWines(result.data.wines);
        setTotalPages(result.data.totalPages);
      } else {
        setError(result.error || 'Failed to fetch wines');
      }
    } catch (err) {
      console.error('Error fetching wines:', err);
      setError('An error occurred while fetching wines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWines();
  }, [currentPage]);

  // Filter wines based on search and wine type
  useEffect(() => {
    let filtered = wines;

    if (searchTerm) {
      filtered = filtered.filter(wine =>
        wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.producer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.region?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedWineType && selectedWineType !== 'all') {
      filtered = filtered.filter(wine => wine.wineType === selectedWineType);
    }

    setFilteredWines(filtered);
  }, [searchTerm, selectedWineType, wines]);

  const handleDelete = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest vin?')) return;

    try {
      const response = await fetch(`/api/wines/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        fetchWines();
      } else {
        alert('Eroare la ștergerea vinului: ' + result.error);
      }
    } catch (err) {
      console.error('Error deleting wine:', err);
      alert('A apărut o eroare la ștergerea vinului');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <WineIcon className="h-8 w-8 text-red-600" />
            Gestionare Vinuri
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administrează colecția de vinuri
          </p>
        </div>
        <Link href="/dashboard/wines/add">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            Adaugă Vin
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Caută vin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedWineType} onValueChange={setSelectedWineType}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Tip vin" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-white">
            <SelectItem value="all" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Toate tipurile</SelectItem>
            <SelectItem value="red" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Roșu</SelectItem>
            <SelectItem value="white" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Alb</SelectItem>
            <SelectItem value="rose" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Rose</SelectItem>
            <SelectItem value="sparkling" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Spumant</SelectItem>
            <SelectItem value="dessert" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Desert</SelectItem>
            <SelectItem value="fortified" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Fortificat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Se încarcă vinurile...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchWines}>Încearcă din nou</Button>
        </div>
      )}

      {/* Wines Table */}
      {!loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Imagine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Producător
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Preț
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stoc
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredWines.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      Nu s-au găsit vinuri
                    </td>
                  </tr>
                ) : (
                  filteredWines.map((wine) => {
                    const finalPrice = calculateFinalPrice(
                      wine.price,
                      {
                        discountType: wine.discountType || 'percentage',
                        discountValue: wine.discountValue || 0,
                        discountActive: wine.discountActive || false
                      }
                    );
                    const hasDiscount = wine.discountActive && wine.discountValue && wine.discountValue > 0;

                    return (
                      <tr key={wine.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative h-16 w-16">
                            {wine.image ? (
                              <Image
                                src={wine.image}
                                alt={wine.name}
                                fill
                                className="object-cover rounded"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                <WineIcon className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {wine.name}
                          </div>
                          {wine.year && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Anul {wine.year}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {wine.producer || '-'}
                          </div>
                          {wine.region && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {wine.region}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {wine.wineType || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {wine.discountActive && finalPrice < wine.price ? (
                              <div>
                                <span className="line-through text-gray-400">{wine.price} lei</span>
                                <span className="ml-2 text-red-600 font-bold">{finalPrice.toFixed(2)} lei</span>
                              </div>
                            ) : (
                              <span>{wine.price} lei</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            wine.inStock
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {wine.inStock ? 'În stoc' : 'Stoc epuizat'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Link href={`/dashboard/wines/${wine.id}`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(wine.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <Button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                variant="outline"
              >
                Pagina anterioară
              </Button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Pagina {currentPage} din {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                Pagina următoare
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WinesPage;
