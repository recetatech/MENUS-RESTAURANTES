import React, { useState } from 'react';
import {
  X,
  FileText,
  Sliders,
  Palette,
  Sparkles,
  Plus,
  Trash2,
  Check,
  RotateCcw,
} from 'lucide-react';
import { RestaurantData, MenuCategory, MenuItem } from '../types';
import { parsePromptText } from '../parser';
import { PRESET_THEMES, DEFAULT_RESTAURANT_DATA } from '../defaultData';

interface EditorModalProps {
  data: RestaurantData;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: RestaurantData) => void;
}

export const EditorModal: React.FC<EditorModalProps> = ({
  data,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'paste' | 'form' | 'colors' | 'presets'>('paste');
  const [formData, setFormData] = useState<RestaurantData>(data);
  const [rawText, setRawText] = useState<string>(() => generatePromptFormat(data));
  const [parseStatus, setParseStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyRawText = () => {
    try {
      const parsed = parsePromptText(rawText, formData);
      const updated: RestaurantData = {
        ...formData,
        ...parsed,
      };
      setFormData(updated);
      onUpdate(updated);
      setParseStatus('¡Datos analizados y aplicados con éxito!');
      setTimeout(() => setParseStatus(null), 3000);
    } catch {
      setParseStatus('Error al procesar el texto. Revisa el formato.');
    }
  };

  const handleSaveAndClose = () => {
    onUpdate(formData);
    onClose();
  };

  const handleAddCategory = () => {
    const newCat: MenuCategory = {
      categoria: 'Nueva Categoría',
      descripcion: '',
      platos: [
        {
          nombre: 'Nuevo Plato',
          desc: 'Descripción del plato',
          precio: '$0.000',
          foto: '',
        },
      ],
    };
    const updated = {
      ...formData,
      menu: [...formData.menu, newCat],
    };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleDeleteCategory = (catIdx: number) => {
    const updatedMenu = formData.menu.filter((_, idx) => idx !== catIdx);
    const updated = { ...formData, menu: updatedMenu };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleAddDish = (catIdx: number) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[catIdx].platos.push({
      nombre: 'Nuevo Plato',
      desc: '',
      precio: '$15.000',
      foto: '',
    });
    const updated = { ...formData, menu: updatedMenu };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleDeleteDish = (catIdx: number, pIdx: number) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[catIdx].platos = updatedMenu[catIdx].platos.filter((_, idx) => idx !== pIdx);
    const updated = { ...formData, menu: updatedMenu };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleUpdateDish = (
    catIdx: number,
    pIdx: number,
    field: keyof MenuItem,
    value: string
  ) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[catIdx].platos[pIdx] = {
      ...updatedMenu[catIdx].platos[pIdx],
      [field]: value,
    };
    const updated = { ...formData, menu: updatedMenu };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleApplyPreset = (presetName: string) => {
    let presetData: RestaurantData = { ...formData };
    if (presetName === 'casona') {
      presetData = { ...DEFAULT_RESTAURANT_DATA };
    } else if (presetName === 'trattoria') {
      presetData = {
        nombreRestaurante: 'Trattoria & Cantina Bella Vita',
        ciudadBarrio: 'San Antonio, Cali',
        fraseCorta: 'Pastas frescas al huevo hechas en casa y pizzas a la leña',
        horario: 'Mié–Dom, 12:30 p.m. – 10:00 p.m.',
        direccion: 'Carrera 4 # 2 - 19, San Antonio',
        telefonoVisible: '+57 (602) 889 1234',
        whatsappNumero: '573158901234',
        whatsappMensaje: 'Hola, quiero ordenar platos de la Trattoria Bella Vita',
        accentColor: '#8C1D40',
        inkColor: '#231217',
        bgColor: '#FDF7F8',
        menu: [
          {
            categoria: 'Antipasti (Entradas)',
            descripcion: 'Acompañados de focaccia de romero caliente',
            platos: [
              {
                nombre: 'Bruschetta Tradizionale',
                desc: 'Tomates cherry aromatizados con ajo confitado, albahaca fresca y reducción balsámica de Módena',
                precio: '$17.000',
                foto: '',
              },
              {
                nombre: 'Carpaccio di Manzo',
                desc: 'Finas láminas de lomo de res con rúgula fresca, lascas de parmesano reggiano y aceite de trufa blanca',
                precio: '$26.500',
                foto: '',
              },
            ],
          },
          {
            categoria: 'Pastas Frescas',
            descripcion: 'Amasadas diariamente con sémola de trigo duro y huevos de campo',
            platos: [
              {
                nombre: 'Fettuccine ai Frutti di Mare',
                desc: 'Salteados con calamares tiernos, langostinos y almejas en vino blanco y pomodoro san marzano',
                precio: '$39.000',
                foto: '',
              },
              {
                nombre: 'Ravioli di Ricotta e Spinaci al Burro e Salvia',
                desc: 'Rellenos de queso ricotta artesanal y espinaca fresca, bañados en mantequilla dorada con salvia crocante',
                precio: '$33.000',
                foto: '',
              },
            ],
          },
          {
            categoria: 'Dolci (Postres)',
            descripcion: 'Recetas familiares de la Toscana',
            platos: [
              {
                nombre: 'Tiramisú al Caffè Espresso',
                desc: 'Capas de bizcocho soletilla empapadas en espresso ristretto y crema mascarpone con cacao amargo',
                precio: '$15.000',
                foto: '',
              },
            ],
          },
        ],
      };
    } else if (presetName === 'burger') {
      presetData = {
        nombreRestaurante: 'Humo & Brasas Burger Bar',
        ciudadBarrio: 'Chapinero Alto, Bogotá',
        fraseCorta: 'Smash burgers de entraña y costilla con panes brioche horneados hoy',
        horario: 'Lun–Dom, 12:00 m. – 11:00 p.m.',
        direccion: 'Calle 65 # 3B - 14, Chapinero',
        telefonoVisible: '+57 (601) 620 4455',
        whatsappNumero: '573204455667',
        whatsappMensaje: 'Hola! Quiero pedir hamburguesas de Humo & Brasas',
        accentColor: '#D97706',
        inkColor: '#18181B',
        bgColor: '#FAF5EE',
        menu: [
          {
            categoria: 'Hamburguesas Artesanales',
            descripcion: 'Todas incluyen papas rústicas con sal de romero',
            platos: [
              {
                nombre: 'La Bacon Jam Doble Smash',
                desc: '2 carnes de 100g con costra crocante, mermelada casera de tocineta y bourbon, queso cheddar madurado y salsa de la casa',
                precio: '$29.000',
                foto: '',
              },
              {
                nombre: 'Trufa & Hongos Portobello',
                desc: 'Blend de res de 180g, portobellos salteados en mantequilla, queso suizo fundido y mayonesa de trufa negra',
                precio: '$32.500',
                foto: '',
              },
            ],
          },
          {
            categoria: 'Acompañamientos & Sides',
            descripcion: 'Ideales para botanear en grupo',
            platos: [
              {
                nombre: 'Papas Trufadas con Parmesano',
                desc: 'Papas corte delgado con aceite de trufa blanca, lluvia de queso parmesano y perejil fresco',
                precio: '$14.000',
                foto: '',
              },
            ],
          },
        ],
      };
    }
    setFormData(presetData);
    setRawText(generatePromptFormat(presetData));
    onUpdate(presetData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#1C1917] text-[#FAF6F0] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] border border-[#3E3832] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#3E3832] flex items-center justify-between bg-[#24201D]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#B5482A]/20 text-[#E06D4D]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Editor de Menú y Restaurante</h2>
              <p className="text-xs text-[#A89F91]">
                Edita los datos del restaurante o pega el texto en el formato del prompt
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

        {/* Tabs Bar */}
        <div className="px-6 border-b border-[#3E3832] bg-[#1E1B18] flex gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('paste')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'paste'
                ? 'border-[#B5482A] text-white'
                : 'border-transparent text-[#9C9284] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Pegar Texto del Prompt
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'form'
                ? 'border-[#B5482A] text-white'
                : 'border-transparent text-[#9C9284] hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Formulario Detallado
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'colors'
                ? 'border-[#B5482A] text-white'
                : 'border-transparent text-[#9C9284] hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            Paleta de Colores
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'presets'
                ? 'border-[#B5482A] text-white'
                : 'border-transparent text-[#9C9284] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Ejemplos / Plantillas
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#161311]">
          {/* TAB 1: PASTE PROMPT TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#241F1C] border border-[#3A332C] text-xs text-[#C7BCAD] leading-relaxed">
                <span className="font-semibold text-white">💡 Instrucciones:</span> Pega aquí los datos
                en el formato que usas para cada cliente. Nuestro analizador detectará el nombre,
                ubicación, horarios, teléfono, WhatsApp y cada plato con su precio automáticamente.
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8CBB4] mb-1.5">
                  Texto del Restaurante y Menú:
                </label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={14}
                  className="w-full bg-[#120F0D] border border-[#3E3832] rounded-xl p-3.5 text-xs text-[#E8DDCF] font-mono leading-relaxed focus:outline-none focus:border-[#B5482A] transition-colors"
                  placeholder="Nombre del restaurante: Mi Restaurante&#10;Barrio/ciudad: Chapinero, Bogotá&#10;Frase corta: Sazón casera hecha al momento&#10;..."
                />
              </div>

              {parseStatus && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  {parseStatus}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setRawText(generatePromptFormat(formData));
                  }}
                  className="text-xs text-[#9C9284] hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Sincronizar texto con datos actuales
                </button>

                <button
                  type="button"
                  onClick={handleApplyRawText}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-[#B5482A] hover:bg-[#9E3E23] text-white shadow-md transition-all"
                >
                  Analizar y Aplicar al Menú
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP FORM */}
          {activeTab === 'form' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-[#211C18] p-4 rounded-xl border border-[#38312A] space-y-4">
                <h3 className="text-sm font-semibold text-white border-b border-[#38312A] pb-2">
                  Información Principal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-[#A89F91] mb-1">Nombre del Restaurante</label>
                    <input
                      type="text"
                      value={formData.nombreRestaurante}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, nombreRestaurante: val }));
                        onUpdate({ ...formData, nombreRestaurante: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89F91] mb-1">Barrio / Ciudad</label>
                    <input
                      type="text"
                      value={formData.ciudadBarrio}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, ciudadBarrio: val }));
                        onUpdate({ ...formData, ciudadBarrio: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#A89F91] mb-1">Frase Corta (Eslogan)</label>
                    <input
                      type="text"
                      value={formData.fraseCorta}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, fraseCorta: val }));
                        onUpdate({ ...formData, fraseCorta: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Hours */}
              <div className="bg-[#211C18] p-4 rounded-xl border border-[#38312A] space-y-4">
                <h3 className="text-sm font-semibold text-white border-b border-[#38312A] pb-2">
                  Horarios y Contacto
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-[#A89F91] mb-1">Horario</label>
                    <input
                      type="text"
                      value={formData.horario}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, horario: val }));
                        onUpdate({ ...formData, horario: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89F91] mb-1">Dirección</label>
                    <input
                      type="text"
                      value={formData.direccion}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, direccion: val }));
                        onUpdate({ ...formData, direccion: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89F91] mb-1">Teléfono Visible</label>
                    <input
                      type="text"
                      value={formData.telefonoVisible}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, telefonoVisible: val }));
                        onUpdate({ ...formData, telefonoVisible: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A89F91] mb-1">
                      Número de WhatsApp (con indicativo, sin +)
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappNumero}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setFormData((prev) => ({ ...prev, whatsappNumero: val }));
                        onUpdate({ ...formData, whatsappNumero: val });
                      }}
                      placeholder="Ej: 573105550192"
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#A89F91] mb-1">Mensaje de WhatsApp Precargado</label>
                    <input
                      type="text"
                      value={formData.whatsappMensaje}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, whatsappMensaje: val }));
                        onUpdate({ ...formData, whatsappMensaje: val });
                      }}
                      className="w-full bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B5482A]"
                    />
                  </div>
                </div>
              </div>

              {/* Categorías y Platos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Categorías y Platos del Menú</h3>
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B2520] hover:bg-[#38312B] text-amber-300 border border-[#4A4138] text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Categoría
                  </button>
                </div>

                {formData.menu.map((cat, catIdx) => (
                  <div
                    key={catIdx}
                    className="bg-[#211C18] p-4 rounded-xl border border-[#38312A] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-[#38312A] pb-3">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cat.categoria}
                          onChange={(e) => {
                            const updatedMenu = [...formData.menu];
                            updatedMenu[catIdx].categoria = e.target.value;
                            setFormData((prev) => ({ ...prev, menu: updatedMenu }));
                            onUpdate({ ...formData, menu: updatedMenu });
                          }}
                          placeholder="Nombre de la Categoría"
                          className="bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-[#B5482A]"
                        />
                        <input
                          type="text"
                          value={cat.descripcion || ''}
                          onChange={(e) => {
                            const updatedMenu = [...formData.menu];
                            updatedMenu[catIdx].descripcion = e.target.value;
                            setFormData((prev) => ({ ...prev, menu: updatedMenu }));
                            onUpdate({ ...formData, menu: updatedMenu });
                          }}
                          placeholder="Descripción opcional de la categoría"
                          className="bg-[#151210] border border-[#3E3832] rounded-lg px-3 py-1.5 text-xs text-[#A89F91] focus:outline-none focus:border-[#B5482A]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(catIdx)}
                        className="text-[#9C9284] hover:text-red-400 p-1.5 transition-colors"
                        title="Eliminar categoría"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Platos */}
                    <div className="space-y-2.5">
                      {cat.platos.map((plato, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-2.5 rounded-lg bg-[#181513] border border-[#2D2721] space-y-2 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={plato.nombre}
                              onChange={(e) =>
                                handleUpdateDish(catIdx, pIdx, 'nombre', e.target.value)
                              }
                              placeholder="Nombre del plato"
                              className="flex-1 bg-[#120F0D] border border-[#38312A] rounded px-2.5 py-1.5 text-white font-medium"
                            />
                            <input
                              type="text"
                              value={plato.precio}
                              onChange={(e) =>
                                handleUpdateDish(catIdx, pIdx, 'precio', e.target.value)
                              }
                              placeholder="$0.000"
                              className="w-24 bg-[#120F0D] border border-[#38312A] rounded px-2.5 py-1.5 text-amber-400 font-semibold text-right"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteDish(catIdx, pIdx)}
                              className="text-[#887F72] hover:text-red-400 p-1"
                              title="Eliminar plato"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={plato.desc}
                            onChange={(e) => handleUpdateDish(catIdx, pIdx, 'desc', e.target.value)}
                            placeholder="Descripción corta (opcional)"
                            className="w-full bg-[#120F0D] border border-[#38312A] rounded px-2.5 py-1 text-[#9C9284]"
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddDish(catIdx)}
                        className="w-full py-2 border border-dashed border-[#3E3832] hover:border-[#B5482A] text-[#A89F91] hover:text-white rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Agregar plato a esta categoría
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COLORS */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-[#241F1C] border border-[#3A332C] text-xs text-[#C7BCAD]">
                Personaliza los 3 colores base definidos en el CSS de la plantilla (<code>:root</code>):
                <b> --accent</b> (color principal de marca, botones y precios),
                <b> --ink</b> (texto principal), y <b>--bg</b> (fondo general).
              </div>

              {/* Presets */}
              <div>
                <h4 className="text-xs font-semibold text-white mb-3">Paletas Recomendadas:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_THEMES.map((th, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...formData,
                          accentColor: th.accent,
                          inkColor: th.ink,
                          bgColor: th.bg,
                        };
                        setFormData(updated);
                        onUpdate(updated);
                      }}
                      className="p-3 rounded-xl border border-[#3E3832] bg-[#201C18] hover:border-[#B5482A] text-left transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{th.name}</div>
                        <div className="text-[11px] text-[#A89F91] mt-0.5 font-mono">
                          {th.accent}
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <div
                          className="w-6 h-6 rounded-full border border-black/30"
                          style={{ backgroundColor: th.accent }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border border-black/30"
                          style={{ backgroundColor: th.ink }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border border-black/30"
                          style={{ backgroundColor: th.bg }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom pickers */}
              <div className="p-4 rounded-xl bg-[#211C18] border border-[#38312A] space-y-4">
                <h4 className="text-xs font-semibold text-white">Selector Personalizado de Colores:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[#A89F91] mb-1.5">--accent (Botones, Precios)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, accentColor: val }));
                          onUpdate({ ...formData, accentColor: val });
                        }}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={formData.accentColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, accentColor: val }));
                          onUpdate({ ...formData, accentColor: val });
                        }}
                        className="flex-1 bg-[#151210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#A89F91] mb-1.5">--ink (Texto Principal)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.inkColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, inkColor: val }));
                          onUpdate({ ...formData, inkColor: val });
                        }}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={formData.inkColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, inkColor: val }));
                          onUpdate({ ...formData, inkColor: val });
                        }}
                        className="flex-1 bg-[#151210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#A89F91] mb-1.5">--bg (Fondo General)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.bgColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, bgColor: val }));
                          onUpdate({ ...formData, bgColor: val });
                        }}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={formData.bgColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, bgColor: val }));
                          onUpdate({ ...formData, bgColor: val });
                        }}
                        className="flex-1 bg-[#151210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-white font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#241F1C] border border-[#3A332C] text-xs text-[#C7BCAD]">
                Selecciona una plantilla completa con platos, categorías y colores temáticos listos para probar cómo se ve y generar el archivo:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#211C18] border border-[#38312A] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-2xl">🍲</span>
                    <h4 className="text-sm font-semibold text-white mt-1.5">
                      La Casona Criolla
                    </h4>
                    <p className="text-xs text-[#A89F91] mt-1">
                      Comida tradicional colombiana / asador. Entradas, posta negra, cazuela marinera y postres.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('casona')}
                    className="w-full py-2 bg-[#2B2520] hover:bg-[#B5482A] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cargar este Menú
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#211C18] border border-[#38312A] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-2xl">🍝</span>
                    <h4 className="text-sm font-semibold text-white mt-1.5">
                      Trattoria Bella Vita
                    </h4>
                    <p className="text-xs text-[#A89F91] mt-1">
                      Cocina italiana con pastas caseras, bruschettas, raviolis y tiramisú en paleta vino tinto.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('trattoria')}
                    className="w-full py-2 bg-[#2B2520] hover:bg-[#8C1D40] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cargar este Menú
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#211C18] border border-[#38312A] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-2xl">🍔</span>
                    <h4 className="text-sm font-semibold text-white mt-1.5">
                      Humo & Brasas Burger
                    </h4>
                    <p className="text-xs text-[#A89F91] mt-1">
                      Hamburguesas smash artesanales, papas trufadas y cerveza artesanal con estética moderna.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('burger')}
                    className="w-full py-2 bg-[#2B2520] hover:bg-[#D97706] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cargar este Menú
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#3E3832] bg-[#24201D] flex items-center justify-between">
          <span className="text-xs text-[#A89F91]">
            Los cambios se reflejan en tiempo real en la vista previa del menú.
          </span>
          <button
            type="button"
            onClick={handleSaveAndClose}
            className="px-5 py-2 bg-[#B5482A] hover:bg-[#9E3E23] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            Listo / Ver Menú
          </button>
        </div>
      </div>
    </div>
  );
};

function generatePromptFormat(data: RestaurantData): string {
  let out = `Nombre del restaurante: ${data.nombreRestaurante}
Barrio/ciudad: ${data.ciudadBarrio}
Frase corta: ${data.fraseCorta}
Horario: ${data.horario}
Dirección: ${data.direccion}
Teléfono visible: ${data.telefonoVisible}
Número de WhatsApp (con indicativo, sin +): ${data.whatsappNumero}
Mensaje de WhatsApp precargado: ${data.whatsappMensaje}

Menú:
`;

  data.menu.forEach((cat) => {
    out += `- Categoría: ${cat.categoria}\n`;
    cat.platos.forEach((p) => {
      out += `  - Plato: ${p.nombre}${p.desc ? ` | Descripción: ${p.desc}` : ''} | Precio: ${p.precio}\n`;
    });
  });

  return out;
}
