# RESEARCH_AND_SOURCES.md — Respaldo Científico, Evidencia Empírica y Guion de Referencia por Diapositiva

> **Propósito de este Documento:**
> Este archivo contiene toda la fundamentación teórica, datos empíricos, referencias académicas revisadas por pares (IEEE, ACM, NeurIPS, ICLR, Communications of the ACM, Cambridge University Press) y el contexto narrativo completo para cada diapositiva de la conferencia **"Inteligencia Artificial: Una visión al futuro"** (11 de noviembre, Universidad Mesoamericana).
>
> **Política Estricta de Verificación:**
> Ninguna afirmación de esta presentación proviene de foros, blogs informales o Wikipedia. Todas las fuentes corresponden a artículos seminales, conferencias científicas de primer nivel (Tier-1) y estudios empíricos de universidades e institutos de investigación reconocidos.
>
> **Regla de Sobriedad Textual en Diapositivas (Magia Visual, No Escrita):**
> La temática de "magia" (el mago, el escriba, el aprendizaje arcano, la alquimia y el control) **es exclusivamente visual y de animación** (sprites pixel-art, partículas, diagramas visuales). **El texto escrito en las diapositivas debe ser 100% técnico, directo y profesional en lenguaje de Ingeniería en Ciencias y Sistemas**, con la única excepción de la diapositiva de bifurcación (**El Cruce de Caminos** / `PathFork.vue`).

---

## 0. Fundamentación Pedagógica: Por Qué las Diapositivas Tienen Pocas Palabras

Para garantizar una presentación de nivel de congreso internacional, el diseño instruccional de todas las diapositivas se rige por dos pilares de la ciencia cognitiva y la educación en ingeniería:

1. **Modelo *Assertion-Evidence* (Afirmación-Evidencia) en Ingeniería:**
   * **Investigación:** Alley, M., & Neeley, K. A. (2005). *"Rethinking the design of presentation slides: A case for sentence headlines and visual evidence"*. **Technical Communication**, 52(4), 417-426. / Garner, J. K., & Alley, M. (2013). *"How the design of presentation slides affects audience comprehension: A case for the assertion-evidence approach"*. **International Journal of Engineering Education**, 29(6), 1564-1579.
   * **Hallazgo Científico:** Reemplazar las listas de viñetas (*bullet points*) por una afirmación concisa en el encabezado acompañada de evidencia visual (diagramas, esquemas, animaciones conceptuales) reduce drásticamente la carga cognitiva extrínseca y mejora la retención y transferencia del conocimiento en audiencias de ingeniería.
2. **Teoría Cognitiva del Aprendizaje Multimedia (Principios de Canal Dual, Coherencia y Redundancia):**
   * **Investigación:** Mayer, R. E. (2020). *Multimedia Learning* (3rd ed.). **Cambridge University Press**. (Basado en la Teoría de Codificación Dual de Paivio y la Teoría de Carga Cognitiva de Sweller, 1988).
   * **Hallazgo Científico:** El cerebro humano procesa la información visual y auditiva por canales separados de capacidad limitada. Si una diapositiva contiene párrafos de texto que el expositor además lee en voz alta (*Efecto de Redundancia*), ambos canales colisionan y la comprensión cae. La diapositiva debe mostrar el **modelo visual y arquitectónico** mientras Fernando y Mario proveen la **explicación verbal**.

---

## PARTE 1: TRONCO COMÚN (Mañana y Tarde)

---

### Slide 01 — Portada: *Inteligencia Artificial: Una visión al futuro*
* **Identificador en [`slides.md`](./slides.md):** Diapositiva 1 (`class: ornate title-slide`)
* **Dirección Visual (Arte):** El Mago (`Fernando`, sosteniendo el orbe) y el Escriba (`Mario`, tomando notas en su cuaderno) frente a frente en la portada.
* **Texto en Diapositiva:**
  * `.label`: `Presentación inaugural`
  * `h1`: `Inteligencia Artificial`
  * `.subtitle`: `Una visión al futuro`
* **Contexto para Expositores:**
  * Bienvenida a los estudiantes de la Universidad Mesoamericana. Presentar el propósito de la conferencia: entender de dónde vienen los fundamentos matemáticos de la IA, cómo se integra hoy en sistemas de producción reales y qué habilidades definirán al ingeniero de software del futuro.

---

### SECCIÓN I: EL ORIGEN — Fundamentos Matemáticos y Computacionales
* **Sensación Visual y Animación:** Aprendizaje fundamental, estudio preliminar, trazos geométricos precisos y chispas iniciales.

#### Slide 02 — Línea de Tiempo I: La IA en Producción Antes del Salto (1950–2002)
* **Componente:** [`components/AiTimeline.vue`](./components/AiTimeline.vue) con datos en [`data/timelines.ts`](./data/timelines.ts) (`TIMELINE_BEFORE`). `clicks: 2`.
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte I · Evolución Histórica`
  * `h1`: `Llevas años usando IA sin llamarla así`
  * *Evidencia Visual:* Eje horizontal; teoría arriba (rombos dorados), aplicaciones en producción abajo (tarjetas con ícono 8x8). El `scribe` toma notas al inicio del eje. Colores por era: `--ink` (sistemas de reglas) y `--gold` (aprendizaje automático).
  * *Revelado:* inicio = Turing 1950, Perceptrón 1958 · clic 1 = reglas (1980–1987) + Backprop 1986 · clic 2 = aprendizaje automático (1992–2002).
* **Contexto Científico y Guion:**
  * **Tesis — el "efecto IA":** cuando una técnica funciona y se vuelve cotidiana, deja de llamarse IA y pasa a llamarse "software". Los estudiantes llevan años usando IA (antispam, bloqueo de tarjetas, recomendaciones) sin reconocerla.
  * **1980 · Configurar pedidos (XCON/R1):** sistema experto de reglas que configuraba las órdenes de computadoras VAX de Digital Equipment Corporation; uno de los primeros sistemas de IA con retorno económico documentado.
  * **1984 · Síntesis de voz (DECtalk):** síntesis por formantes basada en reglas; fue la voz de Stephen Hawking. Primer punto del hilo "voz" que reaparece en 2022 (Whisper) y en los agentes de voz de la Slide 05.
  * **1987 · Metro automático (Sendai, Japón):** control predictivo con lógica difusa para aceleración y frenado; más suave y eficiente que el operador humano.
  * **1992 · Detección de fraude:** redes neuronales sobre patrones de transacciones de tarjetas de crédito; es la razón por la que el banco bloquea una compra sospechosa.
  * **1996 · Lectura de cheques (LeNet):** red convolucional entrenada con *backpropagation* que leía montos manuscritos en millones de cheques al día; una de las primeras redes neuronales en producción masiva.
  * **1998 · Recomendar productos (Amazon):** filtrado colaborativo ítem-a-ítem, escalable a millones de clientes.
  * **~2002 · Filtro antispam:** clasificadores bayesianos ingenuos (*Naive Bayes*); propuestos en 1998 y adoptados masivamente a inicios de los 2000.
  * **Excluidos deliberadamente:** MYCIN (famoso pero nunca usado clínicamente), Deep Blue/AlphaGo (hitos, no usos en producción).
* **Fuentes Verificadas:**
  1. **Turing, A. M. (1950).** *"Computing Machinery and Intelligence"*. **Mind**, 59(236), 433–460.
  2. **Rosenblatt, F. (1958).** *"The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain"*. **Psychological Review**, 65(6), 386–408.
  3. **Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986).** *"Learning representations by back-propagating errors"*. **Nature**, 323(6088), 533–536.
  4. **McDermott, J. (1982).** *"R1: A Rule-Based Configurer of Computer Systems"*. **Artificial Intelligence**, 19(1), 39–88.
  5. **Klatt, D. H. (1987).** *"Review of text-to-speech conversion for English"*. **The Journal of the Acoustical Society of America**, 82(3), 737–793.
  6. **Yasunobu, S., & Miyamoto, S. (1985).** *"Automatic train operation system by predictive fuzzy control"*. En M. Sugeno (Ed.), **Industrial Applications of Fuzzy Control**, pp. 1–18. North-Holland.
  7. **Ghosh, S., & Reilly, D. L. (1994).** *"Credit card fraud detection with a neural-network"*. **Proceedings of the 27th Hawaii International Conference on System Sciences (HICSS)**, Vol. 3, pp. 621–630. IEEE.
  8. **LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998).** *"Gradient-based learning applied to document recognition"*. **Proceedings of the IEEE**, 86(11), 2278–2324.
  9. **Linden, G., Smith, B., & York, J. (2003).** *"Amazon.com recommendations: Item-to-item collaborative filtering"*. **IEEE Internet Computing**, 7(1), 76–80.
  10. **Sahami, M., Dumais, S., Heckerman, D., & Horvitz, E. (1998).** *"A Bayesian Approach to Filtering Junk E-Mail"*. **AAAI-98 Workshop on Learning for Text Categorization**, Technical Report WS-98-05.
  11. **Haenlein, M., & Kaplan, A. (2019).** *"A Brief History of Artificial Intelligence: On the Past, Present, and Future of Artificial Intelligence"*. **California Management Review**, 61(4), 5–14. (Efecto IA.)

---

#### Slides de Detalle por Hito — Patrón `Entrada → Modelo → Salida`
* **Componentes:** [`TechScene.vue`](./components/TechScene.vue) (encabezado, foto opcional, franja de progreso) + [`IoPanels.vue`](./components/IoPanels.vue) (tres paneles) + una escena por hito en [`components/scenes/`](./components/scenes/). Animación por cuadros con [`utils/frameLoop.ts`](./utils/frameLoop.ts): solo corre con la diapositiva activa y muestra el cuadro final en exportación o con `prefers-reduced-motion`.
* **Ubicación:** cada hito (incluida la teoría) tiene su slide de detalle justo después de su línea de tiempo, en orden cronológico. Presupuesto: 40–60 s por hito; tronco común total 30–45 min.
* **Fotos históricas:** el campo `photo` en [`data/timelines.ts`](./data/timelines.ts) muestra un placeholder ([`PhotoSlot.vue`](./components/PhotoSlot.vue)) en Turing, Perceptrón, XCON, DECtalk, Sendai y LeNet. Antes de reemplazarlo con una imagen difuminada se debe verificar la licencia (dominio público o CC); el difuminado no elimina derechos de autor.
* **Catálogo de escenas** (título en pantalla · mecanismo animado · fuente). Las referencias apuntan a la lista de fuentes de la Slide 02 (S02) o Slide 04 (S04). Donde se indica "ilustrativo", los valores muestran el mecanismo y no son mediciones.
  * *Antes del salto (escriba, Etapa 1):*
    1. **Turing (1950)** — "Turing propuso juzgar la inteligencia por la conducta" · pregunta → dos terminales ocultas → veredicto; la pregunta y la respuesta errónea 105621 son del artículo original · S02 ref. 1.
    2. **Perceptrón (1958)** — "Una neurona artificial pondera entradas y decide" · entradas × pesos (0.6, 0.4, −0.5) → Σ → escalón θ = 0.5, cuatro casos calculados · S02 ref. 2.
    3. **XCON (1980)** — "Reglas escritas por expertos configuraban cada pedido" · reglas SI → ENTONCES disparadas en secuencia arman el gabinete · S02 ref. 4.
    4. **DECtalk (1984)** — "Reglas fonéticas convertían texto en voz sintética" · texto → fonemas → formantes F1–F3 (frecuencias aproximadas) → onda · S02 ref. 5.
    5. **Backprop (1986)** — "El error viaja hacia atrás y ajusta los pesos" · pasada adelante (oro), error atrás (carmesí), error por iteración decreciente (ilustrativo) · S02 ref. 3.
    6. **Sendai (1987)** — "La lógica difusa frenaba el metro con suavidad" · distancia → grados de pertenencia cerca/media/lejos → frenado gradual · S02 ref. 6.
    7. **Fraude (1992)** — "Una red neuronal detecta compras fuera de patrón" · transacciones → red → puntaje de riesgo → aprobada/bloqueada (ilustrativo) · S02 ref. 7.
    8. **LeNet (1996)** — "Una red convolucional lee dígitos manuscritos" · filtro 3x3 recorre un "7"; los cuatro mapas de características y el max-pooling se calculan de verdad sobre la matriz · S02 ref. 8.
    9. **Amazon (1998)** — "Lo que otros compraron juntos guía la recomendación" · fila del ítem en el carrito en la matriz de similitud ítem-ítem (ilustrativo) · S02 ref. 9.
    10. **Spam (~2002)** — "Cada palabra aporta evidencia para detectar spam" · palabras cargan una balanza; probabilidad posterior 50% → 97% · S02 ref. 10.
  * *Después del salto (mago, Etapa 2):*
    11. **Traducción neuronal (2016)** — "Una representación compartida traduce entre idiomas" · codificador → vector → decodificador · S04 ref. 1.
    12. **Transformer (2017)** — "La atención conecta cada palabra con su contexto" · matriz de atención sobre "Me senté en el banco del parque"; "banco" se resuelve como asiento (pesos ilustrativos) · S04 ref. 2.
    13. **Retina (2018)** — "Un sistema autónomo detecta retinopatía diabética" · fondo de ojo procedural → análisis por regiones → referir · S04 ref. 3.
    14. **Night Sight (2018)** — "Fusionar ráfagas ruidosas revela la escena nocturna" · ráfaga alineada y promediada; el ruido baja con cada cuadro · S04 ref. 4.
    15. **AlphaFold (2021)** — "Predecir la forma de una proteína desde su secuencia" · mapa de distancias refinado por iteraciones; la cadena se pliega (estructura ilustrativa) · S04 ref. 5.
    16. **Chat (2022)** — "Un modelo de lenguaje predice el siguiente token" · candidatos con probabilidad, token por token: *"La capital de Guatemala es Ciudad de Guatemala."*; "Antigua" como candidato muestra que el modelo refleja patrones de datos (ilustrativo) · S04 ref. 6.
    17. **Whisper (2022)** — "Whisper transcribe voz a texto vía espectrogramas" · onda → espectrograma → transformer → texto · S04 ref. 7.
    18. **GraphCast (2023)** — "Una red de grafos pronostica el clima global" · malla con paso de mensajes; el sistema avanza en pasos de 6 h (mapa ilustrativo) · S04 ref. 8.
    19. **Agentes de código (2024+)** — "Un agente itera: edita, prueba y corrige" · leer → editar → probar (falla) → editar → probar (pasa) → pull request · S04 ref. 9; Yao et al. (2023).

---

#### Slide 03 — El Salto Exponencial: Cómputo y Datos
* **Componente:** [`components/ComputeChart.vue`](./components/ComputeChart.vue). `clicks: 2`. Bisagra entre ambas líneas de tiempo; el Transformer tiene su propia slide de detalle después de la Línea de Tiempo II.
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte I · El Salto Exponencial`
  * `h1`: `Más cómputo y más datos desataron el salto`
  * *Evidencia Visual:* Gráfica pixel en escala logarítmica del cómputo de entrenamiento (FLOP) 1950–2025. Inicio: tendencia lenta (×2 cada ~20 meses) con el Perceptrón · clic 1: tendencia rápida desde 2010 (×2 cada ~6 meses) con AlexNet y Transformer · clic 2: GPT-3 y 2023, el `mage` empuja la curva.
* **Contexto Científico y Guion:**
  * ¿Por qué ocurrió el salto si las redes neuronales existían desde hace décadas? Las ideas de 1958 y 1986 eran correctas; faltaban cómputo y datos.
    1. **Dos eras de cómputo:** antes de 2010 el cómputo de entrenamiento se duplicaba cada ~20 meses (ritmo de Moore); desde la era del aprendizaje profundo, cada ~6 meses.
    2. **GPUs + datos masivos (2012):** AlexNet entrenada en GPUs sobre ImageNet marca el inicio del aprendizaje profundo en la industria.
    3. **La Lección Amarga:** los métodos generales que escalan con el cómputo superan a las heurísticas codificadas a mano.
    4. **Leyes de Escalamiento:** el error disminuye como ley de potencias al escalar cómputo, datos y parámetros.
  * Los puntos de la gráfica son órdenes de magnitud aproximados (Perceptrón ~10^6 FLOP, AlexNet ~10^17.7, GPT-3 ~3×10^23).
* **Fuentes Verificadas:**
  1. **Sevilla, J., Heim, L., Ho, A., Besiroglu, T., Hobbhahn, M., & Villalobos, P. (2022).** *"Compute Trends Across Three Eras of Machine Learning"*. **2022 International Joint Conference on Neural Networks (IJCNN)**, IEEE, pp. 1–8.
  2. **Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012).** *"ImageNet Classification with Deep Convolutional Neural Networks"*. **NeurIPS 2012**, Vol. 25, pp. 1097–1105.
  3. **Brown, T. B., et al. (2020).** *"Language Models are Few-Shot Learners"*. **NeurIPS 2020**, Vol. 33, pp. 1877–1901. (Cómputo de GPT-3.)
  4. **Sutton, R. S. (2019).** *"The Bitter Lesson"*. **Incomplete Ideas (University of Alberta)**. (Ensayo de autor; solo como cita de contexto.)
  5. **Kaplan, J., et al. (2020).** *"Scaling Laws for Neural Language Models"*. **arXiv:2001.08361**.
  6. **Hoffmann, J., et al. (2022).** *"Training Compute-Optimal Large Language Models"*. **NeurIPS 2022**, Vol. 35, pp. 30016–30030.

---

### SECCIÓN II: EL PRESENTE — Integraciones en el Mundo Real
* **Sensación Visual y Animación:** Creación activa ("cocinar magia" de forma puramente visual: el caldero burbujeante y partículas enérgicas conectando el modelo con sistemas reales; energía potente pero propensa al desorden si no se controla).

#### Slide 04 — Línea de Tiempo II: La IA como Infraestructura (2016–2024+)
* **Componente:** [`components/AiTimeline.vue`](./components/AiTimeline.vue) con datos en [`data/timelines.ts`](./data/timelines.ts) (`TIMELINE_AFTER`). `clicks: 2`.
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte II · Adopción Masiva`
  * `h1`: `Desde 2016, la IA es infraestructura`
  * *Evidencia Visual:* Misma gramática visual que la Slide 02; colores `--vermilion` (aprendizaje profundo) y `--crimson` (modelos fundacionales). Las tarjetas fundacionales emiten chispas pixel desordenadas (volatilidad, Etapa 2). El `mage` cierra el eje con su orbe.
  * *Revelado:* inicio = 2016–2018 + Transformer · clic 1 = 2021–2022 · clic 2 = 2023–2024.
* **Contexto Científico y Guion:**
  * **2016 · Traducción neuronal:** Google reemplaza su traductor estadístico por un sistema neuronal; un solo modelo traduce entre múltiples idiomas, incluso pares nunca vistos (*zero-shot*).
  * **2017 · Transformer:** arquitectura base de todo lo que sigue (ver Slide 03).
  * **2018 · Diagnóstico retinal:** primer sistema de diagnóstico autónomo autorizado por la FDA (retinopatía diabética), sin necesidad de un especialista que interprete la imagen.
  * **2018 · Fotografía nocturna:** el modo noche de los teléfonos fusiona ráfagas de fotos con aprendizaje automático; cada foto nocturna es calculada, no solo capturada.
  * **2021 · Plegado proteico (AlphaFold):** predicción de estructuras de proteínas con precisión experimental; Premio Nobel de Química 2024.
  * **2022 · Asistentes de chat:** modelos de lenguaje alineados con retroalimentación humana (RLHF) llegan al público masivo.
  * **2022 · Voz a texto (Whisper):** reconocimiento de voz robusto y multilingüe; segundo punto del hilo "voz" iniciado con DECtalk (1984).
  * **2023 · Pronóstico climático (GraphCast):** supera al sistema numérico de referencia del ECMWF en la mayoría de variables a 10 días; ECMWF opera su propio modelo de IA (AIFS) desde 2025.
  * **2024+ · Agentes de código:** agentes que resuelven *issues* reales de GitHub; puente directo a las Slides 05 y 06.
* **Fuentes Verificadas:**
  1. **Johnson, M., et al. (2017).** *"Google's Multilingual Neural Machine Translation System: Enabling Zero-Shot Translation"*. **Transactions of the Association for Computational Linguistics (TACL)**, 5, 339–351.
  2. **Vaswani, A., et al. (2017).** *"Attention Is All You Need"*. **NeurIPS 2017**, Vol. 30.
  3. **Abràmoff, M. D., Lavin, P. T., Birch, M., Shah, N., & Folk, J. C. (2018).** *"Pivotal trial of an autonomous AI-based diagnostic system for detection of diabetic retinopathy in primary care offices"*. **npj Digital Medicine**, 1, 39.
  4. **Liba, O., et al. (2019).** *"Handheld Mobile Photography in Very Low Light"*. **ACM Transactions on Graphics (SIGGRAPH Asia 2019)**, 38(6), Article 164.
  5. **Jumper, J., et al. (2021).** *"Highly accurate protein structure prediction with AlphaFold"*. **Nature**, 596, 583–589.
  6. **Ouyang, L., et al. (2022).** *"Training language models to follow instructions with human feedback"*. **Advances in Neural Information Processing Systems (NeurIPS 2022)**, Vol. 35, pp. 27730–27744.
  7. **Radford, A., et al. (2023).** *"Robust Speech Recognition via Large-Scale Weak Supervision"*. **Proceedings of the 40th International Conference on Machine Learning (ICML 2023)**, PMLR 202:28492–28518.
  8. **Lam, R., et al. (2023).** *"Learning skillful medium-range global weather forecasting"*. **Science**, 382(6677), 1416–1421.
  9. **Jimenez, C. E., et al. (2024).** *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*. **International Conference on Learning Representations (ICLR 2024)**.
  10. **Bommasani, R., et al. (2021).** *"On the Opportunities and Risks of Foundation Models"*. **Stanford CRFM**, arXiv:2108.07258. (Definición de "modelo fundacional".)

---

#### Slide 05 — Las Piezas se Combinan: RAG y Agentes de Voz
* **Componente:** [`components/SystemPipelines.vue`](./components/SystemPipelines.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte II · Sistemas Actuales`
  * `h1`: `Las piezas se combinan en sistemas`
  * *Evidencia Visual:* Dos tuberías horizontales con los mismos íconos de la línea de tiempo; un paquete recorre cada etapa y el LLM es el caldero (Etapa 2):
    * **RAG:** `Pregunta → Búsqueda → Documentos → LLM → Respuesta con fuentes`.
    * **Agente de voz:** `Voz → STT (2022) → LLM → TTS (1984 →) → Voz` — cierra el hilo de voz DECtalk/Whisper.
* **Contexto Científico y Guion:**
  * **RAG:** la aplicación busca en documentación propia antes de responder y cita la fuente, reduciendo alucinaciones.
  * **Agentes de llamadas inbound y outbound:** reconocimiento de voz robusto (STT), razonamiento del LLM y síntesis neuronal (TTS).
* **Fuentes Verificadas:**
  1. **Lewis, P., et al. (2020).** *"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"*. **NeurIPS 2020**, Vol. 33, pp. 9459–9474.
  2. **Radford, A., et al. (2023).** *"Robust Speech Recognition via Large-Scale Weak Supervision"*. **ICML 2023**, PMLR 202:28492–28518.
  3. **Wang, C., et al. (2023).** *"Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers"*. **IEEE/ACM Transactions on Audio, Speech, and Language Processing**.

---

#### Slide 06 — Agentes que Actúan sobre Sistemas Reales
* **Componente:** [`components/AgentHub.vue`](./components/AgentHub.vue). El agente de código tiene su slide de detalle; esta generaliza a automatización y datos.
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte II · Automatización y Datos`
  * `h1`: `Agentes que actúan sobre sistemas reales`
  * *Evidencia Visual:* El `mage` y el caldero al centro disparan acciones hacia cinco herramientas (API, Base de datos, Correo, Tickets, Reportes). Unas aciertan (sage), otras fallan (carmesí); un marcador acumula aciertos y fallos. Prepara visualmente la Slide 07.
* **Contexto Científico y Guion:**
  * Con uso de herramientas (*Tool Use*) el modelo ejecuta acciones: llama APIs, consulta bases de datos con Text-to-SQL, envía correos, crea tickets y genera reportes para la toma de decisiones.
  * Un agente actúa con la misma confianza cuando acierta que cuando falla: sin dirección, el poder se vuelve volátil.
* **Fuentes Verificadas:**
  1. **Yao, S., et al. (2023).** *"ReAct: Synergizing Reasoning and Acting in Language Models"*. **ICLR 2023**.
  2. **Schick, T., et al. (2023).** *"Toolformer: Language Models Can Teach Themselves to Use Tools"*. **NeurIPS 2023**, Vol. 36.
  3. **Li, J., et al. (2023).** *"Can LLM Already Serve as A Database Interface? A BIg Bench for Large-Scale Database Grounded Text-to-SQLs (BIRD)"*. **NeurIPS 2023**, Vol. 36.

---

### SECCIÓN III: EL FUTURO — Dirección de Orquesta, *Taste* y Dominio de Fundamentos
* **Sensación Visual y Animación:** Orden, control consciente y dirección estructurada (animaciones sincronizadas y limpias bajo el control de los personajes).

#### Slide 07 — Nuestro Rol: Dirigir con Criterio
* **Componente:** [`components/Orchestra.vue`](./components/Orchestra.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte III · El Futuro de la Profesión`
  * `h1`: `Nuestro rol: dirigir con criterio`
  * *Evidencia Visual:* Las chispas dispersas de la Slide 06 (carmesí/bermellón) atraviesan cuatro guías — Especificación, Mockups, Pruebas, Fundamentos — y se alinean en una cuadrícula ordenada (oro → sage), dirigidas por el `scribe` y el `mage` juntos.
* **Contexto Científico y Guion:**
  * El rol del ingeniero es el de **Director de Orquesta**:
    1. **Buen Gusto (*Engineering Taste*):** distinguir una implementación sólida de una frágil.
    2. **Detección anticipada de fallos de seguridad y módulos rotos:** sin criterio, quienes usan asistentes de IA escriben código más inseguro y confían más en él (Perry et al.).
    3. **Guiar a la IA con especificaciones, mockups y pruebas.**
    4. **Dominar los fundamentos y herramientas fuera de la IA.**
* **Fuentes Verificadas:**
  1. **Perry, N., Srivastava, M., Kumar, D., & Boneh, D. (2023).** *"Do Users Write More Insecure Code with AI Assistants?"*. **ACM CCS 2023**, pp. 2785–2799.
  2. **Tankelevitch, L., et al. (2024).** *"The Metacognitive Demands and Opportunities of Generative AI"*. **ACM CHI 2024** (*Best Paper*).
  3. **Brooks, F. P. (1987).** *"No Silver Bullet—Essence and Accidents of Software Engineering"*. **IEEE Computer**, 20(4), 10–19.

---

#### Slide 08 — Bifurcación: *El Cruce de Caminos* (`routeAlias: bifurcacion`)
* **Componente:** [`components/PathFork.vue`](./components/PathFork.vue)
* **Excepción Artística Autorizada:** Esta es la **única diapositiva** donde se emplea alegoría escrita en los títulos de las tarjetas (*"El Cruce de Caminos"*, *"El Aprendiz Consciente"* vs. *"El Arquitecto de Forjas"*) para enmarcar la elección interactiva de ruta. En esta diapositiva **no aparecen las flechas de navegación**, obligando a elegir explícitamente el Camino I o el Camino II.

---

## PARTE 2: CAMINO 1 — SESIÓN DE LA MAÑANA (Estudiantes de Primer Año)
> **Enfoque:** *Controlar a la IA y no que la IA nos controle: Conceptos, Maneras de Usarlo, Cómo Hablar con la IA e Interacción Consciente.*

---

### Slide M-01 — Controlar a la IA: Evitar la Descarga Cognitiva (*Cognitive Offloading*)
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Fundamentos y Cognición`
  * `h1`: `Controlar a la IA: usarla para comprender, nunca para evadir el razonamiento`
  * *Contexto Científico y Guion:*
    * Explicación de cómo el *Cognitive Offloading* (delegar la resolución de problemas básicos en primer año) impide formar los modelos mentales de programación. Cómo usar la IA como tutor socrático que explica conceptos y reta al estudiante en lugar de copiar y pegar soluciones.
* **Fuentes Verificadas:**
  1. **Risko, E. F., & Gilbert, S. J. (2016).** *"Cognitive Offloading"*. **Trends in Cognitive Sciences**, 20(9), 676–688.
  2. **Prather, J., et al. (2023).** *"‘It’s Weird That it Knows What I Want’: Usability and Interactions with Copilot for Novice Programmers"*. **ACM Transactions on Computer-Human Interaction (TOCHI)**, 31(1), 1–31.
  3. **Kazemitabaar, M., et al. (2023).** *"Studying the Effect of AI Code Generators on Supporting Novice Learners in Introductory Programming"*. **ACM CHI 2023**.

---

### Slide M-02 — Cómo Hablar e Interactuar con la IA: Estructura Lógica y Contexto
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Comunicación e Interacción`
  * `h1`: `La calidad de la respuesta depende de cómo estructuras el problema y el contexto`
  * *Contexto Científico y Guion:*
    * Formas de interactuar con los modelos: descomposición de problemas, provisión de contexto, definición de restricciones, ejemplos (*Few-Shot*) y razonamiento paso a paso (*Chain-of-Thought*).
    * Modos de interacción (*Exploración* vs. *Aceleración*) y verificación constante de cada respuesta frente a los fundamentos aprendidos en clase.
* **Fuentes Verificadas:**
  1. **Brown, T., et al. (2020).** *"Language Models are Few-Shot Learners"*. **Advances in Neural Information Processing Systems (NeurIPS 2020)**, Vol. 33, pp. 1877–1901.
  2. **Wei, J., et al. (2022).** *"Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"*. **Advances in Neural Information Processing Systems (NeurIPS 2022)**, Vol. 35, pp. 24824–24837.
  3. **Barke, S., James, M. B., & Polikarpova, N. (2023).** *"Grounded Copilot: How Programmers Interact with Code-Generating Models"*. **PACMPL / OOPSLA 2023**, 7(OOPSLA1), 85–111.

---

## PARTE 3: CAMINO 2 — SESIÓN DE LA TARDE (Estudiantes de Años Superiores)
> **Enfoque:** *Controlar a la IA en la Programación Real: Integración de Harness y Guardrails para Reducir el AI Slop.*

---

### Slide T-01 — Ingeniería Agéntica: El *Harness* y los *Guardrails* contra el *AI Slop*
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Arquitectura de Control`
  * `h1`: `Integrar un Harness y Guardrails deterministas para erradicar el AI Slop`
  * *Contexto Científico y Guion:*
    * Qué ocurre cuando se usa IA en proyectos reales sin restricciones: proliferación de *AI Slop* (código duplicado, deuda técnica, vulnerabilidades de seguridad y pérdida de modularidad).
    * Cómo construir el **Harness** (archivos de reglas arquitectónicas como `AGENTS.md`, sistemas de tipos estrictos, linters, contratos de interfaz) y los **Guardrails** (pruebas automatizadas, validación de esquemas y análisis estático SAST con ciclos de *Self-Debugging*).
* **Fuentes Verificadas:**
  1. **Pearce, H., et al. (2022).** *"Asleep at the Keyboard? Assessing the Security of GitHub Copilot’s Code Contributions"*. **2022 IEEE Symposium on Security and Privacy (SP)**, pp. 754–768.
  2. **Yang, J., Jimenez, C. E., et al. (2024).** *"SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"*. **Advances in Neural Information Processing Systems (NeurIPS 2024)**.
  3. **Chen, X., et al. (2024).** *"Teaching Large Language Models to Self-Debug"*. **International Conference on Learning Representations (ICLR 2024)**.
  4. **Rebedea, T., et al. (2023).** *"NeMo Guardrails: A Toolkit for Controllable and Safe LLM Applications with Programmable Rails"*. **EMNLP 2023**, pp. 431–445.

---

### Slide T-02 — Comparativa Práctica: Proyecto Sin Pasos de Control vs. Proyecto Con Harness y Guardrails
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Caso Práctico en Código`
  * `h1`: `Comparativa real: un proyecto dominado por AI Slop frente a uno gobernado por Guardrails`
  * *Contexto Científico y Guion:*
    * Demostración lado a lado de cómo luce un repositorio de software cuando no tiene especificaciones previas ni validaciones automáticas (acoplamiento, estilos rotos, fallos de seguridad) frente a un proyecto que guía a la IA mediante diseño predefinido, arnés de contexto y pruebas verificables.
* **Fuentes Verificadas:**
  1. **Dakhel, A. M., et al. (2023).** *"GitHub Copilot AI pair programmer: Asset or Liability?"*. **Journal of Systems and Software**, 203, 111734.
  2. **Shinn, N., et al. (2023).** *"Reflexion: Language Agents with Verbal Reinforcement Learning"*. **Advances in Neural Information Processing Systems (NeurIPS 2023)**, Vol. 36.

---

### Slide Final — Convergencia y Créditos (`routeAlias: cierre`)
* **Identificador en [`slides.md`](./slides.md):** Diapositiva final (`class: ornate credits-slide`)
* **Comportamiento de Navegación:** Tanto la última diapositiva del Camino 1 como la última diapositiva del Camino 2 convergen directamente en esta diapositiva al avanzar, y su flecha de retroceso devuelve al expositor a la última diapositiva del camino que estuvo presentando.
