const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/ussd", (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";
    const input = text.split("*");

    const language = input[1]; // This holds user language choice

    switch (input.length) {
        case 1:
            response = `CON Welcome to LocalLang
Choose Language:
1. Kiswahili
2. Kikuyu
3. Luo
4. Kamba`;
            break;

        case 2:
            let chooseServiceMsg = "";
            if (language == "1") {
                chooseServiceMsg = "Chagua Huduma:\n1. Fedha\n2. Afya\n3. Kilimo\n4. Usafiri";
            } else if (language == "2") {
                chooseServiceMsg = "Thura Huduma ya \n1. Mbeca\n2. Urigiti wa Thibitari\n3. Uriimi/Kurima\n4. Mbeca cia guthie";
            } else if (language == "3") {
                chooseServiceMsg = "Yer LocaLang:\n1.Od Pesa\n2. Osiptal\n3. Pur\n4. Wuoth";
            } else if (language == "4") {
                chooseServiceMsg = "Sya nthĩ sya kwĩthĩwa:\n1. Mbesa\n2. Wendo\n3. Kyũmĩ\n4. Kwĩya";
            } else {
                chooseServiceMsg = "Invalid Language Selection";
            }
            response = `CON ${chooseServiceMsg}`;
            break;

        case 3:
            const service = input[2];
            let serviceInstructions = "";

            if (language == "1") { // Kiswahili
                if (service == "1") {
                    serviceInstructions = "Chagua:\n1. Tuma Pesa\n2. Toa Pesa\n3. Nunua Airtime";
                } else if (service == "2") {
                    serviceInstructions = "Chagua:\n1. Kujiandikisha Clinic\n2. Angalia NHIF\n3. Msaada wa Dharura";
                } else if (service == "3") {
                    serviceInstructions = "Chagua:\n1. Bei Sokoni\n2. Mbinu za Upanzi\n3. Hali ya Hewa";
                } else if (service == "4") {
                    serviceInstructions = "Chagua:\n1. Nauli\n2. Ramani\n3. Leseni ya Kuendesha";
                } else {
                    serviceInstructions = "Chaguo sio sahihi.";
                }
            }

            else if (language == "2") { // Kikuyu
                serviceInstructions = "Thura Huduma ya \n1. Mbeca\n2. Urigiti wa Thibitari\n3. Uriimi/Kurima\n4. Mbeca cia guthie";
            }

            else if (language == "3") { // Luo
                serviceInstructions = "Yer LocaLang:\n1.Od Pesa\n2. Osiptal\n3. Pur\n4. Wuoth";
            }

            else if (language == "4") { // Kamba
                serviceInstructions = "Sya:\n1. Tumia Mbesa\n2. Wendo wa Clinic\n3. Kyũmĩ\n4. Kwĩya";
            }

            response = `CON ${serviceInstructions}`;
            break;

        case 4:
            response = 'END Here is your instructions in your selected language. Thank you!';
            break;

        default:
            response = "END Invalid input. Try again.";
    }

    res.set("Content-Type: text/plain");
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`USSD server running on port ${PORT}`);
});
