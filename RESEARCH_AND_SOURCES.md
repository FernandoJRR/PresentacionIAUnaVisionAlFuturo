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

#### Slide 02 — Evolución Histórica: 70 Años de Fundamentos Matemáticos
* **Afirmación Principal (En Slide — Texto Técnico, Cero Alegoría Escrita):**
  * `.label`: `Parte I · Evolución Histórica`
  * `h1`: `La IA no nació ayer: lleva 70 años gestándose`
  * *Evidencia Visual:* Línea de tiempo pixel-art con 3 hitos técnicos: **1950/1956** (Lógica Simbólica y Computación), **1958/1986** (Perceptrón y Backpropagation), **2017+** (Modelos Fundacionales a Gran Escala).
* **Contexto Científico y Guion:**
  * La IA no es un fenómeno repentino de los últimos tres años. Sus bases matemáticas se establecieron a mediados del siglo XX.
  * Durante décadas, la disciplina evolucionó desde la IA simbólica (reglas lógicas escritas manualmente) hacia el conexionismo (redes neuronales artificiales entrenadas mediante cálculo multivariable y optimización por descenso de gradiente).
* **Fuentes Verificadas:**
  1. **Turing, A. M. (1950).** *"Computing Machinery and Intelligence"*. **Mind**, 59(236), 433–460. Oxford University Press.
  2. **McCarthy, J., Minsky, M. L., Rochester, N., & Shannon, C. E. (1955/2006).** *"A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence"*. **AI Magazine**, 27(4), 12–14.
  3. **Rosenblatt, F. (1958).** *"The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain"*. **Psychological Review**, 65(6), 386–408. American Psychological Association.
  4. **Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986).** *"Learning representations by back-propagating errors"*. **Nature**, 323(6088), 533–536.

---

#### Slide 03 — El Salto Exponencial: Capacidad Computacional y Algoritmos Optimizados
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte I · El Salto Exponencial`
  * `h1`: `Cómputo masivo + Atención Paralela = El salto exponencial`
  * *Evidencia Visual:* Animación del `scribe` y el `mage` junto a una matriz de atención pixelada (`Self-Attention`) conectando tokens en paralelo sobre bloques de hardware GPU/TPU.
* **Contexto Científico y Guion:**
  * ¿Por qué ocurrió el salto exponencial hacia los Modelos de Lenguaje Natural (LLMs) recientemente si las redes neuronales existían desde hace décadas? Por tres pilares demostrados científicamente:
    1. **La Lección Amarga (*The Bitter Lesson*):** Rich Sutton demostró que codificar heurísticas humanas a mano tiene un techo bajo; los métodos que escalan exponencialmente son aquellos algoritmos generales que aprovechan el crecimiento masivo del cómputo.
    2. **La Arquitectura Transformer (2017):** A diferencia de las redes recurrentes (RNNs/LSTMs) que procesaban texto secuencialmente palabra por palabra, el Transformer introdujo el mecanismo matemático de **Auto-Atención ($\text{Attention}(Q,K,V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$)**, permitiendo paralelizar el entrenamiento masivamente en clústeres de GPUs.
    3. **Leyes de Escalamiento (*Scaling Laws*):** Kaplan et al. y Hoffmann et al. demostraron empíricamente que el error de predicción disminuye siguiendo una ley de potencias predecible al escalar en conjunto el cómputo ($C$), los datos ($D$) y los parámetros ($N$).
* **Fuentes Verificadas:**
  1. **Sutton, R. S. (2019).** *"The Bitter Lesson"*. **Incomplete Ideas (University of Alberta / CIFAR)**, March 13, 2019.
  2. **Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017).** *"Attention Is All You Need"*. **Advances in Neural Information Processing Systems (NeurIPS 2017)**, Vol. 30, pp. 5998–6008.
  3. **Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., ... & Amodei, D. (2020).** *"Scaling Laws for Neural Language Models"*. **arXiv:2001.08361 / OpenAI Research**.
  4. **Hoffmann, J., Borgeaud, S., Mensch, A., Buchatskaya, E., Cai, T., Rutherford, E., ... & Sifre, L. (2022).** *"Training Compute-Optimal Large Language Models"*. **Advances in Neural Information Processing Systems (NeurIPS 2022)**, Vol. 35, pp. 30016–30030.

---

### SECCIÓN II: EL PRESENTE — Integraciones en el Mundo Real
* **Sensación Visual y Animación:** Creación activa ("cocinar magia" de forma puramente visual: el caldero burbujeante y partículas enérgicas conectando el modelo con sistemas reales; energía potente pero propensa al desorden si no se controla).

#### Slide 04 — Ecosistemas Actuales: Del Modelo Aislado a la Integración en Aplicaciones
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte II · Estado Actual`
  * `h1`: `De modelos de lenguaje aislados a sistemas integrados en producción`
  * *Evidencia Visual:* Escena animada donde convergen entradas multimodales (Documentos, Audio, Código, Bases de Datos) y se distribuyen hacia arquitecturas empresariales reales.
* **Contexto Científico y Guion:**
  * Hoy la IA dejó de ser un simple chat aislado. En la industria actual conectamos los modelos fundacionales con bases de conocimiento empresariales, telefonía en tiempo real, repositorios de código y motores de análisis de datos.
* **Fuentes Verificadas:**
  1. **Bommasani, R., et al. (2021).** *"On the Opportunities and Risks of Foundation Models"*. **Stanford CRFM**, arXiv:2108.07258.
  2. **Mialon, G., et al. (2023).** *"Augmented Language Models: a Survey"*. **Transactions on Machine Learning Research (TMLR)**.

---

#### Slide 05 — Aplicaciones en QA, Chats (RAG) y Agentes de Llamadas Inbound/Outbound (STT + TTS)
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte II · Comunicación y Conocimiento`
  * `h1`: `Sistemas de QA/Chats con RAG y Agentes de Voz (STT + LLM + TTS)`
  * *Evidencia Visual:* Diagrama dual en pixel-art:
    * **Panel Izquierdo (QA y Chats):** `Consulta -> Búsqueda Vectorial (RAG) -> Respuesta Verificada`.
    * **Panel Derecho (Llamadas Inbound/Outbound):** `Voz Entrante -> STT -> Procesamiento LLM -> Síntesis TTS`.
* **Contexto Científico y Guion:**
  * **Integraciones en Aplicaciones para QA y Chats (RAG):** Mediante *Retrieval-Augmented Generation*, las aplicaciones consultan documentación técnica, bases de datos y casos de prueba en tiempo real antes de responder, reduciendo alucinaciones.
  * **Agentes de Llamadas Inbound y Outbound (STT + TTS):** Automatización de atención al cliente (inbound) y seguimiento/notificaciones (outbound) combinando reconocimiento automático de voz robusto (**STT** como Whisper), razonamiento de baja latencia y síntesis de voz neuronal (**TTS**).
* **Fuentes Verificadas:**
  1. **Lewis, P., et al. (2020).** *"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"*. **Advances in Neural Information Processing Systems (NeurIPS 2020)**, Vol. 33, pp. 9459–9474.
  2. **Radford, A., et al. (2023).** *"Robust Speech Recognition via Large-Scale Weak Supervision"*. **Proceedings of the 40th International Conference on Machine Learning (ICML 2023)**, PMLR 202:28492–28518.
  3. **Wang, C., et al. (2023).** *"Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers"*. **IEEE/ACM Transactions on Audio, Speech, and Language Processing**.

---

#### Slide 06 — Agentes de Programación, Automatización de Procesos y Minería de Datos
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte II · Código, Procesos y Datos`
  * `h1`: `Agentes de código, automatización de flujos y decisiones con minería de datos`
  * *Evidencia Visual:* Tres módulos visuales animados representando:
    1. **Agentes en Programación:** Navegación de código, edición multi-archivo y ejecución de pruebas.
    2. **Automatizaciones:** Orquestación de APIs y servicios externos (*ReAct Loop*).
    3. **Decisiones Empresariales:** Análisis estadístico, *Text-to-SQL* y minería de datos.
* **Contexto Científico y Guion:**
  * **Agentes Especializados en Código:** Integración directa en el ciclo de desarrollo de software para resolver *issues*, refactorizar módulos y generar pruebas.
  * **Automatizaciones:** Ejecución autónoma de acciones sobre sistemas empresariales mediante uso de herramientas (*Tool Use*).
  * **Decisiones Empresariales (Análisis y Minería de Datos):** Extracción de patrones, generación de consultas analíticas sobre grandes volúmenes de datos y soporte a la toma de decisiones estratégicas.
* **Fuentes Verificadas:**
  1. **Yao, S., et al. (2023).** *"ReAct: Synergizing Reasoning and Acting in Language Models"*. **International Conference on Learning Representations (ICLR 2023)**.
  2. **Jimenez, C. E., et al. (2024).** *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*. **International Conference on Learning Representations (ICLR 2024)**.
  3. **Schick, T., et al. (2023).** *"Toolformer: Language Models Can Teach Themselves to Use Tools"*. **Advances in Neural Information Processing Systems (NeurIPS 2023)**, Vol. 36.
  4. **Li, J., et al. (2023).** *"Can LLM Already Serve as A Database Interface? A BIg Bench for Large-Scale Database Grounded Text-to-SQLs (BIRD)"*. **Advances in Neural Information Processing Systems (NeurIPS 2023)**, Vol. 36.

---

### SECCIÓN III: EL FUTURO — Dirección de Orquesta, *Taste* y Dominio de Fundamentos
* **Sensación Visual y Animación:** Orden, control consciente y dirección estructurada (animaciones sincronizadas y limpias bajo el control de los personajes).

#### Slide 07 — El Ingeniero como Director de Orquesta: Buen Gusto (*Taste*), Seguridad y Fundamentos
* **Afirmación Principal (En Slide — Texto Técnico):**
  * `.label`: `Parte III · El Futuro de la Profesión`
  * `h1`: `Ser directores de orquesta: criterio técnico, seguridad y dominio de fundamentos`
  * *Evidencia Visual:* Diagrama arquitectónico donde las especificaciones humanas (**Mockups, Guías de Diseño, Contratos y Fundamentos**) dirigen y filtran la salida de múltiples agentes hacia un sistema seguro y modular.
* **Contexto Científico y Guion:**
  * El futuro del ingeniero en Ciencias y Sistemas no consiste en competir tecleando código repetitivo, sino en asumir el rol de **Director de Orquesta**:
    1. **Buen Gusto (*Engineering Taste*) al Codificar:** Saber diferenciar una buena implementación arquitectónica de una solución mediocre o frágil.
    2. **Detección Anticipada de Problemas de Seguridad y Módulos Rotos:** Identificar vulnerabilidades y acoplamientos críticos antes de que lleguen a producción. El estudio de Stanford (Perry et al.) probó que sin criterio sólido, los desarrolladores que usan asistentes de IA escriben código significativamente más inseguro mientras sufren de exceso de confianza.
    3. **Guiar a la IA con Diseños Predefinidos, Mockups y Guías Claras:** Aportar planos arquitectónicos, mockups visuales y especificaciones formales para llevar a la IA exactamente hacia la solución deseada.
    4. **Conocer a Fondo los Fundamentos y Herramientas fuera de la IA:** Para dirigir la orquesta e identificar qué módulo está roto, primero es indispensable comprender cómo funciona cada herramienta, protocolo, estructura de datos y lenguaje sin depender de la IA.
* **Fuentes Verificadas:**
  1. **Perry, N., Srivastava, M., Kumar, D., & Boneh, D. (2023).** *"Do Users Write More Insecure Code with AI Assistants?"*. **Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security (ACM CCS 2023)**, pp. 2785–2799.
  2. **Tankelevitch, L., et al. (2024).** *"The Metacognitive Demands and Opportunities of Generative AI"*. **Proceedings of the CHI Conference on Human Factors in Computing Systems (ACM CHI 2024)** (*Best Paper*).
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
