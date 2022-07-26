
var TeacherSummaryManager = {
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
    }
};
var TeacherSummaryHelper = {
    InitTeacherSummary: function () {
        TeacherSummaryHelper.LoadTeacher();
    },
    LoadTeacher: function () {
        debugger;
        $("#Table tbody tr").remove();
        var teacherList = TeacherSummaryManager.GetAllTeachers();
        $.each(teacherList, function (i, item) {
            var rows = "<tr>" +
                "<td>" + item.TeacherId + "</td>" +
                "<td>" + item.FirstName + "</td>" +
                "<td>" + item.LastName + "</td>" +
                "<td>" + item.DateBegan + "</td>" +
                "<td>" + item.DepartmentId + "</td>" +
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
        $.each(teachInfo, function (i, teachInfo) {
            $("#hdnTeachId").val(teachInfo.TeacherId)
            $("#txtTeacherFirstName").val(teachInfo.FirstName);
            $("#txtTeacherLastName").val(teachInfo.LastName);
            $("#txtTeacherDate").val(teachInfo.DateBegan);
            $("#txtTeacherDepartmentId").val(teachInfo.DepartmentId);
        });

    }
}
