console.log("Main.js is amazingly working");

const populate = async (value, currency) => {
    let myStr = "";
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_JFAg3sC7hErH2iwUomcovcVPEjEqDe8RGFXDP6Wh&base_currency=${currency}`;

    try {
        document.querySelector(".output").style.display = "none";
        document.querySelector("tbody").innerHTML = ""; 

        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let rJson = await response.json();

        if (rJson && rJson.data) {
            for (let key of Object.keys(rJson.data)) {
                const rate = rJson.data[key];
                const convertedValue = (rate.value * value).toFixed(2);
                myStr += ` <tr>
                                <td>${key}</td>
                                <td>${rate.code}</td>
                                <td>${convertedValue}</td>
                            </tr>`;
            }
            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = myStr;
            document.querySelector(".output").style.display = "block";
        } else {
            console.error("API response does not contain 'data'");
            alert("Failed to retrieve exchange rates.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data.");
    }
};

document.querySelector("#converterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }
    populate(value, currency);
});
