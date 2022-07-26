﻿var AjaxManager = {

    GetAPI: function (serviceUrl, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            url: serviceUrl,
            async: false,
            cache: false,
            dataType: "json",
            success: successCallback,
            error: errorCallback
        })
    },
    PostApi: function (serviceUrl, jsonParams, successCallback, errorCallback) {
        $.ajax({
            url: serviceUrl,
            type: "POST",
            data: jsonParams,
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
    },
    PutApi: function (serviceUrl, jsonParams, successCallback, errorCallback) {
        $.ajax({
            url: serviceUrl,
            headers: { 'Access-Control-Allow-Origin': '*' },
            type: "PUT",
            data: jsonParams,
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
    },
    DeleteApi: function (serviceUrl,successCallback, errorCallback) {
        $.ajax({
            url: serviceUrl,
            type: "DELETE",
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
    },
    /*Delete with Params*/
    DeleteApiwParams: function (serviceUrl, jsonParams,successCallback, errorCallback) {
        $.ajax({
            url: serviceUrl,
            type: "DELETE",
            data: jsonParams,
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
    }
}