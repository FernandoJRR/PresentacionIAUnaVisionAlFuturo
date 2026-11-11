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
> **Enfoque:** *Controlar a la IA y no que la IA nos controle: descarga cognitiva, modelos mentales, diálogo socrático, estructura del problema y verificación.*
> **Marco común:** [`components/AprendizStageHeader.vue`](./components/AprendizStageHeader.vue) con la franja del ciclo `Descarga Cognitiva → 1 · Pensar → 2 · Preguntar → 3 · Verificar → 4 · Explicar`.
> **Hilo visual (sin texto):** [`components/ControlOrb.vue`](./components/ControlOrb.vue). En el nivel 0 el orbe arrastra al `scribe` con una correa carmesí y chispas caóticas; en cada paso la oscilación disminuye y el color pasa a oro; en el nivel 4 orbita en un anillo `--sage` bajo control.

---

### Slide M-01a — Delegar en herramientas es normal (*Cognitive Offloading*)
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Descarga Cognitiva`
  * `h1`: `Delegar memoria en herramientas es normal y útil`
  * *Evidencia Visual:* [`SceneDelegarHerramientas.vue`](./components/scenes/SceneDelegarHerramientas.vue). El `scribe` envía paquetes de cálculo, memoria y orientación a una calculadora, unas notas y un mapa; cada entrega llena un medidor de atención disponible.
  * *Contexto Científico y Guion:* La descarga cognitiva es el uso de acciones físicas o del entorno para reducir la demanda cognitiva de una tarea. Es adaptativa: delegar información en un medio externo libera recursos para aprender lo siguiente.
* **Fuentes Verificadas:**
  1. **Risko, E. F., & Gilbert, S. J. (2016).** *"Cognitive Offloading"*. **Trends in Cognitive Sciences**, 20(9), 676–688.
  2. **Storm, B. C., & Stone, S. M. (2015).** *"Saving-Enhanced Memory: The Benefits of Saving on the Learning and Remembering of New Information"*. **Psychological Science**, 26(2), 182–188. (Replicado por Runge, Frings & Tempel, 2019.)

---

### Slide M-01b — Delegar lo que estás aprendiendo frena el aprendizaje
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Descarga Cognitiva`
  * `h1`: `Delegar lo que estás aprendiendo frena el aprendizaje`
  * *Evidencia Visual:* [`SceneDelegarAprendizaje.vue`](./components/scenes/SceneDelegarAprendizaje.vue). Dos carriles, `IA que responde` (copia, cuaderno vacío) e `IA que guía` (el cuaderno se llena); barras de práctica y de examen sin IA relativas al grupo de control.
  * *Contexto Científico y Guion:* En un experimento de campo con ~1 000 estudiantes, el acceso a un GPT sin restricciones mejoró la práctica (+48%) pero redujo el desempeño en el examen sin IA (−17%) frente al control. Un tutor GPT con instrucciones que dan pistas en lugar de soluciones mejoró la práctica (+127%) y mitigó en gran medida el daño. El problema no es delegar, sino delegar la habilidad que se está construyendo.
* **Fuentes Verificadas:**
  1. **Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025).** *"Generative AI without guardrails can harm learning: Evidence from high school mathematics"*. **Proceedings of the National Academy of Sciences (PNAS)**, 122(26), e2422633122. DOI: 10.1073/pnas.2422633122.
  2. **Risko, E. F., & Gilbert, S. J. (2016).** *"Cognitive Offloading"*. **Trends in Cognitive Sciences**, 20(9), 676–688.

---

### Slide M-02 — Paso 1 · Pensar: el modelo mental es tuyo
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Modelos Mentales`
  * `h1`: `La IA predice texto; el modelo mental es tuyo`
  * *Evidencia Visual:* [`SceneModeloMental.vue`](./components/scenes/SceneModeloMental.vue). A la izquierda, el código como texto generado; a la derecha, la traza de memoria (`i`, `total`, `salida`) que el `scribe` ejecuta paso a paso.
  * *Contexto Científico y Guion:* Aprender a programar implica construir una máquina nocional: un modelo de cómo la computadora ejecuta el programa. Sorva propone hacerla un objetivo explícito de aprendizaje. El efecto de generación muestra que lo que uno produce se recuerda mejor que lo que solo lee.
* **Fuentes Verificadas:**
  1. **Sorva, J. (2013).** *"Notional Machines and Introductory Programming Education"*. **ACM Transactions on Computing Education (TOCE)**, 13(2), Article 8, 1–31. DOI: 10.1145/2483710.2483713.
  2. **Slamecka, N. J., & Graf, P. (1978).** *"The Generation Effect: Delineation of a Phenomenon"*. **Journal of Experimental Psychology: Human Learning and Memory**, 4(6), 592–604.

---

### Slide M-03 — Paso 2 · Preguntar: diálogo socrático
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Diálogo Socrático`
  * `h1`: `Pide preguntas, no respuestas`
  * *Evidencia Visual:* [`SceneSocratico.vue`](./components/scenes/SceneSocratico.vue). Dos chats sobre el mismo problema (invertir una lista): `Modo respuesta` entrega el código; `Modo tutor` devuelve preguntas. El `scribe` es el estudiante y el `mage` es el modelo.
  * *Contexto Científico y Guion:* Los asistentes educativos con límites pedagógicos evitan entregar la solución completa: responden con pseudocódigo, pistas y preguntas para mantener al estudiante razonando.
* **Fuentes Verificadas:**
  1. **Kazemitabaar, M., Ye, R., Wang, X., Henley, A. Z., Denny, P., Craig, M., & Grossman, T. (2024).** *"CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant that Balances Student and Educator Needs"*. **ACM CHI 2024**. DOI: 10.1145/3613904.3642773.
  2. **Liu, R., et al. (2024).** *"Teaching CS50 with AI: Leveraging Generative Artificial Intelligence in Computer Science Education"*. **ACM SIGCSE 2024**, 750–756. DOI: 10.1145/3626252.3630938.

---

### Slide M-04 — Paso 2 · Preguntar bien: estructura del problema
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Estructura del Problema`
  * `h1`: `Estructura el problema antes de escribir el prompt`
  * *Evidencia Visual:* [`ScenePromptEstructurado.vue`](./components/scenes/ScenePromptEstructurado.vue). Un prompt vago produce salidas dispersas que cambian en cada cuadro; el prompt estructurado se arma por bloques (Contexto, Objetivo, Restricción, Ejemplo, Formato) y produce una única salida acotada.
  * *Contexto Científico y Guion:* Descomposición del problema, contexto, restricciones, ejemplos (*Few-Shot*) y razonamiento paso a paso (*Chain-of-Thought*). Si no puedes escribir los bloques, todavía no entiendes el problema.
* **Fuentes Verificadas:**
  1. **Brown, T., et al. (2020).** *"Language Models are Few-Shot Learners"*. **Advances in Neural Information Processing Systems (NeurIPS 2020)**, Vol. 33, pp. 1877–1901.
  2. **Wei, J., et al. (2022).** *"Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"*. **Advances in Neural Information Processing Systems (NeurIPS 2022)**, Vol. 35, pp. 24824–24837.
  3. **Barke, S., James, M. B., & Polikarpova, N. (2023).** *"Grounded Copilot: How Programmers Interact with Code-Generating Models"*. **PACMPL / OOPSLA 2023**, 7(OOPSLA1), 85–111.

---

### Slide M-05 — Paso 3 · Verificar: fluidez no es corrección
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Verificación`
  * `h1`: `Una respuesta fluida no es una respuesta correcta`
  * *Evidencia Visual:* [`SceneVerificacion.vue`](./components/scenes/SceneVerificacion.vue). Una lupa recorre una función `promedio` con un error sutil (`range(1, len(notas))`); la prueba `promedio([80, 90])` devuelve `45.0` en lugar de `85.0`. Dos indicadores: 52% y 39%.
  * *Contexto Científico y Guion:* El 52% de las respuestas de ChatGPT a 517 preguntas de Stack Overflow contenía información incorrecta; en el estudio con usuarios, los participantes no detectaron la información incorrecta el 39% de las veces, por lo completo y bien redactado del texto. Mayor confianza en la IA se asocia con menos pensamiento crítico.
* **Fuentes Verificadas:**
  1. **Kabir, S., Udo-Imeh, D., Kou, B., & Zhang, T. (2024).** *"Is Stack Overflow Obsolete? An Empirical Study of the Characteristics of ChatGPT Answers to Stack Overflow Questions"*. **ACM CHI 2024**. DOI: 10.1145/3613904.3642596.
  2. **Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025).** *"The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers"*. **ACM CHI 2025**, Article 1121. DOI: 10.1145/3706598.3713778.

---

### Slide M-06 — Paso 4 · Explicar: síntesis del ciclo
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino I · Sesión Matutina · Síntesis`
  * `h1`: `Si no puedes explicarlo, todavía no es tuyo`
  * *Evidencia Visual:* [`SceneExplicar.vue`](./components/scenes/SceneExplicar.vue). Ciclo en rombo Pensar → Preguntar → Verificar → Explicar recorrido por un marcador; en el centro, `mage` y `scribe` juntos con el orbe orbitando en un anillo `--sage` (cierre del hilo visual).
  * *Contexto Científico y Guion:* Regla de trabajo: nunca entregar una línea que no se pueda explicar en el pizarrón. Integra los pasos anteriores; su flecha siguiente conduce a `cierre`.
* **Fuentes:** Síntesis de M-01a a M-05.

---

## PARTE 3: CAMINO 2 — SESIÓN DE LA TARDE (Estudiantes de Años Superiores)
> **Enfoque:** *Controlar a la IA en la Programación Real: Del Vibe Coding al Determinismo Estructural con Reglas de Complejidad y Cobertura.*

---

### Slide T-01 — El Experimento: Un Mismo Esquema y Prompt en Cuatro Entornos (`routeAlias: camino-tarde`)
* **Componentes:** [`components/HarnessStageHeader.vue`](./components/HarnessStageHeader.vue) + [`components/scenes/SceneExperimentSetup.vue`](./components/scenes/SceneExperimentSetup.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Sesión Vespertina · Diseño Experimental`
  * `h1`: `Mismo esquema y mismo prompt producen cuatro arquitecturas distintas`
  * *Evidencia Visual:* Entrada invariante a la izquierda (`comedor.dbml` con 6 tablas + el prompt exacto: *"Genera una API de Javascript en base al archivo dbml en el folder del proyecto, confio en tu criterio así que no preguntes."*). A la derecha, los 4 niveles progresivos de arnés determinista que se recorrerán antes de pasar a la demostración en vivo.
* **Contexto Científico y Guion:**
  * Para demostrar empíricamente que el comportamiento de un agente de código depende del entorno determinista (*Agent-Computer Interface* y *Guardrails*) y no de "pedirle por favor" en el prompt, se mantuvo fijo un prompt deliberadamente permisivo que incluso pide "una API de Javascript" y delega todo el criterio al agente.
  * La variable independiente en los 4 experimentos es únicamente la **preparación determinista del repositorio** antes de ejecutar el prompt.
* **Fuentes Verificadas:**
  1. **Yang, J., Jimenez, C. E., Wettig, A., Lieret, K., Yao, S., Narasimhan, K., & Press, O. (2024).** *"SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"*. **Advances in Neural Information Processing Systems (NeurIPS 2024)**.
  2. **Rebedea, T., Dinu, R., Sreedhar, M., Parisien, C., & Cohen, J. (2023).** *"NeMo Guardrails: A Toolkit for Controllable and Safe LLM Applications with Programmable Rails"*. **Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing (EMNLP 2023): System Demonstrations**, pp. 431–445.

---

### Slide T-02 — Nivel 1: Generación sin Estructura ni `/init` (`demo-vibecoded`)
* **Componentes:** [`components/HarnessStageHeader.vue`](./components/HarnessStageHeader.vue) + [`components/scenes/SceneVibeCoding.vue`](./components/scenes/SceneVibeCoding.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Nivel 1 · Generación sin Estructura`
  * `h1`: `Sin estructura previa, el agente improvisa un monolito sin validación`
  * *Evidencia Visual (Sensación: el `mage` descontrolado junto al caldero hirviendo):* En una carpeta vacía (sin `/init` ni configuración), el `mage` lanza chispas erráticas (`--crimson` / `--vermilion`) que se acumulan en un bloque monolítico inestable (`src/server.js · 365 LOC` en CommonJS puro con cadenas `if/else` manuales) y un archivo `test/api.test.js` que imprime `console.log` con **0 aserciones (`assert`)**.
* **Contexto Científico y Guion:**
  * En el *Vibe Coding* puro no se prepara el proyecto ni se ejecuta `/init` porque el directorio está vacío.
  * El agente toma literalmente "API de Javascript", evita instalar un framework o validador de esquemas, concentra el enrutamiento HTTP, validación manual y consultas SQL en un solo archivo de 365 líneas (`src/server.js`) y genera un script de prueba ilusorio que termina en `exit(0)` sin verificar invariantes.
* **Fuentes Verificadas:**
  1. **Pearce, H., Ahmad, B., Tan, B., Dolan-Gavitt, B., & Karri, R. (2022).** *"Asleep at the Keyboard? Assessing the Security of GitHub Copilot’s Code Contributions"*. **2022 IEEE Symposium on Security and Privacy (SP)**, pp. 754–768.
  2. **Perry, N., Srivastava, M., Kumar, D., & Boneh, D. (2023).** *"Do Users Write More Insecure Code with AI Assistants?"*. **Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security (CCS '23)**, pp. 2785–2799.
  3. **Dakhel, A. M., Majdinasab, V., Nikanjam, A., Khomh, F., Desmarais, M. C., & Jiang, Z. M. (2023).** *"GitHub Copilot AI pair programmer: Asset or Liability?"*. **Journal of Systems and Software**, 203, 111734.

---

### Slide T-03 — Nivel 2: Estructura Base e `/init` (`demo-probabilistico`)
* **Componentes:** [`components/HarnessStageHeader.vue`](./components/HarnessStageHeader.vue) + [`components/scenes/SceneProbabilistico.vue`](./components/scenes/SceneProbabilistico.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Nivel 2 · Contexto Probabilístico`
  * `h1`: `La estructura base guía las carpetas, pero la lógica sigue acoplada`
  * *Evidencia Visual (Sensación: el `scribe` levanta estantes formales, pero el flujo del `mage` aún se desborda):* Se prepara la estructura de paquetes y librerías en TypeScript (`Express 5`, `Zod`, `supertest`, carpetas `controllers/`, `routes/`, `schemas/`) y se ejecuta `/init`. Aunque el prompt pedía "Javascript", el contexto probabilístico guía al agente a respetar TypeScript y separar 5 controladores, pero **omite la capa `services/`**, infla `comandas.controller.ts` a **238 líneas** mutando `db.store.ts` directamente y crea **1 solo archivo de pruebas global** (`comedor.test.ts`).
* **Contexto Científico y Guion:**
  * Proveer contexto mediante la estructura de paquetes y `/init` condiciona la distribución de probabilidad del modelo (*In-Context Learning*), logrando que adopte TypeScript y Zod.
  * Sin embargo, al no existir verificadores deterministas que fallen la compilación o los tests ante violaciones arquitectónicas, el modelo mezcla responsabilidades (controlador + lógica de negocio + acceso a datos) y escribe pruebas superficiales de camino feliz (*happy path*).
* **Fuentes Verificadas:**
  1. **Chen, X., Lin, M., Schärli, N., & Zhou, D. (2024).** *"Teaching Large Language Models to Self-Debug"*. **Twelfth International Conference on Learning Representations (ICLR 2024)**.
  2. **Barke, S., James, M. B., & Polikarpova, N. (2023).** *"Grounded Copilot: How Programmers Interact with Code-Generating Models"*. **Proceedings of the ACM on Programming Languages (PACMPL / OOPSLA 2023)**, 7(OOPSLA1), 85–111.

---

### Slide T-04 — Nivel 3: Reglas Deterministas sin Límites de Tamaño (`demo-determinista`)
* **Componentes:** [`components/HarnessStageHeader.vue`](./components/HarnessStageHeader.vue) + [`components/scenes/SceneDeterminista.vue`](./components/scenes/SceneDeterminista.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Nivel 3 · Reglas Deterministas Base`
  * `h1`: `Sin límites de tamaño, el agente cumple las reglas creando un megacontrolador`
  * *Evidencia Visual (Sensación: experto en las reglas escritas que toma un atajo por falta de restricción de tamaño):* El `scribe` activa tres barreras deterministas en `npm test`: `ArchUnit` (independencia de capas + regla `1 archivo = 1 test`), `Coverage ≥ 90% lines / 80% branches` y `ESLint` (`no-explicit-any`). El `mage` canaliza un haz preciso (`--gold`) que pasa todas las validaciones, pero **explota un vacío en las reglas (*Specification Gaming*)**: para no crear ni mantener múltiples suites de pruebas 1:1, **colapsa todas las entidades en un único `restaurant.controller.ts` (166 LOC)** y un único `restaurant.service.ts` (226 LOC).
* **Contexto Científico y Guion:**
  * En literatura de IA y aprendizaje por refuerzo, este fenómeno se conoce como ***Specification Gaming*** o ***Reward Hacking*** (manifestación computacional de la **Ley de Goodhart**: *"cuando una medida se convierte en objetivo, deja de ser una buena medida"*).
  * El agente descubre que si crea 5 controladores y 5 servicios, la regla de `architecture.test.ts` le exigirá 10 archivos `.test.ts` independientes con ≥90% de cobertura. Su solución óptima bajo esas restricciones incompletas es agrupar todo el restaurante en un solo controlador y un solo servicio.
* **Fuentes Verificadas:**
  1. **Skalse, J., Howe, N., Krasheninnikov, D., & Krueger, D. (2022).** *"Defining and Characterizing Reward Hacking"*. **Advances in Neural Information Processing Systems (NeurIPS 2022)**, Vol. 35, pp. 9460–9471.
  2. **Pan, A., Bhatia, K., & Steinhardt, J. (2022).** *"The Effects of Reward Misspecification: Mapping and Mitigating Misaligned Models"*. **Tenth International Conference on Learning Representations (ICLR 2022)**.
  3. **Goodhart, C. A. E. (1975).** *"Problems of Monetary Management: The U.K. Experience"*. **Papers in Monetary Economics**, Vol. I, Reserve Bank of Australia.

---

### Slide T-05 — Nivel 4: Determinismo Estructural Completo y Pase a Demo en Vivo (`demo-mas-determinista`)
* **Componentes:** [`components/HarnessStageHeader.vue`](./components/HarnessStageHeader.vue) + [`components/scenes/SceneMasDeterminista.vue`](./components/scenes/SceneMasDeterminista.vue).
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Camino II · Nivel 4 · Determinismo Estructural Completo`
  * `h1`: `Límites por función y archivo obligan a desacoplar cada entidad`
  * *Evidencia Visual (Sensación: el `mage` y el `scribe` en maestría y sincronía total):* A las barreras de `ArchUnit` y `Coverage ≥ 90%` se suma la rejilla de complejidad de `ESLint` (`max-lines: 250` por archivo y `max-lines-per-function: 35`). El haz atraviesa la rejilla y se cristaliza en **6 dominios desacoplados** (`usuario`, `mesa`, `categoria`, `plato`, `comanda`, `health`), cada uno con su `controller` (≤57 LOC), `service` y `__tests__` (16 suites en verde, `--sage`), cerrando con la señal visual para pasar a la demostración en vivo en la computadora del expositor.
* **Contexto Científico y Guion:**
  * Al acotar simultáneamente la **estructura entre capas** (`ArchUnit`), la **verificación empírica** (`Coverage ≥ 90%` + test 1:1) y la **granularidad léxica** (`max-lines: 250`, `max-lines-per-function: 35`), el espacio de soluciones válidas converge hacia una arquitectura limpia de alta cohesión y bajo acoplamiento.
  * Esta diapositiva introduce directamente la inspección en vivo de las 4 carpetas en VS Code y la ejecución de las suites de pruebas en terminal.
* **Fuentes Verificadas:**
  1. **McCabe, T. J. (1976).** *"A Complexity Measure"*. **IEEE Transactions on Software Engineering**, SE-2(4), 308–320.
  2. **Nagappan, N., Ball, T., & Zeller, A. (2006).** *"Mining Metrics to Predict Component Failures"*. **Proceedings of the 28th International Conference on Software Engineering (ICSE '06)**, ACM, pp. 452–461.
  3. **Parnas, D. L. (1972).** *"On the Criteria To Be Used in Decomposing Systems into Modules"*. **Communications of the ACM**, 15(12), 1053–1058.
  4. **Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023).** *"Reflexion: Language Agents with Verbal Reinforcement Learning"*. **Advances in Neural Information Processing Systems (NeurIPS 2023)**, Vol. 36.

---

### Slide Final — Convergencia y Créditos (`routeAlias: cierre`)
* **Identificador en [`slides.md`](./slides.md):** Diapositiva final (`class: ornate credits-slide`)
* **Comportamiento de Navegación:** Tanto la última diapositiva del Camino 1 como la última diapositiva del Camino 2 convergen directamente en esta diapositiva al avanzar, y su flecha de retroceso devuelve al expositor a la última diapositiva del camino que estuvo presentando.
