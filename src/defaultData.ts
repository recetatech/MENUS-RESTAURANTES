import { RestaurantData } from './types';

export const DEFAULT_RESTAURANT_DATA: RestaurantData = {
  nombreRestaurante: 'La Casona Criolla',
  ciudadBarrio: 'Usaquén, Bogotá',
  fraseCorta: 'Cocina de tradición campesina, hecha al carbón y a fuego lento',
  horario: 'Mar–Dom, 11:30 a.m. – 9:00 p.m.',
  direccion: 'Calle 119 # 6 - 38, Usaquén',
  telefonoVisible: '+57 (601) 745 2890',
  whatsappNumero: '573105550192',
  whatsappMensaje: 'Hola, quiero hacer un pedido del menú de La Casona Criolla',
  accentColor: '#B5482A',
  inkColor: '#2B241C',
  bgColor: '#FAF6F0',
  menu: [
    {
      categoria: 'Entradas & Picadas',
      descripcion: 'Para abrir el apetito y compartir en la mesa',
      platos: [
        {
          nombre: 'Empanaditas de Posta Cartagenera',
          desc: '5 unidades crocantes rellenas de posta en reducción de panela y especias, acompañadas de ají casero de la casa',
          precio: '$16.500',
          foto: '',
        },
        {
          nombre: 'Arepitas de Choclo con Queso Siete Cueros',
          desc: 'Tres arepas tibias de maíz dulce asadas a la brasa con mantequilla de campo y queso artesanal derretido',
          precio: '$14.000',
          foto: '',
        },
        {
          nombre: 'Chicharrón Crujiente en Sal Marina',
          desc: 'Tiras de panceta curada y tostada en su propia grasa, con limón mandarino y arepa boyacense',
          precio: '$19.500',
          foto: '',
        },
        {
          nombre: 'Ceviche Criollo de Plátano Maduro y Chicharrón',
          desc: 'Ceviche fresco con cebolla morada, cilantro cimarrón, dados de chicharrón crocante y reducción de maracuyá',
          precio: '$18.000',
          foto: '',
        },
      ],
    },
    {
      categoria: 'Platos Fuertes',
      descripcion: 'Nuestras recetas insignias servidas con guarnición tradicional',
      platos: [
        {
          nombre: 'Posta Negra Tradicional al Caldero',
          desc: 'Corte de res cocinado a fuego lento durante 8 horas en reducción de panela y clavo, servido con arroz con coco y patacón',
          precio: '$38.000',
          foto: '',
        },
        {
          nombre: 'Costillitas Ahumadas al Ají Dulce',
          desc: 'Costillar tierno glaseado con miel de caña y toques cítricos, acompañado de papas criollas al vapor y ensalada de la huerta',
          precio: '$36.500',
          foto: '',
        },
        {
          nombre: 'Sobrebarriga Dorada a la Brasa',
          desc: 'Carne jugosa bañada en salsa criolla de tomates asados y cebollas caramelizadas, con yuca al vapor y arroz blanco',
          precio: '$34.000',
          foto: '',
        },
        {
          nombre: 'Cazuela Marinera de Bahía Solano',
          desc: 'Camarones, calamares y pescado blanco en fondo de coco fresco y hierbas de azotea, acompañada de patacones y arroz con coco',
          precio: '$42.000',
          foto: '',
        },
        {
          nombre: 'Pollo Campesino en Salsa de Guisantes y Cerveza',
          desc: 'Pechuga campesina dorada a la plancha bañada en reducción suave de malta y mostaza antigua, con puré de plátano maduro',
          precio: '$31.000',
          foto: '',
        },
      ],
    },
    {
      categoria: 'Acompañamientos',
      descripcion: 'Porciones adicionales para complementar tu plato',
      platos: [
        {
          nombre: 'Porción de Papas Criollas Doradas',
          desc: 'Con sal parrillera y romero fresco',
          precio: '$7.500',
          foto: '',
        },
        {
          nombre: 'Patacones con Hogao Caliente',
          desc: 'Tres patacones crocantes con hogao tradicional de tomate chonto y cebolla larga',
          precio: '$9.000',
          foto: '',
        },
        {
          nombre: 'Arroz con Coco Titoté',
          desc: 'Arroz preparado con leche de coco natural y pasas rubias',
          precio: '$8.000',
          foto: '',
        },
      ],
    },
    {
      categoria: 'Postres Artesanales',
      descripcion: 'El final dulce de nuestras abuelas',
      platos: [
        {
          nombre: 'Volcán Tibio de Guayaba y Queso Paipa',
          desc: 'Bizcocho húmedo de dulce de guayaba con corazón derretido de queso madurado Paipa y helado de vainilla',
          precio: '$14.500',
          foto: '',
        },
        {
          nombre: 'Tres Leches de Caramelo y Arequipe',
          desc: 'Bizcocho bañado en mezcla de tres leches perfumada con canela y coronado con merengue flameado',
          precio: '$12.000',
          foto: '',
        },
      ],
    },
    {
      categoria: 'Bebidas Naturales & Cocteles',
      descripcion: 'Refrescantes preparadas al instante con fruta fresca',
      platos: [
        {
          nombre: 'Limonada de Coco Artesanal',
          desc: 'Jugo de limones frescos batido con crema de coco natural y hielo frappé',
          precio: '$9.500',
          foto: '',
        },
        {
          nombre: 'Jugo Natural de Maracuyá & Albahaca',
          desc: 'Refrescante combinación dulce y cítrica macerada con hojas de albahaca fresca',
          precio: '$8.500',
          foto: '',
        },
        {
          nombre: 'Agua de Panela Helada con Jengibre y Limón',
          desc: 'Infusión tradicional fría con notas cítricas y picantes',
          precio: '$6.500',
          foto: '',
        },
        {
          nombre: 'Cerveza Artesanal Mestiza (330ml)',
          desc: 'Rubia refrescante con notas a malta caramelizada y lúpulo aromático',
          precio: '$11.000',
          foto: '',
        },
      ],
    },
  ],
};

export const PRESET_THEMES = [
  {
    name: 'Cálido Rústico (Original)',
    accent: '#B5482A',
    ink: '#2B241C',
    bg: '#FAF6F0',
  },
  {
    name: 'Oliva & Trattoria',
    accent: '#2D6A4F',
    ink: '#1B2A22',
    bg: '#F6F8F5',
  },
  {
    name: 'Bistro Elegante (Azul Noche)',
    accent: '#A3704C',
    ink: '#141E28',
    bg: '#F9F8F6',
  },
  {
    name: 'Burgundy & Vino',
    accent: '#8C1D40',
    ink: '#231217',
    bg: '#FDF7F8',
  },
  {
    name: 'Dark Coffee & Gold',
    accent: '#D4A373',
    ink: '#F5EBE0',
    bg: '#1E1B18',
  },
];
