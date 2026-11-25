document.addEventListener('DOMContentLoaded', function () {
    const pontoBase = [-23.61277, -46.77477];
    let latAtual = pontoBase[0];
    let lngAtual = pontoBase[1];

    // Inicializa o mapa
    const mapa = L.map('mapa').setView(pontoBase, 16);

    // Carrega o mapa do OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(mapa);

    // Força o Leaflet a recalcular o tamanho do container cinza
    setTimeout(() => {
        mapa.invalidateSize();
    }, 200);

    const iconePet = L.divIcon({
        html: '<div style="background:#0a178e; color:#ffffff; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid #ffffff; box-shadow:0 4px 10px rgba(10, 23, 142, 0.35);"><i class="fa-solid fa-paw"></i></div>',
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });

    const marcador = L.marker(pontoBase, { icon: iconePet }).addTo(mapa);
    const trajeto = L.polyline([pontoBase], {
        color: '#0a178e',
        weight: 4,
        opacity: 0.85
    }).addTo(mapa);

    window.atualizarRastreador = function (dados) {
        const novaPosicao = [dados.lat, dados.lng];
        marcador.setLatLng(novaPosicao);
        trajeto.addLatLng(novaPosicao);
        mapa.panTo(novaPosicao);

        const distanciaKm = (mapa.distance(pontoBase, novaPosicao) / 1000).toFixed(2);

        if (dados.nome) document.getElementById('pet-nome').textContent = dados.nome;
        if (dados.detalhes) document.getElementById('pet-detalhes').textContent = dados.detalhes;
        if (dados.bateria !== undefined) document.getElementById('pet-bateria').textContent = dados.bateria + '%';

        document.getElementById('pet-distancia').textContent = distanciaKm + ' km';
        document.getElementById('pet-status').textContent = 'Conectado via GPS';
    };

    let bateriaSimulada = 92;
    window.simularPassoPet = function () {
        latAtual += (Math.random() - 0.35) * 0.0008;
        lngAtual += (Math.random() - 0.35) * 0.0008;
        if (bateriaSimulada > 5) bateriaSimulada -= 1;

        atualizarRastreador({
            nome: 'Thor',
            detalhes: 'Golden Retriever • Coleira #01',
            lat: latAtual,
            lng: lngAtual,
            bateria: bateriaSimulada
        });
    };
});
