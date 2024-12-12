import { useState } from "react";
import soapRequest from "easy-soap-request";
import { XMLParser } from "fast-xml-parser";

const App = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const callAsmxService = async () => {
    const url = "http://localhost:51415/U_Services.asmx"; // Replace with your ASMX URL
    const headers = {
      "Content-Type": "text/xml;charset=UTF-8",
      SOAPAction: "http://tempuri.org/CreateAccount", // SOAP action for the specific method
    };

    const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CreateAccount xmlns="http://tempuri.org/">
          <password>123</password>
          <fullname>123r</fullname>
          <email>wael@example.com</email>
        </CreateAccount>
      </soap:Body>
    </soap:Envelope>
  `;

    try {
      const { response } = await soapRequest({ url, headers, xml });
      const parser = new XMLParser({
        ignoreAttributes: false,
        removeNSPrefix: true,
      });
      const parsedResponse = parser.parse(response.body);

      console.log("PARSED RESPONSE", parsedResponse);
      // Extract the value of <CreateAccountResult>
      const result =
        parsedResponse.Envelope.Body.CreateAccountResponse.CreateAccountResult;

      setResponseMessage(result);

      console.log("RESPONSE MESSAGE", responseMessage);
    } catch (error) {
      console.error("SOAP Request Error:", error);
      setResponseMessage("Error occurred while processing the request.");
    }
  };

  return (
    <div>
      <h1>React with ASMX Service</h1>
      <button onClick={callAsmxService}>Call ASMX Service</button>
      <div>
        <h2>Response:</h2>
        <p>{`${responseMessage}`}</p>
      </div>
    </div>
  );
};

export default App;
