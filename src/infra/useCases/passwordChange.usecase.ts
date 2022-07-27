import ApiURI from "../core/apiURI";
import IPasswordChangeRequest from "../dtos/PasswordChange/IPasswordChangeRequest.dto";
import IPasswordChangeResponse from "../dtos/PasswordChange/IPasswordChangeResponse.dto";
import ApiErrors from "../errors/ApiErrors";
import { HttpService } from "../services/HTTP.service";
import { IHTTPService } from "../services/interfaces/IHTTPService";
import passwordChangeError from "../errors/PasswordChangeErrors";
import INewPasswordData from "../../validations/DTO/INewPasswordData";



export default class PasswordChangeUseCase{
    private readonly httpService : IHTTPService;
    constructor(){
        this.httpService = new HttpService();
    }

    async run(formData : INewPasswordData) : Promise<boolean>{
        const requestBody : IPasswordChangeRequest = { ...formData}
        try{
            const response = await this.httpService.post<IPasswordChangeRequest, IPasswordChangeResponse>(
                ApiURI.User.passwordChange,
                requestBody,
            );
            return response.changed;
        } catch (error: any){
            const { data } = error.response;
            if (data === undefined) {
                console.error('Unknow Error:', error);
            }
            throw new ApiErrors(passwordChangeError).getError(data.Code);
        }
    }
}