const data = '{{qs_json}}'
    const rdata = JSON.parse(data.replace(/&quot;/g, '"'))
    const input = document.getElementById('search_here')
    let filteredArr = []

    input.addEventListener('keyup', (e)=>{
        const table_header = `<table class="table">
            <thead>
              <th>Name</th>
                <th>StatusColor</th>

              <div id="demo"></div>
            </thead>
            <tbody id="tableBody">
            </tbody>
             `
        box.innerHTML = `${table_header}`
        filteredArr = rdata.filter(taskstatus=> (taskstatus['stat_name'].toUpperCase()).includes(e.target.value.toUpperCase()))
        if (filteredArr.length > 0){
            filteredArr.map(taskstatus=>{
                let table = document.getElementById("tableBody");
                let row = document.createElement("tr")
                let c1 = document.createElement("td")
                let c2 = document.createElement("td")
                c1.innerText = `${taskstatus['stat_name']}`
                c2.innerText = `${taskstatus['stat_color']}`
                row.appendChild(c1);
                row.appendChild(c2);
                table.appendChild(row)

            })
        } else {
            let table = document.getElementById("tableBody");
            let row = document.createElement("tr")
            let c1 = document.createElement("td")
            c1.innerHTML = "<b>No results found...</b>"
            row.appendChild(c1).colSpan = "2";
            table.appendChild(row)



        }
    })