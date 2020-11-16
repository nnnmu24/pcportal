
exports.commandObject = {
    explorer:"explorer",
    editor:"notepad",
};

exports.contentObjectGroupMapInit = function() {
    let gmap = new Map();
    gmap.set("content_group_100", {label:"プライベート", element:["content_101", "content_102"]});
    gmap.set("content_group_200", {label:"仕事", element:["content_201", "content_202", "content_203"]});
    gmap.set("content_group_300", {label:"", element:[]});
    gmap.set("content_group_400", {label:"", element:[]});
    gmap.set("content_group_500", {label:"", element:[]});
    gmap.set("content_group_600", {label:"", element:[]});
    gmap.set("content_group_700", {label:"", element:[]});
    gmap.set("content_group_800", {label:"", element:[]});
    gmap.set("content_group_900", {label:"", element:[]});
    return gmap;
}

exports.contentObjectMapInit = function() {
    let cmap = new Map();

    cmap.set("content_001", {type:"plain", label:"", pathAbs: false, path:"data\\notice.txt"});
    cmap.set("content_002", {type:"plain", label:"", pathAbs: false, path:"data\\schedule.txt"});
    cmap.set("content_003", {type:"plain", label:"", pathAbs: false, path:"data\\task.txt"});
    cmap.set("content_004", {type:"plain", label:"", pathAbs: false, path:"data\\readme.txt"});

    cmap.set("content_101", {type:"auto", label:"TODOリスト", pathAbs: false, path:"samplefiles\\プライベートTODO.txt"});
    cmap.set("content_102", {type:"auto", label:"家計簿", pathAbs: false, path:"samplefiles\\家計簿.md"});
    cmap.set("content_201", {type:"auto", label:"TODOリスト", pathAbs: false, path:"samplefiles\\仕事TODO.txt"});
    cmap.set("content_202", {type:"auto", label:"プロジェクト計画書", pathAbs: false, path:"samplefiles\\プロジェクト計画書.html"});
    cmap.set("content_203", {type:"auto", label:"プロジェクト進捗表", pathAbs: false, path:"samplefiles\\プロジェクト進捗表.html"});

    return cmap;
}
