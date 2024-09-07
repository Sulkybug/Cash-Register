let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cash = document.getElementById("cash");
const purshase = document.getElementById("purchase-btn");
const change = document.getElementById("change-due");
const priceScreen = document.getElementById("priceScreen");
const drawer = document.getElementById("changeInDrawer");
priceScreen.textContent = `Total: ${price}`;

let denominations = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

const checkCashRegister = () => {
  const inputCash = Number(cash.value);
  let changeDue = inputCash - price;
  const totalCid = cid.reduce((acc, num) => num[1] + acc, 0);

  if (inputCash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (inputCash === price) {
    change.textContent = "No change due - customer paid with exact cash";
  } else if (changeDue > totalCid) {
    change.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  } else {
    let changeResult = "";

    for (let i = denominations.length - 1; i >= 0; i--) {
      let coinName = denominations[i][0];
      let coinValue = denominations[i][1];
      let coinInDrawer = cid[i][1];
      let coinToReturn = 0;
      while (changeDue >= coinValue && coinInDrawer > 0) {
        changeDue -= coinValue;
        changeDue = Math.round(changeDue * 100) / 100;
        coinInDrawer -= coinValue;
        coinToReturn += coinValue;
      }
      if (coinToReturn > 0) {
        changeResult += `${coinName}: $${coinToReturn.toFixed(2)} `;
      }
    }

    if (changeDue > 0) {
      change.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (totalCid === inputCash - price) {
      change.textContent = "Status: CLOSED " + changeResult;
    } else {
      change.textContent = "Status: OPEN " + changeResult;
    }
  }
};

purshase.addEventListener("click", () => checkCashRegister());

window.addEventListener("keydown", (e) => {
  e.key === "Enter" ? checkCashRegister() : "";
});

const displayCid = (cid) => {
  const listItems = cid.map(([name, amount]) => {
    return `<li>${name}: $${amount.toFixed(2)}</li>`;
  });
  const listHtml = `<ul>${listItems.join("")}</ul>`;
  changeInDrawer.innerHTML = listHtml;
};

displayCid(cid);
