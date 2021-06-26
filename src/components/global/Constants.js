class Constants {
    static squareMeter = "m²";

    static host = "http://localhost:8080/";
    static getRealEstateRef = Constants.host + "api/v1/realEstate/getRealEstateDetail";
    static getRealEstateAssignStaffRef = Constants.host + "api/v1/realEstate/getRealEstateAssignStaff";
    static createTransactionRef = Constants.host + "api/v1/transaction/createTransaction";
    static getTransactionByUserId = Constants.host + "/api/v1/transaction/getTransactionByUserId";
}

export default Constants;