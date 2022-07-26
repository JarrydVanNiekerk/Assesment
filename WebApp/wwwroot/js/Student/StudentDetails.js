

var StudentDetailsManager = {
    /*Adding/Updating Student*/
    SaveStudent: function () {
        var obj = StudentDetailsHelper.CreateStudObj();
        var objStudent = JSON.stringify(obj);
        var serviceUrl = "";

        /*Checking for update existing or insert new*/
        if (parseInt(obj.StudentId) == 0) {
            serviceUrl = "https://localhost:5001/api/student/AddStudent";
            AjaxManager.PostApi(serviceUrl, objStudent, onSuccess, onFailed)
        } else {
            serviceUrl = "https://localhost:5001/api/student/UpdateStudent";
            AjaxManager.PutApi(serviceUrl, objStudent, onSuccess, onFailed)
        }

        function onSuccess(jsonData) {
            if (jsonData.StudentId !== 0) {
                StudentSummaryHelper.FillStudentInfo(parseInt(obj.StudentId));
                alert("Saved Successfully");
            }
            else {
                alert(jsonData);
            }
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        /*Assigning student to module if selected*/
        var obj2 = StudentDetailsHelper.CreateAssignObj();
        if (obj2.ModuleId != -1) {
            var objAssign = JSON.stringify(obj2);
            var serviceUrl = "";

            serviceUrl = "https://localhost:5001/api/assign/AddModule";
            AjaxManager.PostApi(serviceUrl, objAssign, onSuccess, onFailed)
            function onSuccess(jsonData) {
                if (jsonData.StudentId !== 0) {
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
    /*Deleting Student*/
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
        /*Assigning functions to buttons*/
        $("#btnAdd").click(function () {
            $("#btnSave").text("Save");
            $("#divDetails").show();
            $("#divSummary").hide();
            StudentDetailsHelper.ClearForms();
            /*DatePicker on click*/
            $("#txtStudentDate").mouseup(function () {
                $("#txtStudentDate").datepicker({
                    onSelect: function (date, instance) {
                        $("#txtStudentDate").val(date);
                    }
                }).focus();
            });
        });
        /*Checking for empty values*/
        $("#btnSave").click(function () {
            var msg = "Please Enter the following values:";
            var empty = false;
            if (!($("#txtStudentFirstName").val())) {
                msg += " First Name";
                empty = true;
            } if (!($("#txtStudentLastName").val())) {
                msg += ", Last Name";
                empty = true;
            } if (!($("#txtStudentDate").val())) {
                msg += ", Date";
                empty = true;
            } else {
                StudentDetailsManager.SaveStudent();
            }
            if (empty) {
                window.alert(msg);
            }
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
    /*Assigning Modules to students*/
    CreateAssignObj: function () {
        var obj = new Object();
        obj.StudentId = $("#hdnStudentId").val();
        obj.ModuleId = $("#departmentsDropdown").val();
        return obj;

    },
    CreateStudObj: function () {
        var obj = new Object();
        if (obj.StudentId == "") {
            obj.StudentId = 0
        } else {
            obj.StudentId = $("#hdnStudentId").val();
        }
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
        $("#txtStudentActive").val(-1).change();
    },

}


