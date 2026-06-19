import React, { useState, useEffect, useRef } from 'react';

/* =========================================================
   CONFIG — All editable text in a single file (PT + EN)
   ========================================================= */
const CONFIG = {
  business: {
    name: 'Vila Mariana Bakery & Café',
    tagline: {
      pt: 'Pão artesanal, café especial e carinho em cada receita desde 1998.',
      en: 'Artisan bread, specialty coffee and love in every recipe since 1998.',
    },
    phone: '+5511998765432',
    whatsapp: '5511998765432',
    email: 'contato@vilamariana.com.br',
    address: {
      pt: 'Rua Domingos de Morais, 1234 — Vila Mariana, São Paulo/SP',
      en: 'Rua Domingos de Morais, 1234 — Vila Mariana, São Paulo/SP',
    },
    social: {
      instagram: 'https://instagram.com/vilamariana',
      facebook: 'https://facebook.com/vilamariana',
    },
  },
  nav: {
    home: { pt: 'Início', en: 'Home' },
    about: { pt: 'Sobre', en: 'About' },
    menu: { pt: 'Cardápio', en: 'Menu' },
    contact: { pt: 'Contato', en: 'Contact' },
    faq: { pt: 'FAQ', en: 'FAQ' },
  },
  hero: {
    title: { pt: 'Sabor que acolhe, tradição que alimenta.', en: 'Flavor that welcomes, tradition that nourishes.' },
    subtitle: {
      pt: 'Pães artesanais, doces caseiros e café especial feitos com ingredientes locais, todos os dias.',
      en: 'Artisan breads, homemade sweets and specialty coffee made with locally sourced ingredients, every day.',
    },
    cta: { pt: 'Ver o cardápio', en: 'View the menu' },
    secondaryCta: { pt: 'Fale conosco', en: 'Contact us' },
  },
  highlights: [
    {
      title: { pt: 'Receitas tradicionais', en: 'Traditional recipes' },
      desc: { pt: 'Técnicas artesanais preservadas por gerações da nossa família.', en: 'Artisan techniques preserved across generations of our family.' },
      icon: 'wheat',
    },
    {
      title: { pt: 'Produção diária', en: 'Daily production' },
      desc: { pt: 'Tudo fresco, feito todas as manhãs antes do sol nascer.', en: 'Everything fresh, made every morning before sunrise.' },
      icon: 'sun',
    },
    {
      title: { pt: 'Ingredientes locais', en: 'Locally sourced' },
      desc: { pt: 'Parceria com produtores da região para garantir qualidade e frescor.', en: 'Partnership with regional producers to ensure quality and freshness.' },
      icon: 'leaf',
    },
  ],
  about: {
    eyebrow: { pt: 'Nossa história', en: 'Our story' },
    title: { pt: 'Tradição de família desde 1998', en: 'A family tradition since 1998' },
    p1: {
      pt: 'A Vila Mariana Bakery & Café nasceu do sonho de uma família apaixonada por panificação. Fundada em 1998, preservamos técnicas tradicionais e receitas caseiras que atravessam gerações.',
      en: 'Vila Mariana Bakery & Café was born from a family passionate about baking. Founded in 1998, we preserve traditional techniques and homemade recipes that span generations.',
    },
    p2: {
      pt: 'Cada pão, cada doce e cada xícara de café carrega o cuidado de quem acredita que comida boa é feita com tempo, respeito aos ingredientes e carinho por quem serve.',
      en: 'Every bread, every sweet and every cup of coffee carries the care of those who believe good food is made with time, respect for ingredients and love for the people we serve.',
    },
    values: [
      { title: { pt: 'Autenticidade', en: 'Authenticity' }, desc: { pt: 'Receitas originais, sem atalhos.', en: 'Original recipes, no shortcuts.' } },
      { title: { pt: 'Qualidade', en: 'Quality' }, desc: { pt: 'Ingredientes selecionados todos os dias.', en: 'Carefully selected ingredients every day.' } },
      { title: { pt: 'Acolhimento', en: 'Welcoming' }, desc: { pt: 'Um lugar para se sentir em casa.', en: 'A place to feel at home.' } },
    ],
  },
  menu: {
    eyebrow: { pt: 'Nosso cardápio', en: 'Our menu' },
    title: { pt: 'Feito à mão, com amor', en: 'Handcrafted with love' },
    subtitle: { pt: 'Uma seleção dos nossos favoritos — produção diária, enquanto durarem os estoques.', en: 'A selection of our favorites — daily production, while stocks last.' },
    items: [
      { name: { pt: 'Pão de Fermentação Natural', en: 'Sourdough Bread' }, desc: { pt: 'Fermentação lenta de 24h, casca crocante e miolo aerado.', en: '24h slow fermentation, crunchy crust and airy crumb.' }, price: 'R$ 28,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1bf62c196-bebd-4b22-82e8-d76c814f713f.png', tag: { pt: 'Pães', en: 'Breads' } },
      { name: { pt: 'Baguete Tradicional', en: 'Traditional Baguette' }, desc: { pt: 'Receita francesa clássica, assada na hora.', en: 'Classic French recipe, baked fresh.' }, price: 'R$ 14,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1b816fc04-6c39-4c96-b8e5-dd5b625daffb.png', tag: { pt: 'Pães', en: 'Breads' } },
      { name: { pt: 'Croissant de Manteiga', en: 'Butter Croissant' }, desc: { pt: 'Folhado artesanal com manteiga francesa.', en: 'Artisan laminated dough with French butter.' }, price: 'R$ 12,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1d5afc370-a505-4412-8233-6bf6ca871c2b.png', tag: { pt: 'Folhados', en: 'Pastries' } },
      { name: { pt: 'Pão de Queijo', en: 'Cheese Bread (Pão de Queijo)' }, desc: { pt: 'Receita mineira com queijo meia cura, quentinho.', en: 'Minas Gerais recipe with semi-cured cheese, served warm.' }, price: 'R$ 6,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/11bd45674-8055-4c40-b306-efc7fe0201b2.png', tag: { pt: 'Salgados', en: 'Savory' } },
      { name: { pt: 'Bolo de Chocolate', en: 'Chocolate Cake' }, desc: { pt: 'Massa úmida com ganache meio amargo.', en: 'Moist cake with semi-sweet ganache.' }, price: 'R$ 16,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1ef65b211-3d6e-4066-b31d-f270851aa971.png', tag: { pt: 'Bolos', en: 'Cakes' } },
      { name: { pt: 'Bolo de Cenoura', en: 'Carrot Cake' }, desc: { pt: 'Cobertura cremosa de cream cheese.', en: 'Creamy cream cheese frosting.' }, price: 'R$ 15,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/101e83915-6a5a-42a1-ba2f-951ad162673c.png', tag: { pt: 'Bolos', en: 'Cakes' } },
      { name: { pt: 'Cinnamon Roll', en: 'Cinnamon Roll' }, desc: { pt: 'Rolo de canela com cobertura de cream cheese.', en: 'Cinnamon swirl with cream cheese glaze.' }, price: 'R$ 14,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1f6f9efef-3dcf-4bcb-9917-fc0241b67acb.png', tag: { pt: 'Doces', en: 'Sweets' } },
      { name: { pt: 'Folhado de Frutas Vermelhas', en: 'Berry Danish' }, desc: { pt: 'Massa folhada com frutas da estação.', en: 'Puff pastry with seasonal berries.' }, price: 'R$ 13,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/12c1b3dd4-1839-4488-875c-432be58d3a6d.png', tag: { pt: 'Folhados', en: 'Pastries' } },
      { name: { pt: 'Macarons (unidade)', en: 'Macarons (each)' }, desc: { pt: 'Sabores variados — pergunte os do dia.', en: 'Various flavors — ask for today\'s selection.' }, price: 'R$ 8,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/17d088eb3-ff7d-423c-b75e-6fb52f45f899.png', tag: { pt: 'Doces', en: 'Sweets' } },
      { name: { pt: 'Espresso', en: 'Espresso' }, desc: { pt: 'Grãos especiais, torra média, extração na hora.', en: 'Specialty beans, medium roast, pulled fresh.' }, price: 'R$ 9,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1bd8fd1fd-47bf-4e95-a8ed-5b55c8791ee3.png', tag: { pt: 'Cafés', en: 'Coffee' } },
      { name: { pt: 'Cappuccino', en: 'Cappuccino' }, desc: { pt: 'Espresso duplo com leite vaporizado e arte latte.', en: 'Double espresso with steamed milk and latte art.' }, price: 'R$ 14,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1bd8fd1fd-47bf-4e95-a8ed-5b55c8791ee3.png', tag: { pt: 'Cafés', en: 'Coffee' } },
      { name: { pt: 'Café coado da casa', en: 'House Drip Coffee' }, desc: { pt: 'Café filtrado lentamente, servido na garrafa.', en: 'Slow-filtered coffee, served in a carafe.' }, price: 'R$ 11,00', img: 'https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1bd8fd1fd-47bf-4e95-a8ed-5b55c8791ee3.png', tag: { pt: 'Cafés', en: 'Coffee' } },
    ],
  },
  contact: {
    eyebrow: { pt: 'Fale conosco', en: 'Get in touch' },
    title: { pt: 'Estamos esperando você', en: 'We\'re waiting for you' },
    subtitle: { pt: 'Mande uma mensagem ou venha nos visitar.', en: 'Send us a message or come visit.' },
    form: {
      name: { pt: 'Nome', en: 'Name' },
      email: { pt: 'E-mail', en: 'Email' },
      message: { pt: 'Mensagem', en: 'Message' },
      submit: { pt: 'Enviar mensagem', en: 'Send message' },
      success: { pt: 'Mensagem enviada! Retornaremos em breve.', en: 'Message sent! We\'ll get back to you soon.' },
      error: { pt: 'Por favor, preencha todos os campos corretamente.', en: 'Please fill in all fields correctly.' },
    },
    hours: {
      title: { pt: 'Horário de funcionamento', en: 'Business hours' },
      weekdays: { pt: 'Segunda a Sexta', en: 'Monday to Friday' },
      saturday: { pt: 'Sábado', en: 'Saturday' },
      sunday: { pt: 'Domingo', en: 'Sunday' },
      time1: '07:00 – 19:00',
      time2: '08:00 – 18:00',
      time3: '08:00 – 14:00',
    },
  },
  faq: {
    eyebrow: { pt: 'Dúvidas frequentes', en: 'Frequently asked questions' },
    title: { pt: 'Tire suas dúvidas', en: 'Your questions, answered' },
    items: [
      {
        q: { pt: 'Vocês fazem encomendas para eventos?', en: 'Do you take orders for events?' },
        a: { pt: 'Sim! Aceitamos encomendas com 48h de antecedência para bolos, salgados e pães especiais. Entre em contato pelo WhatsApp.', en: 'Yes! We accept orders with 48h notice for cakes, savory items and special breads. Contact us on WhatsApp.' },
      },
      {
        q: { pt: 'Vocês têm opções sem glúten ou veganas?', en: 'Do you have gluten-free or vegan options?' },
        a: { pt: 'Temos algumas opções disponíveis diariamente. Consulte nossa equipe no balcão para saber os itens do dia.', en: 'We have a few options available daily. Ask our team at the counter for today\'s items.' },
      },
      {
        q: { pt: 'Aceitam cartão de crédito?', en: 'Do you accept credit cards?' },
        a: { pt: 'Sim, aceitamos cartões de crédito, débito, PIX e dinheiro.', en: 'Yes, we accept credit cards, debit cards, PIX and cash.' },
      },
      {
        q: { pt: 'Posso trabalhar no café?', en: 'Can I work on my laptop at the café?' },
        a: { pt: 'Claro! Temos Wi-Fi gratuito e tomadas disponíveis. Pedimos apenas respeito aos outros clientes nos horários de pico.', en: 'Of course! We have free Wi-Fi and available outlets. We just ask for respect to other customers during peak hours.' },
      },
    ],
  },
  testimonials: {
    eyebrow: { pt: 'Depoimentos', en: 'Testimonials' },
    title: { pt: 'O que dizem nossos clientes', en: 'What our customers say' },
    items: [
      {
        name: 'Mariana S.',
        text: { pt: 'O melhor pão de fermentação natural da região. Virou meu ritual de domingo!', en: 'The best sourdough in the area. It became my Sunday ritual!' },
        role: { pt: 'Cliente há 5 anos', en: 'Customer for 5 years' },
      },
      {
        name: 'Rafael T.',
        text: { pt: 'Ambiente acolhedor, café excelente e atendimento que parece de família.', en: 'Welcoming atmosphere, excellent coffee and service that feels like family.' },
        role: { pt: 'Morador da Vila Mariana', en: 'Vila Mariana resident' },
      },
      {
        name: 'Julia K.',
        text: { pt: 'Descobri o lugar numa viagem e voltei três vezes na mesma semana. Os croissants são incríveis.', en: 'Found this place on a trip and went back three times in the same week. The croissants are incredible.' },
        role: { pt: 'Turista', en: 'Tourist' },
      },
    ],
  },
  footer: {
    rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
    madeWith: { pt: 'Feito com carinho em São Paulo.', en: 'Made with love in São Paulo.' },
  },
};

/* =========================================================
   HOOKS
   ========================================================= */
function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.12, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useSEO(lang) {
  useEffect(() => {
    const t = CONFIG;
    document.title = `${t.business.name} — ${lang === 'pt' ? 'Pão artesanal e café especial em Vila Mariana' : 'Artisan bread and specialty coffee in Vila Mariana'}`;
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    setMeta('description', lang === 'pt' ? t.business.tagline.pt : t.business.tagline.en);
    setMeta('keywords', 'bakery, café, pão artesanal, Vila Mariana, São Paulo, sourdough, coffee');
    setMeta('og:title', t.business.name, true);
    setMeta('og:description', lang === 'pt' ? t.business.tagline.pt : t.business.tagline.en, true);
    setMeta('og:type', 'website', true);
    setMeta('og:locale', lang === 'pt' ? 'pt_BR' : 'en_US', true);
    document.documentElement.lang = lang;
  }, [lang]);
}

/* =========================================================
   ICONS (inline SVG, accessible)
   ========================================================= */
const Icon = {
  wheat: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="M2 22 16 8" /><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
    </svg>
  ),
  sun: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  leaf: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10.2 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  ),
  menu: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props} aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  close: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  whatsapp: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.66a11.92 11.92 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.17-3.45-8.4ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.87 9.87 0 0 1-1.51-5.25c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.44 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  ),
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  chevron: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  map: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  mail: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
    </svg>
  ),
  phone: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
};

/* =========================================================
   COMPONENTS
   ========================================================= */
function SkipLink() {
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#8B4513] focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:outline-none">
      Skip to main content
    </a>
  );
}

function Header({ lang, setLang, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { id: 'home', label: CONFIG.nav.home[lang] },
    { id: 'about', label: CONFIG.nav.about[lang] },
    { id: 'menu', label: CONFIG.nav.menu[lang] },
    { id: 'contact', label: CONFIG.nav.contact[lang] },
    { id: 'faq', label: CONFIG.nav.faq[lang] },
  ];

  const handleNav = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FFF8EE]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('home'); }}
            className="flex items-center gap-2 group"
            aria-label={`${CONFIG.business.name} — home`}
          >
            <div className="w-9 h-9 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFF8EE] font-serif text-lg font-bold group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="font-serif text-lg md:text-xl text-[#8B4513] font-semibold leading-tight">
              Vila Mariana
              <span className="block text-xs font-sans font-normal text-[#8B4513]/70 -mt-0.5">Bakery & Café</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id ? 'text-[#8B4513] bg-[#8B4513]/5' : 'text-[#3a2a1f] hover:text-[#8B4513] hover:bg-[#8B4513]/5'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#8B4513]/20 text-sm font-medium text-[#8B4513] hover:bg-[#8B4513]/5 transition-colors"
              aria-label={`Switch language to ${lang === 'pt' ? 'English' : 'Portuguese'}`}
            >
              <span className={lang === 'pt' ? 'font-bold' : 'opacity-60'}>PT</span>
              <span className="opacity-40">/</span>
              <span className={lang === 'en' ? 'font-bold' : 'opacity-60'}>EN</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-[#8B4513] hover:bg-[#8B4513]/5"
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <Icon.Close className="w-6 h-6" /> : <Icon.Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#FFF8EE] border-t border-[#8B4513]/10 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <nav className="px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
              className={`px-3 py-3 rounded-md text-base font-medium ${activeSection === item.id ? 'text-[#8B4513] bg-[#8B4513]/5' : 'text-[#3a2a1f]'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ lang }) {
  const { ref, isVisible } = useIntersectionObserver();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-20" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/13118d2ef-eba7-4b3f-9a00-84e5565a8852.png"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8EE]/95 via-[#FFF8EE]/75 to-[#FFF8EE]/30" />
      </div>

      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-[#D4A373]/20 text-[#8B4513] text-xs font-semibold tracking-wide uppercase mb-5">
            Since 1998 · Vila Mariana
          </span>
          <h1 id="hero-title" className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#3a2a1f] leading-[1.05] tracking-tight">
            {CONFIG.hero.title[lang]}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#3a2a1f]/80 leading-relaxed max-w-xl">
            {CONFIG.hero.subtitle[lang]}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollTo('menu')}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#8B4513] text-[#FFF8EE] font-medium hover:bg-[#6d3610] transition-colors shadow-lg shadow-[#8B4513]/20 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
            >
              {CONFIG.hero.cta[lang]}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/70 text-[#8B4513] font-medium border border-[#8B4513]/20 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
            >
              {CONFIG.hero.secondaryCta[lang]}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights({ lang }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <section className="py-16 md:py-24 bg-[#FFF8EE]" aria-labelledby="highlights-title">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h2 id="highlights-title" className="sr-only">Why choose us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CONFIG.highlights.map((h, i) => {
            const IconComp = Icon[h.icon];
            return (
              <article key={i} className="p-6 md:p-8 rounded-2xl bg-white border border-[#D4A373]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#D4A373]/20 text-[#8B4513] flex items-center justify-center mb-5">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#3a2a1f] mb-2">{h.title[lang]}</h3>
                <p className="text-[#3a2a1f]/70 leading-relaxed">{h.desc[lang]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About({ lang }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FAF1E3]" aria-labelledby="about-title">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-[#D4A373] font-semibold tracking-widest uppercase text-xs">{CONFIG.about.eyebrow[lang]}</span>
            <h2 id="about-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3a2a1f] mt-3 leading-tight">
              {CONFIG.about.title[lang]}
            </h2>
            <p className="mt-6 text-[#3a2a1f]/80 leading-relaxed text-base md:text-lg">
              {CONFIG.about.p1[lang]}
            </p>
            <p className="mt-4 text-[#3a2a1f]/80 leading-relaxed text-base md:text-lg">
              {CONFIG.about.p2[lang]}
            </p>
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CONFIG.about.values.map((v, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/60 border border-[#D4A373]/30">
                  <dt className="font-serif text-lg text-[#8B4513]">{v.title[lang]}</dt>
                  <dd className="text-sm text-[#3a2a1f]/70 mt-1">{v.desc[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://image.qwenlm.ai/public_source/1cf98852-af1c-4469-8d84-bd2188b7d93a/1df41a9da-ec40-4f8f-b78e-8c750432386d.png"
                alt={lang === 'pt' ? 'Família fundadora da padaria' : 'Founding family of the bakery'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-serif text-lg">Desde 1998</p>
                <p className="text-white/80 text-sm">{lang === 'pt' ? 'Tradição de família' : 'A family tradition'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu({ lang }) {
  const { ref, isVisible } = useIntersectionObserver();
  const [filter, setFilter] = useState('all');
  const tags = ['all', ...new Set(CONFIG.menu.items.map((it) => it.tag[lang]))];

  const filtered = filter === 'all' ? CONFIG.menu.items : CONFIG.menu.items.filter((it) => it.tag[lang] === filter);

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FFF8EE]" aria-labelledby="menu-title">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-[#D4A373] font-semibold tracking-widest uppercase text-xs">{CONFIG.menu.eyebrow[lang]}</span>
          <h2 id="menu-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3a2a1f] mt-3 leading-tight">
            {CONFIG.menu.title[lang]}
          </h2>
          <p className="mt-4 text-[#3a2a1f]/70">{CONFIG.menu.subtitle[lang]}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Menu filter">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              role="tab"
              aria-selected={filter === t}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === t ? 'bg-[#8B4513] text-[#FFF8EE]' : 'bg-white text-[#3a2a1f] border border-[#D4A373]/40 hover:bg-[#D4A373]/10'}`}
            >
              {t === 'all' ? (lang === 'pt' ? 'Todos' : 'All') : t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="tabpanel">
          {filtered.map((item, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border border-[#D4A373]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#FAF1E3]">
                <img
                  src={item.img}
                  alt={item.name[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-[#D4A373] uppercase tracking-wider">{item.tag[lang]}</span>
                <h3 className="font-serif text-lg text-[#3a2a1f] mt-1 leading-snug">{item.name[lang]}</h3>
                <p className="text-sm text-[#3a2a1f]/70 mt-2 leading-relaxed line-clamp-2">{item.desc[lang]}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-[#8B4513]">{item.price}</span>
                  <span className="text-xs text-[#3a2a1f]/50">{lang === 'pt' ? 'Produção diária' : 'Made daily'}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ lang }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <section className="py-16 md:py-24 bg-[#FAF1E3]" aria-labelledby="testimonials-title">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-[#D4A373] font-semibold tracking-widest uppercase text-xs">{CONFIG.testimonials.eyebrow[lang]}</span>
          <h2 id="testimonials-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3a2a1f] mt-3 leading-tight">
            {CONFIG.testimonials.title[lang]}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONFIG.testimonials.items.map((t, i) => (
            <figure key={i} className="p-6 md:p-8 rounded-2xl bg-white border border-[#D4A373]/30">
              <div className="flex gap-1 text-[#D4A373] mb-4" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <blockquote className="text-[#3a2a1f]/85 leading-relaxed italic">"{t.text[lang]}"</blockquote>
              <figcaption className="mt-5 pt-5 border-t border-[#D4A373]/30">
                <div className="font-semibold text-[#8B4513]">{t.name}</div>
                <div className="text-sm text-[#3a2a1f]/60">{t.role[lang]}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ lang }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FFF8EE]" aria-labelledby="faq-title">
      <div ref={ref} className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[#D4A373] font-semibold tracking-widest uppercase text-xs">{CONFIG.faq.eyebrow[lang]}</span>
          <h2 id="faq-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3a2a1f] mt-3 leading-tight">
            {CONFIG.faq.title[lang]}
          </h2>
        </div>
        <div className="space-y-3">
          {CONFIG.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="rounded-xl bg-white border border-[#D4A373]/30 overflow-hidden">
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-[#3a2a1f] hover:bg-[#D4A373]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4513] focus-visible:ring-inset"
                  >
                    <span>{item.q[lang]}</span>
                    <Icon.Chevron className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[#3a2a1f]/75 leading-relaxed">{item.a[lang]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }) {
  const { ref, isVisible } = useIntersectionObserver();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = true;
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: false });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FAF1E3]" aria-labelledby="contact-title">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-[#D4A373] font-semibold tracking-widest uppercase text-xs">{CONFIG.contact.eyebrow[lang]}</span>
          <h2 id="contact-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3a2a1f] mt-3 leading-tight">
            {CONFIG.contact.title[lang]}
          </h2>
          <p className="mt-4 text-[#3a2a1f]/70">{CONFIG.contact.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#D4A373]/30" noValidate>
            {status === 'success' && (
              <div role="status" className="mb-4 p-3 rounded-lg bg-green-50 text-green-800 text-sm border border-green-200">
                {CONFIG.contact.form.success[lang]}
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="mb-4 p-3 rounded-lg bg-red-50 text-red-800 text-sm border border-red-200">
                {CONFIG.contact.form.error[lang]}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#3a2a1f] mb-1.5">
                  {CONFIG.contact.form.name[lang]}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 rounded-lg border bg-[#FFF8EE] text-[#3a2a1f] placeholder-[#3a2a1f]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition ${errors.name ? 'border-red-400' : 'border-[#D4A373]/40'}`}
                  placeholder={lang === 'pt' ? 'Seu nome' : 'Your name'}
                />
                {errors.name && <p id="name-error" className="text-xs text-red-600 mt-1">{lang === 'pt' ? 'Nome é obrigatório' : 'Name is required'}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#3a2a1f] mb-1.5">
                  {CONFIG.contact.form.email[lang]}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 rounded-lg border bg-[#FFF8EE] text-[#3a2a1f] placeholder-[#3a2a1f]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition ${errors.email ? 'border-red-400' : 'border-[#D4A373]/40'}`}
                  placeholder="voce@exemplo.com"
                />
                {errors.email && <p id="email-error" className="text-xs text-red-600 mt-1">{lang === 'pt' ? 'E-mail inválido' : 'Invalid email'}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[#3a2a1f] mb-1.5">
                  {CONFIG.contact.form.message[lang]}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'msg-error' : undefined}
                  className={`w-full px-4 py-3 rounded-lg border bg-[#FFF8EE] text-[#3a2a1f] placeholder-[#3a2a1f]/40 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition resize-y ${errors.message ? 'border-red-400' : 'border-[#D4A373]/40'}`}
                  placeholder={lang === 'pt' ? 'Como podemos ajudar?' : 'How can we help?'}
                />
                {errors.message && <p id="msg-error" className="text-xs text-red-600 mt-1">{lang === 'pt' ? 'Mínimo de 10 caracteres' : 'Minimum 10 characters'}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#8B4513] text-[#FFF8EE] font-medium hover:bg-[#6d3610] transition-colors shadow-lg shadow-[#8B4513]/20 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
              >
                {CONFIG.contact.form.submit[lang]}
              </button>
            </div>
          </form>

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4A373]/30">
              <h3 className="font-serif text-2xl text-[#3a2a1f] mb-5">{CONFIG.contact.hours.title[lang]}</h3>
              <ul className="space-y-3 text-[#3a2a1f]/80">
                <li className="flex items-center justify-between gap-4 pb-3 border-b border-[#D4A373]/20">
                  <span className="flex items-center gap-2"><Icon.Clock className="w-4 h-4 text-[#8B4513]" /> {CONFIG.contact.hours.weekdays[lang]}</span>
                  <span className="font-medium">{CONFIG.contact.hours.time1}</span>
                </li>
                <li className="flex items-center justify-between gap-4 pb-3 border-b border-[#D4A373]/20">
                  <span className="flex items-center gap-2"><Icon.Clock className="w-4 h-4 text-[#8B4513]" /> {CONFIG.contact.hours.saturday[lang]}</span>
                  <span className="font-medium">{CONFIG.contact.hours.time2}</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2"><Icon.Clock className="w-4 h-4 text-[#8B4513]" /> {CONFIG.contact.hours.sunday[lang]}</span>
                  <span className="font-medium">{CONFIG.contact.hours.time3}</span>
                </li>
              </ul>
              <div className="mt-6 space-y-2 text-sm text-[#3a2a1f]/80">
                <a href={`tel:${CONFIG.business.phone}`} className="flex items-center gap-2 hover:text-[#8B4513]">
                  <Icon.Phone className="w-4 h-4 text-[#8B4513]" /> {CONFIG.business.phone}
                </a>
                <a href={`mailto:${CONFIG.business.email}`} className="flex items-center gap-2 hover:text-[#8B4513]">
                  <Icon.Mail className="w-4 h-4 text-[#8B4513]" /> {CONFIG.business.email}
                </a>
                <p className="flex items-start gap-2">
                  <Icon.Map className="w-4 h-4 text-[#8B4513] mt-0.5 flex-shrink-0" />
                  <span>{CONFIG.business.address[lang]}</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#D4A373]/30 aspect-[4/3] md:aspect-video">
              <iframe
                title="Vila Mariana Bakery location on Google Maps"
                src="https://www.google.com/maps?q=Vila+Mariana,+S%C3%A3o+Paulo,+SP&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  return (
    <footer className="bg-[#3a2a1f] text-[#FFF8EE]/80 pt-14 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#D4A373] flex items-center justify-center text-[#3a2a1f] font-serif text-lg font-bold">V</div>
              <span className="font-serif text-lg text-[#FFF8EE]">Vila Mariana<span className="block text-xs font-sans font-normal text-[#FFF8EE]/60 -mt-0.5">Bakery & Café</span></span>
            </div>
            <p className="text-sm leading-relaxed">{CONFIG.business.tagline[lang]}</p>
          </div>
          <div>
            <h4 className="font-serif text-[#FFF8EE] mb-4">{CONFIG.nav.contact[lang]}</h4>
            <address className="not-italic text-sm space-y-2">
              <p>{CONFIG.business.address[lang]}</p>
              <p><a href={`tel:${CONFIG.business.phone}`} className="hover:text-[#D4A373]">{CONFIG.business.phone}</a></p>
              <p><a href={`mailto:${CONFIG.business.email}`} className="hover:text-[#D4A373]">{CONFIG.business.email}</a></p>
            </address>
          </div>
          <div>
            <h4 className="font-serif text-[#FFF8EE] mb-4">{lang === 'pt' ? 'Redes sociais' : 'Social'}</h4>
            <div className="flex gap-3">
              <a href={CONFIG.business.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#3a2a1f] transition-colors">
                <Icon.Instagram className="w-5 h-5" />
              </a>
              <a href={CONFIG.business.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#3a2a1f] transition-colors">
                <Icon.Facebook className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${CONFIG.business.whatsapp}`} aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#3a2a1f] transition-colors">
                <Icon.Whatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF8EE]/50">
          <p>© {new Date().getFullYear()} {CONFIG.business.name}. {CONFIG.footer.rights[lang]}</p>
          <p>{CONFIG.footer.madeWith[lang]}</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONFIG.business.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de mais informações.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <Icon.Whatsapp className="w-7 h-7" />
    </a>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */
export default function App() {
  const [lang, setLang] = useState('pt');
  const [activeSection, setActiveSection] = useState('home');

  useSEO(lang);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-400-700.css';
    document.head.appendChild(link);
    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-500-600.css';
    document.head.appendChild(link2);
    return () => {
      link.remove();
      link2.remove();
    };
  }, []);

  // Track active section for nav highlighting
  useEffect(() => {
    const ids = ['home', 'about', 'menu', 'contact', 'faq'];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#3a2a1f] font-sans antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        html { scroll-behavior: smooth; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
      `}</style>

      <SkipLink />
      <Header lang={lang} setLang={setLang} activeSection={activeSection} />

      <main id="main" role="main">
        <Hero lang={lang} />
        <Highlights lang={lang} />
        <About lang={lang} />
        <Menu lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
}
