import { useEffect, useState, useRef, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import MainContainer from "../../layouts/MainContainer/MainContainer.jsx";
import styles from "./Map.module.css";
import { UserContext } from "../../contexts/UserContext.jsx"; // 根據你的項目結構調整這個導入路徑

// 設置自定義圖標
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const { user } = useContext(UserContext); // 獲取用戶上下文中的用戶資訊
  const [markers, setMarkers] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState([25.0329694, 121.5654177]);
  const [tempMarker, setTempMarker] = useState(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef(); // 新增 useRef 來獲取地圖實例
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch markers from backend
    axios
      .get(`${apiUrl}/markers`)
      .then((response) => setMarkers(response.data))
      .catch((error) => console.error("Error fetching markers:", error));
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (selectedMarker && user) {
      axios
        .post(
          `${apiUrl}/markers/${selectedMarker.id}/comments`,
          { comment: ` ${newComment}` }, // 附加用戶全名
          { withCredentials: true } // 確保包含 Cookies
        )
        .then((response) => {
          setMarkers(
            markers.map((marker) =>
              marker.id === selectedMarker.id ? response.data : marker
            )
          );
          setNewComment("");
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  const handleAddMarker = (e) => {
    e.preventDefault();
    const newMarker = {
      title: newTitle,
      position: tempMarker.position,
      comments: user ? [`${user.fullname}: ${newComment}`] : [newComment], // 附加用戶全名
    };
    axios
      .post(`${apiUrl}/markers`, newMarker, {
        withCredentials: true,
      }) // 確保包含 Cookies
      .then((response) => {
        setMarkers([...markers, response.data]);
        setTempMarker(null);
        setNewTitle("");
        setNewComment("");
      })
      .catch((error) => console.error("Error adding marker:", error));
  };

  const handleDeleteMarker = (markerId) => {
    axios
      .delete(`${apiUrl}/markers/${markerId}`)
      .then(() => {
        setMarkers(markers.filter((marker) => marker.id !== markerId));
      })
      .catch((error) => console.error("Error deleting marker:", error));
  };

  const handleAddressSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
          setTempMarker({
            position: [parseFloat(lat), parseFloat(lon)],
          });

          // 更新地圖視圖到新的中心點
          const map = mapRef.current;
          if (map) {
            map.flyTo([parseFloat(lat), parseFloat(lon)], 13);
          }
        } else {
          alert("找不到此地址，請嘗試輸入其他地址。");
        }
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setTempMarker({
          position: [e.latlng.lat, e.latlng.lng],
        });
      },
    });

    return null;
  };

  return (
    <MainContainer>
      <div className={styles.mapContainer}>
        <div className={styles.searchContainer}>
          <form className={styles.searchForm} onSubmit={handleAddressSearch}>
            <input
              type="text"
              className={styles.searchInput}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="輸入地址"
              required
            />
            <button type="submit" className={styles.searchButton}>
              搜尋
            </button>
          </form>
        </div>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%", position: "absolute" }}
          ref={mapRef} // 透過 useRef 獲取地圖實例
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              eventHandlers={{ click: () => setSelectedMarker(marker) }}
            >
              <Popup>
                <div className={styles.commentDiv}>
                  <h4 className={styles.commentTitle}>{marker.title}</h4>
                  {marker.comments.map((comment, index) => (
                    <>
                      <span key={index} className={styles.commentSpan}>
                        {comment}
                      </span>
                      <br />
                    </>
                  ))}
                  <form
                    className={styles.commentForm}
                    onSubmit={handleAddComment}
                  >
                    <textarea
                      className={styles.comment}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="留言..."
                      required
                    />
                    <button type="submit" className={styles.commentSend}>
                      送出
                    </button>
                  </form>
                  <button
                    className={styles.commentDelete}
                    onClick={() => handleDeleteMarker(marker.id)}
                  >
                    刪除
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          {tempMarker && (
            <Marker position={tempMarker.position}>
              <Popup>
                <div>
                  <form className={styles.markForm} onSubmit={handleAddMarker}>
                    <input
                      type="text"
                      className={styles.markInput}
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="名稱"
                      required
                    />
                    <button type="submit" className={styles.markButton}>
                      確認新增
                    </button>
                  </form>
                </div>
              </Popup>
            </Marker>
          )}
          <LocationMarker />
        </MapContainer>
      </div>
    </MainContainer>
  );
};

export default Map;
