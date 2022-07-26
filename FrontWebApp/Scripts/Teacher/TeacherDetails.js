

var TeacherDetailsManager = {
    SaveTeacher: function () {
        var obj = TeacherDetailsHelper.CreateTeachObj();
        var objTeacher = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.TeacherId) == 0) {
            serviceUrl = "https://localhost:5001/api/teacher/AddTeacher";
            AjaxManager.PostApi(serviceUrl, objTeacher, onSuccess, onFailed)
        } else {
            serviceUrl = "https://localhost:5001/api/teacher/UpdateTeacher";
            AjaxManager.PutApi(serviceUrl, objTeacher, onSuccess, onFailed)
        }

        function onSuccess(jsonData) {
            if (jsonData.TeacherId !== 0) {
                $("#divDetails").hide();
                $("#divSummary").show();
                TeacherSummaryHelper.LoadTeacher();
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
    DeleteTeacher: function () {
        var obj = TeacherDetailsHelper.CreateTeachObj();
        var objTeacher = JSON.stringify(obj);
        var serviceUrl = "";

        if (parseInt(obj.TeacherId) > 0) {
            serviceUrl = "https://localhost:5001/api/teacher/" + obj.TeacherId;
            AjaxManager.DeleteApi(serviceUrl, onSuccess, onFailed)
        }
        function onSuccess(jsonData) {
            if (jsonData.TeacherId !== 0) {
                $("#divDetails").hide();
                $("#divSummary").show();
                TeacherSummaryHelper.LoadTeacher();
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
var TeacherDetailsHelper = {
    InitTeacherDetails: function () {
        $("#btnAdd").click(function () {
            $("#btnSave").text("Save");
            $("#divDetails").show();
            $("#divSummary").hide();
            TeacherDetailsHelper.ClearForms();
        });
        $("#btnSave").click(function () {
            TeacherDetailsManager.SaveTeacher();
        });
        $("#btnClose").click(function () {
            TeacherDetailsHelper.ClearForms();
            $("#divDetails").hide();
            $("#divSummary").show();
        });
        $("#btnClear").click(function () {
            TeacherDetailsHelper.ClearForms();
        });
        $("#btnDelete").click(function () {
            TeacherDetailsManager.DeleteTeacher();
        });
    },
    CreateTeachObj: function () {
        debugger;
        var obj = new Object();
        if (obj.TeacherId == "") {
            obj.TeacherId = 0
        } else {
            obj.TeacherId = $("#hdnTeacherId").val();
        }
/*        obj.TeacherId = $("#hdnTeacherId").val();*/
        obj.FirstName = $("#txtTeacherFirstName").val();
        obj.LastName = $("#txtTeacherLastName").val();
        obj.DateBegan = $("#txtTeacherDate").val();
        obj.Department = $("#txtTeacherDepartmentId").val();
        return obj;
    },
    ClearForms() {
        $("#hdnTeacherId").val(0)
        $("#txtTeacherFirstName").val("");
        $("#txtTeacherLastName").val("");
        $("#txtTeacherDate").val("");
        $("#txtTeacherDepartmentId").val("");
    }
}