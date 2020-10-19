//Slide bay bay bay
$(document).ready(function () {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        autoPlay: 1500, //auto chay slider sau 1s
        singleItem: true,
        slideSpeed: 1000,
        navigation: true,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });

    sync2.owlCarousel({
        items: 5,
        itemsDesktop: [1199, 10],
        itemsDesktopSmall: [979, 10],
        itemsTablet: [768, 8],
        itemsMobile: [479, 4],
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }

    }

});


// Item p
$(document).ready(function () {
    $("#owl-wrap").owlCarousel({
        autoPlay: 5000,
        navigation: true,
        items: 6
    });
});
$(document).ready(function () {

    $("#owl-news").owlCarousel({
        autoPlay: 1000,
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        items: 6
        // "singleItem:true" is a shortcut for:
        // items : 1, 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });
});



$('#modal').modal({ backdrop: 'static', keyboard: false });
//tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
$(document).ready(function () {
    $('.dk-lg').click(function () {
        $('#exampleModal1').modal('hide');
        $('#exampleModal1').on('hidden.bs.modal', function () {
            $(this).find("input").val('').end();
        });
    })
    $('.dn-lg').click(function () {
        $('#exampleModal').modal('hide');
        $('#exampleModal').on('hidden.bs.modal', function () {
            $(this).find("input").val('').end();
        });
    })

})
$(document).ready(function () {
    $('.dn-lg').click(function () {
        $('#exampleModal').modal('hide');
        $('#exampleModal').on('hidden.bs.modal', function () {
            $(this).find("input").val('').end();
        });
    })

})
$(document).ready(function () {

    // $('.valiphone').keydown(function(){
    //     var h = $('.valiphone').val();
    //     console.log(h);
    //     if(typeof h == 'number'){
    //         $(".valiphone").removeClass('is-invalid');
    //         $('.invalid-feedback-valiphone').text("Vui lòng nhập số.");
    //     }else{
    //         $(".valiphone").addClass('is-invalid');
    //     }
    // })
    $('.pass-res').click(function (e) {
        $(this).removeClass('is-invalid');
    })
    $('.repass-res').click(function (e) {
        $(this).removeClass('is-invalid');
    })
    $('.ho').click(function (e) {
        $('.ho').removeClass('is-invalid');
    })
    $('.ten').click(function (e) {
        $('.ten').removeClass('is-invalid');
    })

})
function tru() {
    const soing = parseInt($(".text_view").val());
    if (soing > 1) {
        $(".tru").click(function () {
            $('.text_view').val(soing - 1);
        });
    }
}
function cong() {
    const soing = parseInt($(".text_view").val());
    $(".cong").click(function () {
        $('.text_view').val(soing + 1);
    });
}






//$('#exampleModal').modal('show',{backdrop: 'static', keyboard: false});




// $(document).ready(function () {
//     var submit = $("button[type='submit']");

//     submit.click(function () {
//         var data = $('form#form_login').serialize();
//         $.ajax({
//             type: 'POST',
//             url: 'http://127.0.0.1:2/account/login',
//             data: data,
//             done: function (data) {
//                 if (data == '0' || data == 0) {
//                     $('#form_login #nameHelp').html('Fail');
//                 } else {
//                     $('#form_login #nameHelp').html('OK');
//                 }
//             }
//         });
//     });
// });

//var obj = JSON.parse(data);



// $('#form_login #btn_submit').click(function () {
//     var name = $('#name').val();
//     var pass = $('#pass').val();
//     login(name, pass);
// });
// login = function (name, pass) {
//     $.ajax({
//         type: 'POST',
//         data: { name: name, pass: pass },
//         dataType: 'json',
//         url: '127.0.0.1:2/account/login',
//        // url: location.protocol + '//' + location.host + '/login',
//         success: function (data) {
//             console.log(data);
//         },
//         error: function (xhr, status, err) {
//             console.log(err);
//         }
//     });
// }

// $.ajax({
//     url: '127.0.0.1:2/account/login',
//     type: 'POST',
//     dataType: "json",
//     data: {
//         Name: $("#name").val(),
//         Pass: $("#pass").val()
//     },
//     contentType: "application/json",
//     success: function (data) {
//         console.log(data);
//     }
// });




// Vadidation form ---------------------------------------------------
$(document).ready(function () {
    $('#form_login #btn_submit').click(function () {
        $name = $('input[name=Name]').val();
        $pass = $('input[name=Password]').val();
        //console.log($name, $pass);
        $('#nameHelp').html('');
        $('#passHelp').html('');
        if ($name == "" || $name == null) {
            $('#nameHelp').html('Vui lòng nhập tài khoản');
        }
        if ($pass == '') {
            $('#passHelp').html('Vui lòng nhập mật khẩu');
        }
        $(this).html('Kểm tra..');
    });

})
$('#form_login #name').click(function () {
    $('#form_login #btn_submit').html('Đăng nhập');
})
$('#form_login #pass').click(function () {
    $('#form_login #btn_submit').html('Đăng nhập');
})

$(document).ready(function () {
    // if($('.main-menu ul li ul li[text=""]').length==0){
    //     $('.main-menu ul li ul li[text=""]').text("1")
    // }
    console.log("Test1");

    for (let i = 0; i < $('.main-menu>ul>li').length; i++) {
        // if ($('.main-menu ul li ul li').text() == "") {
        //     console.log(i);
        // }
        //$('.main-menu ul li').text();

        // if($('.main-menu>ul>li>ul').text().trim() == ''){
        //     console.log("Rong")
        // }else{
        //     console.log("Khong rong")
        //     $('.main-menu>ul>li>ul').height(500);
        // }
        //  $('.main-menu>ul').text();
        // console.log($('.main-menu>ul>li>ul>li').text());

        let h = $('.main-menu>ul>li>ul>li').text().trim();
        console.log(h)
        break;
    }

    // $('.des-exp').height(300);
})

    function executeExample() {
        Swal.fire('Any fool can use a computer');
    };

