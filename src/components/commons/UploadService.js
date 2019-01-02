import { makePostRequest} from "../../utils/cuiResource";

export function uploadImage(data, successCallback, failCallback) {
    let config = {
        url: '/api/Containers/images/upload',
        data: data
    };
    makePostRequest(config, (response) => {
        successCallback(response);
    }, (error)=>{
        failCallback(error);
    });
}

export function uploadVideo(data, successCallback, failCallback) {
    let config = {
        url: '/api/Containers/videos/upload',
        data: data
    };
    makePostRequest(config, (response) => {
        successCallback(response);
    }, (error)=>{
        failCallback(error);
    });
}

