import { useState } from 'react';
import {
  Image as ImageIcon,
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
import { Button, Card } from './ui';

const categoryBM = {
  All: 'Semua',
  Posters: 'Poster',
  Testimonials: 'Testimoni',
  Copywriting: 'Copywriting',
};

const assetCopy = {
  'asset-1': {
    title: 'Kesedaran Kad Perubatan',
    desc: 'Tonjolkan kos perubatan yang meningkat dan manfaat perlindungan Takaful.',
  },
};

const categoryIcons = {
  Posters: ImageIcon,
  Testimonials: MessageSquare,
  Copywriting: FileText,
};

/* ─── Asset preview modal ─────────────────────────────────────────── */
function AssetPreview({ asset, agent, onClose }) {
  const copy = assetCopy[asset.id] || asset;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="asset-preview-title"
      className="fixed inset-0 bg-md-inverse-surface/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card
        radius="2xl"
        tone="lowest"
        className="max-w-md w-full max-h-[90vh] overflow-y-auto p-0 shadow-md-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-md-outline-variant">
          <h3 id="asset-preview-title" className="font-medium text-md-on-surface text-sm truncate pr-2">
            Pratonton: {copy.title}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex-shrink-0 inline-flex items-center justify-center rounded-full text-md-on-surface-variant hover:bg-md-primary/10 active:scale-95 transition-all"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Personalized poster preview */}
          <div className="relative bg-md-inverse-surface text-md-inverse-on-surface rounded-[28px] aspect-[4/5] p-6 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-48 h-48 bg-md-inverse-primary/30 rounded-full blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-16 w-56 h-56 bg-md-tertiary/40 rounded-full blur-3xl"
            />

            <div className="relative h-full flex flex-col items-center justify-between text-center">
              <div className="text-7xl">{asset.thumbnail}</div>

              <div>
                <h4 className="text-2xl font-medium text-md-inverse-primary mb-2 leading-tight">
                  {copy.title}
                </h4>
                <p className="text-sm text-md-inverse-on-surface/80 leading-relaxed">
                  {copy.desc}
                </p>
              </div>

              {/* Agent overlay */}
              <div className="w-full bg-white/[0.08] backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center gap-2 text-sm">
                    <User className="w-3.5 h-3.5 text-md-inverse-primary" />
                    <span className="font-medium">{agent.name}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm">
                    <Phone className="w-3.5 h-3.5 text-md-inverse-primary" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm">
                    <Award className="w-3.5 h-3.5 text-md-inverse-primary" />
                    <span>{agent.rank}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 mt-5">
            <Button variant="filled" iconLeft={Download} className="flex-1">
              Muat Turun
            </Button>
            <Button variant="outlined" onClick={onClose} className="flex-1">
              Tutup
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ─── Main marketing kit ──────────────────────────────────────────── */
export default function MarketingKitTab() {
  const { agent } = useApp();
  const [filter, setFilter] = useState('All');
  const [preview, setPreview] = useState(null);

  const categories = ['All', 'Posters', 'Testimonials', 'Copywriting'];
  const filtered =
    filter === 'All'
      ? mockMarketingAssets
      : mockMarketingAssets.filter((a) => a.category === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
          Kit Pemasaran
        </h1>
        <p className="text-md-on-surface-variant mt-1.5">
          Aset digital dan alat untuk meningkatkan pemasaran anda.
        </p>
      </div>

      {/* Filter pills */}
      <div role="tablist" className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-md-on-surface-variant flex-shrink-0" />
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(cat)}
              className={[
                'h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap',
                'transition-all duration-300 md-emphasized active:scale-95',
                active
                  ? 'bg-md-inverse-surface text-md-inverse-primary shadow-md-1'
                  : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-container-high',
              ].join(' ')}
            >
              {categoryBM[cat]}
            </button>
          );
        })}
      </div>

      {/* Asset grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((asset) => {
          const Icon = categoryIcons[asset.category] || ImageIcon;
          const copy = assetCopy[asset.id] || asset;
          return (
            <Card key={asset.id} radius="lg" interactive className="overflow-hidden p-0 group">
              {/* Thumb */}
              <div className="bg-md-primary-container h-36 flex items-center justify-center text-5xl transition-transform duration-300 md-emphasized group-hover:scale-105">
                {asset.thumbnail}
              </div>

              <div className="p-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-md-primary mb-2">
                  <Icon className="w-3.5 h-3.5" />
                  {categoryBM[asset.category]}
                </div>
                <h3 className="font-medium text-md-on-surface text-sm mb-1 leading-snug">
                  {copy.title}
                </h3>
                <p className="text-xs text-md-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                  {copy.desc}
                </p>

                <Button
                  variant="tonal"
                  size="sm"
                  iconLeft={Eye}
                  onClick={() => setPreview(asset)}
                  className="w-full"
                >
                  Pratonton & Peribadi
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-md-on-surface-variant text-sm">
          Tiada aset dijumpai untuk kategori ini.
        </div>
      )}

      {/* Info panel */}
      <Card radius="lg" tone="inverse" className="p-6 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-56 h-56 bg-md-inverse-primary/15 rounded-full blur-3xl"
        />
        <div className="relative">
          <h3 className="font-medium text-md-inverse-primary mb-2">
            Penjanaan Iklan Dinamik (Leret Apps)
          </h3>
          <p className="text-sm text-md-inverse-on-surface/75 leading-relaxed">
            Klik "Pratonton & Peribadi" pada mana-mana aset untuk menjana poster pemasaran
            dengan nama, nombor telefon dan pangkat anda secara automatik. Sedia untuk
            dikongsi di media sosial.
          </p>
        </div>
      </Card>

      {preview && (
        <AssetPreview
          asset={preview}
          agent={agent}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}
