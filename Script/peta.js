var map = L.map('map').setView([-6.924, 106.927], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);
// Menambahkan tombol "Mengetahui Saya Ada Dimana"
var button = L.control({ position: 'topright' });
button.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'custom-button');
    div.innerHTML = '<button class="btn-map" onclick="getCurrentLocation()">Mengetahui Saya Ada Dimana</button>';
    return div;
}
button.addTo(map);

// Fungsi untuk mendapatkan lokasi pengguna
function getCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Mendapatkan koordinat lokasi pengguna
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // Menggeser (pan) map ke lokasi pengguna
            map.panTo([lat, lng]);

            // Menambahkan marker pada lokasi pengguna
            L.marker([lat, lng]).addTo(map)
                .bindPopup("Anda berada di sini.").openPopup();
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
// Tambahkan layer peta dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 28,
}).addTo(map);

// Tambahkan tombol untuk mencari dan menggeser lokasi
var geocoder = L.Control.geocoder({ position: 'topright' }).addTo(map);
geocoder.markGeocode = function (result) {
    this._map.panTo(result.center);
}

// Array data terminal
var terminals = [
    {
        name: "Terminal Jalur Sukabumi",
        address: "Jln. Lingkar Selatan, Sudajaya Hilir, Kec. Baros, Kota Sukabumi, Jawa Barat",
        latlng: [-6.950, 106.924]
    },
    {
        name: "Terminal Cikidang",
        address: " Cikidang, Kec. Cikidang, Kabupaten Sukabumi, Jawa Barat 43367",
        latlng: [-6.933, 106.921]
    },
    {
        name: "Terminal Lembur Situ",
        address: "Unnamed Road, Lembursitu, Kec. Lembursitu, Kota Sukabumi, Jawa Barat 43169",
        latlng: [-6.958, 106.891]
    },
    {
        name: "Terminal Sukaraja",
        address: "TegalPanjang, Kec. Cireunghas, Kab. Sukabumi, Jawa Barat",
        latlng: [-6.918, 106.959]
    },
    {
        name: "Terminal Cibadak",
        address: "Cibadak, Kab. Sukabumi, Jawa Barat",
        latlng: [-6.885, 106.778]
    },
    {
        name: "Terminal Minibus Bogor",
        address: "Jl, KH. Ahmad Sanusi No.13, Karang Tengah, Kec. Gunungpuyuh, Kota Sukabumi, Jawa Barat",
        latlng: [-6.912, 106.905]
    },
    {
        name: "Terminal Jubleg Sukabumi",
        address: "Asagaran, Kec. Kebonpedes, Kab. Sukabumi, Jawa Barat",
        latlng: [-6.968, 106.948]
    },
    {
        name: "Terminal Cikembang",
        address: "Cikembang Jalan Pelabuhan, Cimanggu, Kec. Cikembar, Kab. Sukabumi, Jawa Barat",
        latlng: [-6.954, 106.767]
    },
];

// Minta izin akses lokasi pengguna
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        // Dapatkan koordinat lokasi pengguna dalam format Latitude-Longitude
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Buat objek L.latLng dengan koordinat lokasi pengguna
        var origin = L.latLng(latitude, longitude);

        // Tambahkan penanda untuk setiap terminal
        terminals.forEach(function (terminal) {
            var marker = L.marker(terminal.latlng).addTo(map);
            marker.bindPopup('<b>' + terminal.name + '</b><br>' + terminal.address);

            // Tambahkan event click pada penanda
            marker.on('click', function () {
                // Koordinat tujuan
                var destination = L.latLng(terminal.latlng[0], terminal.latlng[1]);

                // Buat request ke API OpenRouteService
                fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248243ef07dccad4c8d8a3d03099b579755&start=' + origin.lng + ',' + origin.lat + '&end=' + destination.lng + ',' + destination.lat)
                    .then(response => response.json())
                    .then(data => {
                        // Tampilkan jarak dan waktu tempuh pada popup
                        marker.bindPopup('<b>' + terminal.name + '</b><br>' + terminal.address + '<br>Jarak: ' + data.features[0].properties.segments[0].distance / 1000 + ' km<br>Waktu tempuh: ' + data.features[0].properties.segments[0].duration / 60 + ' menit').openPopup();

                        // Tampilkan rute pada peta
                        var geojson = L.geoJSON(data.features[0].geometry).addTo(map);
                    })
                    .catch(error => {
                        console.log(error);
                        alert("Terjadi kesalahan saat memuat rute. Silakan coba lagi.");
                    });
            });
        });
    }, function (error) {
        console.log(error);
        alert("Untuk menggunakan fitur maps dengan lancar, kami membutuhkan izin akses lokasi Anda. Mohon izinkan akses lokasi pada perangkat Anda untuk menampilkan informasi yang akurat dan relevan dengan lokasi Anda.");
    });
} else {
    alert("Geolocation tidak didukung oleh browser Anda.");
}