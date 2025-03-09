import { getOptionsByRequestType, RequestType } from "../hooks/RequestBuilder";

export const generateCard = async (name: string, prompt: string) => {
  const response = await fetch('http://localhost:8081/cards/generateCard',
    getOptionsByRequestType(RequestType.POST,
      {
        "name": name,
        "prompt": prompt
      }
    ));
  if (!response.ok) {
    throw new Error(`Error: $(response.statusText)`);
  }
  const data = await response.json();
  console.log(data);
  return data;
};