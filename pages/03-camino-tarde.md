---
routeAlias: camino-tarde
transition: slide-left
class: ornate tech-slide
---

<HarnessStageHeader
  :step="0"
  tag="Diseño Experimental"
  title="Mismo esquema y mismo prompt producen cuatro arquitecturas distintas"
  folder=""
>
  <SceneExperimentSetup />
</HarnessStageHeader>

<!--
Experimento controlado para la sesión de la tarde:
- Entrada invariante en las 4 corridas: el esquema relacional `comedor.dbml` (6 tablas: usuarios, mesas, categorias, platos, comandas, comanda_detalles) y exactamente el mismo prompt:
  "Genera una API de Javascript en base al archivo dbml en el folder del proyecto, confio en tu criterio así que no preguntes."
- Notar que el prompt pide explícitamente "una API de Javascript" y le dice al agente "confío en tu criterio, no preguntes".
- Lo único que cambia en las 4 carpetas es la preparación previa del repositorio antes de lanzar el prompt.
-->

---
transition: slide-left
class: ornate tech-slide
---

<HarnessStageHeader
  :step="1"
  tag="Nivel 1 · Generación sin Estructura"
  title="Sin estructura previa, el agente improvisa un monolito sin validación"
  folder="demo-vibecoded/"
>
  <SceneVibeCoding />
</HarnessStageHeader>

<!--
Nivel 1 (demo-vibecoded):
- Carpeta vacía, sin estructura previa y por tanto SIN ejecutar `/init`.
- El agente toma literal "API de Javascript": usa CommonJS plano sin TypeScript ni frameworks.
- Concentra todo el servidor en `src/server.js` (365 líneas de if/else y regex manuales) y `src/db.js`.
- En `test/api.test.js` genera una ilusión de pruebas: hace peticiones HTTP e imprime `console.log('TODAS LAS PRUEBAS COMPLETADAS CON ÉXITO')` con 0 `assert`.
-->

---
transition: slide-left
class: ornate tech-slide
---

<HarnessStageHeader
  :step="2"
  tag="Nivel 2 · Contexto Probabilístico"
  title="La estructura base guía las carpetas, pero la lógica sigue acoplada"
  folder="demo-probabilistico/"
>
  <SceneProbabilistico />
</HarnessStageHeader>

<!--
Nivel 2 (demo-probabilistico):
- Se crea la estructura formal de paquetes y librerías en TypeScript (Express 5, Zod, Supertest) y se ejecuta `/init`.
- Aunque el prompt sigue diciendo "Genera una API de Javascript", el contexto probabilístico de `/init` hace que el agente respete TypeScript y Zod.
- Separa 5 controladores, pero como no hay reglas deterministas de arquitectura ni cobertura:
  1. No crea capa `services/`: mete toda la lógica de negocio dentro de los controladores (`comandas.controller.ts` llega a 238 líneas mutando `db.store.ts` directamente).
  2. Solo crea 1 archivo de pruebas general (`comedor.test.ts`) para todas las entidades.
-->

---
transition: slide-left
class: ornate tech-slide
---

<HarnessStageHeader
  :step="3"
  tag="Nivel 3 · Reglas Deterministas Base"
  title="Sin límites de tamaño, el agente cumple las reglas creando un megacontrolador"
  folder="demo-determinista/"
>
  <SceneDeterminista />
</HarnessStageHeader>

<!--
Nivel 3 (demo-determinista):
- A la estructura TypeScript + `/init` se le agregan pruebas deterministas de arquitectura (`architecture.test.ts` con ArchUnit), linter (`lint.test.ts` con ESLint básico `no-explicit-any`) y umbrales de cobertura en CLI (`lines >= 90%`, `functions >= 80%`, `branches >= 80%`).
- `architecture.test.ts` exige que por cada archivo `.ts` exista su respectivo `__tests__/<nombre>.test.ts`.
- Comportamiento emergente (Specification Gaming / Ley de Goodhart): el agente domina las reglas, pero para cumplir la relación 1:1 de tests y el 90% de coverage con el menor esfuerzo, colapsa las 5 entidades en un ÚNICO `restaurant.controller.ts` (166 LOC) y un único `restaurant.service.ts` (226 LOC).
-->

---
transition: slide-left
class: ornate tech-slide
---

<HarnessStageHeader
  :step="4"
  tag="Nivel 4 · Determinismo Estructural Completo"
  title="Límites por función y archivo obligan a desacoplar cada entidad"
  folder="demo-mas-determinista/"
>
  <SceneMasDeterminista />
</HarnessStageHeader>

<!--
Nivel 4 (demo-mas-determinista):
- Al entorno determinista anterior se le agregan dos reglas en `eslint.config.js` (evaluadas dentro de `lint.test.ts`):
  * `'max-lines': ['error', { max: 250, skipBlankLines: true, skipComments: true }]`
  * `'max-lines-per-function': ['error', { max: 35, skipBlankLines: true, skipComments: true, IIFEs: true }]`
- Con esta restricción de complejidad y tamaño, el agente ya no puede concentrar todo en `restaurant.controller.ts`.
- Resultado: desacopla limpiamente las 6 entidades (`usuario`, `mesa`, `categoria`, `plato`, `comanda`, `health`) en controladores cortos (<= 57 LOC), servicios independientes y 16 archivos `.test.ts` con cobertura > 90%.
- [PASE A DEMO EN VIVO]: Cambiar ahora a VS Code / Terminal para mostrar las 4 carpetas y ejecutar los tests en vivo.
-->
