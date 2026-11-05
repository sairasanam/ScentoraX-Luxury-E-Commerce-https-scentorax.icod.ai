import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Modal, Input, Spinner } from '@/components/ui';
import { fetchProductsRequest } from '@/services/apiClient';
import type { Product } from '@/types';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
      return;
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchProductsRequest({ search: query, limit: 6 });
        if (res.data) setResults(res.data.products);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/shop/${slug}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="max-w-2xl"
      data-icod-id="src_components_searchoverlay_tsx_0cd5">
      <div
        className="flex items-center gap-3 border-b border-border/40 pb-4"
        data-icod-id="src_components_searchoverlay_tsx_c469">
        <Search
          className="h-5 w-5 text-muted-foreground"
          data-icod-id="src_components_searchoverlay_tsx_06a6" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search fragrances..."
          className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
          data-icod-id="src_components_searchoverlay_tsx_703c" />
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-luxury"
          data-icod-id="src_components_searchoverlay_tsx_316b">
          <X className="h-5 w-5" data-icod-id="src_components_searchoverlay_tsx_90e2" />
        </button>
      </div>
      <div
        className="min-h-[200px] py-4"
        data-icod-id="src_components_searchoverlay_tsx_0e53">
        {loading && (
          <div
            className="flex justify-center py-12"
            data-icod-id="src_components_searchoverlay_tsx_2403">
            <Spinner size="md" data-icod-id="src_components_searchoverlay_tsx_b355" />
          </div>
        )}
        {!loading && query && results.length === 0 && (
          <p
            className="py-12 text-center text-sm text-muted-foreground"
            data-icod-id="src_components_searchoverlay_tsx_1e98">No fragrances found for &ldquo;{query}&rdquo;</p>
        )}
        {!loading && results.length > 0 && (
          <div
            className="flex flex-col gap-2"
            data-icod-id="src_components_searchoverlay_tsx_6c14">
            {results.map((product) => (
              <button
                key={product._id}
                onClick={() => handleSelect(product.slug)}
                className="flex items-center gap-3 rounded-lg p-3 text-left transition-luxury hover:bg-muted"
                data-icod-id={`src_components_searchoverlay_tsx_6b75_${product._id}`}>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-muted"
                  data-icod-id={`src_components_searchoverlay_tsx_3a35_${product._id}`}>
                  <span
                    className="text-xs text-primary/60"
                    data-icod-id={`src_components_searchoverlay_tsx_9408_${product._id}`}>{product.size}ml</span>
                </div>
                <div data-icod-id={`src_components_searchoverlay_tsx_58fc_${product._id}`}>
                  <p
                    className="font-serif text-sm font-medium text-foreground"
                    data-icod-id={`src_components_searchoverlay_tsx_65d4_${product._id}`}>{product.name}</p>
                  <p
                    className="text-xs text-muted-foreground"
                    data-icod-id={`src_components_searchoverlay_tsx_cccf_${product._id}`}>₨{product.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {!loading && !query && (
          <p
            className="py-12 text-center text-sm text-muted-foreground"
            data-icod-id="src_components_searchoverlay_tsx_433c">Start typing to search our collection</p>
        )}
      </div>
    </Modal>
  );
}
