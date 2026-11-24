// Formulário de orçamento: monta a mensagem e abre o WhatsApp.
// Nenhum dado é guardado no site.
(function () {
  var form = document.getElementById('orc');
  if (!form) return;
  var erro = document.getElementById('orc-erro');
  var WHATS = '5531983663689';

  form.addEventListener('input', function () { erro.textContent = ''; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = form.nome.value.trim();
    var negocio = form.negocio.value.trim();
    var tipo = form.tipo.value;
    var obs = form.obs.value.trim();
    var itens = Array.prototype.slice.call(form.querySelectorAll('input[name=itens]:checked'))
      .map(function (c) { return c.value; });

    if (!nome) { erro.textContent = 'Escreva seu nome.'; form.nome.focus(); return; }
    if (!tipo) { erro.textContent = 'Escolha o tipo de negócio.'; form.tipo.focus(); return; }

    var msg = 'Olá Heitor! Sou ' + nome + (negocio ? ', do ' + negocio : '') + '.\n' +
      'Tipo de negócio: ' + tipo;
    if (itens.length) msg += '\nPreciso de: ' + itens.join(', ');
    if (obs) msg += '\nObservação: ' + obs;
    msg += '\nQuero um orçamento para o meu site.';

    window.open('https://wa.me/' + WHATS + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();
