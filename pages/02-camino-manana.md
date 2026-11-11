---
routeAlias: camino-manana
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="0"
  tag="Descarga Cognitiva"
  title="Delegar memoria en herramientas es normal y útil"
>
  <SceneDelegarHerramientas />
</AprendizStageHeader>

<!--
Descarga cognitiva (Cognitive Offloading): usar el entorno para reducir la demanda mental de una tarea (Risko & Gilbert, 2016).
- No es un defecto: lo hacemos todo el día. Calculadora para el cálculo, notas para la memoria, mapa para la orientación.
- Storm & Stone (2015): guardar un archivo antes de estudiar otro mejora el recuerdo del segundo; delegar libera atención.
- Pregunta al público: "¿Cuántos recuerdan de memoria el número de teléfono de un amigo?"
- Transición: delegar es útil... ¿siempre? Depende de qué delegas.
-->

---
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="0"
  tag="Descarga Cognitiva"
  title="Delegar lo que estás aprendiendo frena el aprendizaje"
>
  <SceneDelegarAprendizaje />
</AprendizStageHeader>

<!--
El matiz: el problema no es delegar, es delegar la habilidad que estás intentando construir.
- Bastani et al. (PNAS, 2025): experimento de campo con ~1 000 estudiantes de matemática de secundaria.
  * IA que responde (GPT Base): +48% en la práctica, pero −17% en el examen sin IA frente al grupo de control.
  * IA que guía (GPT Tutor, con instrucciones que dan pistas y no soluciones): +127% en la práctica y sin daño en el examen.
- Un profesional delega el código repetitivo porque ya domina el concepto; quien aprende a escribir un ciclo y lo delega, nunca forma el modelo mental.
- Mostrar de manos: "¿Quién ha entregado código que no podría explicar?"
- La diferencia no es la herramienta, es cómo la usas. Eso es lo que vamos a construir: Pensar, Preguntar, Verificar, Explicar.
-->

---
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="1"
  tag="Modelos Mentales"
  title="La IA predice texto; el modelo mental es tuyo"
>
  <SceneModeloMental />
</AprendizStageHeader>

<!--
Paso 1 · Pensar.
- Un modelo de lenguaje genera la continuación más probable del texto; no ejecuta el programa en tu lugar.
- Programar es poder simular la "máquina nocional": qué hay en memoria en cada paso (Sorva, ACM TOCE 2013). Es el objetivo de aprendizaje de los primeros cursos.
- Efecto de generación (Slamecka & Graf, 1978): lo que produces tú se recuerda mejor que lo que solo lees.
- Práctica: antes de preguntarle a la IA, escribe en papel qué esperas que pase. Luego compara.
-->

---
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="2"
  tag="Diálogo Socrático"
  title="Pide preguntas, no respuestas"
>
  <SceneSocratico />
</AprendizStageHeader>

<!--
Paso 2 · Preguntar.
- Misma IA, mismo problema, dos modos. En modo tutor la IA devuelve preguntas y tú construyes la solución.
- CodeAid (Kazemitabaar et al., CHI 2024): asistente desplegado en un curso de ~700 estudiantes que responde con pseudocódigo y pistas, no con la solución completa.
- CS50 Duck (Liu et al., SIGCSE 2024): Harvard usa un "pato" con IA con límites pedagógicos que guía en lugar de resolver.
- Plantilla para llevarse: "No me des el código. Hazme preguntas hasta que yo llegue a la solución."
-->

---
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="2"
  tag="Estructura del Problema"
  title="Estructura el problema antes de escribir el prompt"
>
  <ScenePromptEstructurado />
</AprendizStageHeader>

<!--
Paso 2 · Preguntar bien.
- Un prompt vago deja huecos y la IA los rellena con suposiciones: cada ejecución da algo distinto.
- Estructurar el problema es ingeniería, no truco: contexto, objetivo, restricciones, ejemplos y formato.
- Ejemplos dentro del prompt (Few-Shot, Brown et al., NeurIPS 2020) y pedir razonamiento paso a paso (Chain-of-Thought, Wei et al., NeurIPS 2022) mejoran la respuesta.
- Si no puedes escribir los bloques, todavía no entiendes el problema: vuelve al paso 1.
-->

---
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="3"
  tag="Verificación"
  title="Una respuesta fluida no es una respuesta correcta"
>
  <SceneVerificacion />
</AprendizStageHeader>

<!--
Paso 3 · Verificar.
- La respuesta suena segura y el código se ve limpio, pero range(1, n) omite el primer elemento: promedio([80, 90]) da 45.0.
- Kabir et al. (CHI 2024): el 52% de las respuestas de ChatGPT a 517 preguntas de Stack Overflow contenía información incorrecta; en el estudio con usuarios, el 39% de las veces no detectaron el error porque la respuesta era completa y bien redactada.
- Lee et al. (CHI 2025): más confianza en la IA se asocia con menos pensamiento crítico.
- Verificar = probar con un caso cuyo resultado conoces y leer línea por línea.
-->

---
transition: slide-left
class: ornate tech-slide
---

<AprendizStageHeader
  :step="4"
  tag="Síntesis"
  title="Si no puedes explicarlo, todavía no es tuyo"
>
  <SceneExplicar />
</AprendizStageHeader>

<!--
Paso 4 · Explicar, y el ciclo completo.
- Pensar (modelo mental propio) → Preguntar (modo tutor, problema estructurado) → Verificar (casos conocidos) → Explicar (cada línea, sin ayuda).
- Regla de trabajo: nunca entregues una línea que no puedas explicar en el pizarrón.
- Así controlas a la IA: la usas para comprender más rápido, no para dejar de pensar.
-->
