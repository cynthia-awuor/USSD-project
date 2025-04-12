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

  switch (input.length) {
    case 1:
      response = `CON Welcome to LocalLang\nChoose Language:
1. Kiswahili
2. Kikuyu
3. Luo
4. Kamba`;
      break;

    /*case 2:
      response = `CON Choose Service:
1. Finance
2. Medical
3. Agriculture
4. Transport
00. Back`;
      break;*/

    case 3:
      if (input[2] === "00") {
        response = `CON Welcome to LocalLang\nChoose Language:
1. Kiswahili
2. Kikuyu
3. Luo
4. Kamba
00. Back`;
      } else {
        response = `CON Choose Service:
1. Finance
2. Medical
3. Agriculture
4. Transport
00. Back`;
      }
      break;

    case 4:
      if (input[3] === "00") {
        response = `CON Choose Service:
1. Finance
2. Medical
3. Agriculture
4. Transport
00. Back`;
        break;
      }

      const lang = input[1];
      const service = input[2];
      let instruction = "";

      if (service == "1") {
        if (lang == "1") instruction = "CON Fedha \n1. Tuma\n2. Toa\n3. Nunua Airtime";
        else if (lang == "2") instruction = "CON Thutha wa Finance\n1. Tuma\n2. Toa\n3. Gura Airtime";
        else if (lang == "3") instruction = "CON Finance Magayo\n1. Chero\n2. Ooro\n3. nyiewo Airtime";
        else instruction = "CON Finance Menu\n1. Send\n2. Withdraw\n3. Buy Airtime";
      } else if (service == "2") {
        if (lang == "1") instruction = "CON Afya Menu\n1. Clinic\n2. NHIF Check\n3. Tips za Dharura";
        else if (lang == "2") instruction = "CON Utukumi Menu\n1. Book Clinic\n2. NHIF\n3. Emergency";
        else if (lang == "3") instruction = "CON Medica Magayo\n1. Clinic\n2. NHIF\n3. Emergency Tips";
        else instruction = "CON Medical Menu\n1. Book\n2. NHIF\n3. Emergency";
      } else {
        instruction = "END Service not implemented.";
      }

      response = instruction + "\n00. Back";
      break;

    case 5:
      if (input[4] === "00") {
        response = `CON Choose Service:
1. Finance
2. Medical
3. Agriculture
4. Transport
00. Back`;
        break;
      }
      response = "END Here is your info. Thank you!";
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
