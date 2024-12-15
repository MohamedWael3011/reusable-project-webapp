import soapRequest from "easy-soap-request";
import { XMLParser } from "fast-xml-parser";

const url = "http://localhost:51415/U_Services.asmx";
const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  SOAPAction: "",
};

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});


export interface UserProfile {
  IsSuccess: boolean;
  Username?: string;
  Id?: number;
  Role?: string;
}


// Exporting the `logIn` function
export const logIn = async (email: string, password: string):Promise<UserProfile> => {
  const url = "http://localhost:51415/U_Services.asmx";
  const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    SOAPAction: "http://tempuri.org/LogIn",
  };

  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <LogIn xmlns="http://tempuri.org/">
          <email>${email}</email>
          <password>${password}</password>
        </LogIn>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.LogInResponse.LogInResult as UserProfile;

      return result
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return {IsSuccess: false}
  }
};

// Exporting the `createAccount` function
export const createAccount = async (username: string, email: string, password: string, role: string): Promise<boolean> => {
  const xml = `
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <CreateAccount xmlns="http://tempuri.org/">
      <username>${username}</username>
      <email>${email}</email>
      <password>${password}</password>
      <role>${role}</role>
    </CreateAccount>
  </soap:Body>
</soap:Envelope>

  `;

  const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    SOAPAction: "http://tempuri.org/CreateAccount",
  };

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.CreateAccountResponse.CreateAccountResult;

    if (result) { // Check for the expected success string
      return true;
    } else {
      console.error("Error:", result.message || "Account creation failed.");
      return false;
    }
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};
// Other functions follow the similar structure...


export const viewProjectTheme = async (): Promise<
  { themeId: number; name: string }[] | null
> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ViewProjectTheme xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/ViewProjectTheme";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const themes =
      parsedResponse.Envelope.Body.ViewProjectThemeResponse
        .ViewProjectThemeResult?.Theme;
    return themes || [];
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return null;
  }
};

export const deleteProposal = async (
  submissionId: number
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <DeleteProposal xmlns="http://tempuri.org/">
          <submissionid>${submissionId}</submissionid>
        </DeleteProposal>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/DeleteProposal";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.DeleteProposalResponse
      .DeleteProposalResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};

// Other functions follow the similar structure...

export const submitProposal = async (
  userId: number,
  themeId: number,
  title: string,
  proposal: string
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <SubmitProposal xmlns="http://tempuri.org/">
          <userid>${userId}</userid>
          <themeid>${themeId}</themeid>
          <title>${title}</title>
          <proposal>${proposal}</proposal>
        </SubmitProposal>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/SubmitProposal";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.SubmitProposalResponse
      .SubmitProposalResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};

export const submitReport = async (
  submissionId: number,
  title: string,
  report: string
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <SubmitReport xmlns="http://tempuri.org/">
          <submissionid>${submissionId}</submissionid>
          <title>${title}</title>
          <report>${report}</report>
        </SubmitReport>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/SubmitReport";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.SubmitReportResponse
      .SubmitReportResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};
