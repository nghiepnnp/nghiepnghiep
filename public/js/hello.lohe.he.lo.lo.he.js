$(document).ready(function () {
    // Xoas het su kien tung kicj
    $('#btn_submit').click(function (e) {
        e.preventDefault();

        $.ajax({
            url: "/account/login",
            data: { name: $('input[name=Name]').val(), pass: $('input[name=Password]').val() },
            dataType: 'json',
            type: 'POST',
            success: function (response) {
                console.log(response)
                if (response.Status == 1) {
                    $('#nameHelp').html('Thông tin tài khoản không chính xác');
                } else if (response.Status == 2) {
                    $('#passHelp').html('Mật khẩu không chính xác');
                } else {
                    location.reload();
                }
            }
        });
    });
});

$(document).ready(function () {
    $('#btn_register').click(function (e) {
        e.preventDefault();
        if ($('.ho').val() == '' || $('.ho').val() == null || $('.ten').val() == '' || $('.ten').val() == null) {
            $('.ho').addClass('is-invalid');
            $('.ten').addClass('is-invalid');
            return;
        }
        if ($('input[name=pass]').val() != $('input[name=repass]').val()) {
            $('.repass-res').addClass('is-invalid');
            return;
        }
        $.ajax({
            url: "/account/register",
            data: {
                FirstName: $('input[name=ten]').val(),
                LastName: $('input[name=ho]').val(),
                PhoneNumber: $('input[name=phone]').val(),
                Password: $('input[name=pass]').val()
            },
            dataType: 'json',
            type: 'POST',
            success: function (response) {
                console.log(response)
                if (response.s == 0) {
                    $('#valiphone').addClass('is-invalid');
                } else {
                    $('#exampleModal').modal('hide');
                    $('#exampleModal').on('hidden.bs.modal', function () {
                        $(this).find("input").val('').end();
                    });
                    $('.notif-bottom').addClass('show');
                    setTimeout(function () {
                        $('.notif-bottom').removeClass('show');
                        // location.reload();
                    }, 5000);
                }
            }
        });
    });
});

$(document).ready(function () {
    $('#btn-addcart').off('click').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var qty = $('#qtyDpt').val();

        $.ajax({
            url: "/cart/addcart",
            data: { qty: qty, id: id },
            dataType: 'json',
            type: 'POST',
            success: function (r) {
                if (r.s == 1) {
                    $('#notif-cart').addClass('show');
                    $('.slc').text(parseInt($('.slc').text()) + 1);
                    $('.list-cart').load('cart/lc');
                    setTimeout(function () {
                        $('#notif-cart').removeClass('show');
                    }, 2000);
                } else {
                    $('#notif-cart').addClass('show');
                    $('.list-cart').load('cart/lc');
                    setTimeout(function () {
                        $('#notif-cart').removeClass('show');
                    }, 2000);
                }
            }
        });
    });
});

// Nút mua ngay .. thêm 1 sp rồi chuyển qua trang thanh toán
$(document).ready(function () {
    $('#add-one-p-t-c').off('click').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var qty = $('#qtyDpt').val();
        $.ajax({
            url: "/cart/addcart",
            data: { qty: qty, id: id },
            dataType: 'json',
            type: 'POST',
            success: function (r) {
                window.location = "cart/thanh-toan";
            }
        });
    });
});

$(document).ready(function () {
    $('.cart-del').off('click').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: "/cart/remove",
            data: { id: id },
            dataType: 'json',
            type: 'POST',
            success: function (r) {
                $('#notif-cart div').text('Đã xóa sản phẩm khỏi giỏ hàng');
                $('#notif-cart').addClass('show');
                $('#checkout').load('cart/cot');
                $('.list-cart').load('cart/lc');
                $('.slc').text(parseInt($('.slc').text()) - 1);
                setTimeout(function () {
                    $('#notif-cart').removeClass('show');
                }, 2000);
            }
        });
    });
});
$(document).ready(function () {
    $('.douc').off('click').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: "/cart/cong",
            data: { id: id },
            dataType: 'json',
            type: 'POST',
            success: function (r) {
                $('#checkout').load('cart/cot');
                $('.list-cart').load('cart/lc');
                $('.valc').val(parseInt($('.valc').val()) + 1);
            }
        });
    })
});
$(document).ready(function (e) {

    $('.dout').off('click').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: "/cart/tru",
            data: { id: id },
            dataType: 'json',
            type: 'POST',
            success: function (r) {
                $('#checkout').load('cart/cot');
                $('.list-cart').load('cart/lc');
                $('.valc').val(parseInt($('.valc').val()) - 1);
            }
        });
    })
})
$(document).ready(function () {
    $('#thanh-toan').click(function () {
        if (window.confirm("Bạn cần đăng nhập để tiếp tục")) {
            $('#exampleModal1').modal('show');
        }
    })
})
function validateForm() {
    if ($('#email').val() == null || $('#email').val() == '') {
        alert('Vui lòng nhập email!');
        return false;
    }else if(($('#address').val() == null || $('#address').val() == '')){
        alert('Vui lòng nhập địa chỉ nhân hàng!');
        return false;
    }
    return true;
}



