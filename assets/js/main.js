$(function() {
// FRONTEND

    // $("#createCustomTag").click(function() {
    //     $('.createTagInterface').toggleClass('createTagInterface-a');
    //     $('.createTagInterface-a').removeClass('createTagInterface');
    // });

    // Date Tag
    document.getElementById('tagDate').valueAsDate = new Date();

    // Main Tag Row
    let tagRow = $('#tagRow');
    tagRow.tagsinput({
        
    });
    // tagRow.tagsinput('add', 'some tag');
    $('.bootstrap-tagsinput > input').remove();

// BACKEND

    // Global Variables
        let tagsData;
        let quickFilterInput = $('#quickFilter');
        let tagsList = $('#tagsList');

    // Get Tags
    function getTags() {
        tagsList.empty();
        $.ajax({
            method: "POST",
            url: "backend/fetch.php",
            data: {
                option: "get_tags"
            },
            dataType: "JSON",
            success: function(data) {
                let tagList = $('#tagsList');
                data.forEach(element => {
                    tagList.append('<li><div class="tagName" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle"></i>' + element.tag_name +'</div><li>');
                });

                tagsData = data;
            }
        });
    }
    getTags();


    // Quick Filter
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

    // Post Tag
    $('#createCustomTag').click(function() {
        let tag = {
            "name": "Audit",
            "abbreviation": "ADT"
        };
        let tagStr = JSON.stringify(tag);
        $.ajax({
            method: "POST",
            url: "backend/fetch.php",
            data: {
                option: "post_tag",
                data: tagStr
            },
            success: function(data) {
                console.log(data);
                getTags();
            }
        });
    });


    // Post Tagline
    $('#copyButton').click(function() {
        let tagline = "asdasd";
        $.ajax({
            method: "POST",
            url: "backend/fetch.php",
            data: {
                option: "post_tagline",
                data: tagline
            },
            success: function(data) {
                console.log(data);
            }
        });
    });
});