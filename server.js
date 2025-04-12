const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.post("/ussd", (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";
    const input = text.split("*");

    switch (input.length) {
        case 1:
            response = `CON Welcome to LocalLang\nChoose Language:
1. Kiswahili
2. Kikuyu
3. Luo
4. Kamba`;
            break;

        case 2:
            response = `CON Choose Service:
1. Finance
2. Medical
3. Agriculture
4. Transport`;
            break;

        case 3:
            const service = input[2];
            switch (service) {
                case "1": // Finance
                    response = `CON Finance Instructions:
1. Send Money
2. Withdraw
3. Buy Airtime`;
                    break;
                case "2": // Medical
                    response = `CON Medical Instructions:
1. Book Clinic
2. NHIF Check
3. Emergency Tips`;
                    break;
                case "3": // Agriculture
                    response = `CON Agriculture Instructions:
1. Market Prices
2. Planting Tips
3. Weather`;
                    break;
                case "4": // Transport
                    response = `CON Transport Instructions:
1. Matatu Fare Inquiry
2. Route Map
3. Driving License Info`;
                    break;
                default:
                    response = 'END Invalid service choice.';
            }
            break;

        case 4:
            const instruction = input[3];
            // Dummy responses - you can map these dynamically
            response ='END here is your instructions in your language. Thank you!'
            break;

        default:
            response = "END Invalid input. Try again.";
    }

    res.set("Content-Type: text/plain");
    res.send(response);
});

app.listen(PORT, () => {
    console.log( `USSD server running on port ${PORT}`);
});