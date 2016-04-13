
app.controller("loginController", ["AuthenticateUser", "EnrollmentServices", "IsAuthenticated", "$location", function (AuthenticateUser, EnrollmentServices, IsAuthenticated, $location) {

    var that = this;
    that.Credentials = null;
    that.IsInvalidLogin = false;
    that.SignIn = function () {
        if (that.frmLogin !== undefined && that.frmLogin.$valid) {
            IsAuthenticated.success = AuthenticateUser.SignIn(that.Credentials);
            that.IsInvalidLogin = !IsAuthenticated.success;
        }
    }

    function init() {
        AuthenticateUser.GetNavigationObject($location);
        IsAuthenticated.success = false;
    };

    init();
}]);

