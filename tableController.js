  // get the table buttons container
  var tableButtons = document.querySelector('.table-buttons');

  // add a click event listener to the table buttons container
  tableButtons.addEventListener('click', function(e) {
    // check if the clicked element is a button
    if (e.target.tagName.toLowerCase() === 'button') {
      // remove the active class from all buttons
      var buttons = tableButtons.querySelectorAll('button');
      buttons.forEach(function(button) {
        button.classList.remove('active');
      });

      // add the active class to the clicked button
      e.target.classList.add('active');

      // hide all tables
      var tables = document.querySelectorAll('.table-container table');
      tables.forEach(function(table) {
        table.style.display = 'none';
      });

      // show the selected table
      var tableId = e.target.getAttribute('data-table');
      var selectedTable = document.getElementById(tableId);
      selectedTable.style.display = 'table';
    }
  });

  let sortOrder = -1; // initialize sort order to descending

  var tables = document.querySelectorAll('table');

  tables.forEach(function(table){
      // get the table head element
      var thead = table.querySelector('thead');
    
      // add a click event listener to the table head element
      thead.addEventListener('click', function(e) {
        // check if the clicked element is a th element
        if (e.target.tagName.toLowerCase() === 'th') {
          // get the data-sort attribute value of the clicked th element
          var column = e.target.getAttribute('data-sort');
    
          // get the tbody element
          var tbody = table.querySelector('tbody');
    
          // convert the tbody rows into an array
          var rows = Array.from(tbody.rows);
            console.log(rows)
            console.log(column)
          // sort the rows based on the selected column
    
    
    rows.sort(function(a, b) {
        console.log(sortOrder)
      let valueA = a.querySelector('td[data-col="' + column + '"]');
      let valueB = b.querySelector('td[data-col="' + column + '"]');
      
      if (valueA && valueB) {
        valueA = valueA.textContent;
        valueB = valueB.textContent;
        if (!isNaN(valueA) && !isNaN(valueB)) { // check if values are numbers
          valueA = parseInt(valueA);
          valueB = parseInt(valueB);
        }
        else if (valueA.includes("£") && valueB.includes("£")){
            let numA = parseFloat(valueA.match(/\d+(\.\d+)?/)[0]);
            let numB = parseFloat(valueB.match(/\d+(\.\d+)?/)[0]);
            if (valueA.includes('K')) {
              numA = numA * 1000;
            } else if (valueA.includes('M')) {
              numA = numA * 1000000;
            }
            if (valueB.includes('K')) {
                numB = numB * 1000;
              } else if (valueB.includes('M')) {
                numB = numB * 1000000;
              }
              valueA = numA
              valueB = numB
    
              console.log(valueA, valueB)
            
          }
        }
       else {
        valueA = '';
        valueB = '';
      }
    
      if (sortOrder === 1) { // sort ascending if sortOrder is 1
        if (valueA < valueB) {
          return -1;
        } else if (valueA > valueB) {
          return 1;
        } else {
          return 0;
        }
      } else { // sort descending for other cases
        if (valueA > valueB) {
          return -1;
        } else if (valueA < valueB) {
          return 1;
        } else {
          return 0;
        }
    }
    });
    
    sortOrder *= -1; // toggle sortOrder for next click
    
    
          // clear the tbody content
          while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
          }
    
          // add the sorted rows to the tbody
          rows.forEach(function(row) {
            tbody.appendChild(row);
          });
        }
      });
  })
