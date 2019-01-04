import { makeGetRequest, makePostRequest, makeDeleteRequest } from "../../../utils/cuiResource";
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
export function createHome(data, successCallback, failCallback) {
	let requestOptions = {
		url: '/api/homes',
		headers: { 'Content-Type': 'application/json', },
		data: data
	};

	makePostRequest(requestOptions, (response) => {
		successCallback(response);
	}, (error) => {
		failCallback(error);
	});
}
export function deleteHome(id, successCallback, failCallback) {
	let requestOptions = {
		url: `/api/homes/${id}`,
		headers: { 'Content-Type': 'application/json', }
	};

	makeDeleteRequest(requestOptions, (response) => {
		successCallback(response);
	}, (error) => {
		failCallback(error);
	});
}