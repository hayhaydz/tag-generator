$("#createCustomTag").click(function() {
    $('.createTagInterface').toggleClass('createTagInterface-a');
    $('.createTagInterface-a').removeClass('createTagInterface');
});

$(function() {

    let tagsData;

    // Get Tags
    $.ajax({
        method: "POST",
        url: "backend/fetch.php",
        data: {data: "tags"},
        dataType: "JSON",
        success: function(data) {
            let tagList = $('#tagsList');
            data.forEach(element => {
                tagList.append('<li><div class="tagName" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle"></i>' + element.tag_name +'</div><li>');
            });

            tagsData = data;
        }
    });


    // Quick Filter
    let quickFilterInput = $('#quickFilter');
    let tagsList = $('#tagsList');
    quickFilterInput.on('input', function(e) {
        let quickFilterInputValue = quickFilterInput.val();
        if (quickFilterInputValue !== "") {
            let quickFilterData = [];
            for (let i = 0; i < tagsData.length; i++) {
                let tagsDataName = tagsData[i].tag_name.toLowerCase();
                let quickFilterInputValueLC = quickFilterInputValue.toLowerCase();
                if (tagsDataName.includes(quickFilterInputValueLC)) {
                    quickFilterData.push(tagsData[i]);
                }
                
            }

            tagsList.empty();
            quickFilterData.forEach(element => {
                tagsList.append('<li><div class="tagName" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle"></i>' + element.tag_name +'</div><li>');
            });
        } else {
            tagsList.empty();
            tagsData.forEach(element => {
                tagsList.append('<li><div class="tagName" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle"></i>' + element.tag_name +'</div><li>');
            });
        }
    });
});