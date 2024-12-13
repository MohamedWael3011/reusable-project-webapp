/* eslint-disable @typescript-eslint/no-explicit-any */
import soapRequest from "easy-soap-request";
import { XMLParser } from "fast-xml-parser";
import { UserProfile } from "./user.api";

const url = "http://localhost:51415/R_Service.asmx"; // Replace with your ASMX URL
const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  SOAPAction: "",
};

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});

// Create Account API
export const createAccount = async (
  username: string,
  password: string,
  email: string
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CreateAccount xmlns="http://tempuri.org/">
          <username>${username}</username>
          <password>${password}</password>
          <email>${email}</email>
        </CreateAccount>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/CreateAccount";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body.CreateAccountResponse
      .CreateAccountResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};

export const logIn = async (
  email: string,
  password: string
): Promise<UserProfile> => {
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

  headers.SOAPAction = "http://tempuri.org/LogIn";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);

    const result = parsedResponse.Envelope.Body.LogInResponse.LogInResult;

    if (result.success) {
      return {
        success: true,
        fullname: result.fullname,
        id: result.id,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return { success: false };
  }
};

// Get Proposal API
export const getProposal = async (subid: number): Promise<any | null> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetProposal xmlns="http://tempuri.org/">
          <subid>${subid}</subid>
        </GetProposal>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/GetProposal";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result =
      parsedResponse.Envelope.Body.GetProposalResponse.GetProposalResult;
    return result || null;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return null;
  }
};

// Get Report API
export const getReport = async (reportid: number): Promise<any | null> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetReport xmlns="http://tempuri.org/">
          <reportid>${reportid}</reportid>
        </GetReport>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/GetReport";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result =
      parsedResponse.Envelope.Body.GetReportResponse.GetReportResult;
    return result || null;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return null;
  }
};

// Create Proposal Review Email API
export const createProposalReviewEmail = async (
  submissionid: number,
  comment: string,
  status: string
): Promise<boolean> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CreateProposalReviewEmail xmlns="http://tempuri.org/">
          <submissionid>${submissionid}</submissionid>
          <comment>${comment}</comment>
          <status>${status}</status>
        </CreateProposalReviewEmail>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/CreateProposalReviewEmail";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result = parsedResponse.Envelope.Body
      .CreateProposalReviewEmailResponse
      .CreateProposalReviewEmailResult as boolean;
    return result;
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return false;
  }
};
