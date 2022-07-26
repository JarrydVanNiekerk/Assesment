

var ModuleDetailsManager = {
    /*Adding/Updating Module*/
    SaveModule: function () {
        var obj = ModuleDetailsHelper.CreateModObj();
        var objModule = JSON.stringify(obj);
        var serviceUrl = "";

        /*Checking for update existing or insert new*/
        if (parseInt(obj.ModuleId) == 0) {
            serviceUrl = "https://localhost:5001/api/module/AddModule";
            AjaxManager.PostApi(serviceUrl, objModule, onSuccess, onFailed)
        } else {
            serviceUrl = "https://localhost:5001/api/module/UpdateModule";
            AjaxManager.PutApi(serviceUrl, objModule, onSuccess, onFailed)
        }

        function onSuccess(jsonData) {
            if (jsonData.ModuleId !== 0) {
                $("#divDetails").hide();
                $("#divSummary").show();
                ModuleSummaryHelper.LoadModule();
                alert("Saved Successfully");
            }
            else {
                alert(jsonData);
            }
        }
        function onFailed(error) {
            alert(error.statusText);
        }
    },
    /*Deleting Module*/
    DeleteModule: function () {
        var obj = ModuleDetailsHelper.CreateModObj();
        var objModule = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.ModuleId) > 0) {
            serviceUrl = "https://localhost:5001/api/module/" + obj.ModuleId;
            AjaxManager.DeleteApi(serviceUrl, onSuccess, onFailed)
        }
        function onSuccess(jsonData) {
            if (jsonData.ModuleId !== 0) {
                $("#divDetails").hide();
                $("#divSummary").show();
                ModuleSummaryHelper.LoadModule();
                alert("Deleted Successfully");
            }
            else {
                alert(jsonData);
            }
        }
        function onFailed(error) {
            alert(error.statusText);
        }
    }
};
var ModuleDetailsHelper = {
    InitModuleDetails: function () {
        /*Assigning functions to buttons*/
        $("#btnAdd").click(function () {
            $("#btnSave").text("Save");
            $("#divDetails").show();
            $("#divSummary").hide();
            ModuleDetailsHelper.ClearForms();
        });
        $("#btnSave").click(function () {
            ModuleDetailsManager.SaveModule();
        });
        $("#btnClose").click(function () {
            $("#divDetails").hide();
            $("#divSummary").show();
            ModuleDetailsHelper.ClearForms();
        });
        $("#btnClear").click(function () {
            ModuleDetailsHelper.ClearForms();
            ModuleDetailsHelper.ClearForms();
        });
        $("#btnDelete").click(function () {
            ModuleDetailsManager.DeleteModule();
            ModuleDetailsHelper.ClearForms();
        });
    },
    CreateModObj: function () {
        var obj = new Object();
        if (obj.ModuleId == "") {
            obj.ModuleId = 0
        } else {
            obj.ModuleId = $("#hdnModuleId").val();
        }
        obj.ModuleCode = $("#txtModuleCode").val();
        obj.ModuleDescription = $("#txtModuleDescription").val();
        return obj;
    },
    ClearForms() {
        $("#hdnModuleId").val(0);
        $("#txtModuleCode").val("");
        $("#txtModuleDescription").val("");
    }
}