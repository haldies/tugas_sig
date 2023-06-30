const graph = {
    "Sukabumi": [
        { kota: "Jakarta", jarak: 80 },
        { kota: "Bandung", jarak: 60 },
        { kota: "Bogor", jarak: 30 },
        { kota: "Cianjur", jarak: 20 },
        { kota: "Garut", jarak: 120 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 90 },
        { kota: "Purwakarta", jarak: 75 }
    ],
    "Jakarta": [
        { kota: "Sukabumi", jarak: 80 },
        { kota: "Bandung", jarak: 120 },
        { kota: "Bogor", jarak: 60 },
        { kota: "Cianjur", jarak: 100 },
        { kota: "Garut", jarak: 170 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 35 },
        { kota: "Purwakarta", jarak: 90 }
    ],
    "Bandung": [
        { kota: "Sukabumi", jarak: 60 },
        { kota: "Jakarta", jarak: 120 },
        { kota: "Bogor", jarak: 90 },
        { kota: "Cianjur", jarak: 70 },
        { kota: "Garut", jarak: 40 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 140 },
        { kota: "Purwakarta", jarak: 40 }
    ],
    "Bogor": [
        { kota: "Sukabumi", jarak: 30 },
        { kota: "Jakarta", jarak: 60 },
        { kota: "Bandung", jarak: 90 },
        { kota: "Cianjur", jarak: 50 },
        { kota: "Garut", jarak: 150 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 70 },
        { kota: "Purwakarta", jarak: 95 }
    ],
    "Cianjur": [
        { kota: "Sukabumi", jarak: 20 },
        { kota: "Jakarta", jarak: 100 },
        { kota: "Bandung", jarak: 70 },
        { kota: "Bogor", jarak: 50 },
        { kota: "Garut", jarak: 90 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 120 },
        { kota: "Purwakarta", jarak: 60 }
    ],
    "Garut": [
        { kota: "Sukabumi", jarak: 120 },
        { kota: "Jakarta", jarak: 170 },
        { kota: "Bandung", jarak: 40 },
        { kota: "Bogor", jarak: 150 },
        { kota: "Cianjur", jarak: 90 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 210 },
        { kota: "Purwakarta", jarak: 80 }
    ],
    "Jakarta Soekarno-Hatta Airport": [
        { kota: "Sukabumi", jarak: 90 },
        { kota: "Jakarta", jarak: 35 },
        { kota: "Bandung", jarak: 140 },
        { kota: "Bogor", jarak: 70 },
        { kota: "Cianjur", jarak: 120 },
        { kota: "Garut", jarak: 210 },
        { kota: "Purwakarta", jarak: 110 }
    ],
    "Purwakarta": [
        { kota: "Sukabumi", jarak: 75 },
        { kota: "Jakarta", jarak: 90 },
        { kota: "Bandung", jarak: 40 },
        { kota: "Bogor", jarak: 95 },
        { kota: "Cianjur", jarak: 60 },
        { kota: "Garut", jarak: 80 },
        { kota: "Jakarta Soekarno-Hatta Airport", jarak: 110 }
    ]
};

function dijkstra(graph, startNode, endNode) {
    // Inisialisasi nilai jarak semua kota dengan nilai tak terhingga
    const distances = {};
    for (const kota in graph) {
        distances[kota] = Infinity;
    }

    // Inisialisasi nilai jarak kota awal dengan 0
    distances[startNode] = 0;

    // Inisialisasi antrian yang akan digunakan untuk memproses node-node yang belum dikunjungi
    const queue = [startNode];

    while (queue.length > 0) {
        // Ambil kota dengan jarak terpendek dari antrian
        const current = queue.shift();

        // Periksa semua kota tetangga dan update jaraknya jika lebih pendek
        for (const neighbor of graph[current]) {
            const distance = distances[current] + neighbor.jarak;
            if (distance < distances[neighbor.kota]) {
                distances[neighbor.kota] = distance;
                queue.push(neighbor.kota);
            }
        }
    }

    // Kembalikan nilai jarak dari kota awal ke kota tujuan
    return distances[endNode];
}

function hitungTarif() {
    const asal = document.getElementById("asal").value;
    const tujuan = document.getElementById("tujuan").value;
    const jarak = dijkstra(graph, asal, tujuan);
    const tarif = jarak * 2000; // Contoh tarif per km
    const hasilElem = document.getElementById("hasil");
    hasilElem.innerHTML = `Tarif : Rp. ${tarif}`;
}