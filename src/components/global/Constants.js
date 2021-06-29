class Constants {
  // static host = "http://localhost:8080/";
  static host =
    "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/";
  static getRealEstateRef =
    Constants.host + "api/v1/realEstate/getRealEstateDetail";
  static getRealEstateAssignStaffRef =
    Constants.host + "api/v1/realEstate/getRealEstateAssignStaff";
  static createTransactionRef =
    Constants.host + "api/v1/transaction/createTransaction";
  static getTransactionByUserId =
    Constants.host + "api/v1/transaction/getTransactionByUserId";
}

export default Constants;
