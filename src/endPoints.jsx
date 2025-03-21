class ApiEndpoints{
    constructor(){
        this.baseURL = "http://localhost:4000";

        this.FETCH_TICKETS=`${this.baseURL}/alltickets`
        this.CREATE_TICKET=`${this.baseURL}/createticket`
        this.UPDATE_TICKET=`${this.baseURL}/tickets/`
        this.DELETE_TICKET=`${this.baseURL}/tickets/`
    }
}
export default ApiEndpoints; 