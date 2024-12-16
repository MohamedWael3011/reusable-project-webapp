/* eslint-disable @typescript-eslint/no-explicit-any */
import soapRequest from "easy-soap-request";
import { XMLParser } from "fast-xml-parser";

const url = "http://localhost:51415/A_Services.asmx"; // Replace with your ASMX URL
const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  SOAPAction: "http://tempuri.org/",
};

export interface Theme {
  ThemeId: number;         // The ID of the theme (integer)
  Name: string;            // The name of the theme (string)
  Duration: number | null; // Duration in days (nullable integer)
  Budget: number | null;   // Budget in currency (nullable integer)
  Deadline: string | null; // Deadline (nullable string, can be formatted as Date if needed)
}

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


export const getTheme = async (themeId: number): Promise<Theme | null> => {
  const xml = `
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetTheme xmlns="http://tempuri.org/">
        <themeId>${themeId}</themeId>
      </GetTheme>
    </soap:Body>
  </soap:Envelope>
  `;

  const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    SOAPAction: "http://tempuri.org/GetTheme",
  };

  try {
    // Send the SOAP request to the web service
    const { response } = await soapRequest({ url, headers, xml });

    // Parse the response using a library like xml2js or any other XML parser
    const parsedResponse = parser.parse(response.body);

    // Extract the theme data from the parsed response
    const result = parsedResponse.Envelope.Body.GetThemeResponse.GetThemeResult;

    // If the result is valid, return it as a Theme object
    if (result) {
      return {
        ThemeId: result.ThemeId,
        Name: result.Name,
        Duration: result.Duration !== undefined ? result.Duration : null,
        Budget: result.Budget !== undefined ? result.Budget : null,
        Deadline: result.Deadline || null
      };
    } else {
      console.error('Error: Theme not found or invalid response');
      return null;
    }
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return null;
  }
};





// Define the type for the Theme
export interface Theme {
  ThemeId: number;
  Name: string;
  Deadline: string | null;
  Duration: number | null;
  Budget: number | null;
}

// The API function to fetch themes
export const viewProjectThemes = async (): Promise<Theme[]> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ViewProjectTheme xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    // Make the SOAP request
    const { response } = await soapRequest({
      url, // Replace with your actual SOAP service endpoint
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        SOAPAction: "http://tempuri.org/ViewProjectTheme", // Replace with actual SOAPAction
      },
      xml,
    });

      // Parse the XML response body
      const parsedResponse = parser.parse(response.body);
      // Extract the ViewProjectThemeResult from the parsed response
      let result = parsedResponse.Envelope.Body.ViewProjectThemeResponse.ViewProjectThemeResult.diffgram.DocumentElement.Themes

      if (!Array.isArray(result)) {
        result = [result];
      }

    return result.map((theme: any) => ({
      ThemeId: theme.themeId,
      Name: theme.name,
      Duration: theme.duration || "N/A",  // Default to "N/A" if undefined
      Deadline: theme.deadline || "N/A",  // Default to "N/A" if undefined
      Budget: theme.budget  || "N/A"

    }));
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return [];
  }
};



export const sendFinalReport = async (
  title: string,
  content: string,
  uploadDate: string, // Use ISO string for dates
  userID: number
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <SendFinalReport xmlns="http://tempuri.org/">
          <title>${title}</title>
          <content>${content}</content>
          <uploadDate>${uploadDate}</uploadDate>
          <userID>${userID}</userID>
        </SendFinalReport>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}SendFinalReport` },
      xml,      
    });
    console.log("Raw API Response:", response.body);

    const parsedResponse = parser.parse(response.body);
    return parsedResponse.Envelope.Body.SendFinalReportResponse.SendFinalReportResult;
  } catch (error) {
    console.error('SOAP Request Error:', error);
    return false;
  }
};



interface User {
  user_id: string; // Match the exact key name in the SOAP response
  username: string;
}

export const fetchRefereeUsers = async (): Promise<User[]> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Ref_id_name_table xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    // Make the SOAP request
    const { response } = await soapRequest({
      url,
      headers: { ...headers, SOAPAction: `${headers.SOAPAction}Ref_id_name_table` },
      xml,      
    });

    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.Ref_id_name_tableResponse.Ref_id_name_tableResult.diffgram.DocumentElement.UsersTable;

    return result.map((user: any) => ({
      user_id: user.user_id,       
      username: user.username,
    }));
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return [];
  }
};



export interface Submission {
  
SubmissionId: number;
  UserId: number;
  themename: string;
  Title: string;
  Status: string;
}

export const fetchSubmissions = async (): Promise<Submission[]> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Availablesubmissions xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({
      url, 
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        SOAPAction: "http://tempuri.org/Availablesubmissions", 
      },
      xml,
    });

    const parsedResponse = parser.parse(response.body);


    let result =
      parsedResponse.Envelope.Body.AvailablesubmissionsResponse.AvailablesubmissionsResult.Submissions;
    console.log(result)
      if (!Array.isArray(result)) {
        result = [result];
      }
      return result.map((submission: any) => ({
      SubmissionId: submission.SubmissionId,
      UserId: submission.userid,
      ThemeName: submission.themename,
      Title: submission.title,
      Status: submission.status,
    }));
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return [];
  }
};
