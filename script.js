// Carregar lista de palpites
fetch('./data/palpites.json')
    .then(response => response.json())
    .then(data => {
        window.palpites = data; // Salva os palpites globalmente
    })
    .catch(error => console.error('Erro ao carregar a lista de palpites:', error));

// Mostrar filtros
document.getElementById('showFilters').addEventListener('click', () => {
    document.getElementById('filters').style.display = 'block';
});

// Esconder filtros
document.getElementById('hideFilters').addEventListener('click', () => {
    document.getElementById('filters').style.display = 'none';
});

// Gerar palpites
document.getElementById('generate').addEventListener('click', () => {
    const numJogos = document.getElementById('numJogos').value;
    const oddMin = parseFloat(document.getElementById('oddMin').value);
    const oddMax = parseFloat(document.getElementById('oddMax').value);
    const chanceGreen = parseInt(document.getElementById('chanceGreen').value);

    const esportes = Array.from(document.getElementById('esportes').selectedOptions).map(opt => opt.value);
    const mercados = Array.from(document.getElementById('mercados').selectedOptions).map(opt => opt.value);

    const output = document.querySelector('#output tbody');
    output.innerHTML = '';

    const palpitesFiltrados = window.palpites.filter(palpite => {
        return (!esportes.length || esportes.includes(palpite.esporte)) &&
               (!mercados.length || mercados.includes(palpite.mercado)) &&
               palpite.odd >= oddMin &&
               palpite.odd <= oddMax &&
               palpite.chanceGreen >= chanceGreen;
    });

    for (let i = 0; i < Math.min(numJogos, palpitesFiltrados.length); i++) {
        const palpite = palpitesFiltrados[i];
        output.innerHTML += `
            <tr>
                <td>Jogo ${i + 1}</td>
                <td>${palpite.esporte}</td>
                <td>${palpite.mercado}</td>
                <td>${palpite.odd}</td>
                <td>${palpite.chanceGreen}%</td>
            </tr>
        `;
    }
});