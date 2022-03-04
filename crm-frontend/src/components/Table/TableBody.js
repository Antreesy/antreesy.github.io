import { TableRow } from "./TableRow/TableRow.js";

export function TableBody(data) {
    
    const tableBody = document.createElement("tbody");
    tableBody.className = "table__body";
    
    const dataArray = data;
 
    for (let i = 0; i < dataArray.length; i++) {
        const [row, btnEdit, btnDelete] = TableRow(dataArray[i])
        tableBody.append(row)
    }
  
    return tableBody;
  }