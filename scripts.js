

// document.getElementById("search").addEventListener("click", getDispensers, false);

// Gets dispenser list
const getDispensers = async () => {
    const response = await fetch('https://questfrens.herokuapp.com/get_dispensers');
    const dispenserData = await response.json();
    console.log(dispenserData)

    // Append to DOM
    // Create table row
    let tableEl = document.getElementById("table")

    for(dispenser of dispenserData) {
        console.log(dispenser)

        const row = document.createElement("tr");

        let header = document.createElement("td");
        const headerText = document.createTextNode(dispenser.source);
        header.appendChild(headerText)

        let cost = document.createElement("td");
        const costText = document.createTextNode(dispenser.satoshirate);
        cost.appendChild(costText)
        
        // Link
        let linkCell = document.createElement("td")

        // Create anchor element.
        let a = document.createElement('a'); 
            
        // Create the text node for anchor element.
        let link = document.createTextNode("LINK");
            
        // Append the text node to anchor element.
        a.appendChild(link); 
            
        // Set the title.
        a.title = "A link"; 
            
        // Set the href property.
        const url = "https://xchain.io/tx/" + dispenser.tx_hash
        a.href = url
        a.target = "_blank"
            
        // Append the anchor element to the body.
        linkCell.appendChild(a)

        row.appendChild(header)
        row.appendChild(cost)
        row.appendChild(linkCell)
        tableEl.appendChild(row)
    }
}