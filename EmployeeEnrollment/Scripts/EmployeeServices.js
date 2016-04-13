
angular.module("empApp.Services.EmployeeServices", []).factory("Alerts", alertsFactory).service("EnrollmentServices", ["Alerts", empServices]);

function alertsFactory() {
    return {
        Error: "An Error occured while executing operation ",
        Success: "Employee with username as {0} enrolled successfully !",
        WarningMsg: "Employee having user name as {0} already exist",
        UpdateSuccess: "Employee record updated successfully !",
        DelectSuccess: "Employee record deleted successfully !"
    };
};

function empServices(Alerts) {

    var that = this;
    that.EnrollmentList = [];
    that.IndexNumber = -1;

    that.EnrollEmployee = function (empObj) {
        if (empObj) {
            that.EnrollmentList.push(empObj);
            alert(Alerts.Success.replace("{0}", empObj.UserName));
        }
        else {
            alert(Alerts.Error);
        }
    }

    that.EditEnrollment = function (index) {
        if (index > -1) {
            that.IndexNumber = index;
            return that.EnrollmentList[index];
        }
        else {
            alert(Alerts.Error);
            return null;
        }
    }

    that.UpdateEnrollment = function (selectedEmp) {
        if (selectedEmp) {
            that.EnrollmentList[that.IndexNumber] = selectedEmp;
            alert(Alerts.UpdateSuccess);
        }
        else {
            alert(Alerts.Error);
        }
    }

    that.DeleteEnrollment = function (selectedEmp) {
        that.IndexNumber = that.EnrollmentList.indexOf(selectedEmp);
        if (that.IndexNumber > -1) {
            that.EnrollmentList.splice(that.IndexNumber, 1);
            alert(Alerts.DelectSuccess);
        }
        else
            alert(Alerts.Error);
    }

    that.GetEnrolledEmployees = function () {
        return that.EnrollmentList;
    }
}