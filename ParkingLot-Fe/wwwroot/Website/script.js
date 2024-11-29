


//// Map initialization
//goongjs.accessToken = 'yIjIEaQWjb9xRhAcXW7T1ilJSTjmoAFl1u4XjKSH';
//const map = new goongjs.Map({
//    container: 'map',
//    style: 'https://tiles.goong.io/assets/goong_map_web.json',
//    center: [106.824964, 10.945273],
//    zoom: 13
//});


//// Resize map after modal is shown
//const mapModal = document.getElementById('mapModal');
//mapModal.addEventListener('shown.bs.modal', () => {
//    map.resize(); // Cập nhật kích thước bản đồ
//});


//// Function to get user's current location and move the map
//function getCurrentLocationAndMoveMap() {
//    if ("geolocation" in navigator) {
//        navigator.geolocation.getCurrentPosition(
//            (position) => {
//                const userLat = position.coords.latitude;
//                const userLng = position.coords.longitude;

//                // Fly the map to the user's location
//                map.flyTo({
//                    center: [userLng, userLat],
//                    zoom: 15, // Adjust zoom level for better view
//                    speed: 1.5, // Animation speed
//                    curve: 1, // Animation curve
//                });

//                console.log(`User's location: Latitude ${userLat}, Longitude ${userLng}`);
//            },
//            (error) => {
//                console.error("Error getting location: ", error);
//                alert("Không thể lấy được vị trí của bạn. Vui lòng kiểm tra cài đặt trình duyệt.");
//            }
//        );
//    } else {
//        alert("Trình duyệt của bạn không hỗ trợ chức năng định vị.");
//    }
//}

//// Add event listener to automatically get the user's location when modal is shown
//document.getElementById('mapModal').addEventListener('shown.bs.modal', () => {
//    getCurrentLocationAndMoveMap();
//});



//// Add map controls
//map.addControl(new goongjs.NavigationControl(), 'top-right');
//map.addControl(new goongjs.FullscreenControl(), 'top-right');

//// Initialize geocoder
//const geocoder = new GoongGeocoder({
//    accessToken: 'KYkkudSdfBH0NAtFwoHDGFiel5w83BaSaGgevbCW',
//    goongjs: goongjs
//});
//document.getElementById('geocoder').appendChild(geocoder.onAdd(map));



//// Sidebar toggle function
//function toggleSidebar(id) {
//    const elem = document.getElementById(id);
//    const toggleIcon = elem.querySelector('.bi');
//    const collapsed = elem.classList.contains('collapsed');

//    if (collapsed) {
//        elem.classList.remove('collapsed');
//        toggleIcon.classList.remove('bi-arrow-left');
//        toggleIcon.classList.add('bi-arrow-right');
//    } else {
//        elem.classList.add('collapsed');
//        toggleIcon.classList.remove('bi-arrow-right');
//        toggleIcon.classList.add('bi-arrow-left');
//    }
//}

//// Thêm biến để lưu marker hiện tại ở đầu file script
//let currentMarker = null;

//// Sửa lại sự kiện click vào map
//map.on('click', function (e) {
//    // Lấy tọa độ điểm được click
//    const coordinates = e.lngLat;

//    // Xóa marker cũ nếu có
//    if (currentMarker) {
//        currentMarker.remove();
//    }

//    // Tạo marker mới và lưu lại
//    currentMarker = new goongjs.Marker()
//        .setLngLat(coordinates)
//        .addTo(map);

//    // Gọi API reverse geocoding để lấy thông tin địa điểm
//    fetch(`https://rsapi.goong.io/Geocode?latlng=${coordinates.lat},${coordinates.lng}&api_key=KYkkudSdfBH0NAtFwoHDGFiel5w83BaSaGgevbCW`)
//        .then(response => response.json())
//        .then(data => {
//            if (data.results && data.results[0]) {
//                const place = data.results[0];

//                // Cập nhật thông tin trong sidebar
//                // Viết mã để lấy ảnh từ goong ở bên trên thêm vào .place-details img
//                document.querySelector('.place-title').textContent = place.formatted_address;
//                document.querySelector('.place-info span').textContent = place.formatted_address;

//                // Hiển thị sidebar
//                const sidebar = document.getElementById('left');
//                sidebar.classList.remove('collapsed');
//                const toggleIcon = sidebar.querySelector('.bi');
//                toggleIcon.classList.remove('bi-arrow-left');
//                toggleIcon.classList.add('bi-arrow-right');
//            }
//        });
//});