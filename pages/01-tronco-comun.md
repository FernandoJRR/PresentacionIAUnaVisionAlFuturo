---
transition: slide-left
class: ornate timeline-slide
clicks: 2
---

<script setup>
import { ERAS_BEFORE, TIMELINE_BEFORE } from '../data/timelines'
</script>

<span class="label">Parte I · Evolución Histórica</span>

# Llevas años usando IA sin llamarla así

<AiTimeline :items="TIMELINE_BEFORE" :eras="ERAS_BEFORE" :step="$clicks" cast="scribe" />

<!--
Inicio: solo la teoría (Turing 1950, Perceptrón 1958). La IA nace como pregunta matemática.
[click] Sistemas de reglas en producción: XCON configuraba pedidos de DEC (1980), DECtalk sintetizaba voz (1984, la voz de Stephen Hawking), el metro de Sendai frenaba y aceleraba con lógica difusa (1987). Backprop (1986) prepara lo siguiente.
[click] Aprendizaje automático: redes neuronales contra fraude en tarjetas (1992), LeNet leyendo cheques (1996), recomendaciones de Amazon (1998), filtros bayesianos antispam (~2002).
Cierre: "efecto IA": cuando algo funciona, deja de llamarse IA (Haenlein & Kaplan, 2019).
-->


---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="turing" field="Fundamentos teóricos" title="Turing propuso juzgar la inteligencia por la conducta">
  <SceneTuring />
</TechScene>

<!--
Turing (1950) cambia la pregunta "¿puede pensar una máquina?" por una prueba observable: un interrogador conversa por texto con dos terminales ocultas y debe decidir cuál es humana.
La pregunta y la respuesta vienen del artículo original: la máquina responde 105621 tras una pausa, un error deliberadamente humano (lo correcto es 105721).
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="perceptron" field="Fundamentos teóricos" title="Una neurona artificial pondera entradas y decide">
  <ScenePerceptron />
</TechScene>

<!--
Perceptrón (Rosenblatt, 1958): cada entrada se multiplica por un peso, se suman y si el total supera el umbral θ la salida es 1. Con pesos 0.6, 0.4 y -0.5 y θ = 0.5 la escena recorre cuatro casos.
Aprender significa ajustar esos pesos con ejemplos. Es la unidad básica de todas las redes que vienen después.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="xcon" field="Sistemas expertos" title="Reglas escritas por expertos configuraban cada pedido">
  <SceneXcon />
</TechScene>

<!--
XCON/R1 (McDermott, 1982) configuraba los pedidos de computadoras VAX de DEC. Expertos humanos escribieron miles de reglas SI → ENTONCES; el sistema las encadenaba hasta completar la configuración.
Funcionaba y ahorraba millones, pero cada caso nuevo exigía escribir reglas nuevas a mano: el límite de la IA simbólica.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="dectalk" field="Síntesis de voz" title="Reglas fonéticas convertían texto en voz sintética">
  <SceneDectalk />
</TechScene>

<!--
DECtalk (1984), basado en el trabajo de Dennis Klatt (1987): el texto se convierte en fonemas por reglas, y cada fonema en tres frecuencias de resonancia (formantes F1–F3) que se sintetizan como onda. Fue la voz de Stephen Hawking.
Guardar este hilo: en 2022 Whisper hace el camino inverso (voz → texto) y hoy ambos se combinan en agentes de voz.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="backprop" field="Fundamentos teóricos" title="El error viaja hacia atrás y ajusta los pesos">
  <SceneBackprop />
</TechScene>

<!--
Retropropagación (Rumelhart, Hinton & Williams, 1986): la red hace una predicción (oro, hacia adelante), se mide el error contra el objetivo y ese error se propaga hacia atrás (carmesí) para ajustar cada peso con descenso de gradiente.
Cada iteración baja el error. Es cálculo multivariable: la regla de la cadena aplicada capa por capa. Sigue siendo como se entrenan los modelos actuales.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="sendai" field="Control automático" title="La lógica difusa frenaba el metro con suavidad">
  <SceneSendai />
</TechScene>

<!--
Metro de Sendai, Japón (1987; Yasunobu & Miyamoto, 1985). En lugar de reglas rígidas (frenar a X metros), la lógica difusa usa grados: la distancia es "un poco media y un poco cerca" y el freno se gradúa en proporción.
Resultado: paradas más suaves y precisas que con operadores humanos y menor consumo de energía.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="fraude" field="Detección de anomalías" title="Una red neuronal detecta compras fuera de patrón">
  <SceneFraude />
</TechScene>

<!--
Detección de fraude (Ghosh & Reilly, 1994): una red neuronal aprende el patrón normal de cada tarjeta (montos, lugares, horarios) y asigna un puntaje de riesgo a cada transacción en milisegundos.
Una compra de Q 8 900 en el extranjero a las 3 a. m. rompe el patrón y se bloquea. Por eso el banco te llama o te escribe. Montos de la escena ilustrativos.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="lenet" field="Visión por computadora" title="Una red convolucional lee dígitos manuscritos">
  <SceneLeNet />
</TechScene>

<!--
LeNet (LeCun et al., 1998). Pequeños filtros de 3x3 recorren la imagen buscando trazos: horizontales, verticales, diagonales. Cada filtro produce un mapa de dónde encontró su patrón (los mapas de la escena se calculan de verdad sobre el dígito). El pooling resume esos mapas y una capa final vota entre 0 y 9.
A finales de los 90 este sistema leía una fracción importante de los cheques en EE. UU. Mismo principio que hoy reconoce rostros o lesiones en una retina.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="amazon" field="Sistemas de recomendación" title="Lo que otros compraron juntos guía la recomendación">
  <SceneAmazon />
</TechScene>

<!--
Filtrado colaborativo ítem a ítem (Linden, Smith & York, 2003). Amazon precalcula qué tan seguido se compran juntos cada par de productos. Con audífonos en el carrito, la fila de audífonos indica música y videojuegos como lo más co-comprado.
Escala a millones de clientes porque la tabla se calcula una vez, no por usuario. Valores de la escena ilustrativos.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="spam" field="Clasificación de texto" title="Cada palabra aporta evidencia para detectar spam">
  <SceneSpam />
</TechScene>

<!--
Naive Bayes (Sahami et al., 1998). El filtro aprendió, de miles de correos etiquetados, qué tan frecuente es cada palabra en spam y en correo normal. Al leer un correo nuevo multiplica esa evidencia: "hola" inclina hacia lo normal, "¡gratis!", "premio" y "clic" hacia spam. Si la probabilidad supera un umbral, va a la carpeta de spam.
Es estadística pura, sin redes neuronales, y sigue siendo una de las aplicaciones de IA más exitosas de la historia.
-->

---
transition: slide-left
class: ornate timeline-slide
clicks: 2
---

<span class="label">Parte I · El Salto Exponencial</span>

# Más cómputo y más datos desataron el salto

<ComputeChart :step="$clicks" />

<!--
Eje vertical en escala logarítmica: cada línea es un millón de veces más cómputo.
Inicio: de 1958 a 2010 el cómputo de entrenamiento se duplicaba cada ~20 meses, al ritmo de la ley de Moore (Sevilla et al., 2022).
[click] Desde 2012 (AlexNet entrenada en GPUs) se duplica cada ~6 meses. El Transformer (2017) permitió aprovechar ese cómputo en paralelo.
[click] GPT-3 (2020) y los modelos de 2023 están entre 10^23 y 10^25 operaciones. Las ideas de 1958 y 1986 eran correctas: faltaban cómputo y datos (Sutton, "The Bitter Lesson"; Kaplan et al., 2020). Valores en órdenes de magnitud aproximados.
-->

---
transition: slide-left
class: ornate timeline-slide
clicks: 2
---

<script setup>
import { ERAS_AFTER, TIMELINE_AFTER } from '../data/timelines'
</script>

<span class="label">Parte II · Adopción Masiva</span>

# Desde 2016, la IA es infraestructura

<AiTimeline :items="TIMELINE_AFTER" :eras="ERAS_AFTER" :step="$clicks" cast="mage" />

<!--
Inicio: aprendizaje profundo en productos masivos: traducción neuronal de Google (2016), Transformer (2017), primer diagnóstico autónomo autorizado por la FDA (retinopatía diabética, 2018), Night Sight: cada foto nocturna es calculada (2018).
[click] AlphaFold resuelve estructuras de proteínas (2021, Nobel 2024). Llegan los modelos fundacionales: asistentes de chat (2022) y Whisper para voz a texto (2022).
[click] GraphCast supera al pronóstico numérico (2023); ECMWF opera su modelo AIFS desde 2025. Agentes de código resolviendo issues reales (2024+).
Puente: las siguientes diapositivas muestran cómo se arman estos sistemas (RAG, voz, agentes).
-->


---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="gnmt" field="Traducción automática" title="Una representación compartida traduce entre idiomas">
  <SceneGnmt />
</TechScene>

<!--
Traducción neuronal (Johnson et al., 2017). Un codificador comprime la oración en un vector; un decodificador genera la traducción token por token. Como todos los idiomas comparten ese espacio, el sistema traduce incluso pares que nunca vio juntos (zero-shot).
En 2016 Google reemplazó su traductor estadístico por este enfoque.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="transformer" field="Fundamentos teóricos" title="La atención conecta cada palabra con su contexto">
  <SceneTransformer />
</TechScene>

<!--
Transformer (Vaswani et al., 2017). Cada token calcula cuánto debe "atender" a cada otro token: una matriz de pesos. En "Me senté en el banco del parque", la fila de "banco" atiende a "senté" y "parque", y por eso el modelo lo interpreta como asiento y no como entidad financiera.
Todo se calcula en paralelo, a diferencia de las redes recurrentes: por eso escala en GPUs. Pesos de la escena ilustrativos.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="retina" field="Diagnóstico médico" title="Un sistema autónomo detecta retinopatía diabética">
  <SceneRetina />
</TechScene>

<!--
IDx-DR (Abràmoff et al., 2018): primer sistema de diagnóstico autónomo autorizado por la FDA. Analiza la fotografía de retina por regiones, detecta lesiones (exudados, microaneurismas) y decide si el paciente debe ser referido, sin un oftalmólogo que interprete la imagen.
Importa en lugares con pocos especialistas. La imagen de la escena es procedural.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="nightsight" field="Fotografía computacional" title="Fusionar ráfagas ruidosas revela la escena nocturna">
  <SceneNightSight />
</TechScene>

<!--
Night Sight (Liba et al., 2019). El teléfono toma una ráfaga de fotos oscuras y ruidosas, las alinea (compensa el temblor de la mano) y las promedia: el ruido baja con cada cuadro fusionado. Luego un modelo ajusta color y balance.
Cada foto nocturna de un teléfono moderno es calculada, no solo capturada.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="alphafold" field="Biología estructural" title="Predecir la forma de una proteína desde su secuencia">
  <SceneAlphaFold />
</TechScene>

<!--
AlphaFold (Jumper et al., 2021). Desde la secuencia de aminoácidos, el modelo estima qué residuos quedan cerca entre sí (mapa de distancias) y lo refina en iteraciones hasta obtener la estructura 3D, con precisión cercana a la experimental.
Un problema abierto por 50 años; Premio Nobel de Química 2024. Estructura de la escena ilustrativa.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="chat" field="Procesamiento de lenguaje" title="Un modelo de lenguaje predice el siguiente token">
  <SceneChat />
</TechScene>

<!--
Un modelo de lenguaje no "busca" la respuesta: calcula una distribución de probabilidad sobre el siguiente token y elige uno; luego repite con el texto extendido. "Antigua" aparece como candidato porque fue capital: el modelo refleja patrones de sus datos, no hechos verificados.
Los asistentes de chat (Ouyang et al., 2022) agregan ajuste con retroalimentación humana (RLHF) para que esas predicciones sigan instrucciones.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="whisper" field="Reconocimiento de voz" title="Whisper transcribe voz a texto vía espectrogramas">
  <SceneWhisper />
</TechScene>

<!--
Whisper (Radford et al., 2023). El audio se convierte en un espectrograma (energía por frecuencia en el tiempo) y un transformer lo traduce a texto. Entrenado con 680 000 horas de audio, funciona con ruido, acentos y múltiples idiomas.
Cierra el hilo de voz: DECtalk (1984) iba de texto a voz; Whisper va de voz a texto.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="graphcast" field="Meteorología" title="Una red de grafos pronostica el clima global">
  <SceneGraphCast />
</TechScene>

<!--
GraphCast (Lam et al., 2023). El planeta se representa como una malla; la red pasa mensajes entre nodos vecinos y avanza el estado de la atmósfera en pasos de 6 horas, hasta 10 días. Supera al sistema numérico de referencia en la mayoría de variables y corre en un minuto.
El centro europeo (ECMWF) opera su propio modelo de IA desde 2025. Mapa de la escena ilustrativo.
-->

---
transition: slide-left
class: ornate tech-slide
---

<TechScene id="agentes" field="Ingeniería de software" title="Un agente itera: edita, prueba y corrige">
  <SceneAgentes />
</TechScene>

<!--
Agentes de código (Jimenez et al., 2024; Yao et al., 2023). El agente lee el issue, edita el código, ejecuta las pruebas, lee el error y vuelve a editar hasta que pasan; luego abre un pull request para revisión humana.
La revisión sigue siendo nuestra: las pruebas solo verifican lo que alguien decidió verificar.
-->

---
transition: slide-left
class: ornate timeline-slide
---

<span class="label">Parte II · Sistemas Actuales</span>

# Las piezas se combinan en sistemas

<SystemPipelines />

<!--
Las piezas de la línea de tiempo no se usan aisladas: se componen.
RAG (Lewis et al., 2020): la pregunta dispara una búsqueda sobre documentos propios; el modelo responde usando esos fragmentos y cita la fuente. Reduce alucinaciones porque la respuesta se apoya en datos verificables.
Agente de voz: voz → STT (Whisper, 2022) → LLM → TTS (heredero de DECtalk, 1984) → voz. Así funcionan los agentes de llamadas inbound y outbound.
-->

---
transition: slide-left
class: ornate timeline-slide
---

<span class="label">Parte II · Automatización y Datos</span>

# Agentes que actúan sobre sistemas reales

<AgentHub />

<!--
Un agente con herramientas (ReAct, Yao et al., 2023; Toolformer, Schick et al., 2023) no solo responde: llama APIs, consulta bases de datos (Text-to-SQL, Li et al., 2023), envía correos, crea tickets y genera reportes.
Es enormemente poderoso, pero mira el marcador: no todas las acciones aciertan. Sin dirección, un agente actúa con la misma confianza cuando acierta que cuando falla.
-->

---
transition: slide-left
class: ornate timeline-slide
---

<span class="label">Parte III · El Futuro de la Profesión</span>

# Nuestro rol: dirigir con criterio

<Orchestra />

<!--
Las mismas acciones dispersas de la diapositiva anterior, ahora atravesando guías: especificaciones claras, mockups y diseños, pruebas automatizadas y, sobre todo, fundamentos.
El rol del ingeniero es el de director de orquesta: buen gusto técnico para distinguir una buena implementación de una frágil, detectar fallos de seguridad antes de producción (Perry et al., 2023: quienes usan asistentes sin criterio escriben código más inseguro y confían más en él) y dominar las herramientas sin depender de la IA (Brooks, 1987: no hay bala de plata).
Y aquí el camino se divide.
-->

---
routeAlias: bifurcacion
layout: center
class: ornate
---

<PathFork />
