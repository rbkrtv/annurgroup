import { useState } from 'react';
import {
  Image,
  MessageSquare,
  FileText,
  Filter,
  Download,
  Eye,
  X,
  User,
  Phone,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockMarketingAssets } from '../data/mockData';

// ─── BM translations ─────────────────────────────────────────────────────────
const categoryBM = {
  All: 'Semua',
  Posters: 'Poster',
  Testimonials: 'Testimoni',
  Copywriting: 'Copywriting',
};

const assetCopy = {
  'asset-1': { title: 'Kesedaran Kad Perubatan', desc: 'Tonjolkan kos perubatan yang meningkat dan manfaat perlindungan Takaful.' },
  'asset-2': { title: 'Pelan Perlindungan Keluarga', desc: 'Tarikan emosi untuk keselamatan kewangan keluarga.' },
  'asset-3': { title: 'Simpanan Tabung Pendidikan', desc: 'Rancang pendidikan anak dengan simpanan Takaful.' },
  'asset-4': { title: 'Kejayaan Pelanggan: Tuntutan RM50k', desc: 'Testimoni pelanggan sebenar mengenai proses tuntutan lancar.' },
  'asset-5': { title: 'Perjalanan Ejen: Dari Sifar ke SAM', desc: 'Kisah kejayaan ejen yang memberi inspirasi untuk pengambilan.' },
  'asset-6': { title: 'Templat Siaran WhatsApp', desc: 'Mesej siaran WhatsApp sedia digunakan untuk mencari prospek.' },
  'asset-7': { title: 'Pek Kapsyen Instagram', desc: 'Kalendar kandungan 30-hari dengan kapsyen untuk media sosial.' },
  'asset-8': { title: 'Perancangan Persaraan', desc: 'Visualkan persaraan selesa dengan perancangan yang betul.' },
};

// ─── Asset Preview Modal ─────────────────────────────────────────────────────
function AssetPreview({ asset, agent, onClose }) {
  const copy = assetCopy[asset.id] || asset;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <h3 className="font-bold text-neutral-900 text-sm">Pratonton: {copy.title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Tutup pratonton"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Simulated Poster with Agent Overlay */}
        <div className="p-4">
          <div className="relative bg-gradient-to-br from-black via-neutral-900 to-amber-900 rounded-xl aspect-[4/5] flex flex-col items-center justify-center p-6 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/20 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative text-center">
              <div className="text-5xl mb-4">{asset.thumbnail}</div>
              <h4 className="text-xl font-bold mb-2 text-amber-400">{copy.title}</h4>
              <p className="text-neutral-200 text-sm mb-6">{copy.desc}</p>

              {/* Agent Overlay */}
              <div className="bg-amber-500/10 backdrop-blur rounded-xl p-4 border border-amber-400/30">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm">{agent.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">{agent.rank}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-xl transition-all min-h-[44px] text-sm">
              <Download className="w-4 h-4" /> Muat Turun
            </button>
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-semibold py-3 rounded-xl transition-all min-h-[44px] text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Marketing Kit Tab ──────────────────────────────────────────────────
export default function MarketingKitTab() {
  const { agent } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');
  const [previewAsset, setPreviewAsset] = useState(null);

  const categories = ['All', 'Posters', 'Testimonials', 'Copywriting'];

  const filteredAssets =
    filterCategory === 'All'
      ? mockMarketingAssets
      : mockMarketingAssets.filter((a) => a.category === filterCategory);

  const categoryIcons = {
    Posters: Image,
    Testimonials: MessageSquare,
    Copywriting: FileText,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Kit Pemasaran</h1>
        <p className="text-neutral-500 mt-1">Aset digital dan alat untuk meningkatkan pemasaran anda.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
              filterCategory === cat
                ? 'bg-black text-amber-400'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {categoryBM[cat]}
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const IconComponent = categoryIcons[asset.category] || Image;
          const copy = assetCopy[asset.id] || asset;
          return (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div className="bg-gradient-to-br from-neutral-100 to-amber-50 h-32 flex items-center justify-center">
                <span className="text-4xl">{asset.thumbnail}</span>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-medium text-amber-600">{categoryBM[asset.category]}</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1">{copy.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{copy.desc}</p>

                <button
                  onClick={() => setPreviewAsset(asset)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-neutral-50 hover:bg-amber-50 border border-neutral-200 hover:border-amber-300 text-neutral-700 hover:text-amber-700 font-medium py-2.5 rounded-xl transition-all text-sm min-h-[44px]"
                >
                  <Eye className="w-4 h-4" /> Pratonton & Peribadi
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12 text-neutral-400 text-sm">
          Tiada aset dijumpai untuk kategori ini.
        </div>
      )}

      {/* Ad Generation Info */}
      <div className="bg-gradient-to-r from-black to-neutral-900 rounded-2xl p-5 border border-amber-500/20">
        <h3 className="font-bold text-amber-400 mb-2">Penjanaan Iklan Dinamik (Leret Apps)</h3>
        <p className="text-sm text-neutral-300">
          Klik "Pratonton & Peribadi" pada mana-mana aset untuk menjana poster pemasaran dengan
          nama, nombor telefon dan pangkat anda secara automatik. Sedia untuk dikongsi di media sosial!
        </p>
      </div>

      {previewAsset && (
        <AssetPreview
          asset={previewAsset}
          agent={agent}
          onClose={() => setPreviewAsset(null)}
        />
      )}
    </div>
  );
}
