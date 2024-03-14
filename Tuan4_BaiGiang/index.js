const productList = document.querySelector(".productList");
const paginationElement = document.querySelector(".paginationElement");
const getData = async () => {
  const res = await fetch(
    "https://65d16bd9ab7beba3d5e455e6.mockapi.io/todolist/Pagination"
  );
  const data = await res.json();
  return data;
};
const inputSortElement = document.querySelectorAll(".inputSort");
for (let i = 0; i < inputSortElement.length; i++) {
  inputSortElement[i].addEventListener("click", function (e) {
    if (e.target.checked) {
      localStorage.setItem(e.target.value, true);
      app();
      return;
    }
    localStorage.removeItem(e.target.value);
    app();
  });
}
const sortData = async (category, array) => {
  let data = await array;
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    if (!!data[i][category] == true) {
      newData.push(data[i]);
    }
  }
  return newData;
};
const handleSort = async () => {
  let newLocal = localStorage.getItem("new");
  let saleLocal = localStorage.getItem("sale");
  let ecoLocal = localStorage.getItem("eco");
  let data = await getData();
  let dataAfterSort;
  // Mang goc
  if (newLocal == "true") {
    // Day la truong hop new
    dataAfterSort = sortData("new", data);
    if (saleLocal == "true") {
      // Day la truogn hop new,sale
      dataAfterSort = sortData("sale", dataAfterSort);
      if (ecoLocal == "true") {
        // Day la trong hop new,sale,eco
        dataAfterSort = sortData("eco", dataAfterSort);
      }
    } else {
      if (ecoLocal == "true") {
        // Day la trong hop new,eco
        dataAfterSort = sortData("eco", dataAfterSort);
      }
    }
  } else {
    // Day la truong hop theo khong theo ai ca
    dataAfterSort = data;
    if (saleLocal == "true") {
      // Day la truong hop theo sale
      dataAfterSort = sortData("sale", data);
      if (ecoLocal == "true") {
        // Day la truong hop theo sale,eco
        dataAfterSort = sortData("eco", dataAfterSort);
      }
    } else {
      if (ecoLocal == "true") {
        // Day la truong hop theo eco
        dataAfterSort = sortData("eco", dataAfterSort);
      }
    }
  }
  return dataAfterSort;
  // sortData("new", await getData());
};
const renderPage = async (currentPageNumber, productLimit, array) => {
  const data = await array;
  let startPagination = (currentPageNumber - 1) * productLimit;
  let endPagination = currentPageNumber * productLimit;
  let html = "";
  let isFound;
  for (let i = startPagination; i < endPagination; i++) {
    if (data[i]) {
      isFound = true;
      html += `
      <div class="col-lg-4 col-md-12 mb-4">
      <div class="card">
        <div
          class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
          data-mdb-ripple-color="light"
        >
          <img
            src=${data[i].image}
            class="w-100"
          />
          <a href="#!">
            <div class="mask">
              <div
                class="d-flex justify-content-start align-items-end h-100"
              >
                <h5>
                ${
                  data[i].new
                    ? `<span class="badge bg-primary ms-2">New</span>`
                    : ""
                }
                ${
                  data[i].eco
                    ? `<span class="badge bg-danger ms-2">ECO</span>`
                    : ""
                }
                  ${
                    data[i].sale
                      ? `<span class="badge bg-warning ms-2">Sale ${data[i].sale}%</span>`
                      : ""
                  }
                </h5>
              </div>
            </div>
            <div class="hover-overlay">
              <div
                class="mask"
                style="background-color: rgba(251, 251, 251, 0.15)"
              ></div>
            </div>
          </a>
        </div>
        <div class="card-body">
          <a href="" class="text-reset">
            <h5 class="card-title mb-3">${data[i].Name}</h5>
          </a>
          <a href="" class="text-reset">
            <p>Category</p>
          </a>
          <h6 class="mb-3">$${data[i].price}</h6>
        </div>
      </div>
    </div>
      
      `;
    }
  }
  if (!isFound) {
    html += `
    <img
    `;
  }
  productList.innerHTML = html;
};

const renderPaginationNumber = async (
  currentPageNumber,
  productLimit,
  array
) => {
  const data = await array;
  const paginationQuantity = Math.ceil(data.length / productLimit);

  if (paginationQuantity == 1) {
    paginationElement.innerHTML = `
        <li class="page-item active"><a class="page-link">1</a></li>
        `;
  } else {
    let html = "";
    html += `
        <li class="page-item ${currentPageNumber == 1 ? "disabled" : ""}">
            <a class="page-link" onclick="prevPage(${currentPageNumber})">Previous</a>
         </li>
        `;
    for (let i = 1; i <= paginationQuantity; i++) {
      html += `
        <li class="page-item ${currentPageNumber == i ? "active" : ""}">
        <a class="page-link" onclick="movePage(${i})">${i}</a>
      </li>
        `;
    }
    html += `
     <li class="page-item ${
       currentPageNumber == paginationQuantity ? "disabled" : ""
     }"><a class="page-link" onclick="nextPage(${currentPageNumber},${paginationQuantity})">Next</a></li>
    `;
    paginationElement.innerHTML = html;
  }
};
const movePage = (currentPage) => {
  localStorage.setItem("pageNumber", currentPage);
  app();
};

const prevPage = (currentPage) => {
  if (currentPage == 1) {
    return;
  }
  localStorage.setItem("pageNumber", --currentPage);
  app();
};
const resetLocal = () => {
  localStorage.removeItem("new");
  localStorage.removeItem("sale");
  localStorage.removeItem("eco");
};
resetLocal();
const nextPage = (currentPage, paginationQuantity) => {
  if (currentPage == paginationQuantity) {
    return;
  }
  localStorage.setItem("pageNumber", ++currentPage);
  app();
};
const app = async () => {
  let productLimit = 6;
  let dataAfterSort = await handleSort();
  if (localStorage.getItem("pageNumber")) {
    renderPage(localStorage.getItem("pageNumber"), productLimit, dataAfterSort);
    renderPaginationNumber(
      localStorage.getItem("pageNumber"),
      productLimit,
      dataAfterSort
    );
  } else {
    localStorage.setItem("pageNumber", 1);
    renderPage(localStorage.getItem("pageNumber"), productLimit, dataAfterSort);
    renderPaginationNumber(
      localStorage.getItem("pageNumber"),
      productLimit,
      dataAfterSort
    );
  }
};
app();
