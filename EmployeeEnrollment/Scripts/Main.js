var app = angular.module("empApp", ["empApp.Directives.EmployeeDirective"]);

app.factory("Alerts", function () {
    return {
        Error: "An Error occured while executing operation ",
        Success: "Employee with username as: {0} enrolled successfully !",
        WarningMsg: "Employee having user name as {0} already exist",
        UpdateSuccess: "Employee record updated successfully !",
        DelectSuccess: "Employee record deleted successfully !"
    };
});

app.controller("EmpController", function ($scope, Alerts) {

    $scope.FactoryData = Alerts;
    $scope.UserName = null;
    $scope.FirstName = null;
    $scope.LastName = null;
    $scope.Designation = null;
    $scope.IsItemEditable = false;
    $scope.IndexToUpdate = -1;

    $scope.EmployeeList = [];

    $scope.AcceptEnrollment = function () {
        if ($scope.empForm.$invalid) return false;

        var empObj = null;
        empObj = { UserName: $scope.UserName, FirstName: $scope.FirstName, LastName: $scope.LastName, Designation: $scope.Designation };
        if (empObj) {
            $scope.EmployeeList.push(empObj);
            alert($scope.FactoryData.Success.replace("{0}", $scope.UserName));
            clearInputs();
        }
        else {
            clearInputs();
            alert($scope.FactoryData.Error);
        }
    };

    $scope.EditItem = function (item) {
        if (item) {
            $scope.IndexToUpdate = $scope.EmployeeList.indexOf(item);
            $scope.IsItemEditable = true;
            $scope.UserName = item.UserName;
            $scope.FirstName = item.FirstName;
            $scope.LastName = item.LastName;
            $scope.Designation = item.Designation;
        }
    };

    $scope.UpdateEnrollment = function () {
        if (!$scope.empForm.$invalid) {

            $scope.EmployeeList[$scope.IndexToUpdate].FirstName = $scope.FirstName;
            $scope.EmployeeList[$scope.IndexToUpdate].LastName = $scope.LastName;
            $scope.EmployeeList[$scope.IndexToUpdate].Designation = $scope.Designation;
            clearInputs();
            $scope.IsItemEditable = false;
            alert($scope.FactoryData.UpdateSuccess);
        }        
    };

    $scope.RemoveEnrollment = function (empObj) {
        var index = $scope.EmployeeList.indexOf(empObj);
        if (index > -1) {
            $scope.EmployeeList.splice(index, 1);
            clearInputs();
            alert($scope.FactoryData.DelectSuccess);
        }
        else
            alert($scope.FactoryData.Error);
    };

    function clearInputs() {
        $scope.UserName = null;
        $scope.FirstName = null;
        $scope.LastName = null;
        $scope.Designation = null;
    }
});