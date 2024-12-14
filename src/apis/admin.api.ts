import soapRequest from "easy-soap-request";
import { XMLParser } from "fast-xml-parser";

const url = "http://localhost:51415/A_Services.asmx"; // Replace with your ASMX URL
const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  SOAPAction: "http://tempuri.org/",
};

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});

export const createTheme = async (
  name: string,
  duration: string,
  deadline: string,
  budget: number
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Create_theme xmlns="http://tempuri.org/">
          <Name>${name}</Name>
          <Duration>${duration}</Duration>
          <Deadline>${deadline}</Deadline>
          <Budget>${budget}</Budget>
        </Create_theme>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}Create_theme` },
      xml,
    });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.Create_themeResponse
      .Create_themeResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};

export const updateTheme = async (
  themeId: number,
  name: string,
  duration: string,
  deadline: string,
  budget: number
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <UpdateTheme xmlns="http://tempuri.org/">
          <Theme_ID>${themeId}</Theme_ID>
          <Name>${name}</Name>
          <Duration>${duration}</Duration>
          <Deadline>${deadline}</Deadline>
          <Budget>${budget}</Budget>
        </UpdateTheme>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}UpdateTheme` },
      xml,
    });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.UpdateThemeResponse
      .UpdateThemeResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};

export const deleteTheme = async (themeId: number): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <DeleteTheme xmlns="http://tempuri.org/">
          <Theme_ID>${themeId}</Theme_ID>
        </DeleteTheme>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}DeleteTheme` },
      xml,
    });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.DeleteThemeResponse
      .DeleteThemeResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};

export const assignReferee = async (refereeId: number, submissionId: number): Promise<string> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <AssignReferee xmlns="http://tempuri.org/">
          <refereeId>${refereeId}</refereeId>
          <submissionId>${submissionId}</submissionId>
        </AssignReferee>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}AssignReferee` },
      xml,
    });
    const parsedResponse = parser.parse(response.body);
    return parsedResponse.Envelope.Body.AssignRefereeResponse.AssignRefereeResult as string;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return `Error: ${error}`;
  }
};

export const unassignReferee = async (refereeId: number, submissionId: number): Promise<string> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <UnassignReferee xmlns="http://tempuri.org/">
          <refereeId>${refereeId}</refereeId>
          <submissionId>${submissionId}</submissionId>
        </UnassignReferee>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}UnassignReferee` },
      xml,
    });
    const parsedResponse = parser.parse(response.body);
    return parsedResponse.Envelope.Body.UnassignRefereeResponse.UnassignRefereeResult as string;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return `Error: ${error}`;
  }
};





