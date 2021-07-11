class Constants {
  static squareMeter = "m²";
  static notFoundImageRef =
    "https://i.ibb.co/pfHbbcS/Screen-Shot-2021-06-27-at-09-06-47.png";
  // static host = "http://localhost:8080/";
  static host =
    "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/";
  static getRealEstateRef =
    Constants.host + "api/v1/realEstate/getAllRealEstate";
  static getRealEstateDetailRef =
    Constants.host + "api/v1/realEstate/getRealEstateDetail/";
  // static getRealEstateRef =
  //   Constants.host + "api/v1/realEstate/getRealEstateDetail";
  static getRealEstateAssignStaffRef =
    Constants.host + "api/v1/realEstate/getRealEstateAssignStaff";
  static createTransactionRef =
    Constants.host + "api/v1/transaction/createTransaction";
  static getTransactionByUserId =
    Constants.host + "api/v1/transaction/getTransactionByUserId";
  static createUser = Constants.host + "apis/v1/accounts/create";

  static getRealEstateRefBySellerId(sellerId, page) {
    return (
      Constants.host +
      "/api/v1/realEstate/getRealEstateBySellerId/" +
      sellerId.toString() +
      "/" +
      page.toString()
    );
  }

  static getTheChosenBuyerByRealEstateRef(realEstateId) {
    return (
      Constants.host +
      "apis/v1/conversations/conversations?%20realEstateId=" +
      realEstateId.toString() +
      "&close%20sale=close%20sale"
    );
  }

  static createRealEstateRef =
    Constants.host + "api/v1/realEstate/createRealEstate";

  static googleAPIKey = "AIzaSyDPzD4tPUGV3HGIiv7fVcWEFEQ0r1AAxwg";
  static geocodingRefWithSearchText(searchText) {
    return (
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      searchText +
      "&key=" +
      Constants.googleAPIKey
    );
  }
}

export default Constants;
