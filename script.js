// 定義分類及其商品列表（藍色字為分類，黑色字為商品）
const categories = {
  "國歡": [
    "神經元修復液(無庫存須客訂)",
    "心錠",
    "肝錠-S",
    "利膽肝腦液",
    "泌尿錠(犬)",
    "泌尿錠(貓)",
    "腸胃錠(消化錠)",
    "Mitex",
    "益齒鋅(布)",
    "益齒康(凝膠)",
    "益齒清(噴霧)"
  ],
  "寶齡": [
    "救補血",
    "救肝心",
    "泌速通",
    "口速癒",
    "眼速明(藍)",
    "胜肽眼藥水",
    "眼速康(綠)",
    "靈活洗",
    "清爽洗髮精"
  ],
  "全能狗S": [
    "1.35-3.5KG",
    "3.5-7.5KG",
    "7.5-15KG",
    "15-30KG",
    "30-60KG"
  ],
  "一錠除(狗)": [
    "2-4.5KG",
    "4.5-10KG",
    "10-20KG",
    "20-40KG",
    "40-56KG"
  ],
  "一錠除(貓)": [
    "1.2-2.8KG",
    "2.8-6.25KG",
    "6.25-12.5KG"
  ],
  "寵特寶": [
    "口樂",
    "養氣(小)",
    "康格憶"
  ],
  "維克(需客訂)": [
    "樂泌優",
    "潔牙片"
  ],
  "免疥心(維克)": [
    "小",
    "大"
  ],
  "免操心(維克)": [
    "小狗",
    "大狗",
    "小貓",
    "大貓"
  ]
};

// DOM 載入後初始化
document.addEventListener("DOMContentLoaded", () => {
  const categoryList = document.getElementById("category-list");
  const productSection = document.getElementById("product-section");
  const categoriesContainer = document.getElementById("categories");

  // 生成分類清單
  Object.keys(categories).forEach((category) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = category;
    a.dataset.category = category;
    li.appendChild(a);
    categoryList.appendChild(li);
  });

  // 點擊分類顯示商品頁
  categoryList.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      event.preventDefault();
      const categoryName = event.target.dataset.category;
      showProductPage(categoryName);
    }
  });

  function showProductPage(categoryName) {
    categoriesContainer.style.display = "none";
    productSection.innerHTML = "";

    const backButton = document.createElement("button");
    backButton.textContent = "返回";
    backButton.className = "back-button";
    backButton.addEventListener("click", () => {
      productSection.style.display = "none";
      categoriesContainer.style.display = "block";
    });
    productSection.appendChild(backButton);

    const title = document.createElement("h2");
    title.textContent = categoryName;
    productSection.appendChild(title);

    const items = categories[categoryName];
    if (!items || items.length === 0) {
      createProductRow(categoryName);
    } else {
      items.forEach((item) => {
        createProductRow(item);
      });
    }
    productSection.style.display = "block";
  }

  function createProductRow(name) {
    const row = document.createElement("div");
    row.className = "product-row";
    const label = document.createElement("label");
    label.textContent = name;
    const input = document.createElement("input");
    input.type = "number";
    input.min = 0;

    const storedValue = localStorage.getItem(name);
    if (storedValue !== null) {
      input.value = storedValue;
    }
    input.addEventListener("change", () => {
      localStorage.setItem(name, input.value);
    });

    row.appendChild(label);
    row.appendChild(input);
    productSection.appendChild(row);
  }
});
