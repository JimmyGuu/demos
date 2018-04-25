export class ResponseModel {
  constructor(
    public Data: any,
    public Message: string,
    public ResultCode: string | number
  ) { }
}
