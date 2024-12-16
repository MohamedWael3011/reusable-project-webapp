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
////////////////////////////////


export const updateProposal = async (
  submissionId: number,
  proposal: string
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <UpdateProposal xmlns="http://tempuri.org/">
          <submissionid>${submissionId}</submissionid>
          <proposal>${proposal}</proposal>
        </UpdateProposal>
      </soap:Body>
    </soap:Envelope>
  `;

  // Set the SOAPAction header
  headers.SOAPAction = "http://tempuri.org/UpdateProposal";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result =
      parsedResponse.Envelope.Body.UpdateProposalResponse
        .UpdateProposalResult as boolean;
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
  report: string,
  uploaddate: string
): Promise<boolean> => {
  // Debugging: Log input parameters
  console.log("submitReport called with:", { submissionId, title, report });

  // Validate submissionId
  if (isNaN(submissionId) || submissionId <= 0) {
    console.error("Invalid submissionId:", submissionId);
    return false; // Return early if the submissionId is invalid
  }

  // Construct the SOAP XML request
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <SubmitReport xmlns="http://tempuri.org/">
          <submissionid>${submissionId}</submissionid>
          <title>${title}</title>
          <report>${report}</report>
          <uploaddate>${uploaddate}</uploaddate>
        </SubmitReport>
      </soap:Body>
    </soap:Envelope>
  `;
  
  // Log the SOAP XML request for debugging
  console.log("SOAP XML Request:", xml);

  // Set request headers
  headers.SOAPAction = "http://tempuri.org/SubmitReport";
  headers['Content-Type'] = 'text/xml; charset=utf-8';  // Ensure proper Content-Type
  
  try {
    // Send the SOAP request
    const { response } = await soapRequest({ url, headers, xml });
    
    // Log the entire response for debugging
    console.log("SOAP Response:", response.body);

    // Parse the response
    const parsedResponse = parser.parse(response.body);
    console.log("Parsed SOAP Response:", parsedResponse);  // Log parsed response

    // Extract the result from the parsed response
    const result = parsedResponse.Envelope.Body.SubmitReportResponse
      .SubmitReportResult as boolean;

    // Return the result
    return result;
  } catch (error) {
    // Log the error in case of failure
    console.error("Error submitting report:", error);
    return false;  // Return false if an error occurs
  }
};



// Define the Submission type
export interface Submission {
  submissionId: number;
  userId: number;
  proposal: string;
  status: string;
  title: string;
}

export const getAcceptedSubmissions = async (userId: number): Promise<Submission[]> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetAcceptedSubmissions xmlns="http://tempuri.org/">
          <user_id>${userId}</user_id>
        </GetAcceptedSubmissions>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/GetAcceptedSubmissions";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);

    // Log the full SOAP Envelope to examine the structure
    // console.log("Full SOAP Envelope:", parsedResponse?.Envelope);

    // // Check the Body and GetAcceptedSubmissionsResponse specifically
    // console.log("SOAP Body:", parsedResponse?.Envelope?.Body);
    // console.log("GetAcceptedSubmissionsResponse:", parsedResponse?.Envelope?.Body?.GetAcceptedSubmissionsResponse);

    // Inspect the diffgram and DocumentElement more thoroughly
    const diffgram = parsedResponse?.Envelope?.Body?.GetAcceptedSubmissionsResponse?.GetAcceptedSubmissionsResult?.diffgram;
    // console.log("diffgram:", diffgram);
    // console.log("DocumentElement:", diffgram?.DocumentElement);

    // If Submissions is not found, log the structure of DocumentElement
    // if (diffgram?.DocumentElement) {
    //   console.log("DocumentElement structure:", diffgram?.DocumentElement);
    // }

    // Try to find Submissions from the structure
    const result = diffgram?.DocumentElement?.Submissions || [];

    // If there are no submissions, log this for debugging
    // if (result.length === 0) {
    //   console.log("No submissions found in the response.");
    // }

    // Map the result to match the Submission type
    return result.map((submission: any) => ({
      submissionId: submission.submissionId ?? 0,
      userId: submission.userId ?? userId,
      proposal: submission.proposal ?? "",
      status: submission.status ?? "",
      title: submission.title ?? "",
    }));
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return [];
  }
};
