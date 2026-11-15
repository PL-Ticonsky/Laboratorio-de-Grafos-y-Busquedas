<p align="center">
  <img src="docs/media/portada.svg" alt="Laboratorio de Grafos y Búsquedas · Ciencias de la Computación 2" width="100%">
</p>

<p align="center">
  <strong>Simulador académico para construir grafos, practicar búsquedas y visualizar sus resultados.</strong>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencia-GPL%20v3-184b3a" alt="Licencia GPL v3"></a>
  <a href="#módulos"><img src="https://img.shields.io/badge/m%C3%A9todos-26-184b3a" alt="26 métodos"></a>
  <a href="manuales/manual-usuario.pdf"><img src="https://img.shields.io/badge/manual-PDF-775a22" alt="Manual de usuario en PDF"></a>
  <a href="docs/licencias.md"><img src="https://img.shields.io/badge/visualizaci%C3%B3n-D3%207-52675c" alt="Visualización con D3 7"></a>
</p>

<p align="center">
  <a href="#galería"><strong>Ver capturas</strong></a> ·
  <a href="#arranque-local">Iniciar el simulador</a> ·
  <a href="manuales/manual-usuario.pdf">Manual de usuario (PDF)</a> ·
  <a href="#módulos">Explorar los módulos</a>
</p>

## Galería

<table>
  <tr>
    <td width="50%"><strong>Dijkstra</strong><br>Compara el costo de un camino directo con una ruta de menor peso.</td>
    <td width="50%"><strong>Coloreado</strong><br>Observa cómo se asignan colores distintos a vértices adyacentes.</td>
  </tr>
  <tr>
    <td><img src="manuales/capturas/dijkstra.png" alt="Grafo resultante de Dijkstra" width="440"></td>
    <td><img src="manuales/capturas/coloreado.png" alt="Triángulo con tres colores de vértice" width="440"></td>
  </tr>
</table>

<details>
<summary><strong>Ver matrices e índices multinivel</strong></summary>

| Matriz de incidencia | Índice multinivel |
| --- | --- |
| Relaciona los vértices con las aristas. | Presenta los bloques y niveles calculados. |
| <img src="manuales/capturas/incidencia.png" alt="Matriz de incidencia de un grafo dirigido" width="460"> | <img src="manuales/capturas/indices.png" alt="Tabla de cálculo de un índice multinivel" width="460"> |

</details>

## Módulos

| Área | Métodos y ejercicios |
| --- | --- |
| **Búsquedas internas** | Secuencial, binaria, hash y residuos. |
| **Búsquedas externas** | Secuencial y binaria por bloques, hash externo y búsqueda dinámica. |
| **Índices** | Índices de un nivel y multinivel. |
| **Grafos** | Operaciones con uno o dos grafos, árboles, función ordinal, Bellman, Dijkstra, Floyd, matrices, conjuntos y coloreado. |

Los **26 métodos** incluyen un botón **Ejemplo** para comenzar con datos preparados. Puedes cambiar los datos, volver a ejecutar el método y guardar el ejercicio en JSON desde los módulos que ofrecen esa opción.

## Del ejercicio al resultado

Puedes partir de un ejemplo o introducir tus propios datos. El algoritmo se ejecuta en el navegador y cada módulo presenta el resultado en el formato que corresponde.

```mermaid
flowchart LR
    A["Datos propios o ejemplo"] --> B["Elige un método"]
    B --> C["Algoritmo en JavaScript"]
    C --> D["Grafo interactivo con D3"]
    C --> E["Tablas, matrices o índices"]
```

## Arranque local

Clona el repositorio y ejecuta estos comandos desde la terminal. El servidor local requiere Python 3.

```bash
git clone https://github.com/PL-Ticonsky/Laboratorio-de-Grafos-y-Busquedas.git
cd Laboratorio-de-Grafos-y-Busquedas
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre [localhost:8000](http://localhost:8000/), elige **Búsquedas** o **Grafos** y pulsa **Ejemplo** dentro de un método. Para detener el servidor, presiona **Ctrl+C** en la terminal.

El simulador usa HTML, CSS y JavaScript. Bootstrap y D3 se incluyen en el repositorio y los algoritmos se ejecutan en el navegador.

## Documentación

- **[Manual de usuario en PDF](manuales/manual-usuario.pdf)** con prácticas paso a paso y capturas.
- **[Fuente LaTeX](manuales/manual-usuario.tex)** y **[capturas del manual](manuales/capturas/)** para recompilarlo.
- **Manuales de usuario y técnico** en la pestaña **Documentación** del simulador.

Desarrollado para **Ciencias de la Computación 2**, Universidad Distrital Francisco José de Caldas.

## Licencias

- **Proyecto:** [GNU General Public License, versión 3](LICENSE).
- **Dependencias incluidas:** [avisos y licencias de terceros](docs/licencias.md).
