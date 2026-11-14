/* Los ejemplos usan las mismas operaciones que los formularios. */
(() => {
    const byId = id => document.getElementById(id);
    const click = id => byId(id).click();

    function set(id, value) {
        const field = byId(id);
        field.value = value;
        field.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function graph(vertexField, addVertex, edgePrefix, addEdge, vertices, edges) {
        vertices.forEach(vertex => {
            set(vertexField, vertex);
            click(addVertex);
        });
        edges.forEach(([start, end, weight], index) => {
            set(edgePrefix + 'Inicio', start);
            set(edgePrefix + 'Fin', end);
            if (byId(edgePrefix + 'Nombre')) set(edgePrefix + 'Nombre', 'e' + (index + 1));
            if (byId(edgePrefix + 'Peso')) set(edgePrefix + 'Peso', weight ?? 1);
            if (byId(edgePrefix + 'Direccion')) {
                byId(edgePrefix + 'Direccion').selectedIndex = 0;
            }
            click(addEdge);
        });
    }

    const path = [['A', 'B', 2], ['B', 'C', 3], ['C', 'D', 4]];
    const triangle = [['A', 'B', 2], ['B', 'C', 3], ['A', 'C', 7]];

    function single(field, button, edges, calculate = 'Operar', configure = () => {}) {
        click('btn' + button + 'Limpiar');
        configure();
        const vertices = [...new Set(edges.flatMap(([start, end]) => [start, end]))];
        graph(field + 'VerticeNombre', 'btn' + button + 'AgregarVertice',
            field + 'Arista', 'btn' + button + 'AgregarArista', vertices, edges);
        click('btn' + button + calculate);
    }

    function pair(field, button, secondEdges) {
        graph(field + 'V1Nombre', 'btn' + button + 'AgregarV1',
            field + 'A1', 'btn' + button + 'AgregarA1', ['A', 'B', 'C'], triangle.slice(0, 2));
        graph(field + 'V2Nombre', 'btn' + button + 'AgregarV2',
            field + 'A2', 'btn' + button + 'AgregarA2', ['A', 'B', 'C'], secondEdges);
        click('btn' + button + 'Operar');
    }

    function internalSearch(type) {
        cargarDatosSecuencialBinaria({
            tipo: 'secuencialBinaria', tamano: 8, digitos: 2,
            datos: ['12', '24', '38', '45', '61', '79']
        });
        set('clave' + type, '45');
        window['buscar' + type]();
    }

    function externalSearch(type) {
        limpiarTimeoutsSBExterna();
        procesarCargaCompartidaSBExterna(JSON.stringify({
            tipo: 'bloques_sb_externa', cantidadMax: 16, tamanoBloque: 4,
            cantidadBloques: 4, digitosClave: 3,
            datos: ['112', '124', '138', '145', '161', '179', '203', '218', '240']
        }), type);
        set('claveBloques' + type, '179');
        window['buscar' + type + 'Externa']();
    }

    function indices(type) {
        set('r' + type, 320);
        set('B' + type, 256);
        set('R' + type, 32);
        set('Ri' + type, 16);
        window['crear' + type]();
    }

    function waitForAnimation(isRunning) {
        return new Promise((resolve, reject) => {
            const deadline = performance.now() + 10000;
            function check() {
                if (!isRunning()) resolve();
                else if (performance.now() >= deadline) reject(new Error('La animación tardó demasiado.'));
                else setTimeout(check, 50);
            }
            check();
        });
    }

    async function animatedKeys(field, keys, insert, isRunning, search) {
        for (const key of keys) {
            set(field, key);
            insert();
            await waitForAnimation(isRunning);
        }
        set(field, keys.at(-1));
        search();
        await waitForAnimation(isRunning);
    }

    const residue = {
        digital: () => {
            reiniciarDigital();
            return animatedKeys('claveDigital', ['M', 'C', 'T'], insertarDigital,
                () => animacionDigitalEnCurso, buscarDigital);
        },
        tries: () => {
            reiniciarTries();
            return animatedKeys('claveTries', ['C', 'T', 'M'], insertarTries,
                () => animacionTriesEnCurso, buscarTries);
        },
        multiple: () => {
            set('gradoMultiple', 2);
            crearArbolMultiple();
            return animatedKeys('claveMultiple', ['C', 'M', 'T'], insertarMultiple,
                () => animacionMultipleEnCurso, buscarMultiple);
        },
        huffman: () => {
            set('palabraHuffman', 'BANANA');
            insertarHuffman();
        }
    };

    function coloringExample() {
        single('c', 'C', triangle);
    }

    const examples = {
        'secuencial': () => internalSearch('Secuencial'),
        'binaria': () => internalSearch('Binaria'),
        'hash': () => {
            set('tamanoEstructuraHash', 11);
            set('tamanoClaveHash', 3);
            if (!byId('metodoHash').value) set('metodoHash', 'modulo');
            if (!byId('metodoColision').value) set('metodoColision', 'lineal');
            inicializarEstructuraHash(true);
            return animatedKeys('claveHash', ['123', '134', '156'], insertarHash,
                () => animacionHashEnCurso, buscarHash);
        },
        'residuo': () => {
            const method = byId('metodoResiduo').value || 'digital';
            set('metodoResiduo', method);
            return residue[method]();
        },
        'secuencial-ext': () => externalSearch('Secuencial'),
        'binaria-ext': () => externalSearch('Binaria'),
        'hash-ext': () => {
            set('tamanoEstructuraHashExt', 11);
            set('tamanoClaveHashExt', 3);
            if (!byId('metodoHashExt').value) set('metodoHashExt', 'modulo');
            if (!byId('metodoColisionExt').value) set('metodoColisionExt', 'enlazada');
            inicializarEstructuraHashExterna();
            const keys = byId('metodoColisionExt').value === 'overflow'
                ? ['123', '134', '157'] : ['123', '134', '156'];
            return animatedKeys('claveHashExt', keys, insertarHashExterna,
                () => hxeAnimando, buscarHashExterna);
        },
        'dinamica': () => {
            set('cubetasDinamica', 4);
            set('registrosDinamica', 3);
            set('digitosClaveDinamica', 3);
            crearEstructuraDinamica();
            return animatedKeys('claveDinamica', ['123', '138', '156'], insertarDinamica,
                () => DIN.animEnCurso, buscarDinamica);
        },
        'unNivel': () => indices('UnNivel'),
        'multinivel': () => indices('Multinivel'),
        'ordinal': () => single('o', 'O', triangle),
        'bellman': () => single('b', 'B', triangle),
        'dijkstra': () => single('d', 'D', triangle),
        'floyd': () => single('f', 'F', triangle),
        'centro': () => single('c', 'C', path),
        'mst': () => single('m', 'M', triangle),
        'dist': () => {
            click('btnDLimpiar');
            pair('d', 'D', [['A', 'C', 4], ['C', 'B', 2]]);
        },
        'mdc': () => single('m', 'M', triangle, 'Aplicar',
            () => click(byId('matrixMode').value === 'distancias' ? 'mTabDirigidas' : 'mTabNoDirigidas')),
        'mia': () => single('mia', 'MIA', triangle, 'Aplicar',
            () => click(byId('miaTabNoDirigidas').classList.contains('active')
                ? 'miaTabNoDirigidas' : 'miaTabDirigidas')),
        'independencia': () => single('i', 'I', path),
        'dominancia': () => single('dom', 'Dom', path),
        'pareamiento': () => single('p', 'P', path),
        'vertices': coloringExample,
        'aristas': coloringExample,
        'un-grafo': () => {
            const operation = byId('unOperacion').value;
            limpiarUnGrafo();
            graph('unVerticeNombre', 'btnUnAgregarVertice', 'unArista', 'btnUnAgregarArista',
                ['A', 'B', 'C'], triangle.slice(0, 2));
            const fields = {
                fusion_vertices: { paramFusionV1: 'A', paramFusionV2: 'C' },
                adicion_vertices: { paramAddVertice: 'D' },
                eliminacion_vertice: { paramDelVertice: 'B' },
                contraccion_arista: { paramContraccionArista: 'e1' },
                adicion_arista: { paramAddAristaNombre: 'e3', paramAddAristaInicio: 'A', paramAddAristaFin: 'C' },
                eliminacion_arista: { paramDelAristaNombre: 'e1' }
            };
            Object.entries(fields[operation] || {}).forEach(([id, value]) => set(id, value));
            click('btnUnOperar');
        },
        'dos-grafos': () => {
            limpiarDosGrafos();
            pair('dos', 'Dos', [['A', 'B'], ['A', 'C']]);
        }
    };

    const tabs = [...document.querySelectorAll('.nav-pills-custom [role="tab"]')];
    const headings = new Set();
    const status = document.createElement('span');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    document.body.append(status);

    tabs.forEach(tab => {
        const panel = byId(tab.getAttribute('data-bs-target')?.slice(1)) || byId('panel-coloreado-principal');
        const heading = panel?.querySelector('.panel-header');
        const example = examples[tab.id.slice(4)];
        if (!heading || !example) return;
        if (headings.has(heading)) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-primary example-button';
        button.textContent = 'Ejemplo';
        button.title = 'Reemplaza los datos de este método y muestra un resultado de ejemplo';
        heading.append(button);
        headings.add(heading);
        button.addEventListener('click', async () => {
            if (button.disabled) return;
            button.disabled = true;
            button.textContent = 'Cargando ejemplo…';
            status.textContent = '';
            try {
                await example();
                status.textContent = 'Datos de ejemplo cargados en este método.';
            } catch (error) {
                status.textContent = 'No se pudo cargar el ejemplo.';
                console.error(error);
                button.textContent = 'Reintentar ejemplo';
            } finally {
                if (button.textContent !== 'Reintentar ejemplo') button.textContent = 'Ejemplo';
                button.disabled = false;
            }
        });
    });
})();
