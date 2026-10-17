import { RestaurantData, MenuCategory, MenuItem } from './types';

export function parsePromptText(text: string, currentData: RestaurantData): Partial<RestaurantData> {
  const result: Partial<RestaurantData> = {};
  const lines = text.split('\n');

  let currentCategory: MenuCategory | null = null;
  const categories: MenuCategory[] = [];
  let inMenuSection = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line) continue;

    // Check header fields
    const checkField = (fieldNames: string[]) => {
      for (const name of fieldNames) {
        const regex = new RegExp(`^${name}\\s*:\\s*(.*)$`, 'i');
        const match = line.match(regex);
        if (match) {
          let val = match[1].trim();
          // Remove brackets if left as [valor]
          if (val.startsWith('[') && val.endsWith(']') && val.length > 2) {
            val = val.substring(1, val.length - 1).trim();
          }
          return val;
        }
      }
      return null;
    };

    const nombre = checkField(['Nombre del restaurante', 'Restaurante', 'Nombre']);
    if (nombre && !inMenuSection) {
      result.nombreRestaurante = nombre;
      continue;
    }

    const barrio = checkField(['Barrio/ciudad', 'Barrio', 'Ciudad', 'Ubicación']);
    if (barrio && !inMenuSection) {
      result.ciudadBarrio = barrio;
      continue;
    }

    const frase = checkField(['Frase corta', 'Frase', 'Eslogan', 'Slogan']);
    if (frase && !inMenuSection) {
      result.fraseCorta = frase;
      continue;
    }

    const horario = checkField(['Horario', 'Horarios']);
    if (horario && !inMenuSection) {
      result.horario = horario;
      continue;
    }

    const direccion = checkField(['Dirección', 'Direccion', 'Ubicacion']);
    if (direccion && !inMenuSection) {
      result.direccion = direccion;
      continue;
    }

    const telefono = checkField(['Teléfono visible', 'Telefono visible', 'Teléfono', 'Telefono']);
    if (telefono && !inMenuSection) {
      result.telefonoVisible = telefono;
      continue;
    }

    const whatsapp = checkField([
      'Número de WhatsApp (con indicativo, sin +)',
      'Número de WhatsApp',
      'Numero de WhatsApp',
      'WhatsApp',
      'Whatsapp',
    ]);
    if (whatsapp && !inMenuSection) {
      result.whatsappNumero = whatsapp.replace(/[^0-9]/g, '');
      continue;
    }

    const msj = checkField([
      'Mensaje de WhatsApp precargado',
      'Mensaje de WhatsApp',
      'Mensaje precargado',
      'Mensaje',
    ]);
    if (msj && !inMenuSection) {
      result.whatsappMensaje = msj;
      continue;
    }

    // Check menu section
    if (/^Men[úu]\s*:/i.test(line)) {
      inMenuSection = true;
      continue;
    }

    // Detect Category
    // - Categoría: [nombre]
    // or Categoría: [nombre]
    const catMatch = line.match(/^[-*•]?\s*Categor[íi]a\s*:\s*(.*)$/i);
    if (catMatch) {
      inMenuSection = true;
      let catName = catMatch[1].trim();
      if (catName.startsWith('[') && catName.endsWith(']')) {
        catName = catName.substring(1, catName.length - 1).trim();
      }
      currentCategory = {
        categoria: catName,
        descripcion: '',
        platos: [],
      };
      categories.push(currentCategory);
      continue;
    }

    // Detect Dish
    // - Plato: [nombre] | Descripción: [desc] | Precio: [precio]
    if (line.includes('Plato:') || (inMenuSection && line.startsWith('-'))) {
      if (!currentCategory) {
        currentCategory = {
          categoria: 'Menú General',
          descripcion: '',
          platos: [],
        };
        categories.push(currentCategory);
      }

      // Parse plate line with pipes or colons
      let platoName = '';
      let desc = '';
      let precio = '';

      if (line.includes('|')) {
        const parts = line.split('|');
        for (const part of parts) {
          const p = part.trim();
          const pMatch = p.match(/^[-*•]?\s*Plato\s*:\s*(.*)$/i);
          if (pMatch) {
            platoName = cleanVal(pMatch[1]);
            continue;
          }
          const dMatch = p.match(/^Descripci[óo]n\s*:\s*(.*)$/i);
          if (dMatch) {
            desc = cleanVal(dMatch[1]);
            continue;
          }
          const prMatch = p.match(/^Precio\s*:\s*(.*)$/i);
          if (prMatch) {
            precio = cleanVal(prMatch[1]);
            continue;
          }
        }
      } else {
        const pMatch = line.match(/^[-*•]?\s*(?:Plato\s*:\s*)?(.*?)(?:\s*-\s*|\s*:\s*)?(\$\s*[\d.,]+)?$/);
        if (pMatch) {
          platoName = cleanVal(pMatch[1]);
          precio = pMatch[2] ? cleanVal(pMatch[2]) : '';
        }
      }

      if (platoName) {
        currentCategory.platos.push({
          nombre: platoName,
          desc: desc === 'desc u omitir' || desc === '[desc u omitir]' ? '' : desc,
          precio: precio || '$0.000',
          foto: '',
        });
      }
    }
  }

  if (categories.length > 0) {
    result.menu = categories;
  }

  return result;
}

function cleanVal(str: string): string {
  let val = (str || '').trim();
  if (val.startsWith('[') && val.endsWith(']') && val.length > 2) {
    val = val.substring(1, val.length - 1).trim();
  }
  return val;
}
