let container = document.createElement("div");
container.classList.add("container");

let headerContainer = document.createElement("div");
headerContainer.classList.add("header-container");

let tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");

let title = document.createElement("h1");
title.classList.add("title_item");
title.textContent = "Чек покупки";
headerContainer.append(title);

let productObject = [
  // {
  //   name: "Пельмени",
  //   qt: 1,
  //   price: 455,
  // },
  // {
  //   name: "Масло",
  //   qt: 1,
  //   price: 120,
  // },
  // {
  //   name: "Сметана",
  //   qt: 3,
  //   price: 55,
  // },
  // {
  //   name: "Молоко",
  //   qt: 2,
  //   price: 47,
  // },
];

productObject = JSON.parse(localStorage.getItem("productList")) || [];

// if (productObject === null) {
//   productObject = [];
// }

console.log(productObject);

function getInput(text, type) {
  let input = document.createElement("input");
  input.classList.add("input-item");
  input.placeholder = text;
  input.type = type;
  headerContainer.append(input);
  return input;
}

function getBtn(name) {
  let btn = document.createElement("button");
  btn.classList.add("btn_item");
  btn.textContent = name;

  headerContainer.append(btn);
  return btn;
}

let nameInput = getInput("Наименование товара", "text");
nameInput.autocomplete = "off";
let qtInput = getInput("Кол-во товара ", "number");
let priceInput = getInput("Цена", "number");
let addBtn = getBtn("Добавить");
addBtn.classList.add("addbtn-item");

function getThItem() {
  let th = document.createElement("th");
  th.classList.add("th-item");
  return th;
}
function getTdItem() {
  let td = document.createElement("td");
  td.classList.add("td-item");
  return td;
}
function getTrItem() {
  let tr = document.createElement("tr");
  tr.classList.add("tr-item");
  return tr;
}
// Модалка на добавить

let modalAddAlert = document.createElement("div");
modalAddAlert.classList.add("modal-add-alert");

let modalAlertImg = document.createElement("img");
modalAlertImg.classList.add("modal-alert-img");
modalAlertImg.src = "img/1.svg";

let modalTitleAlert = document.createElement("div");
modalTitleAlert.classList.add("modal-title-alert");
modalTitleAlert.textContent = "Добавьте данные товара!";

let modalBtnCancelAlert = document.createElement("button");
modalBtnCancelAlert.classList.add("modal-btn-cancel-alert", "btn_item");
modalBtnCancelAlert.textContent = "Понятно";

modalBtnCancelAlert.addEventListener("click", function () {
  modalAddAlert.classList.remove("open");
});
modalAddAlert.append(modalAlertImg, modalTitleAlert, modalBtnCancelAlert);

// Функция на модалку
function getModal(text, placeholder, type) {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("modal-open");
  modal.id = "modal";

  let modalImg = document.createElement("img");
  modalImg.classList.add("modal-alert-img");
  modalImg.src = "img/question.svg";

  let modalTitle = document.createElement("div");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = text;

  let modalBtnClose = document.createElement("button");
  modalBtnClose.classList.add("modal-btn-close", "btn_item");
  modalBtnClose.textContent = "x";

  let modalBtnCancel = document.createElement("button");
  modalBtnCancel.classList.add("modal-btn-cancel", "btn_item");
  modalBtnCancel.textContent = "Отмена";

  let modalInp = document.createElement("input");
  modalInp.id = "inputId";
  modalInp.type = type;
  modalInp.classList.add("modal-input");
  modalInp.placeholder = placeholder;

  let modalSpan = document.createElement("span");
  modalSpan.id = "spanId";
  modalSpan.classList.add("modal-span");

  let modalBtnSave = document.createElement("button");
  modalBtnSave.classList.add("modal-btn-save", "btn_item", "addBtn-item2");
  modalBtnSave.id = "btnOkId";
  modalBtnSave.textContent = "Сохранить";

  // Кнопка Закрыть и Отмена
  modalBtnClose.addEventListener("click", function () {
    let xxx = document.getElementById("modal");
    xxx.remove();
    render(productObject);
  });

  modalBtnCancel.onclick = function () {
    let xxx = document.getElementById("modal");
    xxx.remove();
    render(productObject);
  };

  modal.append(
    modalImg,
    modalTitle,
    modalBtnClose,
    modalInp,
    modalSpan,
    modalBtnSave,
    modalBtnCancel
  );
  return modal;
}
container.append(modalAddAlert);
///////////////////////

// Верстка таблицы
function getTable() {
  let table = document.createElement("table");
  table.classList.add("table-item");
  let tHead = document.createElement("thead");
  let tBody = document.createElement("tbody");
  tBody.classList.add("tbody-item");

  let tr = getTrItem();

  let th0 = getThItem();
  th0.classList.add("number-item");
  th0.textContent = "#";
  let th1 = getThItem();
  th1.textContent = "Наименование товара";
  th1.classList.add("th1-item");
  let th2 = getThItem();
  th2.textContent = "Кол-во";
  th2.classList.add("th2-item");
  let th3 = getThItem();
  th3.classList.add("th3-item");
  th3.textContent = "Цена";
  let th4 = getThItem();
  th4.textContent = "Общая стоимость";
  th4.classList.add("th4-item");
  let th5 = getThItem();

  let tFoot = document.createElement("tfoot");
  table.append(tHead, tFoot, tBody);
  tHead.append(tr);
  tr.append(th0, th1, th2, th3, th4, th5);
  tableContainer.append(table);

  return tBody;
}

let userTable = getTable();

// Добавление строки в таблицу
function getTr(object, index) {
  let tableString = getTrItem();
  tableString.classList.add("tableString-item");

  let stringNum = getTdItem();
  stringNum.textContent = index + 1;

  let stringName = getTdItem();
  stringName.textContent = object.name;

  let stringQt = getTdItem();
  stringQt.textContent = object.qt;

  let stringPrice = getTdItem();
  stringPrice.textContent = object.price;

  let stringTotalPrice = getTdItem();
  stringTotalPrice.setAttribute("id", 1);
  stringTotalPrice.classList.add("total-price-td");

  let totalPriceProduct = stringQt.textContent * stringPrice.textContent;
  stringTotalPrice.textContent = totalPriceProduct;

  let editBtnName = getBtn("изменить");
  editBtnName.classList.add("edit-btn");

  let editBtnQt = getBtn("изменить");
  editBtnQt.classList.add("edit-btn");

  let editBtnPrice = getBtn("изменить");
  editBtnPrice.classList.add("edit-btn");

  /////////////////////////////////

  // Изменить название
  editBtnName.onclick = function (event) {
    event._isclick = true;
    let modalWindow = getModal(
      "Изменить название товара?",
      "Новое название",
      "text"
    );
    container.append(modalWindow);
    let modalBtnSave = document.getElementById("btnOkId"); // Кнопка OK
    let modalBtnImp = document.getElementById("inputId");
    let modalspan = document.getElementById("spanId");
    modalBtnImp.value = "";
    modalBtnSave.addEventListener("click", function () {
      console.log("dgdf");
      if (modalBtnImp.value == "") {
        modalspan.textContent = "Введите название товара";
      } else {
        object.name = modalBtnImp.value;
        modalWindow.remove();
        render(productObject);
      }
    });
  };

  // Изменить кол-во
  editBtnQt.onclick = function (event) {
    event._isclick = true;
    let modalWindow = getModal("Введите кол-во", "Количество товара", "number");
    container.append(modalWindow);
    let modalBtnSave = document.getElementById("btnOkId");
    let modalBtnImp = document.getElementById("inputId");
    let modalspan = document.getElementById("spanId");
    modalBtnImp.value = "";
    modalBtnSave.addEventListener("click", function () {
      console.log("dgdf");
      if (modalBtnImp.value == "") {
        modalspan.textContent = "Введите количество!";
      } else {
        object.qt = modalBtnImp.value;
        modalWindow.remove();
        render(productObject);
      }
    });
  };

  // Изменить цену
  editBtnPrice.onclick = function (event) {
    event._isclick = true;
    let modalWindow = getModal("Обновим цену?", "Новая цена", "number");
    container.append(modalWindow);
    let modalBtnSave = document.getElementById("btnOkId");
    let modalBtnImp = document.getElementById("inputId");
    let modalspan = document.getElementById("spanId");
    modalBtnImp.value = "";
    modalBtnSave.addEventListener("click", function () {
      console.log("dgdf");
      if (modalBtnImp.value == "") {
        modalspan.textContent = "Нужно заполнить поле";
      } else {
        object.price = modalBtnImp.value;
        modalWindow.remove();
        render(productObject);
      }
    });
  };

  // Кнопка удалить
  let stringRemoveBtn = getTdItem();
  let removeBtn = getBtn("Удалить");
  removeBtn.classList.add("del-btn");

  removeBtn.onclick = function () {
    productObject.splice(index, 1);
    render(productObject);
  };

  stringRemoveBtn.append(removeBtn);
  stringName.append(editBtnName);
  stringPrice.append(editBtnPrice);
  stringQt.append(editBtnQt);
  tableString.append(
    stringNum,
    stringName,
    stringQt,
    stringPrice,
    stringTotalPrice,
    stringRemoveBtn
  );

  return tableString;
}

// Кнопка добавить
addBtn.classList.add("addBtn-item2");
addBtn.onclick = function (event) {
  event._isclickAlert = true;
  if (
    nameInput.value === "" ||
    qtInput.value === "" ||
    priceInput.value === ""
  ) {
    modalAddAlert.classList.add("open");
  } else {
    let newProduct = {
      name: nameInput.value,
      qt: qtInput.value,
      price: priceInput.value,
    };

    productObject.push(newProduct);

    render(productObject);
    nameInput.value = "";
    qtInput.value = "";
    priceInput.value = "";
  }
};

let footerBlock = document.createElement("div");
footerBlock.classList.add("footerBlock-item");

let footerSpan = document.createElement("span");
footerSpan.classList.add("span-title");
footerSpan.textContent = "Итоговая стоимость:";

let footerSpanTotal = document.createElement("span");
footerSpanTotal.classList.add("span-total");
footerSpanTotal.textContent = "число:";

tableContainer.append(footerBlock);
footerBlock.append(footerSpan, footerSpanTotal);
container.append(headerContainer, tableContainer);
document.body.append(container);

console.log(productObject.length);

function render(productObject) {
  userTable.innerHTML = "";

  let totalPrice = 0;

  localStorage.setItem("productList", JSON.stringify(productObject));

  for (let i = 0; i < productObject.length; i++) {
    let productItem = getTr(productObject[i], i);
    userTable.append(productItem);

    totalPrice = totalPrice + productObject[i].qt * productObject[i].price;
  }

  footerSpanTotal.textContent = `${totalPrice} руб.`;

  if (productObject.length < 1) {
    footerSpan.textContent = "Добавьте товары в чек";
    footerSpan.classList.add("footer-empty");
    footerBlock.classList.add("footerBlock-item-empty");

    footerSpanTotal.textContent = "";
  }
  if (productObject.length > 0) {
    footerSpan.textContent = "Итоговая стоимость:";
    footerBlock.classList.remove("footerBlock-item-empty");
  }
}

render(productObject);

/////////////

function getTotalProduct(productObject) {
  let summ = 0;
  for (i = 0; i < productObject.length; i++) {
    let t = productObject[i].qt * productObject[i].price;
    summ = summ + t;
  }

  return summ;
}

// Клик вне блока для модалки Добавить
document.body.addEventListener("click", function (event) {
  if (
    event._isclickAlert === true ||
    event.target.classList.contains("modal-add-alert") === true ||
    event.target.classList.contains("modal-alert-img") === true ||
    event.target.classList.contains("modal-title-alert") === true
  )
    return;

  modalAddAlert.classList.remove("open");
});

// клик вне блока для Закрыть
document.body.addEventListener("click", function (event) {
  console.log(event);
  let sss = document.getElementById("modal");
  if (
    event._isclick === true ||
    event.target.classList.contains("modal") === true ||
    event.target.classList.contains("modal-title") === true ||
    event.target.classList.contains("modal-input") === true ||
    event.target.classList.contains("modal-span") === true ||
    event.target.classList.contains("modal-btn-cancel") === true ||
    event.target.classList.contains("modal-btn-save") === true ||
    sss == undefined
  )
    return;

  sss.remove();
});
