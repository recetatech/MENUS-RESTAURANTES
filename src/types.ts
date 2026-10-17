export interface MenuItem {
  nombre: string;
  desc: string;
  precio: string;
  foto: string;
}

export interface MenuCategory {
  categoria: string;
  descripcion?: string;
  platos: MenuItem[];
}

export interface RestaurantData {
  nombreRestaurante: string;
  ciudadBarrio: string;
  fraseCorta: string;
  horario: string;
  direccion: string;
  telefonoVisible: string;
  whatsappNumero: string;
  whatsappMensaje: string;
  accentColor: string;
  inkColor: string;
  bgColor: string;
  menu: MenuCategory[];
}
