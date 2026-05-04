export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: any;
  type: 'title' | 'stats' | 'chart' | 'list' | 'columns' | 'conclusion' | 'final';
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "Violencia doméstica contra la mujer en Piura",
    subtitle: "El rol de la comunicación estratégica en su prevención · 2024-2026",
    type: 'title',
    content: {
      tag: "ODS 5 · Igualdad de Género",
      authors: "Burgos · Guerrero · Garcia · Reyes · Liza | ADGE Ciclo I · UCV Piura 2026"
    }
  },
  {
    id: 2,
    title: "El problema a nivel mundial",
    type: 'stats',
    content: {
      stats: [
        { value: "840M", label: "mujeres han sufrido violencia en su vida" },
        { value: "1 de 3", label: "mujeres sufre violencia física o sexual" },
        { value: "137", label: "mujeres asesinadas cada día por sus parejas" }
      ],
      footer: "Durante el COVID-19: el 45% de mujeres declaró haber sufrido alguna forma de violencia — ONU Mujeres (2021)",
      source: "Fuente: OMS (2025) · ONU Mujeres (2025)"
    }
  },
  {
    id: 3,
    title: "Piura: la realidad que nos rodea",
    type: 'list',
    content: {
      items: [
        { icon: "bar-chart", value: "10,439", label: "denuncias por violencia familiar (enero-set. 2023)" },
        { icon: "users", value: "3,132", label: "casos en los CEM solo entre enero y mayo del 2024" },
        { icon: "alert-triangle", value: "7", label: "feminicidios en 2024 — entre los más altos del país" },
        { icon: "heart", value: "29.1%", label: "de víctimas acude a buscar ayuda institucional" }
      ],
      source: "Fuente: INEI (2024) · MIMP (2025) · Cutivalú Piura (2024)"
    }
  },
  {
    id: 4,
    title: "¿Qué tipo de violencia predomina?",
    type: 'chart',
    content: {
      data: [
        { name: 'Psicológica', Peru: 49, Piura: 46 },
        { name: 'Física', Peru: 27, Piura: 24 },
        { name: 'Sexual', Peru: 7, Piura: 6 }
      ],
      keyNote: "La violencia psicológica es la más común y la menos denunciada",
      observation: "Muchas mujeres no la reconocen como violencia"
    }
  },
  {
    id: 5,
    title: "¿Por qué ocurre?",
    type: 'columns',
    content: {
      sections: [
        {
          title: "CAUSAS DIRECTAS",
          items: ["Machismo y normas patriarcales", "Consumo de alcohol y drogas", "Dependencia emocional y económica"]
        },
        {
          title: "CAUSAS INDIRECTAS",
          items: ["Pobreza y desempleo", "Transmisión intergeneracional", "Normas sociales que toleran el abuso"]
        }
      ],
      footer: "Ninguno de estos factores actúa solo — se potencian entre sí (Montoya y Galindo, 2025)"
    }
  },
  {
    id: 6,
    title: "¿Qué pasa si no lo abordamos?",
    type: 'stats', // reusing grid layout
    content: {
      grid: [
        { icon: "brain", title: "Salud mental", desc: "Depresión, ansiedad, TEPT, pérdida de autoestima y autonomía" },
        { icon: "activity", title: "Salud física", desc: "Alteraciones cardiovasculares, diabetes e hipertensión por estrés crónico" },
        { icon: "users-2", title: "Impacto familiar", desc: "Aislamiento social, fractura del núcleo familiar, violencia transgeneracional" },
        { icon: "globe", title: "Impacto en la sociedad", desc: "Mujeres que abandonan estudios o empleo; pérdida del potencial de la región" }
      ]
    }
  },
  {
    id: 7,
    title: "Pregunta de investigación",
    type: 'list',
    content: {
      mainBox: "¿De qué manera el rol de la comunicación estratégica contribuye a la prevención de la violencia doméstica contra la mujer en la región Piura durante el periodo 2024-2026?",
      objectivesTitle: "Objetivos específicos",
      objectives: [
        "Identificar los factores causales y consecuencias de la violencia doméstica en la literatura reciente",
        "Revisar estrategias de comunicación estratégica y diseño visual para la prevención de la violencia de género",
        "Reconocer vacíos y oportunidades de investigación en el contexto piurano"
      ]
    }
  },
  {
    id: 8,
    title: "¿Qué dice la ciencia?",
    type: 'list',
    content: {
      literature: [
        { author: "Alsina et al. (2023)", journal: "Violence Against Women · Q1", text: "Las intervenciones que incluyen a hombres son más efectivas para prevenir la violencia" },
        { author: "Ostadtaghizadeh et al. (2023)", journal: "BMC Women's Health · Q1", text: "La comunicación digital emergió como clave para víctimas durante el COVID-19" },
        { author: "Reis et al. (2020)", journal: "Frontiers in Psychology · Q1", text: "Las campañas visuales de empoderamiento son más efectivas que las de violencia explícita" },
        { author: "Geibler et al. (2026)", journal: "Journal Experimental Criminology · Q1", text: "Campañas digitales cambian actitudes, pero necesitan complemento presencial" }
      ]
    }
  },
  {
    id: 9,
    title: "Resultados y discusión",
    type: 'stats', // grid layout
    content: {
      findings: [
        { icon: "search", title: "Tendencia teórica", desc: "Todos los estudios comparten una visión ecológica y multidimensional: la violencia no tiene una sola causa" },
        { icon: "bar-chart-3", title: "Patrones encontrados", desc: "Las intervenciones funcionan mejor cuando combinan múltiples estrategias: no basta una sola campaña" },
        { icon: "lightbulb", title: "Consenso clave", desc: "La comunicación estratégica es necesaria, pero insuficiente sola — necesita políticas y cambio cultural" },
        { icon: "alert-circle", title: "Vacío identificado", desc: "Aún no se sabe qué características específicas debe tener una campaña para motivar la denuncia en Piura" }
      ]
    }
  },
  {
    id: 10,
    title: "Lo que concluimos",
    type: 'conclusion',
    content: {
      bullets: [
        "Piura tiene uno de los índices de violencia doméstica más altos del Perú, con raíces culturales y económicas profundas",
        "La comunicación estratégica y el diseño visual pueden cambiar actitudes y aumentar el conocimiento sobre la violencia",
        "Las campañas visuales bien fundamentadas son más efectivas que las que muestran violencia explícita",
        "Existe un vacío importante: falta investigar qué tipo de campaña visual motiva la denuncia en contextos como Piura",
        "El diseño gráfico tiene un rol social concreto y con base científica en la prevención de la violencia doméstica"
      ]
    }
  },
  {
    id: 11,
    title: "La violencia doméstica no es un problema privado.",
    subtitle: "Es un obstáculo estructural para el desarrollo de Piura y una oportunidad concreta para el diseño gráfico.",
    type: 'final',
    content: {
      thanks: "Gracias — ¿Preguntas?",
      authors: "Burgos · Guerrero · Garcia · Reyes · Liza | ADGE Ciclo I · UCV Piura 2026"
    }
  }
];
