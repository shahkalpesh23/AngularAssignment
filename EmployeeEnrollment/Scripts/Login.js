
app.controller("loginController", function (AuthenticateUser, EnrollmentServices, IsAuthenticated) {

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
        IsAuthenticated.success = false;
    };

    init();
});

