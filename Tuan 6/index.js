import { dataCity } from "./dataCity.js";
import { getCurrentDay, getNextDay } from "./util.js";
import loginPage from "./login.js";
const getAPI = async (city, currentDay, nextDay) => {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${city}&checkin=${currentDay}&checkout=${nextDay}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "70f85d6e91mshea0473cecd61522p1bd695jsn38b4fe01167a",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const renderCity = (id) => {
  const cityListElement = document.querySelector(".cityList");
  let html = "";
  for (let i = 0; i < dataCity.length; i++) {
    html += `
          <div class="cityItem ${id == dataCity[i].id ? "active" : ""}" id=${
      dataCity[i].id
    }>
              <i class="fa-solid fa-city"></i>
              <p>${dataCity[i].name}</p>
          </div>
      `;
  }
  cityListElement.innerHTML = html;
  const cityItemList = document.querySelectorAll(".cityItem");
  for (let i = 0; i < cityItemList.length; i++) {
    cityItemList[i].addEventListener("click", () => {
      let id = cityItemList[i].id;
      let nameCity = searchCityById(id);
      console.log(id);
      console.log(nameCity);
      renderCity(id);
      renderRoom(nameCity);
    });
  }
};
const renderRoom = async (city) => {
  const roomListElements = document.querySelector(".roomList");
  roomListElements.innerHTML = `
      <div style="position: relative;
      left: 261%;
      bottom: -24%;">
        <img src="./spinner.gif" class="spinner"/>
      </div>
    `;
  const data = await getAPI(city, getCurrentDay(), getNextDay());
  let html = "";
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let imageRoom = data[i].images[0]
        ? data[i].images[0]
        : "./images/default.jpg";
      let nameRoom = data[i].name;
      let rating = data[i].rating;
      let city = data[i].city;
      let currentDay = getCurrentDay();
      let nextDay = getNextDay();
      let price = data[i].price.priceItems[0].amount;
      html += `
              <div class="roomItem">
                  <img
                      src=${imageRoom}
                      alt=${nameRoom}
                  />
                  <div class="roomDetail">
                      <h4>${nameRoom}</h4>
                      <p>
                      <i class="fa-solid fa-star"></i>
                      ${rating}
                      </p>
                  </div>
                  <p class="distance">City: ${city}</p>
                  <p class="days"> ${currentDay} -  ${nextDay}</p>
                  <p class="price"><b>$${price}</b> / đêm</p>
              </div>
        `;
    }
  }
  roomListElements.innerHTML = html;
};
const searchCityById = (id) => {
  for (let i = 0; i < dataCity.length; i++) {
    if (dataCity[i].id == id) {
      return dataCity[i].name;
    }
  }
};

export const pageHome = async () => {
  const contentElement = document.querySelector(".content");
  contentElement.innerHTML = "";
  // Tạo khung cho HTML có thẻ cityList
  contentElement.innerHTML += `
                  <div class="cityList">
                  </div>
          `;
  // Tạo khung cho HTML có thẻ roomList
  contentElement.innerHTML += `
                    <div class="roomList">
        
                    </div>
                `;

  renderCity(1);
  renderRoom("Paris");
};

const app = async () => {
  pageHome();
  // loginPage();
  checkLogin();
};

app();
export function checkLogin() {
  if (localStorage.getItem("user")) {
    document.querySelector(".account").innerHTML = `
          <i class="fa-solid fa-bars"></i>
          <i class="fa-solid fa-user"></i>
          <ul>
            <li>Thông tin tài khoản</li>
            <li class="logout">Đăng xuất</li>
          </ul>
      `;

    const btnLogout = document.querySelector(".logout");
    btnLogout.addEventListener("click", () => {
      alert("Đăng xuất thành công");
      localStorage.removeItem("user");
      checkLogin();
    });
  } else {
    document.querySelector(".account").innerHTML = `
          <i class="fa-solid fa-bars"></i>
          <i class="fa-solid fa-user"></i>
          <ul>
            <li>Đăng ký</li>
            <li class="login">Đăng nhập</li>
          </ul>
      `;
    const loginBtn = document.querySelector(".login");
    loginBtn.addEventListener("click", loginPage);
  }
}
