
var StudentSummaryManager = {
    /*Returns Students by ID*/
    GetStudentById: function (studentId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/student/" + studentId;
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
    GetAllStudentsByModule: function (moduleId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/student/ModuleStudents/" + moduleId;
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Returns all students*/
    GetAllStudents: function () {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/student";
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Shows modules on student details page*/
        GetModulesById: function (studentId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/student/StudentModules/" + studentId;
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
    DeleteAssign: function (mod, stud) {
        debugger;
        var obj = StudentSummaryHelper.CreateAssignObj(mod,stud);
        var objStudent = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.StudentId) > 0) {
            serviceUrl = "https://localhost:5001/api/assign/DeleteAssignment";
            AjaxManager.DeleteApiwParams(serviceUrl, objStudent ,onSuccess, onFailed)
        }
        function onSuccess(jsonData) {
            if (jsonData.StudentId !== 0) {
                StudentSummaryHelper.FillStudentInfo(parseInt(obj.StudentId));
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
var StudentSummaryHelper = {
    InitStudentSummary: function () {
        StudentSummaryHelper.LoadStudent();
        /*Assigning functions to buttons & Properties to text field*/
        $(".basicAutoComplete").autoComplete();
        $("#myInput").autoComplete();
        $("#btnFilter").click(function () {
            if ($("#myInput").val() == "") {
                StudentSummaryHelper.LoadStudent();
            } else {
                StudentSummaryHelper.SearchStudent();
            }
        });
        $("#btnClearSearch").click(function () {
            $("#myInput").val("")
            StudentSummaryHelper.LoadStudent();
        });
    },
    /*Creates Obj to be deleted in DeleteAssign()*/
    CreateAssignObj: function (mod, stud) {
        var obj = new Object();
        obj.StudentId = stud;
        obj.ModuleId = mod;
        return obj;

    },
    /*Fills Students table on student summary page*/
    LoadStudent: function () {
        $("#Table tbody tr").remove();
        var studentList = StudentSummaryManager.GetAllStudents();
        $.each(studentList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.StudentId + "</td>" +
                "<td>" + item.FirstName + "</td>" +
                "<td>" + item.LastName + "</td>" +
                "<td>" + item.DateofEnrollment + "</td>" +
                "<td>" + item.Active + "</td>" +
                "<td><button class='btn btn-info' type='button' onClick='StudentSummaryHelper.FillStudentInfo(" + item.StudentId + ")' data-toggle='tooltip' data-placement='top' title='View/Update Student Details'>View</button></td>" +
                "</tr>";
            $("#Table tbody").append(rows);
        });
    },
    /*Returns Table of search results*/
    SearchStudent: function () {
        $("#Table tbody tr").remove();
        var studentList = StudentSummaryManager.GetAllStudentsByModule($("#myInput").val());
        $.each(studentList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.StudentId + "</td>" +
                "<td>" + item.FirstName + "</td>" +
                "<td>" + item.LastName + "</td>" +
                "<td>" + item.DateofEnrollment + "</td>" +
                "<td>" + item.Active + "</td>" +
                "<td><button class='btn btn-info' type='button' onClick='StudentSummaryHelper.FillStudentInfo(" + item.StudentId + ")'data-toggle='tooltip' data-placement='top' title='View/Update Student Details'>View</button></td>" +
                "</tr>";
            $("#Table tbody").append(rows);
        });
    },
    FillStudentInfo: function (studentId) {
        var studInfo = StudentSummaryManager.GetStudentById(studentId);
        $("#btnSave").text("Update");
        $("#divDetails").show();
        $("#divSummary").hide();
        $("#txtStudentDate").mouseup(function () {
            $("#txtStudentDate").datepicker({
                onSelect: function (date, instance) {
                    $("#txtStudentDate").val(date);
                }
            }).focus();
        });
        $.each(studInfo, function (i, studInfo) {
            $("#hdnStudentId").val(studInfo.StudentId)
            $("#txtStudentFirstName").val(studInfo.FirstName);
            $("#txtStudentLastName").val(studInfo.LastName);
            $("#txtStudentDate").val(studInfo.DateofEnrollment);
            StudentSummaryHelper.LoadModule(studInfo.StudentId);
            $(function () {
                if (studInfo.Active == true) {
                    $("#txtStudentActive").prop('checked', true)
                } else {
                    $("#txtStudentActive").prop('checked', false)
                }
            });
        });

    },
    /*Fills modules table on student details page*/
        LoadModule: function (id) {
        debugger;
        $("#Table2 tbody tr").remove();
        var moduleList = StudentSummaryManager.GetModulesById(id);
        $.each(moduleList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.ModuleId + "</td>" +
                "<td>" + item.ModuleCode + "</td>" +
                "<td>" + item.ModuleDescription + "</td>" +
                "<td><button class='btn btn-danger' type='button' onClick='StudentSummaryManager.DeleteAssign(" + item.ModuleId + "," + id +")'>Delete</button></td>" +
                "</tr>";
            $("#Table2 tbody").append(rows);
        });
    }
}
