

var StudentDetailsManager = {
    SaveStudent: function () {
        var obj = StudentDetailsHelper.CreateStudObj();
        var objStudent = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.StudentId) == 0) {
            serviceUrl = "https://localhost:5001/api/student/AddStudent";
            AjaxManager.PostApi(serviceUrl, objStudent, onSuccess, onFailed)
        } else {
            serviceUrl = "https://localhost:5001/api/student/UpdateStudent";
            AjaxManager.PutApi(serviceUrl, objStudent, onSuccess, onFailed)
        }

        function onSuccess(jsonData) {
            if (jsonData.StudentId !== 0) {
                $("#divDetails").hide();
                $("#divSummary").show();
                StudentSummaryHelper.LoadStudent();
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
    DeleteStudent: function () {
        var obj = StudentDetailsHelper.CreateStudObj();
        var objStudent = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.StudentId) > 0) {
            serviceUrl = "https://localhost:5001/api/student/" + obj.StudentId;
            AjaxManager.DeleteApi(serviceUrl, onSuccess, onFailed)
        }
        function onSuccess(jsonData) {
            if (jsonData.StudentId !== 0) {
                $("#divDetails").hide();
                $("#divSummary").show();
                StudentSummaryHelper.LoadStudent();
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
var StudentDetailsHelper = {
    InitStudentDetails: function () {
        $("#btnAdd").click(function () {
            $("#btnSave").text("Save");
            $("#divDetails").show();
            $("#divSummary").hide();
            StudentDetailsHelper.ClearForms();
        });
        $("#btnSave").click(function () {
            StudentDetailsManager.SaveStudent();
        });
        $("#btnClose").click(function () {
            StudentDetailsHelper.ClearForms();
            $("#divDetails").hide();
            $("#divSummary").show();
        });
        $("#btnClear").click(function () {
            StudentDetailsHelper.ClearForms();
        });
        $("#btnDelete").click(function () {
            StudentDetailsManager.DeleteStudent();
        });
    },
    CreateStudObj: function () {
        debugger;
        var obj = new Object();
        if (obj.StudentId == "") {
            obj.StudentId = 0
        } else {
            obj.StudentId = $("#hdnStudentId").val();
        }
/*        obj.StudentId = $("#hdnStudentId").val();*/
        obj.FirstName = $("#txtStudentFirstName").val();
        obj.LastName = $("#txtStudentLastName").val();
        obj.DateofEnrollment = $("#txtStudentDate").val();
        if ($("#txtStudentActive").is(":checked")) {
            obj.Active = "true"
        } else {
            obj.Active = "false"
            }
        return obj;
    },
    ClearForms() {
        $("#hdnStudentId").val(0)
        $("#txtStudentFirstName").val("");
        $("#txtStudentLastName").val("");
        $("#txtStudentDate").val("");
        $("#txtStudentActive").val(null);
    },

}
