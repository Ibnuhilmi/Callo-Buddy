import { useState } from 'react';
import { Utensils, Camera, Flame, Search, Scan } from 'lucide-react';
import { foodData, scanResults } from './data/foods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Tab = 'list' | 'scan';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'makanan' | 'minuman'>('all');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<typeof scanResults[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filteredFoods = foodData.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const randomResult = scanResults[Math.floor(Math.random() * scanResults.length)];
      setScanResult(randomResult);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">CalorieTrack</h1>
                <p className="text-xs text-gray-500">Pantau kalori harianmu</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-24">
        {activeTab === 'list' ? (
          <div className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari makanan atau minuman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-emerald-100 focus:border-emerald-300 focus:ring-emerald-200 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {(['all', 'makanan', 'minuman'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 border border-emerald-100'
                  }`}
                >
                  {cat === 'all' ? 'Semua' : cat === 'makanan' ? 'Makanan' : 'Minuman'}
                </button>
              ))}
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-50 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 group"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${food.color} text-gray-700`}>
                        {food.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{food.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{food.portion}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-sm font-bold text-orange-600">{food.calories}</span>
                      <span className="text-xs text-gray-400">kkal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Scan Section */}
            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-emerald-100 border border-emerald-50">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Scan Makanan</h2>
                <p className="text-sm text-gray-500 mt-1">Arahkan kamera ke makananmu</p>
              </div>

              {/* Camera Viewfinder */}
              <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden bg-gray-900">
                {scanning ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-400" />
                    </div>
                    <p className="text-white mt-4 text-sm animate-pulse">Menganalisis...</p>
                  </div>
                ) : (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                      alt="Camera preview"
                      className="w-full h-full object-cover opacity-50"
                    />
                    {/* Scan Frame */}
                    <div className="absolute inset-8 border-2 border-dashed border-emerald-400/60 rounded-xl">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs">
                      Posisikan makanan di tengah frame
                    </div>
                  </>
                )}
              </div>

              {/* Scan Button */}
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                {scanning ? 'Memindai...' : 'Scan Sekarang'}
              </button>

              {/* Tips */}
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                <p className="text-xs text-emerald-700 leading-relaxed">
                  <strong>Tips:</strong> Pastikan pencayaan cukup terang dan makanan terlihat jelas di frame untuk hasil scan yang akurat.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 safe-area-pb">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'list'
                  ? 'text-emerald-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'list' ? 'bg-emerald-100' : ''
              }`}>
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Daftar</span>
            </button>

            <button
              onClick={() => setActiveTab('scan')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'scan'
                  ? 'text-emerald-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'scan' ? 'bg-emerald-100' : ''
              }`}>
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Scan</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Scan Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-sm bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold text-gray-800">
              Hasil Scan
            </DialogTitle>
          </DialogHeader>
          {scanResult && (
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{scanResult.name}</h3>
              <div className="mt-4 p-4 bg-orange-50 rounded-xl">
                <p className="text-sm text-gray-600">Kandungan Kalori</p>
                <p className="text-3xl font-bold text-orange-500 mt-1">
                  {scanResult.calories}
                  <span className="text-lg text-orange-400 ml-1">kkal</span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="px-3 py-1 bg-emerald-100 rounded-full">
                  <span className="text-sm font-medium text-emerald-700">
                    Akurasi {scanResult.confidence}%
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setShowResult(false)}
                className="w-full mt-6 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl py-3 font-semibold"
              >
                Tutup
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
