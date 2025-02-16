import { Get, Route } from "tsoa";

interface PingResponse {
  message: string;
}

@Route("ping")
export default class PingController {
  @Get("/")
  public getMessage(): PingResponse {
    return {
      message: "pong",
    };
  }
}
