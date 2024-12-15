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


// Define the function to fetch and return theme details
// export const getThemeDetails = async (themeID: number): Promise<{ name: string, duration: string, budget: string, deadline: string }[] | null> => {
//   // Create the URL or API endpoint for fetching data based on themeID
//   const url = `http://localhost:51415/A_Services.asmx/${themeID}`; // Modify this URL according to your API structure

//   try {
//     // Fetch the data from the API or XML response
//     const response = await fetch(url);
    
//     // Check if the response is successful
//     if (!response.ok) {
//       console.error(`Error: ${response.status} ${response.statusText}`);
//       throw new Error(`Failed to fetch theme details: ${response.statusText}`);
//     }

//     // Assuming the response is in XML format, we parse it
//     const text = await response.text();  // Retrieve the response as text
//     const parser = new DOMParser();      // Create a new DOMParser instance
//     const xmlDoc = parser.parseFromString(text, 'application/xml'); // Parse the response to XML

//     // Extract all rows from the XML document (assuming XML structure is known)
//     const rows = xmlDoc.getElementsByTagName('row'); // Adjust 'row' tag if needed

//     // Map over the rows to extract relevant data (name, duration, budget, deadline)
//     if (rows.length > 0) {
//       const result = Array.from(rows).map((row) => ({
//         name: row.getElementsByTagName("name")[0]?.textContent ?? '',  // Extract name
//         duration: row.getElementsByTagName("duration")[0]?.textContent ?? '',  // Extract duration
//         budget: row.getElementsByTagName("budget")[0]?.textContent ?? '',  // Extract budget
//         deadline: row.getElementsByTagName("deadline")[0]?.textContent ?? '',  // Extract deadline
//       }));
//       return result; // Return the array of theme details
//     }

//     return null; // Return null if no data is found
//   } catch (error) {
//     console.error('Error fetching theme details:', error);
//     return null; // Return null in case of an error
//   }
// };





// // Define the type for the Theme
// export interface Theme {
//   id: number;
//   name: string;
//   deadline: string;
//   duration: string;
//   budget: string;
// }

// // The API function to fetch themes
// export const viewProjectThemes = async (): Promise<Theme[]> => {
//   const xml = `
//     <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
//       <soap:Body>
//         <ViewProjectTheme xmlns="http://tempuri.org/" />
//       </soap:Body>
//     </soap:Envelope>
//   `;

//   try {
//     const { response } = await soapRequest({
//       url: "http://your-service-endpoint", // Replace with your actual SOAP service endpoint
//       headers: {
//         "Content-Type": "text/xml;charset=UTF-8",
//         SOAPAction: "http://tempuri.org/ViewProjectTheme", // Replace with actual SOAPAction
//       },
//       xml,
//     });

//     const parsedResponse = parser.parse(response.body);
//     const rows = parsedResponse.Envelope.Body.ViewProjectThemeResponse.ViewProjectThemeResult.Table;

//     // Ensure rows are always returned as an array
//     const themes = Array.isArray(rows) ? rows : [rows];

//     return themes.map((theme) => ({
//       id: theme.themeId,
//       name: theme.name,
//       deadline: theme.deadline || "N/A",
//       duration: theme.duration || "N/A",
//       budget: theme.budget || "N/A",
//     }));
//   } catch (error) {
//     console.error("SOAP Request Error:", error);
//     return [];
//   }
// };
