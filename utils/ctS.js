module.exports = {
    Slug: function(str) {
        return str
            .toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
            .replace(/đ/gi, 'd')
            .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
            .replace(/ /gi, '-')
            .replace(/\-\-\-\-\-/gi, '-')
            .replace(/\-\-\-\-/gi, '-')
            .replace(/\-\-\-/gi, '-')
            .replace(/\-\-/gi, '-')
            .replace(/"|'/gi, '')
            .replace(/\@\-|\-\@|\@/gi, '');
    },
    timeNow: function() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes();
        const second = (date.getSeconds() < 10) ? ("0" + date.getSeconds()) : date.getSeconds();

        return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
    },
    fmt: function(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes();
        const second = (date.getSeconds() < 10) ? ("0" + date.getSeconds()) : date.getSeconds();

        return (day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second);
    },
    formatTimeNews: function(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return (day + ' Tháng ' + month + ', ' + year);
    },
    formatDTimeNews: function(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes();

        return ('Đăng lúc ' + hour + 'h' + minute + ', ' + day + ' Tháng ' + month + ', ' + year);
    }
}