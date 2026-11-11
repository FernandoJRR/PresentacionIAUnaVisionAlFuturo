// Datos de las líneas de tiempo del tronco común. Fuentes en RESEARCH_AND_SOURCES.md (Slides 02 y 04).
// `photo`: foto histórica difuminada (pendiente de licencia); mientras no exista se muestra un placeholder.

export const ERAS_BEFORE = {
  rules: { name: 'Reglas', color: 'var(--ink)' },
  ml: { name: 'Aprendizaje automático', color: 'var(--gold)' },
}

export const TIMELINE_BEFORE = [
  { id: 'turing', photo: 'Alan Turing, c. 1951', photoSrc: '/history/AlanTuring.jpg', year: 1950, label: 'Turing', kind: 'theory', era: 'rules', group: 0 },
  { id: 'perceptron', photo: 'Mark I Perceptron, Cornell', photoSrc: '/history/MarkIPerceptron.jpg', year: 1958, label: 'Perceptrón', kind: 'theory', era: 'rules', group: 0 },
  { id: 'xcon', photo: 'VAX-11/780 de DEC', photoSrc: '/history/VAX-11780DEC.jpg', year: 1980, label: 'Configurar pedidos', kind: 'use', icon: 'gear', era: 'rules', group: 1 },
  { id: 'dectalk', photo: 'Unidad DECtalk DTC01', photoSrc: '/history/dectalk.png', year: 1984, label: 'Síntesis de voz', kind: 'use', icon: 'speaker', era: 'rules', group: 1 },
  { id: 'backprop', year: 1986, label: 'Backprop', kind: 'theory', era: 'ml', group: 1 },
  { id: 'sendai', photo: 'Metro de Sendai, 1987', photoSrc: '/history/sendai.jpg', year: 1987, label: 'Metro automático', kind: 'use', icon: 'train', era: 'rules', group: 1 },
  { id: 'fraude', year: 1992, label: 'Detección de fraude', kind: 'use', icon: 'card', era: 'ml', group: 2 },
  { id: 'lenet', photo: 'Demo de LeNet, AT&T Bell Labs', photoSrc: '/history/lenet.png', year: 1996, label: 'Lectura de cheques', kind: 'use', icon: 'digit', era: 'ml', group: 2 },
  { id: 'amazon', year: 1998, label: 'Recomendar productos', kind: 'use', icon: 'cart', era: 'ml', group: 2 },
  { id: 'spam', year: 2002, label: 'Filtro antispam', kind: 'use', icon: 'mail', era: 'ml', group: 2 },
]

export const ERAS_AFTER = {
  deep: { name: 'Aprendizaje profundo', color: 'var(--vermilion)' },
  foundation: { name: 'Modelos fundacionales', color: 'var(--crimson)', spark: true },
}

export const TIMELINE_AFTER = [
  { id: 'gnmt', year: 2016, label: 'Traducción neuronal', kind: 'use', icon: 'globe', era: 'deep', group: 0 },
  { id: 'transformer', year: 2017, label: 'Transformer', kind: 'theory', era: 'deep', group: 0 },
  { id: 'retina', year: 2018, label: 'Diagnóstico retinal', kind: 'use', icon: 'eye', era: 'deep', group: 0 },
  { id: 'nightsight', year: 2018, label: 'Fotografía nocturna', kind: 'use', icon: 'camera', era: 'deep', group: 0 },
  { id: 'alphafold', year: 2021, label: 'Plegado proteico', kind: 'use', icon: 'helix', era: 'deep', group: 1 },
  { id: 'chat', year: 2022, label: 'Asistentes de chat', kind: 'use', icon: 'chat', era: 'foundation', group: 1 },
  { id: 'whisper', year: 2022, label: 'Voz a texto', kind: 'use', icon: 'mic', era: 'foundation', group: 1 },
  { id: 'graphcast', year: 2023, label: 'Pronóstico climático', kind: 'use', icon: 'cloud', era: 'deep', group: 2 },
  { id: 'agentes', year: 2024, label: 'Agentes de código', kind: 'use', icon: 'code', era: 'foundation', group: 2 },
]

export const ERAS = { ...ERAS_BEFORE, ...ERAS_AFTER }
export const TIMELINE_ALL = [...TIMELINE_BEFORE, ...TIMELINE_AFTER]
