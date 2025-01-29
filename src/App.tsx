import React, { useState, useRef, useEffect } from 'react';
import { Server, Globe2, Shield, Clock, Activity, Users, ChevronRight, ChevronDown, Sun, Moon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('samp');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const PriceCard = ({ slots, price }: { slots: string, price: string }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 no-select">
      <div className="text-center">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">{slots}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Rp{price}</p>
      </div>
      <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
        Pilih Paket
      </button>
    </div>
  );

  const PreviewSection = ({ title, description, imageSrc }: { title: string, description: string, imageSrc: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 no-select">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 no-select">
      {/* Header */}
      <header className="bg-purple-600 dark:bg-purple-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Oxley Cloud</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-purple-500 dark:hover:bg-purple-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <nav className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-purple-500 dark:hover:bg-purple-700"
                >
                  Hosting
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Floating Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                    <button 
                      onClick={() => {
                        setActiveTab('samp');
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors ${activeTab === 'samp' ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      SA-MP
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTab('openmp');
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors ${activeTab === 'openmp' ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      OpenMP
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-700 dark:bg-purple-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Oxley Cloud Best Hosting</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Layanan hosting kami menawarkan Warranty dan Anti-DDoS tinggi, uptime yang stabil, 
            dan dukungan teknis 24/7. Nikmati pengalaman hosting yang lancar dan terpercaya.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Pricelist Hosting {activeTab.toUpperCase()}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <PriceCard slots="10 + 5 Player Slot" price="10.000" />
            <PriceCard slots="20 + 10 Player Slot" price="20.000" />
            <PriceCard slots="30 + 10 Player Slot" price="30.000" />
            <PriceCard slots="40 + 10 Player Slot" price="40.000" />
            <PriceCard slots="50 + 10 Player Slot" price="50.000" />
            <PriceCard slots="80 + 20 Player Slot" price="80.000" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Keunggulan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all">
              <Shield className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">Anti DDoS Game</h3>
              <p className="dark:text-gray-300">Protection up to 99%</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all">
              <Server className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">Uptime Server</h3>
              <p className="dark:text-gray-300">Up to 98%</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all">
              <Globe2 className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">Server Location</h3>
              <p className="dark:text-gray-300">Indonesia & Singapore</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all">
              <Clock className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">30-Day Warranty</h3>
              <p className="dark:text-gray-300">Unlimited Replacement</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all">
              <Activity className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">DDoS Monitoring</h3>
              <p className="dark:text-gray-300">24/7 with real-time notifications</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all">
              <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">Technical Support</h3>
              <p className="dark:text-gray-300">24/7 Customer Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Preview Panel</h2>
          
          <PreviewSection
            title="Control Panel"
            description="Panel kontrol yang mudah digunakan untuk mengelola server game Anda dengan berbagai fitur lengkap."
            imageSrc="https://cdn.discordapp.com/attachments/1324886368987381801/1333811576498814996/control_panel.png?ex=679a4054&is=6798eed4&hm=b3bf54671e617f809cce62525771a1837c5ecdda00fe365b000d65e73ff8f052&"
          />

          <PreviewSection
            title="Database Management"
            description="Kelola database server Anda dengan mudah menggunakan phpMyAdmin yang terintegrasi."
            imageSrc="https://cdn.discordapp.com/attachments/1324886368987381801/1333811577589071974/phpmyadmin_panel.png?ex=679a4055&is=6798eed5&hm=c04b813397f9a484bae8fc3bdec969a1aa73fe5350f65339cd0337b22424d6a1&"
          />

          <PreviewSection
            title="File Manager & Fetch Downloader"
            description="Upload dan kelola file server Anda dengan mudah menggunakan file manager yang intuitif dan fetch downloader."
            imageSrc="https://cdn.discordapp.com/attachments/1324886368987381801/1333811576754536598/fetch_downloader.png?ex=679a4054&is=6798eed4&hm=96e7627b4df1dbe1b89180323dd977514df05357f2d9dfb9b661771e4dbf7290&"
          />

          <PreviewSection
            title="Firewall Protection"
            description="Sistem keamanan tingkat tinggi dengan firewall protection untuk melindungi server Anda dari serangan."
            imageSrc="https://cdn.discordapp.com/attachments/1324886368987381801/1333811577048006668/firewall_protect_1.png?ex=679a4054&is=6798eed4&hm=858b3cbebfcbfa1bcd9e9b8f3c3fa3ac7099f04f6a19a740144bbe5fa5917892&"
          />

          <PreviewSection
            title="DDoS Protection"
            description="Monitoring serangan DDoS secara real-time dengan notifikasi langsung ke Discord."
            imageSrc="https://cdn.discordapp.com/attachments/1324886368987381801/1333811577324965999/firewall_protect_2.png?ex=679a4055&is=6798eed5&hm=51c2ef4465e69a63a5f7179ed9c75cf479f55be23f5bdd04a6ea2efded7c40ba&"
          />

        </div>
      </section>

      {/* CTA Section */}
    <section className="fixed bottom-6 left-0 right-0 flex justify-center">
      <a 
        href="https://discord.gg/Zaxns4Gumb" 
        className="flex items-center gap-2 bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
        style={{ padding: "5px 10px" }}
      >
        <img 
          src="https://cdn.discordapp.com/attachments/1324886368987381801/1333952162614738984/discord_logo.png?ex=679ac343&is=679971c3&hm=21649de85d3df78e8b4a5a4dcd4973bb8969d7c71e636d61eecfac9d638c1294&" 
          alt="Discord Logo" 
          className="w-10 h-10"
        />
        <span className="font-bold text-lg">Beli Sekarang</span>
        <ChevronRight className="w-5 h-5" />
      </a>
    </section>
    </div>
  );
}

export default App;