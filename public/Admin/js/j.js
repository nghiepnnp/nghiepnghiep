$(document).ready(function() {
    $('#cate1').DataTable({
        columnDefs: [{
            "targets": 'no-sort', // add class to html will no sort
            "orderable": false,
        }],

        "language": {
            "sProcessing": "Đang xử lý...",
            "sLengthMenu": "",
            "sZeroRecords": "Không tìm thấy kết quả phù hợp",
            "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
            "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
            "sInfoFiltered": "(được lọc từ _MAX_ mục)",
            "sInfoPostFix": "",
            "sSearch": "Tìm kiếm:",
            "sUrl": ""

        },
        "searching": false
    });
    $('#product').DataTable({
        columnDefs: [{
            "targets": 'no-sort',
            "orderable": false,

        }],
        "order": [
            // display order
            [2, "desc"]
        ]
    });
});
//tooltip
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

