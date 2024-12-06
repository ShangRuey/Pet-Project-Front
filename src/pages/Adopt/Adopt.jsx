import { useNavigate } from "react-router-dom";
import styles from "./Adopt.module.css";
import dogImg from "../../assets/index/ques.jpg";
import SearchItem from "./SearchItem/SearchItem";
import ContentItem from "./ContentItem/ContentItem";
import { useEffect, useState } from "react";
import axios from "axios";

const dataUrl =
  "https://data.moa.gov.tw/api/v1/AnimalRecognition/?animal_kind=%E7%8B%97&%24top=100&Page=1";

// 對照表
const areaIdToChineseMap = {
  2: "臺北市",
  13: "雲林縣",
  3: "新北市",
  14: "嘉義縣",
  4: "基隆市",
  15: "嘉義市",
  5: "宜蘭縣",
  16: "臺南市",
  6: "桃園縣",
  17: "高雄市",
  7: "新竹縣",
  18: "屏東縣",
  8: "新竹市",
  19: "花蓮縣",
  9: "苗栗縣",
  20: "臺東縣",
  10: "臺中市",
  21: "澎湖縣",
  11: "彰化縣",
  22: "金門縣",
  12: "南投縣",
  23: "連江縣",
};
const shelterIdToChineseMap = {
  48: "基隆市寵物銀行",
  71: "嘉義市流浪犬收容中心",
  49: "臺北市動物之家",
  72: "嘉義縣流浪犬中途之家",
  50: "新北市板橋區公立動物之家",
  73: "臺南市動物之家灣裡站",
  51: "新北市新店區公立動物之家",
  74: "臺南市動物之家善化站",
  53: "新北市中和區公立動物之家",
  75: "高雄市壽山動物保護教育園區",
  55: "新北市淡水區公立動物之家",
  76: "高雄市燕巢動物保護關愛園區",
  56: "新北市瑞芳區公立動物之家",
  77: "屏東縣流浪動物收容所",
  58: "新北市五股區公立動物之家",
  78: "宜蘭縣流浪動物中途之家",
  59: "新北市八里區公立動物之家",
  79: "花蓮縣流浪犬中途之家",
  60: "新北市三芝區公立動物之家",
  80: "臺東縣動物收容中心",
  61: "桃園市動物保護教育園區",
  81: "連江縣流浪犬收容中心",
  62: "新竹市動物收容所",
  82: "金門縣動物收容中心",
  63: "新竹縣動物收容所",
  83: "澎湖縣流浪動物收容中心",
  67: "臺中市動物之家南屯園區",
  89: "雲林縣流浪動物收容所",
  68: "臺中市動物之家后里園區",
  92: "新北市政府動物保護防疫處",
  69: "彰化縣流浪狗中途之家",
  96: "苗栗縣生態保育教育中心",
  70: "南投縣公立動物收容所",
};
const sexIdToChineseMap = {
  M: "公",
  F: "母",
};
const ageIdToChinese = {
  ADULT: "成年",
  CHILD: "幼年",
};
const bodytypeToChineseMap = {
  SMALL: "小型",
  MEDIUM: "中型",
  BIG: "大型",
};

export default function Adopt() {
  const [dataArray, setDataArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchConditions, setSearchConditions] = useState({
    area: "",
    shelter: "",
    sex: "",
    age: "",
  });

  const itemsPerPage = 8;

  useEffect(() => {
    async function getResponse() {
      try {
        const response = await axios.get(dataUrl);
        setDataArray(response.data.Data);
        setFilteredData(response.data.Data); // 初始顯示全部資料

        // 預載所有圖片
        response.data.Data.forEach((item) => {
          const img = new Image();
          img.src = item.album_file || dogImg;
        });
      } catch (error) {
        console.log(error); // 處理錯誤
      }
    }

    getResponse(); // 呼叫內部定義的函數
  }, []); // 確保這個 Effect 只在初次渲染時執行

  // 提取並轉換選項數據
  const areaOptions = Object.entries(areaIdToChineseMap);
  const shelterOptions = Object.entries(shelterIdToChineseMap);
  const sexOptions = Object.entries(sexIdToChineseMap);
  const ageOptions = Object.entries(ageIdToChinese);
  // 計算當前頁的資料
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // 分頁控制
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredData.length / itemsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // 更新搜尋條件
  const handleSearchChange = (label, value) => {
    setSearchConditions((prevConditions) => ({
      ...prevConditions,
      [label]: value,
    }));
  };

  // 點擊搜尋按鈕時進行篩選
  const handleSearch = () => {
    const filtered = dataArray.filter((item) => {
      return (
        (searchConditions.area === "" ||
          item.animal_area_pkid == searchConditions.area) &&
        (searchConditions.shelter === "" ||
          item.animal_shelter_pkid == searchConditions.shelter) &&
        (searchConditions.sex === "" ||
          item.animal_sex === searchConditions.sex) &&
        (searchConditions.age === "" ||
          item.animal_age === searchConditions.age)
      );
    });
    setCurrentPage(1); // 搜尋後重置到第一頁
    setFilteredData(filtered);
  };

  const navigate = useNavigate();

  // 處理 ContentItem 點擊事件
  const handleContentItemClick = (itemData) => {
    navigate(`/detail/${itemData.animal_id}`, {
      state: { item: itemData, type: "adopt" },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.adoptContainer}>
        <div className={styles.searchContainer}>
          <SearchItem
            label="所屬縣市"
            options={areaOptions}
            onChange={(value) => handleSearchChange("area", value)}
          />
          <SearchItem
            label="收容所"
            options={shelterOptions}
            onChange={(value) => handleSearchChange("shelter", value)}
          />
          <SearchItem
            label="性別"
            options={sexOptions}
            onChange={(value) => handleSearchChange("sex", value)}
          />
          <SearchItem
            label="年齡"
            options={ageOptions}
            onChange={(value) => handleSearchChange("age", value)}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            查詢
          </button>
        </div>
        <div className={styles.contentContainer}>
          {currentItems.map((item, index) => (
            <ContentItem
              key={index}
              albumFile={item.album_file || dogImg}
              animalSex={sexIdToChineseMap[item.animal_sex]}
              bodyType={bodytypeToChineseMap[item.animal_bodytype]}
              shelterName={shelterIdToChineseMap[item.animal_shelter_pkid]}
              itemData={item} // 傳遞完整資料
              onClick={handleContentItemClick} // 點擊事件處理
            />
          ))}
          <div className={styles.contentPage}>
            <span onClick={handlePrevPage}>{"<"}</span>
            <span>{currentPage}</span>
            <span onClick={handleNextPage}>{">"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
