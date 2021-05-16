//----------------- Table ------------------------------------------
const data = [
    {
        "date": "06.05.2021",
        "tableNo": 1,
        "stars": 5,
        "comment": "test comment 1"
    },
    {
        "date": "07.05.2021",
        "tableNo": 2,
        "stars": 4,
        "comment": "test comment 2"
    },
    {
        "date": "08.05.2021",
        "tableNo": 3,
        "stars": 3,
        "comment": "test comment 3"
    },
    {
        "date": "09.05.2021",
        "tableNo": 4,
        "stars": 2,
        "comment": "test comment 4"
    },
    {
        "date": "10.05.2021",
        "tableNo": 5,
        "stars": 1,
        "comment": "test comment 5"
    },
    {
        "date": "11.05.2021",
        "tableNo": 1,
        "stars": 4,
        "comment": "test comment 6"
    },
    {
        "date": "12.05.2021",
        "tableNo": 2,
        "stars": 5,
        "comment": "test comment 7"
    },
    {
        "date": "13.05.2021",
        "tableNo": 3,
        "stars": 3,
        "comment": "test comment 8"
    },
    {
        "date": "14.05.2021",
        "tableNo": 4,
        "stars": 2,
        "comment": "test comment 9"
    },
    {
        "date": "15.05.2021",
        "tableNo": 5,
        "stars": 1,
        "comment": "test comment 10"
    }
];
const columns = ["Date", "Table", "Stars", "Comment"];
const tableContainer = document.getElementById("table-container");
generateTable(data, columns);

function generateTable(data, columns) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    table.setAttribute("id", "table");
    table.classList.add("table", "table-striped", "table-bordered");

    table.appendChild(thead);
    table.appendChild(tbody);

    let headerRow = document.createElement("tr");

    columns.forEach(item => {
        let th = document.createElement("th");
        th.textContent = item;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    data.forEach(item => {
        let tableRow = document.createElement("tr");
        Object.values(item).forEach((val, index) => {
            let td = document.createElement("td");
            if(index == 2){
                for(let i = 1; i <= val; i++){
                    let star = document.createElement("i");
                    star.classList.add("fas", "fa-star");
                    // star.style.color = "#ffcd00";
                    td.appendChild(star);
                }
            }
            else{
                td.textContent = val;
            }
            tableRow.appendChild(td);
        })
        tbody.append(tableRow);
    })
    tableContainer.appendChild(table);
}
//------------------------------------------------------------------


const totalCustomers = document.getElementById("total-customers");
const averageFeedbackScore = document.getElementById("average-feedback-score");
const fiveStarTotal = document.getElementById("5-star-total");
const fourStarTotal = document.getElementById("4-star-total");
const threeStarTotal = document.getElementById("3-star-total");
const twoStarTotal = document.getElementById("2-star-total");
const oneStarTotal = document.getElementById("1-star-total");



totalCustomers.textContent = "26";
averageFeedbackScore.textContent = "4.8";