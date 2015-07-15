
angular.module("empApp.Directives.EmployeeDirective", []).directive("employeeListDirective", function () {
    return {
        restrict: "A",
        scope: {
            empList: "=",
            editEnrollment: "&",
            removeEnrollment: "&"
        },
        templateUrl: "/Views/EmployeeDirective.html",
    };
}).directive("uniqueEmp", function ($parse, Alerts) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (iScope, iEle, iAttrs, ngModel) {
            //this works like =
            var empList = $parse(iAttrs.uniqueEmp)(iScope), isUnique = true;
            //this works like @
            //var empList = iScope.$eval(iAttrs.uniqueEmp), isUnique = true;
            function isUniqueEmployee(value) {
                if (!empList) return true;

                empList.filter(function (e) {
                    if (e.UserName.toLowerCase() === value.toLowerCase()) {
                        if (!iScope.IsItemEditable) {
                            isUnique = false;
                            alert(Alerts.WarningMsg.replace("{0}", value));
                            return false;
                        }
                        return false;
                    }
                    else {
                        isUnique = true;
                        return true;
                    }
                });
                return isUnique;
            }

            ngModel.$validators.uniqueEmp = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                if (value) {
                    return isUniqueEmployee(value);
                }
                return true;
            }
        }
    };
});