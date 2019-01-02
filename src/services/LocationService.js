import { makeGetRequest, makePostRequest, makeDeleteRequest } from "../utils/cuiResource";

export function getContries(successCallback, failCallback) {
  let config = {
    url: '/api/country'
  };
  makeGetRequest(config, (response) => {
    successCallback(response);
  }, (error) => {
    failCallback(error);
  });
}

export function getProvinces(contryCode, successCallback, failCallback) {
  let config = {
    url: '/api/provinces?filter={"where":{"country_code":{"like":"' + contryCode + '"}}}' 
  };
  makeGetRequest(config, (response) => {
    successCallback(response);
  }, (error) => {
    failCallback(error);
  });
}

export function getDistricts(provinceCode, successCallback, failCallback) {
  let config = {
    url: '/api/districts?filter={"where":{"province_code":{"like":"' + provinceCode + '"}}}' 
  };
  makeGetRequest(config, (response) => {
    successCallback(response);
  }, (error) => {
    failCallback(error);
  });
}

export function getWards(districtCode, successCallback, failCallback) {
  let config = {
    url: '/api/ward?filter={"where":{"district_code":{"like":"' + districtCode + '"}}}' 
  };
  makeGetRequest(config, (response) => {
    successCallback(response);
  }, (error) => {
    failCallback(error);
  });
}