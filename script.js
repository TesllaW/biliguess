function initMap() {
    const map = L.map('map').setView([0, 0], 3);

    // 定义华为瓦片图层
    const huaweiTiles = L.tileLayer('https://maprastertile-drcn.dbankcdn.cn/display-service/v1/online-render/getTile/23.12.09.11/{z}/{x}/{y}/?language=zh&p=46&scale=2&mapType=ROADMAP&presetStyleId=standard&pattern=JPG&key=DAEDANitav6P7Q0lWzCzKkLErbrJG4kS1u%2FCpEe5ZyxW5u0nSkb40bJ%2BYAugRN03fhf0BszLS1rCrzAogRHDZkxaMrloaHPQGO6LNg==', {
        maxZoom: 19,
        attribution: 'Map data &copy; Huawei Map'
    });

    // 定义 Google 瓦片图层
    const googleTiles = L.tileLayer('https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i700449505!3m12!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0&key=AIzaSyDqRTXlnHXELLKn7645Q1L_5oc4CswKZK4', {
        maxZoom: 19,
        attribution: 'Map data &copy; Google Maps'
    });

    // 默认加载华为瓦片
    huaweiTiles.addTo(map);

    let marker;

    map.on('click', function(e) {
        const latitude = e.latlng.lat.toFixed(6);
        const longitude = e.latlng.lng.toFixed(6);
        const latLngString = `${latitude}, ${longitude}`;
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`${latitude}<br>${longitude}`).openPopup();

        navigator.clipboard.writeText(latLngString).then(() => {
            console.log(`Copied to clipboard: ${latLngString}`);
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
        });

    });

    // 切换瓦片函数
    window.changeTiles = function() {
        const selectedTile = document.getElementById('tileSelector').value;
        if (selectedTile === 'google') {
            map.removeLayer(huaweiTiles);
            googleTiles.addTo(map);
        } else {
            map.removeLayer(googleTiles);
            huaweiTiles.addTo(map);
        }
    }
}

window.onload = initMap;
