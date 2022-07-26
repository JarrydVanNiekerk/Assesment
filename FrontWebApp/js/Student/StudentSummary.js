
var StudentSummaryManager = {

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
    }
};
var StudentSummaryHelper = {
    InitStudentSummary: function () {
        StudentSummaryHelper.LoadStudent();
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
    LoadStudent: function () {
        debugger;
        $("#Table tbody tr").remove();
        var studentList = StudentSummaryManager.GetAllStudents();
        $.each(studentList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.StudentId + "</td>" +
                "<td>" + item.FirstName + "</td>" +
                "<td>" + item.LastName + "</td>" +
                "<td>" + item.DateofEnrollment + "</td>" +
                "<td>" + item.Active + "</td>" +
                "<td><button class='btn btn-info' type='button' onClick='StudentSummaryHelper.FillStudentInfo(" + item.StudentId + ")'>View</button></td>" +
                "</tr>";
            $("#Table tbody").append(rows);
        });
    },
    SearchStudent: function () {
        debugger;
        $("#Table tbody tr").remove();
        var studentList = StudentSummaryManager.GetAllStudentsByModule($("#myInput").val());
            $.each(studentList, function (i, item) {
                var rows = "<tr>" +
                    "<td>" + item.StudentId + "</td>" +
                    "<td>" + item.FirstName + "</td>" +
                    "<td>" + item.LastName + "</td>" +
                    "<td>" + item.DateofEnrollment + "</td>" +
                    "<td>" + item.Active + "</td>" +
                    "<td><button class='btn btn-info' type='button' onClick='StudentSummaryHelper.FillStudentInfo(" + item.StudentId + ")'>View</button></td>" +
                    "</tr>";
                $("#Table tbody").append(rows);
            });
    },
    FillStudentInfo: function (studentId) {
        debugger;
        var studInfo = StudentSummaryManager.GetStudentById(studentId);
        $("#btnSave").text("Update");
        $("#divDetails").show();
        $("#divSummary").hide();
        $.each(studInfo, function (i, studInfo) {
            $("#hdnStudentId").val(studInfo.StudentId)
            $("#txtStudentFirstName").val(studInfo.FirstName);
            $("#txtStudentLastName").val(studInfo.LastName);
            $("#txtStudentDate").val(studInfo.DateofEnrollment);

            $(function () {
                if (studInfo.Active == true) {
                    $("#txtStudentActive").prop('checked', true)
                } else {
                    $("#txtStudentActive").prop('checked', false)
                }
            });
        });

    }
}
