# Resolución paso a paso del grafo

## 1. Datos y convención

Se trabaja con un **grafo no dirigido, conexo y ponderado**. Los vértices son \(V=\{a,b,c,d,e\}\). Para que los resultados de la pantalla **Matrices** sean inequívocos, se asignó una etiqueta diferente a cada arista:

| Etiqueta | Extremos | Peso |
|:--|:--|--:|
| e1 | a–b | 2 |
| e2 | a–c | 4 |
| e3 | a–d | 8 |
| e4 | b–d | 2 |
| e5 | c–d | 5 |
| e6 | d–e | 7 |
| e7 | b–e | 3 |
| e8 | b–c | 7 |

Hay \(n=5\) vértices y \(m=8\) aristas. El grafo es conexo: desde **a** se llega a **b**, **c** y **d**, y desde **b** se llega a **e**. Esta comprobación es necesaria para hallar un árbol de expansión y para el cálculo de cortes que hace el aplicativo.

**Cómo se reprodujo en el aplicativo:** en la página **Árbol de expansión mínima** se ingresaron los cinco vértices y las ocho aristas con sus pesos, y se pulsó **Hallar árbol de expansión mín.** En la página **Matrices** se eligió **Aristas no dirigidas**, se ingresaron los mismos datos con las etiquetas e1…e8, y se pulsó **Calcular** después de escoger cada tipo de matriz. Las salidas indicadas abajo se comprobaron ejecutando esas pantallas.

## 2. Árbol de expansión mínima

El aplicativo usa **Kruskal**: ordena las aristas por peso creciente y agrega una arista únicamente si sus extremos estaban en componentes distintas. En un empate de pesos, la pantalla de matrices desempata por etiqueta. Con estos datos, ese desempate no cambia el árbol final.

| Paso | Arista | Peso | Operación y justificación | Componentes tras el paso |
|--:|:--|--:|:--|:--|
| 0 | — | — | Inicialmente, cada vértice forma su propia componente. | {a}, {b}, {c}, {d}, {e} |
| 1 | e1: a–b | 2 | Se agrega: conecta dos componentes distintas. | {a,b}, {c}, {d}, {e} |
| 2 | e4: b–d | 2 | Se agrega: une {a,b} con {d}. | {a,b,d}, {c}, {e} |
| 3 | e7: b–e | 3 | Se agrega: une {a,b,d} con {e}. | {a,b,d,e}, {c} |
| 4 | e2: a–c | 4 | Se agrega: incorpora el único vértice aún separado, **c**. | {a,b,c,d,e} |
| 5 | e5: c–d | 5 | Se omite: **c** y **d** ya están conectados en el árbol por c–a–b–d. | Sin cambio |
| 6 | e6: d–e | 7 | Se omite: **d** y **e** ya están conectados por d–b–e. | Sin cambio |
| 7 | e8: b–c | 7 | Se omite: **b** y **c** ya están conectados por b–a–c. | Sin cambio |
| 8 | e3: a–d | 8 | Se omite: **a** y **d** ya están conectados por a–b–d. | Sin cambio |

Tras el paso 4 ya hay cinco vértices conectados y cuatro aristas. Las últimas cuatro comprobaciones muestran por qué las aristas restantes quedan fuera del árbol. El resultado es

\[
T=\{e1,e4,e7,e2\}
 =\{a\!–\!b,\ b\!–\!d,\ b\!–\!e,\ a\!–\!c\},
\qquad w(T)=2+2+3+4=\boxed{11}.
\]

**Salida del aplicativo:** `Rango (# ramas): 4` y `Peso(T): 11`. En la pantalla del árbol, las aristas se imprimen por **peso** como `A_T={2, 2⁽²⁾, 3, 4}`; la segunda aparición de 2 corresponde a la otra arista de peso 2. La pantalla de matrices sí muestra sus etiquetas: `Ramas: {e1, e4, e7, e2}`.

### 2.1. Ramas

Las **ramas** son, por definición, las aristas que pertenecen al árbol escogido. Por tanto, son **e1 (a–b), e4 (b–d), e7 (b–e) y e2 (a–c)**. Se obtienen de los cuatro pasos «Se agrega» de Kruskal.

### 2.2. Rango

El **rango** es el número de ramas de un árbol de expansión. Como el grafo es conexo, también se verifica con \(n-1\):

\[
r(T)=|E(T)|=n-1=5-1=\boxed{4}.
\]

### 2.3. Cuerdas

Las **cuerdas** son las aristas originales que no están en \(T\). Se efectúa la diferencia de conjuntos:

\[
E(G)\setminus E(T)
=\{e1,e2,e3,e4,e5,e6,e7,e8\}\setminus\{e1,e2,e4,e7\}
=\boxed{\{e3,e5,e6,e8\}}.
\]

Corresponden a **a–d, c–d, d–e y b–c**, respectivamente. Son las cuatro aristas que Kruskal omitió porque cada una cerraba un ciclo.

### 2.4. Nulidad

La **nulidad** o dimensión del espacio de ciclos es el número de cuerdas de un grafo conexo. También se calcula como \(m-n+1\):

\[
\mu(G)=m-r(T)=8-4=\boxed{4},
\qquad m-n+1=8-5+1=4.
\]

**Salida del aplicativo:** `Nulidad (# cuerdas): 4` en la pantalla del árbol y `Cuerdas: {e3, e5, e6, e8}; Nulidad: 4` en matrices.

## 3. Circuitos

Un **circuito simple** es un recorrido cerrado que no repite vértices intermedios. Para obtenerlos se recorren las adyacencias del grafo, se cierra el camino al regresar al vértice de partida y se eliminan duplicados debidos a cambiar el punto de inicio o invertir el sentido. Los pesos **no intervienen** en la enumeración: solo importan las conexiones. El aplicativo entrega los siguientes doce circuitos, en este orden:

| Aplicativo | Recorrido cerrado que lo justifica | Aristas que muestra |
|:--|:--|:--|
| C1 | a–b–d–a | {e1, e4, e3} |
| C2 | a–b–c–a | {e1, e8, e2} |
| C3 | a–c–d–a | {e2, e5, e3} |
| C4 | b–d–c–b | {e4, e5, e8} |
| C5 | b–d–e–b | {e4, e6, e7} |
| C6 | a–b–d–c–a | {e1, e4, e5, e2} |
| C7 | a–b–e–d–a | {e1, e7, e6, e3} |
| C8 | a–b–c–d–a | {e1, e8, e5, e3} |
| C9 | a–c–b–d–a | {e2, e8, e4, e3} |
| C10 | b–e–d–c–b | {e7, e6, e5, e8} |
| C11 | a–b–e–d–c–a | {e1, e7, e6, e5, e2} |
| C12 | a–c–b–e–d–a | {e2, e8, e7, e6, e3} |

Por ejemplo, **C1** usa a–b (`e1`), b–d (`e4`) y d–a (`e3`), con lo que regresa a **a** sin repetir otro vértice. La misma comprobación de extremos se aplica a cada fila. La búsqueda exhaustiva da **5 circuitos de 3 aristas, 5 de 4 y 2 de 5**: \(5+5+2=12\). Al haber solo cinco vértices, un circuito simple no puede tener más de cinco aristas; así queda cubierta toda longitud posible.

En la **matriz de circuitos** del aplicativo, las columnas van de e1 a e8; cada fila C1…C12 coloca `1` donde aparece la arista de esa fila y `0` donde no aparece. Por ejemplo, C1 produce `1 0 1 1 0 0 0 0`. La lista anterior contiene la información necesaria para reconstruir todas las filas de esa matriz.

## 4. Circuitos fundamentales

Un **circuito fundamental** se obtiene al agregar **una sola cuerda** al árbol \(T\). Entre los extremos de esa cuerda existe un único camino dentro de \(T\); la unión de ese camino con la cuerda cierra exactamente un circuito. Se realiza la operación por cada una de las cuatro cuerdas:

| Aplicativo | Cuerda agregada | Camino único en \(T\) | Unión de aristas; recorrido |
|:--|:--|:--|:--|
| CF1 | e3: a–d | a–b–d = {e1,e4} | {e3,e1,e4}; a–d–b–a |
| CF2 | e5: c–d | c–a–b–d = {e2,e1,e4} | {e5,e2,e1,e4}; c–d–b–a–c |
| CF3 | e6: d–e | d–b–e = {e4,e7} | {e6,e4,e7}; d–e–b–d |
| CF4 | e8: b–c | b–a–c = {e1,e2} | {e8,e1,e2}; b–c–a–b |

**Salida literal en etiquetas del aplicativo:** `CF1={e3, e1, e4}`, `CF2={e5, e2, e1, e4}`, `CF3={e6, e4, e7}` y `CF4={e8, e1, e2}`. Son **cuatro** porque hay exactamente cuatro cuerdas. Estos cuatro son una base de circuitos; la sección anterior enumera **todos** los circuitos simples, que son doce.

## 5. Conjuntos de corte

Un **conjunto de corte minimal** es un conjunto de aristas cuya eliminación desconecta el grafo, pero que deja de desconectarlo si se repone cualquiera de sus aristas. Para calcularlo se toma una partición no vacía \(S\mid(V\setminus S)\) de los vértices y se recogen las aristas con un extremo en cada lado:

\[
\delta(S)=\{uv\in E(G):u\in S,\ v\notin S\}.
\]

Al quitar \(\delta(S)\), no queda ninguna conexión entre los dos lados. Si cada lado conserva conexión interna, cada arista del conjunto es necesaria para la desconexión; por eso el corte es **minimal**. Para no contar dos veces una partición y su inversa, se escribe siempre **a** en el lado izquierdo. Hay \(2^{5-1}-1=15\) particiones posibles. El aplicativo entrega estas **12** cuyo conjunto de cruce es minimal:

| Aplicativo | Partición \(S\mid V\setminus S\) | Aristas que cruzan; corte |
|:--|:--|:--|
| CC1 | abcd \| e | {e6, e7} |
| CC2 | a \| bcde | {e1, e2, e3} |
| CC3 | abde \| c | {e2, e5, e8} |
| CC4 | ac \| bde | {e1, e3, e5, e8} |
| CC5 | acd \| be | {e1, e4, e6, e8} |
| CC6 | acde \| b | {e1, e4, e7, e8} |
| CC7 | abce \| d | {e3, e4, e5, e6} |
| CC8 | abc \| de | {e3, e4, e5, e7} |
| CC9 | ad \| bce | {e1, e2, e4, e5, e6} |
| CC10 | ade \| bc | {e1, e2, e4, e5, e7} |
| CC11 | abe \| cd | {e2, e3, e4, e6, e8} |
| CC12 | ab \| cde | {e2, e3, e4, e7, e8} |

Ejemplo detallado de **CC1**: para separar **e** de {a,b,c,d}, las únicas aristas que cruzan son d–e (`e6`) y b–e (`e7`). Quitar ambas aísla **e**. Si se devuelve cualquiera de las dos, **e** vuelve a conectarse; por eso el conjunto es minimal.

Ejemplo detallado de **CC5**: se separa {a,c,d} de {b,e}. Al revisar las ocho aristas, cruzan a–b (`e1`), b–d (`e4`), d–e (`e6`) y b–c (`e8`). Las demás quedan dentro de un mismo lado. Los dos lados tienen conexión interna: a–c–d y b–e. Al reponer cualquiera de las cuatro aristas que cruzan, vuelve a existir una conexión entre los lados; el conjunto es minimal.

Las **otras tres** particiones explican por qué el resultado contiene 12 cortes y no 15:

| Partición | Aristas que cruzan | Motivo por el que no es minimal |
|:--|:--|:--|
| ae \| bcd | {e1,e2,e3,e6,e7} | Contiene el corte menor CC2={e1,e2,e3} y también CC1={e6,e7}. |
| abd \| ce | {e2,e5,e6,e7,e8} | Contiene CC3={e2,e5,e8} y CC1={e6,e7}. |
| ace \| bd | {e1,e3,e5,e6,e7,e8} | Contiene CC4={e1,e3,e5,e8} y CC1={e6,e7}. |

Así se comprueba la exhaustividad: se revisaron las 15 particiones posibles, se descartaron exactamente las tres no minimales y quedaron los **12 conjuntos de corte** que enumera el aplicativo. Su **matriz de conjuntos de corte** usa las columnas e1…e8 con `1` para una arista presente y `0` para una ausente; por ejemplo, CC1 corresponde a `0 0 0 0 0 1 1 0`.

## 6. Resumen comprobado

| Pregunta | Resultado |
|:--|:--|
| Árbol de expansión mínima | {e1,e4,e7,e2}, peso total **11** |
| Ramas | e1, e4, e7, e2 |
| Rango | **4** |
| Cuerdas | e3, e5, e6, e8 |
| Nulidad | **4** |
| Circuitos simples | **12**, enumerados en la sección 3 |
| Circuitos fundamentales | **4**, enumerados en la sección 4 |
| Conjuntos de corte minimales | **12**, enumerados en la sección 5 |

**Páginas para repetirlo:** `http://127.0.0.1:8765/grafos/arbolesComoGrafos/arbolesComoGrafos.html` y `http://127.0.0.1:8765/grafos/matrices/matrices.html`, siempre que el servidor local siga en ejecución. Los cálculos del aplicativo están implementados en `grafos/arbolesComoGrafos/arbolExpansionMinimo.js` y `grafos/matrices/matrices.js`.
