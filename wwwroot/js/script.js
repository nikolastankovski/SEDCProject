//----------------- Table ------------------------------------------
let data = [
    {
        "date": new Date("2021-05-21"),
        "tableNo": 1,
        "stars": 5,
        "comment": "test comment 1"
    },
    {
        "date": new Date("2021-06-18"),
        "tableNo": 2,
        "stars": 4,
        "comment": "test comment 2"
    },
    {
        "date": new Date("2021-06-19"),
        "tableNo": 3,
        "stars": 3,
        "comment": "test comment 3"
    },
    {
        "date": new Date("2021-07-27"),
        "tableNo": 4,
        "stars": 2,
        "comment": "test comment 4"
    },
    {
        "date": new Date("2021-08-29"),
        "tableNo": 5,
        "stars": 1,
        "comment": "test comment 5"
    },
    {
        "date": new Date("2021-09-07"),
        "tableNo": 1,
        "stars": 4,
        "comment": "test comment 6"
    },
    {
        "date": new Date("2021-09-15"),
        "tableNo": 2,
        "stars": 5,
        "comment": "test comment 7"
    },
    {
        "date": new Date("2021-10-08"),
        "tableNo": 3,
        "stars": 3,
        "comment": "test comment 8"
    },
    {
        "date": new Date("2021-10-08"),
        "tableNo": 3,
        "stars": 3,
        "comment": "test comment 8"
    },
    {
        "date": new Date("2021-10-08"),
        "tableNo": 3,
        "stars": 3,
        "comment": "test comment 8"
    },
    {
        "date": new Date("2021-11-17"),
        "tableNo": 4,
        "stars": 2,
        "comment": "test comment 9"
    },
    {
        "date": new Date("2021-12-16"),
        "tableNo": 5,
        "stars": 5,
        "comment": "test comment 10"
    }
];

const columns = ["Date", "Table", "Stars", "Comment"];
// const dataKeys = ["date", "tableNo", "stars", "comment"];
const sortStatus = ["desc", "asc", "asc"];
const tableContainer = document.getElementById("table-container");
generateTable(data);

// get headers of sortable columns and bind k
const columnDate = document.getElementById("columnDate");
const columnTable = document.getElementById("columnTable");
const columnStars = document.getElementById("columnStars");
function toggleStatus(status) {
    return status == "asc" ? "desc" : "asc";
}

function toggleArrow(col, sortOrder) {
    const down = ".fa-long-arrow-alt-down";
    const up = ".fa-long-arrow-alt-up";

    let arr_down = col.querySelector(down);
    arr_down.style.display = sortOrder === "asc" ? "none" : "";
    let arr_up = col.querySelector(up);
    arr_up.style.display = sortOrder === "desc" ? "none" : "";
}

columnDate.addEventListener("click", (e) => {
    sortStatus[0] = toggleStatus(sortStatus[0]);
    toggleArrow(columnDate, sortStatus[0]);
    sortData("date", sortStatus[0]);
    generateTable(data);
})
columnTable.addEventListener("click", (e) => {
    sortStatus[1] = toggleStatus(sortStatus[1]);
    toggleArrow(columnTable, sortStatus[1]);
    sortData("tableNo", sortStatus[1]);
    generateTable(data);
})
columnStars.addEventListener("click", (e) => {
    sortStatus[2] = toggleStatus(sortStatus[2]);
    toggleArrow(columnStars, sortStatus[2]);
    sortData("stars", sortStatus[2]);
    generateTable(data);
})

function sortData(sortByKey, asc) {
    data.sort((a, b) => {
        if (asc == "asc") return a[sortByKey] - b[sortByKey];
        return b[sortByKey] - a[sortByKey];
    });
}

function generateTable(data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    data.forEach(item => {
        let tableRow = document.createElement("tr");
        Object.values(item).forEach((val, index) => {
            let td = document.createElement("td");
            if (index == 0) {
                td.textContent = val.toDateString();
            }
            else if (index == 1) {
                td.textContent = "Table " + val;
            }
            else if (index == 2) {
                for (let i = 1; i <= val; i++) {
                    let star = document.createElement("i");
                    star.classList.add("fas", "fa-star");
                    // star.style.color = "#ffcd00";
                    td.appendChild(star);

                }
            }
            else {
                td.textContent = val;
            }
            tableRow.appendChild(td);
        })
        tbody.append(tableRow);
    })
}
//------------------------------------------------------------------

const totalCustomers = document.getElementById("total-customers");
const averageFeedbackScore = document.getElementById("average-feedback-score");
const fiveStarTotal = document.getElementById("5-star-total");
const fourStarTotal = document.getElementById("4-star-total");
const threeStarTotal = document.getElementById("3-star-total");
const twoStarTotal = document.getElementById("2-star-total");
const oneStarTotal = document.getElementById("1-star-total");


totalCustomers.textContent = data.length;

//---- Calc Average -------------------------------------------------
(() => {
    let arrayStars = [];
    for (let x of data) {
        arrayStars.push(x.stars);
    }
    let average = (arrayStars.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
    averageFeedbackScore.textContent = average
})();
// -------------------------------------------------------------------

// sort by newest feedback and draw table
sortData("date", "desc");
generateTable(data);

function fillProgressBar() {
    // parse ratings from 'data'
    let arr = [fiveStarTotal, fourStarTotal, threeStarTotal, twoStarTotal, oneStarTotal];
    let ctr = [0, 0, 0, 0, 0];
    data.map(x => x.stars).forEach(x => ctr[x - 1]++);
    ctr.reverse();
    for (let i = 0; i < 5; i++) {
        arr[i].textContent = ctr[i];
    }

    // get max 
    console.log(arr.map(x => parseFloat(x.textContent.trim())));
    let maxStars = Math.max(...arr.map(x => parseFloat(x.textContent.trim())));
    console.log(maxStars);

    let rows = document.getElementById("star-feedback-container").getElementsByClassName("row");

    for (let i = 0; i < 5; i++) {
        rows[i].querySelector(".progress-bar:first-child").setAttribute("aria-valuemax", maxStars);
        rows[i].querySelector(".progress-bar:first-child").setAttribute("aria-valuenow", arr[i].textContent);
        rows[i].querySelector(".progress-bar:first-child").style.width = `${parseFloat(arr[i].textContent) * 100 / maxStars}%`;
    }
}

fillProgressBar();