import {TableHeader} from './TableHeader.js'
import {TableBody} from './TableBody.js'
import {sort} from '../Sort.js';
import {getFromServer} from "../Server.js"

export  function Table() {

    let dataArray = [];

    let p = new Promise((resolve, reject) => {
        dataArray = getFromServer()
        resolve(dataArray)
        reject()
    } )

    const table = document.createElement("table");
    table.className = "table main__table"

    let [tableHeader, btnSortArray] = TableHeader()
    table.append(tableHeader);

    p.then((dataArray) => {
        table.append(TableBody(dataArray));

        btnSortArray.forEach(btnSet => {
            btnSet.addEventListener("click", () => {
                btnSortArray.forEach(btnClr => {btnClr.parentElement.parentElement.className = `table__head-col`})
    
                let [sortedData, sortClass] = sort(dataArray, btnSet.getAttribute("data-set"));
                dataArray = sortedData;
                btnSet.parentElement.parentElement.classList.add(sortClass);
    
                table.querySelector(".table__body").remove()
                table.append(TableBody(dataArray));
            })
        })
    })

    return table;
}