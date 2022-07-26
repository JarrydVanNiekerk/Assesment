
var ModuleSummaryManager = {
    GetAllModules: function () {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/module";
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;   
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    GetModuleById: function (moduleId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/module/" + moduleId;
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    }
};
var ModuleSummaryHelper = {
    InitModuleSummary: function () {
        ModuleSummaryHelper.LoadModule();
    },
    LoadModule: function () {
        $("#Table tbody tr").remove();
        var moduleList = ModuleSummaryManager.GetAllModules();
        $.each(moduleList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.ModuleId + "</td>" +
                "<td>" + item.ModuleCode + "</td>" +
                "<td>" + item.ModuleDescription + "</td>" +
                "<td><button class='btn btn-info' type='button' onClick='ModuleSummaryHelper.FillModuleInfo(" + item.ModuleId + ")'>View</button></td>" +
                "</tr>";
            $("#Table tbody").append(rows);
        });
    },
    FillModuleInfo: function (moduleId) {
        debugger;
        var modInfo = ModuleSummaryManager.GetModuleById(moduleId);
        $("#btnSave").text("Update");
        $("#divDetails").show();
        $("#divSummary").hide();
        $.each(modInfo, function (i, modInfo) {
            $("#hdnModuleId").val(modInfo.ModuleId)
            $("#txtModuleCode").val(modInfo.ModuleCode);
            $("#txtModuleDescription").val(modInfo.ModuleDescription);
        });

    }
}
