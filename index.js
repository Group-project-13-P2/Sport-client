const SERVER = "http://localhost:3000"

$(document).ready(() => {
    const token = localStorage.getItem("token");
    console.log("Access Token : " + token);
    if (token) {
        $("#navbar").show()
        $("#content").show()
        $("#login-page").hide()
    } else {
        $("#navbar").hide()
        $("#content").hide()
        $("#login-page").show()
    }
})

function login(e) {
    e.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email: email,
            password: password
        }
    }).done(response => {
        const token = response.access_token;
        localStorage.setItem("token", token);
        console.log("Logged In!");
        $("#login-page").hide();
        $("#navbar").show();
        $("#content").show();
    }).fail(err => {
        console.log(err);
    })
}

function onSignIn(googleUser) {
    var g_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: SERVER + '/glogin',
        data: {
            g_access_token
        }
    })
    .done(response => {
        localStorage.setItem("access_token", response.g_access_token);
        localStorage.setItem("email", response.email);
    })
    .fail(error => {
        console.log(error);
    })

    $("#login-page").hide();
    $("#navbar").show();
    $("#content").show();
}

function logout() {
    localStorage.removeItem("token");
    $("#navbar").hide()
    $("#content").hide()
    $("#login-page").show()
}

// $(document).ready(function () {
//     $("#navbar").hide();
//     $("#content").hide();
//     $.ajax({
//       type: "GET",
//       url: 'http://localhost:3000/klasemen',
//       dataType: 'json',
//       data: {},
//       success: function (result) {
//         console.table(result.competition)

//       }
//     })
//   });