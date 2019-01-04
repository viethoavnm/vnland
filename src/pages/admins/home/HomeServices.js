import { makeGetRequest, makePostRequest } from "../../../utils/cuiResource";
export function getListHome(successCallback, failCallback) {
	let requestOptions = {
		url: '/api/homes',
		headers: { 'Content-Type': 'application/json', }
	};

	makeGetRequest(requestOptions, (response) => {
		successCallback(response);
	}, (error) => {
		failCallback(error);
	});
}