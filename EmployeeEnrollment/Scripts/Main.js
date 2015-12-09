
app.controller("EmpController", function ($scope, EnrollmentServices, AuthenticateUser, IsAuthenticated, $location) {

    $scope.Employee = {};
    $scope.Employee.Salary = 1000;
    $scope.IsItemEditable = false;
    $scope.EmployeeList = [];

    $scope.AcceptEnrollment = function () {
        if ($scope.empForm.$invalid) return false;

        EnrollmentServices.EnrollEmployee($scope.Employee);
        $scope.EmployeeList = EnrollmentServices.GetEnrolledEmployees();
        clearInputs();
    };

    $scope.EditItem = function (index) {
        $scope.IsItemEditable = true;
        $scope.Employee = EnrollmentServices.EditEnrollment(index);
    };

    $scope.UpdateEnrollment = function () {
        if (!$scope.empForm.$invalid) {
            EnrollmentServices.UpdateEnrollment($scope.Employee);
            $scope.EmployeeList = EnrollmentServices.GetEnrolledEmployees();
            clearInputs();
        }
    };

    $scope.RemoveEnrollment = function (empObj) {
        EnrollmentServices.DeleteEnrollment(empObj);
        $scope.EmployeeList = EnrollmentServices.GetEnrolledEmployees();
        clearInputs();
    };

    $scope.SignOut = function () {
        IsAuthenticated.success = AuthenticateUser.SignOut()
    }

    function clearInputs() {
        $scope.IsItemEditable = false;
        $scope.Employee = null;
    }

    (function init() {
        if (!IsAuthenticated.success) {
            $location.path("/login");
        }
    })();
});

