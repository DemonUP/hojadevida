document.addEventListener('DOMContentLoaded', () => {
    // Efecto Matrix de fondo
    const crearMatrix = () => {
        const caracteres = '01';
        const matrixContainer = document.createElement('div');
        matrixContainer.style.position = 'fixed';
        matrixContainer.style.top = '0';
        matrixContainer.style.left = '0';
        matrixContainer.style.width = '100%';
        matrixContainer.style.height = '100%';
        matrixContainer.style.pointerEvents = 'none';
        matrixContainer.style.zIndex = '-1';
        matrixContainer.style.overflow = 'hidden';
        document.body.appendChild(matrixContainer);

        const crearColumna = () => {
            const col = document.createElement('div');
            col.style.position = 'absolute';
            col.style.top = '-100px';
            col.style.left = Math.random() * 100 + '%';
            col.style.color = '#0f0';
            col.style.opacity = '0.2';
            col.style.fontFamily = 'monospace';
            col.style.fontSize = '20px';
            col.style.whiteSpace = 'nowrap';
            
            for(let i = 0; i < 30; i++) {
                const char = document.createElement('div');
                char.textContent = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                char.style.opacity = Math.random();
                col.appendChild(char);
            }
            
            matrixContainer.appendChild(col);
            
            anime({
                targets: col,
                top: '100%',
                duration: 5000 + Math.random() * 5000,
                easing: 'linear',
                complete: () => col.remove(),
                delay: Math.random() * 2000
            });
        };

        setInterval(crearColumna, 300);
    };
    crearMatrix();

    // Animación del Golem con partículas mejoradas
    const golem = document.querySelector('.imagen-perfil');
    const crearParticula = (x, y) => {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.width = '8px';
        particula.style.height = '8px';
        particula.style.background = 'radial-gradient(circle, rgba(116, 90, 73, 0.8) 20%, rgba(0,255,0,0.2) 100%)';
        particula.style.borderRadius = '50%';
        particula.style.pointerEvents = 'none';
        document.body.appendChild(particula);
        return particula;
    };

    // Animación de activación
    anime({
        targets: golem,
        scale: [0, 1],
        rotate: '2turn',
        opacity: [0, 1],
        filter: ['brightness(0) grayscale(100%)', 'brightness(1) grayscale(0%)'],
        duration: 2000,
        easing: 'easeOutElastic(1, .5)',
        begin: () => {
            const rect = golem.getBoundingClientRect();
            const centroX = rect.left + rect.width / 2;
            const centroY = rect.top + rect.height / 2;
            
            for(let i = 0; i < 50; i++) {
                const particula = crearParticula(centroX, centroY);
                anime({
                    targets: particula,
                    translateX: () => anime.random(-100, 100),
                    translateY: () => anime.random(-100, 100),
                    opacity: [1, 0],
                    scale: [1, 3],
                    duration: 1500,
                    easing: 'easeOutExpo',
                    complete: () => particula.remove()
                });
            }
        }
    });

    // Resto de las animaciones
    const elementosInteractivos = document.querySelectorAll('.habilidades span, .experiencia-item');
    
    elementosInteractivos.forEach(elemento => {
        elemento.addEventListener('mouseenter', () => {
            elemento.style.transform = 'translateY(-3px)';
            elemento.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        elemento.addEventListener('mouseleave', () => {
            elemento.style.transform = 'translateY(0)';
            elemento.style.boxShadow = 'none';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.seccion-cv').forEach((seccion) => {
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(20px)';
        seccion.style.transition = 'all 0.6s ease-out';
        observer.observe(seccion);
    });
});

// Funciones de gestión de contenido
function agregarHabilidad(tipo) {
    const habilidad = prompt("Ingrese la nueva habilidad:");
    if (habilidad) {
        const selector = tipo === 'desarrollo' ? '.fa-code' : '.fa-shield-alt';
        const columna = document.querySelector(`.habilidades-columna:has(${selector})`);
        const nuevaHabilidad = document.createElement('span');
        nuevaHabilidad.textContent = habilidad;
        
        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn-remove';
        btnRemove.innerHTML = '−';
        btnRemove.onclick = () => eliminarHabilidad(btnRemove);
        
        nuevaHabilidad.appendChild(btnRemove);
        columna.querySelector('.habilidades-lista').appendChild(nuevaHabilidad);
        actualizarAnimaciones();
    }
}

function eliminarHabilidad(boton) {
    boton.parentElement.remove();
}

function agregarExperiencia() {
    const titulo = prompt("Título del puesto:");
    const empresa = prompt("Nombre de la empresa:");
    const fecha = prompt("Fecha (Ej: 2023 - Actualidad):");
    
    if (titulo && empresa && fecha) {
        const nuevoItem = document.createElement('div');
        nuevoItem.className = 'experiencia-item';
        
        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn-remove';
        btnRemove.innerHTML = '<i class="fas fa-times"></i>';
        btnRemove.onclick = () => eliminarExperiencia(btnRemove);
        
        nuevoItem.innerHTML = `
            <div class="experiencia-header">
                <h3>${titulo}</h3>
                <span class="fecha">${fecha}</span>
            </div>
            <p class="empresa">${empresa}</p>
            <ul class="logros">
                <li>Logro 1</li>
                <li>Logro 2</li>
            </ul>
        `;
        
        nuevoItem.prepend(btnRemove);
        document.querySelector('.experiencia-container').appendChild(nuevoItem);
        actualizarAnimaciones();
    }
}

// Funciones para Educación
function agregarEducacion() {
    const titulo = prompt("Título del estudio:");
    const institucion = prompt("Nombre de la institución:");
    const fecha = prompt("Fechas (Ej: 2020 - 2024):");
    
    if (titulo && institucion && fecha) {
        const nuevoItem = document.createElement('div');
        nuevoItem.className = 'educacion-item';
        
        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn-remove';
        btnRemove.innerHTML = '<i class="fas fa-times"></i>';
        btnRemove.onclick = () => eliminarEducacion(btnRemove);
        
        nuevoItem.innerHTML = `
            <div class="educacion-header">
                <h3>${titulo}</h3>
                <span class="fecha">${fecha}</span>
            </div>
            <p class="institucion">${institucion}</p>
            <ul class="detalles">
                <li>Detalle 1</li>
                <li>Detalle 2</li>
            </ul>
        `;
        
        nuevoItem.prepend(btnRemove);
        document.querySelector('.educacion-container').appendChild(nuevoItem);
        actualizarAnimaciones();
    }
}

function eliminarEducacion(boton) {
    boton.closest('.educacion-item').remove();
}

function eliminarExperiencia(boton) {
    boton.closest('.experiencia-item').remove();
}

function actualizarAnimaciones() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.seccion-cv').forEach((seccion) => {
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(20px)';
        observer.observe(seccion);
    });
}