/* ESENCIA by Gold Dubai — catálogo
   box: [centroX, borde superior, borde inferior] del frasco dentro de la fotografía original (fracciones 0–1).
   Se usa para centrar el frasco y darle una escala uniforme sin recortar ni alterar la foto. */
window.ESENCIA = {
  whatsapp: '593990867201',
  /* Rango de precios. Si un perfume tiene precio propio, añade price: 75 en su ficha y se mostrará ese. */
  priceRange: { from: 60, to: 90 },
  decant: { ml: 5, price: 6 },
  /* RESERVAS (preventa con abono)
     abonos: montos de abono por perfume que el cliente puede elegir.
     entrega: plazo estimado que se muestra antes de pagar.
     banco: completa tus datos de transferencia. Si numero queda vacío, la web dice que los datos se envían por WhatsApp.
     ocultar: ids de perfumes que NO se pueden reservar. */
  reserva: {
    abonos: [10, 15],
    entrega: '10 a 15 días desde que confirmamos tu abono',
    banco: { banco: '', tipo: '', numero: '', titular: '', cedula: '' },
    ocultar: []
  },
  /* Precio «desde» por marca. Las marcas que no estén aquí muestran el rango USD 65 – 90. */
  brandPrice: { 'Lattafa': 65, 'Arabiyat Prestige': 85 },
  products: [
    { id:'night-out', gain:'Llegas y se nota. Te vas y te recuerdan.', fx:'sparkle', fxc:'#ffd8a0', launch:true, price:80, name:'9PM Night Out', brand:'Afnan', img:'nightout_editorial', box:[0.499,0.211,0.817], cut:[0.3500,0.2113,0.6490,0.8173], accent:'#c99a55',
      hook:'La noche comienza contigo.', conc:'Extrait de parfum', profile:'Nocturno · Magnético', family:['calido','elegante'], when:['noche','evento'],
      top:'Pitahaya, bergamota, coñac, lavanda y manzana', heart:'Cardamomo, gamuza, toffee y cedro', base:'Tonka, akigalawood, ambrofix y pachulí',
      desc:'De la frescura frutal a una estela cálida y seductora. Pensado para una noche memorable y una presencia que permanece.' },
    { id:'khamrah-waha', gain:'Te mantiene fresco y seguro todo el día, del calor a la reunión.', fx:'bubbles', fxc:'#bfefff', price:75, launch:true, name:'Khamrah Waha', brand:'Lattafa', img:'waha_editorial', box:[0.509,0.264,0.662], cut:[0.3231,0.2642,0.6946,0.6622], accent:'#58b9cf',
      hook:'Frescura que transforma el instante.', conc:'Eau de parfum', profile:'Fresco · Mineral', family:['fresco'], when:['dia'],
      top:'Bergamota, yuzu, enebro y jengibre', heart:'Pepino, sal marina, salvia e iris', base:'Tonka, vainilla, almizcle y maderas',
      desc:'Una frescura inesperada sobre una base cálida. Ideal para días luminosos, viajes y una elegancia sin esfuerzo.' },
    { id:'mandarin-vintage', gain:'Te hace ver más elegante sin esfuerzo.', fx:'dust', fxc:'#ffc27a', launch:true, price:75, name:'Odyssey Mandarin Sky Vintage Edition', short:'Mandarin Sky Vintage', brand:'Armaf', img:'vintage_pro', box:[0.480,0.314,0.782], cut:[0.3000,0.3142,0.6592,0.7825], accent:'#e59143',
      hook:'El carácter de un atardecer inolvidable.', profile:'Cítrico · Elegante', family:['fresco','elegante'], when:['dia','evento'],
      conc:'Eau de parfum', top:'Mandarina y cítricos', heart:'Especias y notas florales', base:'Maderas y ámbar',
      desc:'La mandarina se vuelve sofisticada entre especias y ámbar. Para atardeceres, encuentros especiales y un estilo refinado.' },
    { id:'hawas-ice', gain:'Frescura helada que se siente de cerca: te mantiene limpio y seguro aunque haga calor.', fx:'mist', fxc:'#dff4ff', launch:true, isNew:true, name:'Hawas Ice', brand:'Rasasi', img:'hawas_ice', box:[0.527,0.220,0.817], accent:'#5aa6d6',
      hook:'El frío que despierta los sentidos.', conc:'Eau de parfum', profile:'Fresco · Helado', family:['fresco'], when:['dia','noche'],
      top:'Manzana helada, bergamota, limón y anís estrellado', heart:'Azahar, ciruela y cardamomo', base:'Musgo, madera flotante, ámbar y almizcle',
      desc:'Una ráfaga helada de manzana y cítricos con un toque especiado, sobre maderas y ámbar. Versátil para el día y la noche, y para climas cálidos.' },
    { id:'khamrah-qahwa', gain:'Calidez que acerca: la gente quiere quedarse a tu lado.', fx:'smoke', fxc:'#e8d2b8', name:'Khamrah Qahwa', brand:'Lattafa', img:'qahwa_original_usuario', box:[0.500,0.146,0.853], cut:[0.2800,0.1458,0.7192,0.8525], accent:'#c98a3c',
      hook:'El lujo de una noche envolvente.', conc:'Eau de parfum', profile:'Gourmand · Cálido', family:['gourmand','calido'], when:['noche'],
      top:'Jengibre, canela y cardamomo', heart:'Praliné, frutas confitadas y flores blancas', base:'Café arábica, vainilla, tonka y benjuí',
      desc:'Café especiado y dulzura aterciopelada: una firma envolvente para cenas íntimas y noches que merecen recordarse.' },
    { id:'liquid-brun', gain:'Te sientes arreglado incluso con lo más simple.', fx:'smoke', fxc:'#f0d6bf', price:75, name:'Liquid Brun', brand:'French Avenue', img:'liquid_editorial', box:[0.502,0.300,0.790], cut:[0.3996,0.3000,0.6049,0.7900], accent:'#9b5634', isNew:true,
      hook:'La elegancia de la vainilla cálida.', profile:'Cálido · Elegante', family:['calido','elegante'], when:['noche','evento'],
      conc:'Eau de parfum', top:'Canela, cardamomo, bergamota y azahar', heart:'Vainilla bourbon y elemí', base:'Almizcle, guayaco, praliné y ambroxán',
      desc:'Canela, cardamomo y vainilla bourbon sobre praliné y maderas. Sofisticación cálida para cenas y ocasiones especiales.' },
    { id:'marwa', gain:'Proyecta una seguridad tranquila en la oficina y en las reuniones.', fx:'sparkle', fxc:'#f2f4f8', name:'Marwa', brand:'Arabiyat Prestige', img:'marwa_editorial', box:[0.759,0.382,0.890], cut:[0.6400,0.3822,0.8783,0.8896], accent:'#c8ccd4', isNew:true, prestige:true,
      hook:'Elegancia de carácter singular.', profile:'Fresco · Amaderado · Elegante', family:['fresco','elegante'], when:['dia','evento'],
      top:'Bergamota, petitgrain y jengibre', heart:'Geranio, té e incienso', base:'Madera de guayaco, ambroxán y almizcle',
      desc:'Frescura luminosa, té e incienso sobre maderas pulidas. Una firma refinada para quien transmite seguridad sin levantar la voz.' },
    { id:'uhud', gain:'El aroma por el que te preguntan qué llevas puesto.', fx:'petals', fxc:'#ff8fbf', name:'Uhud', brand:'Arabiyat Prestige', img:'uhud_editorial', box:[0.488,0.250,0.797], cut:[0.3700,0.2500,0.6058,0.7967], accent:'#d43c7d', isNew:true, prestige:true,
      hook:'Una declaración de estilo.', profile:'Gourmand · Dulce · Envolvente', family:['gourmand'], when:['noche','evento'],
      top:'Frutos rojos, rosa y caramelo', heart:'Haba tonka, miel y frambuesa', base:'Almizcle, vainilla y ámbar',
      desc:'Frutos rojos y caramelo abren paso a un corazón de miel y frambuesa. Una estela aterciopelada, cálida y memorable.' },
    { id:'mahd-al-dhahab', gain:'Presencia de joya para las ocasiones que importan.', fx:'sparkle', fxc:'#ffe09a', name:'Mahd Al Dhahab', brand:'Arabiyat Prestige', img:'mahd_editorial', box:[0.487,0.127,0.879], cut:[0.3458,0.1267,0.6292,0.8792], accent:'#dcb45c', isNew:true, prestige:true,
      hook:'Una joya en cada detalle.', conc:'Extrait', profile:'Amaderado · Cálido · Elegante', family:['calido','elegante'], when:['noche','evento'],
      top:'Bergamota, limón y especias', heart:'Ámbar, pachulí y oud', base:'Vainilla, sándalo y almizcle blanco',
      desc:'Cítricos especiados, ámbar y maderas nobles se funden con una base suave de vainilla. Una elección distinguida para ocasiones memorables.' },
    { id:'mandarin-sky', gain:'Energía y buen ánimo desde la primera aplicación.', fx:'dust', fxc:'#ffcf8a', price:65, name:'Odyssey Mandarin Sky', brand:'Armaf', img:'mandarin_sky_nueva', box:[0.407,0.416,0.801], cut:[0.2900,0.4158,0.5233,0.8006], accent:'#3ea6d6',
      hook:'Energía cítrica, seguridad natural.', profile:'Fresco · Vibrante', family:['fresco'], when:['dia'],
      conc:'Eau de parfum · 2023', top:'Salvia, mandarina, naranja y azafrán', heart:'Caramelo, haba tonka y tagetes', base:'Vetiver, cedro y ambroxán',
      desc:'Salvia y mandarina abren paso a un corazón de caramelo y tonka. Luminoso de día, envolvente al atardecer.' },
    { id:'bharara-king', gain:'Distinción que se percibe antes de que hables.', fx:'embers', fxc:'#ffb070', price:90, name:'Bharara King', brand:'Bharara', img:'bharara_editorial', box:[0.685,0.321,0.875], cut:[0.5700,0.3208,0.7992,0.8750], accent:'#b8804c',
      hook:'Una presencia que se reconoce.', profile:'Frutal · Envolvente', family:['elegante','calido'], when:['evento','noche'],
      conc:'Eau de parfum', top:'Naranja, bergamota y limón', heart:'Acorde frutal tutti frutti', base:'Almizcle blanco, ámbar y vainilla',
      desc:'Un aroma de presencia refinada para reuniones y celebraciones donde los detalles importan.' },
    { id:'sceptre-malachite', gain:'Una firma propia: no hueles como todos.', fx:'mist', fxc:'#9fe3c4', price:60, name:'Sceptre Malachite', brand:'Maison Alhambra', img:'sceptre_editorial', box:[.43,.19,.81], accent:'#2f8a66', isNew:true,
      hook:'Una firma verde y pulida.', profile:'Verde · Sofisticado', family:['fresco','elegante'], when:['dia','evento'],
      conc:'Eau de parfum', top:'Cítricos y acordes especiados', heart:'Sándalo y cardamomo', base:'Almizcle, ámbar y vetiver',
      desc:'Una frescura de carácter verde y pulido, ideal para quien aprecia una firma diferente.' },
    { id:'yara-elixir', gain:'Encanto que acompaña y se queda en la memoria.', fx:'petals', fxc:'#ffc2cf', price:65, name:'Yara Elixir', brand:'Lattafa', img:'yara_elixir_editorial', box:[0.505,0.297,0.870], cut:[0.3329,0.2966,0.6780,0.8698], accent:'#d9a2a8', isNew:true,
      hook:'Encanto que envuelve.', profile:'Gourmand · Seductor', family:['gourmand'], when:['noche','evento'],
      top:'Fresa tipo s’mores y grosella negra', heart:'Jazmín y azahar', base:'Vainilla, caramelo, ámbar y almizcle',
      desc:'Un acorde de fresa y caramelo con flores delicadas. Para momentos de encanto y dulzura envolvente.' },
    { id:'asad-elixir', gain:'Te sientes listo para lo que venga.', fx:'smoke', fxc:'#d9dde3', name:'Asad Elixir', brand:'Lattafa', img:'elixir_editorial', box:[0.556,0.310,0.709], cut:[0.4088,0.3100,0.7038,0.7093], accent:'#a3a9b2', isNew:true,
      hook:'Determinación y distinción.', profile:'Intenso · Refinado', family:['calido','elegante'], when:['noche'],
      top:'Pimienta rosa, azafrán y pomelo', heart:'Tabaco, cedro y vainilla', base:'Pachulí, incienso, cachemira y ámbar seco',
      desc:'Tabaco y maderas con una salida especiada. Para quienes quieren proyectar determinación y distinción.' },
    { id:'asad-bourbon', gain:'Calidez elegante para noches y momentos especiales.', fx:'embers', fxc:'#ffaa55', name:'Asad Bourbon', brand:'Lattafa', img:'bourbon_editorial', box:[0.494,0.089,0.789], cut:[0.2409,0.0887,0.7474,0.7892], accent:'#b06a3a', isNew:true,
      hook:'Una velada con carácter sereno.', profile:'Cálido · Distinguido', family:['calido','gourmand'], when:['noche','evento'],
      top:'Pimienta rosa, lavanda y ciruela mirabel', heart:'Cacao, davana y nuez moscada', base:'Vainilla bourbon, vetiver y ámbar',
      desc:'Cacao especiado y vainilla bourbon: carácter sereno para una velada elegante.' },
    { id:'yara-candy', gain:'Alegría y dulzura que levantan tu día.', fx:'petals', fxc:'#ff9cbc', price:65, name:'Yara Candy', brand:'Lattafa', img:'yara_candy', box:[0.500,0.156,0.875], cut:[0.3516,0.1562,0.6494,0.8750], accent:'#e2507c', isNew:true,
      hook:'Dulzura con personalidad.', profile:'Dulce · Alegre', family:['gourmand'], when:['dia'],
      top:'Mandarina verde y grosella negra', heart:'Caramelo de fresa y gardenia', base:'Sándalo, sirope de vainilla, almizcle y ámbar',
      desc:'Frutas jugosas y un corazón de caramelo: una dulzura juguetona para alegrar cada encuentro.' },
    { id:'eclaire', gain:'Un abrazo de vainilla: confort que se siente y se nota.', fx:'sparkle', fxc:'#fff0d8', price:65, name:'Eclaire', brand:'Lattafa', img:'eclaire_editorial', box:[0.499,0.230,0.789], cut:[0.3304,0.2303,0.6682,0.7891], accent:'#dcbc9c', isNew:true,
      hook:'La dulzura también puede ser sofisticada.', profile:'Gourmand · Cremoso', family:['gourmand'], when:['dia','noche'],
      top:'Caramelo, leche y azúcar', heart:'Miel y flores blancas', base:'Vainilla, praliné y almizcle',
      desc:'Un abrazo de caramelo y vainilla con delicadas flores. Perfecto para quien disfruta la dulzura con clase.' },
    { id:'angham', gain:'Del trabajo a la cena sin cambiar de aroma.', fx:'sparkle', fxc:'#ffe2a0', price:65, name:'Angham', brand:'Lattafa', img:'angham', cutout:true, box:[.50,.02,.98], accent:'#c9a052', isNew:true,
      hook:'Especias, cacao y vainilla en armonía.', profile:'Cálido · Sofisticado', family:['calido','elegante'], when:['dia','noche'],
      top:'Mandarina, jengibre y pimienta rosa', heart:'Praliné, lavanda y cacao', base:'Almizcle, ámbar y vainilla',
      desc:'Un equilibrio musical de especias, cacao y vainilla; para llevar elegancia del día a la noche.' }
  ],
  featured: ['night-out','khamrah-waha','mandarin-vintage','khamrah-qahwa','bharara-king'],
  prestige: ['hawas-ice','marwa','uhud','mahd-al-dhahab','sceptre-malachite','liquid-brun'],
  /* extra: fragancias que tienes pero no están en el catálogo con foto.
     Ej.: extra:['Club de Nuit Intense','Fakhar Black'] → aparecen como «También tengo» en ese perfil. */
  families: {
    fresco:   { label:'Fresco',   line:'Vitalidad, libertad y ligereza.', img:'waha_editorial', pos:'50% 45%', accent:'#58b9cf', notes:'Cítricos, notas acuáticas, té y hierbas aromáticas. Limpio, luminoso y fácil de llevar.', plural:'frescas', extra:[] },
    calido:   { label:'Cálido',   line:'Profundidad, cercanía y carácter.', img:'bourbon_editorial', pos:'50% 35%', accent:'#d08a3e', notes:'Ámbar, especias, maderas, tabaco y vainilla. Envolvente y con presencia.', plural:'cálidas', extra:[] },
    elegante: { label:'Elegante', line:'Distinción, equilibrio y sofisticación.', img:'marwa_editorial', pos:'74% 62%', accent:'#c8ccd4', notes:'Maderas pulidas, incienso, almizcle y cítricos refinados. Sobrio y distinguido.', plural:'elegantes', extra:[] },
    gourmand: { label:'Gourmand', line:'Dulzura, intensidad y placer sensorial.', img:'yara_candy', pos:'50% 50%', accent:'#e2507c', notes:'Café, caramelo, praliné, vainilla y frutas dulces. Delicioso y magnético.', plural:'gourmand', extra:[] }
  },
  moments: {
    dia:    { label:'De día', phrase:'el día',             line:'Oficina, viajes, planes al aire libre' },
    noche:  { label:'De noche', phrase:'la noche',           line:'Cenas, citas, salidas' },
    evento: { label:'Ocasión especial', phrase:'una ocasión especial',   line:'Bodas, galas, celebraciones' }
  }
};
