

var TeacherDetailsManager = {
    /*Adding/Updating Teacher*/
    SaveTeacher: function () {
        var obj = TeacherDetailsHelper.CreateTeachObj();
        var objTeacher = JSON.stringify(obj);
        var serviceUrl = "";
        /*Checking for update existing or insert new*/
        if (parseInt(obj.TeacherId) == 0) {
            serviceUrl = "https://localhost:5001/api/teacher/AddTeacher";
            AjaxManager.PostApi(serviceUrl, objTeacher, onSuccess, onFailed)
        } else {
            serviceUrl = "https://localhost:5001/api/teacher/UpdateTeacher";
            AjaxManager.PutApi(serviceUrl, objTeacher, onSuccess, onFailed)
        }
        function onSuccess(jsonData) {
            if (jsonData.TeacherId != 0) {
                $("#divDetails").hide();
                TeacherSummaryHelper.FillTeacherInfo(parseInt(obj.TeacherId));
                $("#divDetails").show();
                alert("Saved Successfully");
            }
            else {
                alert(jsonData);
            }
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        /*Assigning teacher to module if selected*/
        var obj2 = TeacherDetailsHelper.CreateAssignObj();
        if (obj2.ModuleId != -1) {
            var objAssign = JSON.stringify(obj2);
            var serviceUrl = "";

            serviceUrl = "https://localhost:5001/api/assignteacher/AddModule";
            AjaxManager.PostApi(serviceUrl, objAssign, onSuccess, onFailed)
            function onSuccess(jsonData) {
                if (jsonData.TeacherId !== 0) {
                    alert("Saved Successfully");
                }
                else {
                    alert(jsonData);
                }
            }
            function onFailed(error) {
                alert(error.statusText);
            }
        } else {

        }
    },
    GetAllTeachersByModule: function (teacherId) {
        var obj = "";
        var serviceUrl = "https://localhost:5001/api/teacher/ModuleTeachers/" + teacherId;
        AjaxManager.GetAPI(serviceUrl, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },
    /*Deleting Student*/
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
        /*Populating Dropdown*/
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "https://localhost:5001/api/module",
                data: "{}",
                success: function (data) {
                    var s = '<option value="-1">Please Select a Module</option>';
                    for (var i = 0; i < data.length; i++) {
                        s += '<option value="' + data[i].ModuleId + '">' + data[i].ModuleDescription + '</option>';
                    }
                    $("#departmentsDropdown").html(s);
                }
            });
        });
        /*Populating Second Dropdown*/
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "https://localhost:5001/api/department",
                data: "{}",
                success: function (data) {
                    var s = '<option value="-1">Please Select a Department</option>';
                    for (var i = 0; i < data.length; i++) {
                        s += '<option value="' + data[i].DepartmentDescription + '">' + data[i].DepartmentDescription + '</option>';
                    }
                    $("#TeacherdepartmentsDropdown").html(s);
                }
            });
        });/*Assigning functions to buttons*/
        $("#btnAdd").click(function () {
            $("#btnSave").text("Save");
            $("#divDetails").show();
            $("#divSummary").hide();
            $("#departmentsDropdown").attr('disabled', true);
            TeacherDetailsHelper.ClearForms();
            /*DatePicker on click*/
            $("#txtTeacherDate").click(function () {
                $("#txtTeacherDate").datepicker({
                    onSelect: function (date, instance) {
                        $("#txtTeacherDate").val(date);
                    }
                }).focus();
            });
        });
        /*Checking for empty values*/
        $("#btnSave").click(function () {
            var msg = "Please Enter the following values:";
            var empty = false;
            if (!($("#txtTeacherFirstName").val())) {
                msg += " First Name";
                empty = true;
            } if (!($("#txtTeacherLastName").val())) {
                msg += ", Last Name";
                empty = true;
            } if (!($("#txtTeacherDate").val())) {
                msg += ", Date";
                empty = true;
            } if (($("#TeacherdepartmentsDropdown").val() == -1)) {
                msg += ", Department";
                empty = true;
            }else {
                TeacherDetailsManager.SaveTeacher();
            }
            if (empty) {
                window.alert(msg);
            }
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
    /*Assigning Modules to Teachers*/
    CreateAssignObj: function () {
        var obj = new Object();
        obj.TeacherId = $("#hdnTeacherId").val();
        obj.ModuleId = $("#departmentsDropdown").val();
        return obj;

    },
    CreateTeachObj: function () {
        var obj = new Object();
        if (obj.TeacherId == "") {
            obj.TeacherId = 0
        } else {
            obj.TeacherId = $("#hdnTeacherId").val();
        }
        obj.FirstName = $("#txtTeacherFirstName").val();
        obj.LastName = $("#txtTeacherLastName").val();
        obj.DateBegan = $("#txtTeacherDate").val();
        obj.DepartmentDescription = $("#TeacherdepartmentsDropdown").val();
        return obj;

    },
    ClearForms() {
        $("#hdnTeacherId").val(0)
        $("#txtTeacherFirstName").val("");
        $("#txtTeacherLastName").val("");
        $("#txtTeacherDate").val("");
        $("#txtTeacherDepartmentDescription").val(-1).change();
    }

}