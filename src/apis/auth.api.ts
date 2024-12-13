import soapRequest from "easy-soap-request";
import { XMLParser } from "fast-xml-parser";

const url = "http://localhost:51415/ValidatorService.asmx"; // Replace with your ASMX URL
const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  SOAPAction: "",
};

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});

export interface UserValidationResponse {
  UserId: number;
  FullName: string | null;
  Email: string;
  Role: string | null;
  Message: string;
}

export const validateUser = async (
  email: string,
  password: string
): Promise<UserValidationResponse> => {
  const xml = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ValidateUser xmlns="http://tempuri.org/">
          <email>${email}</email>
          <password>${password}</password>
        </ValidateUser>
      </soap:Body>
    </soap:Envelope>
  `;

  headers.SOAPAction = "http://tempuri.org/ValidateUser";

  try {
    const { response } = await soapRequest({ url, headers, xml });
    const parsedResponse = parser.parse(response.body);
    const result =
      parsedResponse.Envelope.Body.ValidateUserResponse.ValidateUserResult;

    return {
      UserId: result.UserId,
      FullName: result.FullName || null,
      Email: result.Email,
      Role: result.Role || null,
      Message: result.Message || "Invalid credentials.",
    };
  } catch (error) {
    console.error("SOAP Request Error:", error);
    return {
      UserId: -1,
      FullName: null,
      Email: email,
      Role: null,
      Message: "An error occurred during authentication.",
    };
  }
};
