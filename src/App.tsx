import React, { useState } from 'react';
import {
  Code,
  Edit3,
  Copy,
  Check,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
} from 'lucide-react';
import { RestaurantData } from './types';
import { DEFAULT_RESTAURANT_DATA } from './defaultData';
import { DigitalMenuPreview } from './components/DigitalMenuPreview';
import { HtmlCodeModal } from './components/HtmlCodeModal';
import { EditorModal } from './components/EditorModal';
import { generateStandAloneHtml } from './templateGenerator';

export default function App() {
  const [data, setData] = useState<RestaurantData>(DEFAULT_RESTAURANT_DATA);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [copiedQuick, setCopiedQuick] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'full'>('full');
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const handleQuickCopyHtml = () => {
    const code = generateStandAloneHtml(data);
    navigator.clipboard.writeText(code);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#110E0C] text-[#E8DDCF] flex flex-col font-sans">
      {/* Top Floating Control Bar for Impulso Local Agency */}
      {isToolbarVisible ? (
        <header className="sticky top-0 z-40 bg-[#1E1A17]/95 backdrop-blur-md border-b border-[#362F28] px-3 sm:px-6 py-2.5 transition-all shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: Agency branding & client restaurant name */}
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#A89F91] uppercase">
                  Impulso Local Agencia
                </span>
                <h2 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {data.nombreRestaurante || 'Menú Digital'}
                </h2>
              </div>
            </div>

            {/* Center: Device preview switcher */}
            <div className="hidden md:flex items-center bg-[#151210] p-1 rounded-xl border border-[#342D26]">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-[#B5482A] text-white shadow-xs'
                    : 'text-[#948A7D] hover:text-white'
                }`}
                title="Vista Móvil (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Móvil
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  previewDevice === 'tablet'
                    ? 'bg-[#B5482A] text-white shadow-xs'
                    : 'text-[#948A7D] hover:text-white'
                }`}
                title="Vista 640px (Ancho de la plantilla)"
              >
                <Tablet className="w-3.5 h-3.5" />
                Plantilla (640px)
              </button>
              <button
                onClick={() => setPreviewDevice('full')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  previewDevice === 'full'
                    ? 'bg-[#B5482A] text-white shadow-xs'
                    : 'text-[#948A7D] hover:text-white'
                }`}
                title="Pantalla Completa"
              >
                <Monitor className="w-3.5 h-3.5" />
                Completo
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditorModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2C2621] hover:bg-[#3A332C] text-white border border-[#443C34] transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Rellenar Datos</span>
              </button>

              <button
                onClick={handleQuickCopyHtml}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copiedQuick
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#B5482A] hover:bg-[#9F3E24] text-white shadow-sm'
                }`}
                title="Copiar código HTML con todos los datos reemplazados"
              >
                {copiedQuick ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar HTML</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsCodeModalOpen(true)}
                className="p-1.5 rounded-lg text-[#B5ABA0] hover:text-white hover:bg-[#2C2621] border border-transparent hover:border-[#443C34] transition-colors"
                title="Ver y descargar código HTML"
              >
                <Code className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsToolbarVisible(false)}
                className="p-1.5 rounded-lg text-[#B5ABA0] hover:text-white hover:bg-[#2C2621] border border-transparent hover:border-[#443C34] transition-colors"
                title="Ocultar barra de herramientas (Vista 100% limpia)"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* Floating mini pill button to restore toolbar when hidden */
        <div className="fixed top-3 right-3 z-50">
          <button
            onClick={() => setIsToolbarVisible(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1815]/90 hover:bg-[#28221D] text-[#FAF6F0] text-xs font-medium border border-[#3E3832] shadow-xl backdrop-blur-md transition-all hover:scale-105"
            title="Mostrar panel de edición y exportación"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Panel de Control</span>
          </button>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="flex-1 flex justify-center items-start overflow-y-auto">
        <div
          className={`w-full transition-all duration-300 ${
            previewDevice === 'mobile'
              ? 'max-w-[390px] my-4 shadow-2xl rounded-2xl overflow-hidden border border-[#38312A]'
              : previewDevice === 'tablet'
              ? 'max-w-[640px] my-3 shadow-2xl rounded-xl overflow-hidden border border-[#38312A]'
              : 'w-full'
          }`}
        >
          <DigitalMenuPreview data={data} />
        </div>
      </div>

      {/* Modals */}
      <HtmlCodeModal
        data={data}
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      <EditorModal
        data={data}
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        onUpdate={(updated) => setData(updated)}
      />
    </div>
  );
}
