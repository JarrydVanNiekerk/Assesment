
var TeacherSummaryManager = {
    /*Returns all Teachers*/
    GetAllTeachers: function () {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/teacher";
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Returns Teachers by ID*/
    GetTeacherById: function (teacherId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/teacher/" + teacherId;
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Returns all students that are enrolled in a certain module*/
    GetAllTeachersByModule: function (moduleId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/teacher/ModuleTeachers/" + moduleId;
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Shows modules on teacher details page*/
    GetModulesById: function (teacherId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/teacher/TeacherModules/" + teacherId;
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Unnassigns a student from module*/
    DeleteAssign: function (mod, teach) {
        debugger;
        var obj = TeacherSummaryHelper.CreateAssignObj(mod, teach);
        var objTeacher = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.TeacherId) > 0) {
            serviceUrl = "https://localhost:5001/api/assignteacher/DeleteAssignment";
            AjaxManager.DeleteApiwParams(serviceUrl, objTeacher, onSuccess, onFailed)
        }
        function onSuccess(jsonData) {
            if (jsonData.TeacherId !== 0) {
                TeacherSummaryHelper.FillTeacherInfo(parseInt(obj.TeacherId));
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
var TeacherSummaryHelper = {
    InitTeacherSummary: function () {
        TeacherSummaryHelper.LoadTeacher();
        /*Assigning functions to buttons & Properties to text field*/
        $(".basicAutoComplete").autoComplete();
        $("#myInput").autoComplete();
        $("#btnFilter").click(function () {
            if ($("#myInput").val() == "") {
                TeacherSummaryHelper.LoadTeacher();
            } else {
                TeacherSummaryHelper.SearchTeacher();
            }
        });
        $("#btnClearSearch").click(function () {
            $("#myInput").val("")
            TeacherSummaryHelper.LoadTeacher();
        });
    },
    /*Fills Teachers table on teacher summary page*/
    LoadTeacher: function () {
        $("#Table tbody tr").remove();
        var teacherList = TeacherSummaryManager.GetAllTeachers();
        $.each(teacherList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.TeacherId + "</td>" +
                "<td>" + item.FirstName + "</td>" +
                "<td>" + item.LastName + "</td>" +
                "<td>" + item.DateBegan + "</td>" +
                "<td>" + item.DepartmentDescription + "</td>" +
                "<td><button class='btn btn-info' type='button' onClick='TeacherSummaryHelper.FillTeacherInfo(" + item.TeacherId + ")'>View</button></td>" +
                "</tr>";
            $("#Table tbody").append(rows);
        });
    },
    /*Returns Table of search results*/
    SearchTeacher: function () {
        $("#Table tbody tr").remove();
        var teacherList = TeacherSummaryManager.GetAllTeachersByModule($("#myInput").val());
        $.each(teacherList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.TeacherId + "</td>" +
                "<td>" + item.FirstName + "</td>" +
                "<td>" + item.LastName + "</td>" +
                "<td>" + item.DateBegan + "</td>" +
                "<td>" + item.DepartmentDescription + "</td>" +
                "<td><button class='btn btn-info' type='button' onClick='TeacherSummaryHelper.FillTeacherInfo(" + item.TeacherId + ")'>View</button></td>" +
                "</tr>";
            $("#Table tbody").append(rows);
        });
    },
    FillTeacherInfo: function (teacherId) {
        var teachInfo = TeacherSummaryManager.GetTeacherById(teacherId);
        $("#btnSave").text("Update");
        $("#divDetails").show();
        $("#divSummary").hide();
        $("#txtTeacherDate").click(function () {
            $("#txtTeacherDate").datepicker({
                onSelect: function (date, instance) {
                    $("#txtTeacherDate").val(date);
                }
            }).focus();
        });
        $("#departmentsDropdown").removeAttr('disabled');
        $.each(teachInfo, function (i, teachInfo) {
            $("#hdnTeacherId").val(teachInfo.TeacherId);
            $("#txtTeacherFirstName").val(teachInfo.FirstName);
            $("#txtTeacherLastName").val(teachInfo.LastName);
            $("#txtTeacherDate").val(teachInfo.DateBegan);
            $("#txtTeacherDepartmentDescription").val(teachInfo.DepartmentDescription);
            TeacherSummaryHelper.LoadModule($("#hdnTeacherId").val());
        });

    },
    /*Creates Obj to be deleted in DeleteAssign()*/
    CreateAssignObj: function (mod, teach) {
        var obj = new Object();
        obj.TeacherId = teach;
        obj.ModuleId = mod;
        return obj;

    },
    /*Fills modules table on teacher details page*/
    LoadModule: function (id) {
        debugger;
        $("#Table2 tbody tr").remove();
        var moduleList = TeacherSummaryManager.GetModulesById(id);
        $.each(moduleList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.ModuleId + "</td>" +
                "<td>" + item.ModuleCode + "</td>" +
                "<td>" + item.ModuleDescription + "</td>" +
                "<td><button class='btn btn-danger' type='button' onClick='TeacherSummaryManager.DeleteAssign(" + item.ModuleId + "," + id + ")'>Delete</button></td>" +
                "</tr>";
            $("#Table2 tbody").append(rows);
        });
    }
}
