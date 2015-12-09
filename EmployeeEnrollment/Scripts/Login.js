
var app = angular.module("empApp", ["ngRoute", "empApp.Directives.EmployeeDirective", "empApp.Services.EmployeeServices"]);
app.constant("UserName", "Admin");
app.constant("Password", "Admin@123");
app.value("IsAuthenticated", { success: false });

app.controller("loginController", function (AuthenticateUser, EnrollmentServices, IsAuthenticated) {

    var that = this;
    that.Credentials = null;
    that.IsInvalidLogin = false;
    that.SignIn = function () {
        if (that.frmLogin.$valid) {
            IsAuthenticated.success = AuthenticateUser.SignIn(that.Credentials);
            that.IsInvalidLogin = !IsAuthenticated.success;
        }
    }

    (function init() {
        IsAuthenticated.success = false;
    })();
});

app.provider("AuthenticateUser", function (UserName, Password) {

    var that = this;
    that.locationObj = null;

    that.GetNavigationObject = function (locObj) {
        if (locObj) {
            that.locationObj = locObj;
        }
    }

    that.SignIn = function (creds) {
        if (creds.UserName === UserName && creds.Password === Password) {
            that.locationObj.path("/home")
            return true;
        }
        that.locationObj.path("/login");
        return false;
    }

    that.SignOut = function () {
        that.locationObj.path("/login");
        return false;
    }

    that.$get = function () {
        return that;
    }

});

app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/login", {
            templateUrl: "/Views/Login.html",
            controller: "loginController",
            controllerAs: "login"
        }).when("/home", {
            templateUrl: "/Views/Home.htm",
            controller: "EmpController"
        }).otherwise({
            redirectTo: "/login"
        });
}]);

app.run(function ($location, AuthenticateUser) {

    AuthenticateUser.GetNavigationObject($location);
    $location.path("/login");

});
