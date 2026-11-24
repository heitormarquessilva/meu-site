// Animações do site. Se o JavaScript não rodar, ou se a pessoa pediu
// "reduzir movimento" no aparelho, tudo aparece pronto, sem animação.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Busca do Google "digitando" no topo
  var q = document.querySelector('.serp .q');
  var resultados = document.querySelectorAll('.serp li');
  if (q && q.lastChild && q.lastChild.nodeType === 3) {
    var textoNo = q.lastChild;
    var frase = textoNo.textContent;
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    q.setAttribute('aria-label', frase);
    textoNo.textContent = '';
    q.appendChild(cursor);
    resultados.forEach(function (li) { li.classList.add('oculto'); });

    var i = 0;
    var digitar = setInterval(function () {
      textoNo.textContent += frase.charAt(i++);
      if (i >= frase.length) {
        clearInterval(digitar);
        resultados.forEach(function (li, n) {
          setTimeout(function () { li.classList.remove('oculto'); }, 250 + n * 220);
        });
        setTimeout(function () { cursor.remove(); }, 250 + resultados.length * 220 + 600);
      }
    }, 65);
  }

  // 2. Barras do levantamento enchendo quando aparecem na tela
  var lista = document.querySelector('.bars');
  if (!lista || !('IntersectionObserver' in window)) return;
  var barras = Array.prototype.map.call(lista.querySelectorAll('li'), function (li) {
    var f = li.querySelector('.f'), n = li.querySelector('.n');
    var valor = parseInt(n.textContent, 10);
    f.style.width = '0';
    n.textContent = '0%';
    return { f: f, n: n, valor: valor };
  });

  function animar(b) {
    b.f.style.width = b.valor + '%';
    var inicio = performance.now();
    (function passo(agora) {
      var p = Math.min(1, (agora - inicio) / 1000);
      b.n.textContent = Math.round(b.valor * (1 - Math.pow(1 - p, 3))) + '%';
      if (p < 1) requestAnimationFrame(passo);
    })(inicio);
  }

  var observador = new IntersectionObserver(function (entradas) {
    if (!entradas[0].isIntersecting) return;
    observador.disconnect();
    barras.forEach(function (b, n) { setTimeout(function () { animar(b); }, n * 110); });
  }, { threshold: 0.4 });
  observador.observe(lista);
})();
