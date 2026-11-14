(() => {
    const script = document.currentScript;
    const home = new URL('../index.html', script.src);
    const docs = new URL('documentacion/index.html', home);
    const docsCurrent = [docs.pathname, docs.pathname.replace(/index\.html$/, '')].includes(location.pathname)
        ? ' aria-current="page"' : '';
    const header = document.querySelector('.header-section');
    if (!header) return;

    const sections = [
        ['Búsquedas', 'busquedas/busquedas.html', [
            ['Búsquedas internas', 'busquedas/busquedasInternas/busquedasInternas.html', [
                ['Secuencial', 'tab-secuencial'], ['Binaria', 'tab-binaria'],
                ['Hash', 'tab-hash'], ['Por residuos', 'tab-residuo']
            ]],
            ['Búsquedas externas', 'busquedas/busquedasExternas/busquedasExternas.html', [
                ['Secuencial', 'tab-secuencial-ext'], ['Binaria', 'tab-binaria-ext'],
                ['Hash', 'tab-hash-ext'], ['Dinámica', 'tab-dinamica']
            ]],
            ['Búsquedas por índices', 'busquedas/busquedasIndices/busquedasIndices.html', [
                ['Un nivel', 'tab-unNivel'], ['Multinivel', 'tab-multinivel']
            ]]
        ]],
        ['Grafos', 'grafos/grafos.html', [
            ['Operaciones', 'grafos/operaciones/operaciones.html', [
                ['Un grafo', 'tab-un-grafo'], ['Dos grafos', 'tab-dos-grafos']
            ]],
            ['Árboles como grafos', 'grafos/arbolesComoGrafos/arbolesComoGrafos.html', [
                ['Centro o bicentro', 'tab-centro'], ['Árbol de expansión mínima', 'tab-mst'],
                ['Distancia entre dos árboles', 'tab-dist']
            ]],
            ['Algoritmos', 'grafos/algoritmos/algoritmos.html', [
                ['Función ordinal', 'tab-ordinal'], ['Bellman', 'tab-bellman'],
                ['Dijkstra', 'tab-dijkstra'], ['Floyd', 'tab-floyd']
            ]],
            ['Matrices', 'grafos/matrices/matrices.html', [
                ['Distancia y circuitos', 'tab-mdc'], ['Incidencia y adyacencia', 'tab-mia']
            ]],
            ['Conjuntos', 'grafos/conjuntos/conjuntos.html', [
                ['Independencia', 'tab-independencia'], ['Dominancia', 'tab-dominancia'],
                ['Pareamiento', 'tab-pareamiento']
            ]],
            ['Coloreado', 'grafos/coloreado/coloreado.html', [
                ['Vértices', 'tab-vertices'], ['Aristas', 'tab-aristas']
            ]]
        ]]
    ];

    function groupLinks(groups) {
        return groups.map(([label, path, methods]) => {
            const url = new URL(path, home);
            const links = methods.map(([name, id]) =>
                `<li><a class="method-link" href="${url}#${id}">${name}</a></li>`
            ).join('');
            return `<div class="method-group"><a class="method-group-title" href="${url}">${label}</a>
                <ul>${links}</ul></div>`;
        }).join('');
    }

    const nav = document.createElement('nav');
    nav.className = 'course-navigation';
    nav.setAttribute('aria-label', 'Navegación principal');
    nav.innerHTML = `
        <div class="container course-nav-row">
            <a class="course-nav-home" href="${home}">Inicio</a>
            <div class="course-nav-desktop">
                ${sections.map(([label, path, groups]) => `
                    <div class="dropdown course-dropdown">
                        <button class="course-nav-trigger dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">${label}</button>
                        <div class="dropdown-menu course-dropdown-panel">
                            <a class="course-section-link" href="${new URL(path, home)}">Ver todos los métodos de ${label.toLowerCase()}</a>
                            <div class="method-grid">${groupLinks(groups)}</div>
                        </div>
                    </div>`).join('')}
            </div>
            <div class="course-nav-compact">
                ${sections.map(([label, path]) =>
                    `<a class="course-nav-home" href="${new URL(path, home)}">${label}</a>`
                ).join('')}
            </div>
            <a class="course-nav-home" href="${docs}"${docsCurrent}>Documentación</a>
            <button class="course-nav-trigger course-menu-toggle" type="button"
                data-bs-toggle="offcanvas" data-bs-target="#course-menu" aria-controls="course-menu">
                <span aria-hidden="true">☰</span> Menú
            </button>
        </div>`;
    header.append(nav);

    const dropdowns = [...nav.querySelectorAll('.course-dropdown')];
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('button');
        const menu = bootstrap.Dropdown.getOrCreateInstance(trigger);
        dropdown.addEventListener('pointerenter', event => {
            if (event.pointerType !== 'mouse') return;
            dropdowns.filter(item => item !== dropdown).forEach(item => {
                bootstrap.Dropdown.getInstance(item.querySelector('button')).hide();
            });
            menu.show();
        });
        dropdown.addEventListener('pointerleave', event => {
            if (event.pointerType === 'mouse' && !dropdown.contains(document.activeElement)) menu.hide();
        });
    });

    document.querySelectorAll('.catalog-main a:has(.card-tema)').forEach(link => {
        const group = sections.flatMap(section => section[2]).find(([, path]) =>
            new URL(path, home).href === link.href);
        if (!group) return;
        const [label] = group;
        const card = document.createElement('section');
        card.className = 'catalog-methods';
        card.innerHTML = `<h3 class="catalog-method-title">${label}</h3>${groupLinks([group])}`;
        card.querySelector('.method-group-title').remove();
        link.replaceWith(card);
    });

    const drawer = document.createElement('aside');
    drawer.className = 'offcanvas offcanvas-end course-menu-drawer';
    drawer.id = 'course-menu';
    drawer.tabIndex = -1;
    drawer.setAttribute('aria-labelledby', 'course-menu-title');
    drawer.innerHTML = `
        <div class="offcanvas-header">
            <h2 id="course-menu-title">Métodos del simulador</h2>
            <button class="course-menu-close" type="button" data-bs-dismiss="offcanvas">Cerrar</button>
        </div>
        <div class="offcanvas-body">
            <a class="course-section-link" href="${docs}"${docsCurrent}>Documentación</a>
            ${sections.map(([label, path, groups]) => `
                <details class="course-menu-section">
                    <summary>${label}</summary>
                    <a class="course-section-link" href="${new URL(path, home)}">Ver todos los métodos de ${label.toLowerCase()}</a>
                    ${groupLinks(groups)}
                </details>`).join('')}
        </div>`;
    document.body.append(drawer);

    function selectedMethod() {
        const id = window.location.hash.slice(1);
        const tab = document.getElementById(id);
        return tab?.matches('.nav-pills-custom [role="tab"]') ? tab : null;
    }

    function activateMethod() {
        const current = selectedMethod();
        if (!current) return;
        current.click();
    }

    function updateCurrentMethod(id) {
        const current = new URL(window.location.href);
        current.hash = id;
        document.querySelectorAll('.method-link').forEach(link => {
            if (link.href === current.href) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    }

    document.querySelectorAll('.nav-pills-custom [role="tab"]').forEach(tab => {
        tab.addEventListener('click', () => {
            history.replaceState(null, '', '#' + tab.id);
            updateCurrentMethod(tab.id);
        });
        tab.addEventListener('shown.bs.tab', () => {
            history.replaceState(null, '', '#' + tab.id);
            updateCurrentMethod(tab.id);
        });
    });

    function followMethod(event) {
        const link = event.target.closest('.method-link');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const url = new URL(link.href);
        if (url.pathname !== location.pathname) return;
        event.preventDefault();
        const tab = document.getElementById(url.hash.slice(1));
        if (!tab) return;
        const dropdown = link.closest('.dropdown');
        if (dropdown) bootstrap.Dropdown.getInstance(dropdown.querySelector('button'))?.hide();
        if (drawer.classList.contains('show')) {
            drawer.addEventListener('hidden.bs.offcanvas', () => {
                tab.click();
                tab.focus();
            }, { once: true });
            bootstrap.Offcanvas.getInstance(drawer)?.hide();
        } else {
            tab.click();
            tab.focus();
        }
    }

    nav.addEventListener('click', followMethod);
    drawer.addEventListener('click', followMethod);
    window.addEventListener('hashchange', activateMethod);
    window.addEventListener('load', activateMethod, { once: true });
})();
