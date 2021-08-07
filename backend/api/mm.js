const axios = require("axios");

const apiUrl = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?";

var url = "";

// 处理type
function handleType(type) {
    switch (type) {
        case "down":
            url = url + "custom=most&meta=downs&";
            break;

        case "new":
            url = url + "custom=meta&date=year&";
            break;

        case "collect":
            url = url + "custom=most&meta=favs&";
            break;

        case "hot":
            url = url + "custom=most&";
            break;

        case "rank":
            url = url + "orderby=rand&";
            break;

        default:
            url = url + "custom=meta&date=year&";
            break;
    }
}

// 处理分类
function handleCats(cats) {
    url = url + "categories=" + cats + "&";
}

// 处理page
function handlePage(page) {
    url = url + "per_page=" + page + "&";
}

// 处理标签
function handleTags(tags) {
    url = url + "tags=" + tags + "&";
}

function mm(data = {}, callback) {
    var imgList = [];
    url = "";
    if (data.tags) {
        if (data.type) {
            handleType(data.type);
        }
        handleTags(data.tags);
    } else {
        if (data.type) {
            handleType(data.type);
        } else {
            url = url + "custom=meta&date=year&";
        }
    }

    if (data.cats) {
        handleCats(data.cats);
    }
    if (data.page) {
        handlePage(data.page);
    }
    url = apiUrl + url;
    axios({
        url: url,
        method: "GET",
    }).then((res) => {
        let data = res.data;
        data.forEach((val) => {
            val.wallpaper.forEach((val) => {
                let data = { id: val.id, src: val.full };
                imgList.push(data);
            });
        });
        callback(imgList);
    });
}

function today(callback) {
    var url =
        "https://service.picasso.adesk.com/v1/vertical/category/4e4d610cdf714d2966000000/vertical?limit=10&order=hot&skip=10";
    var imgList = [];
    axios({
        url: url,
        method: "GET",
    }).then((res) => {
        let data = res.data.res.vertical;
        data.forEach((val) => {
            imgList.push(val.preview);
        });
        callback(imgList);
    });
}

module.exports = {
    mm,
    today,
};
