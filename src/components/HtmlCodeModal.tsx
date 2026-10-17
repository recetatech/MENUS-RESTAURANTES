import React, { useState } from 'react';
import { Check, Copy, Download, X, Code2, ExternalLink } from 'lucide-react';
import { generateStandAloneHtml } from '../templateGenerator';
import { RestaurantData } from '../types';

interface HtmlCodeModalProps {
  data: RestaurantData;
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlCodeModal: React.FC<HtmlCodeModalProps> = ({ data, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const code = generateStandAloneHtml(data);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `${data.nombreRestaurante ? data.nombreRestaurante.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'menu'}.html`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#1C1917] text-[#FAF6F0] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] border border-[#3E3832] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#3E3832] flex items-center justify-between bg-[#24201D]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#B5482A]/20 text-[#E06D4D]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Código HTML Final Listo para Usar</h2>
              <p className="text-xs text-[#A89F91]">
                Plantilla limpia y autónoma sin dependencias externas (solo Google Fonts)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A89F91] hover:text-white hover:bg-[#332D28] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-[#171412] border-b border-[#2B2520] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-[#B8ADA0]">
            <span className="inline-flex items-center gap-1.5 bg-[#2E2823] px-2.5 py-1 rounded-md text-amber-300">
              ⚡ 100% de datos reales incrustados
            </span>
            <span className="hidden sm:inline">
              Tamaño: ~{(new Blob([code]).size / 1024).toFixed(1)} KB
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium text-xs transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#B5482A] hover:bg-[#9E3E23] text-white shadow-sm'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> ¡Copiado al Portapapeles!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copiar Código HTML
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium text-xs bg-[#2D2824] hover:bg-[#3A332E] text-white border border-[#443D36] transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Descargar .html
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="flex-1 overflow-auto p-4 bg-[#12100E] font-mono text-xs leading-relaxed">
          <pre className="text-[#D8CBB4] whitespace-pre-wrap select-all selection:bg-[#B5482A]/40">
            {code}
          </pre>
        </div>

        {/* Instructions Footer */}
        <div className="px-6 py-3.5 border-t border-[#3E3832] bg-[#1E1A17] text-xs text-[#A89F91] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#B5482A] shrink-0" />
            <span>
              Para publicar: Guarda este archivo como <b>index.html</b> y súbelo a tu hosting.
              Opcionalmente sube <b>portada.jpg</b> en la misma carpeta.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2B2622] hover:bg-[#36302B] text-white rounded-lg transition-colors shrink-0"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
