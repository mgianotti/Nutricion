const materias = document.querySelectorAll('.materia');
let progreso = JSON.parse(localStorage.getItem('progreso-nutricion')) || {};

function actualizarEstado() {
  materias.forEach(m => {
    const id = m.dataset.id;
    const correlativas = m.dataset.correlativas.split(',').filter(Boolean);
    const habilitada = correlativas.every(c => progreso[c]);

    if (progreso[id]) m.classList.add('aprobada');
    else m.classList.remove('aprobada');

    if (!habilitada && !progreso[id]) m.classList.add('bloqueada');
    else m.classList.remove('bloqueada');
  });
}

materias.forEach(m => {
  m.addEventListener('click', () => {
    if (m.classList.contains('bloqueada')) return;
    const id = m.dataset.id;
    progreso[id] = !progreso[id];
    localStorage.setItem('progreso-nutricion', JSON.stringify(progreso));
    actualizarEstado();
  });
});

actualizarEstado();
