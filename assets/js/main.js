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
    tagRow.tagsinput({});
    $('.bootstrap-tagsinput > input').remove();

    // Adding tags to main tag row
    let tagName = $('#tagName');
    let tagDate = $('#tagDate');
    let tagVersion = $('#tagVersion');
    let tagVariant = $('#tagVariant');

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
                    tagList.append('<li><div class="tagName mainTag" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle mainTagAdd"></i>' + element.tag_name +'</div><li>');
                });

                tagsData = data;

                // Frontend after tags are loaded in
                    let mainTag = $('.mainTagAdd');
                    mainTag.click(function() {
                        let tagIDfull = $(this).parent().attr('id');
                        let tagIDString = tagIDfull.replace('tag_id_', '');
                        let tagID = parseInt(tagIDString);
                        let tagAbbreviation;
                    
                        tagsData.forEach(element => {
                            if (element.tag_id == tagIDString) {
                                tagAbbreviation = element.tag_abbreviation;
                            }
                        });
                    
                        tagRow.tagsinput('destroy');
                        let currentInputVal = $('#tagRow').val();
                        let inputValArr = currentInputVal.split(',');
                        let newInputValArr = inputValArr.splice(2, 0, tagAbbreviation);
                        let inputVal = inputValArr.join();
                        $('.mainTagRow').val(inputVal);
                        tagRow.tagsinput({});
                        $('.bootstrap-tagsinput > input').remove();
                    });

            }
        });
    }
    getTags()


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
                tagsList.append('<li><div class="tagName mainTag" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle mainTagAdd"></i>' + element.tag_name +'</div><li>');
            });
        } else {
            tagsList.empty();
            tagsData.forEach(element => {
                tagsList.append('<li><div class="tagName mainTag" id="tag_id_' + element.tag_id + '"><i class="fal fa-plus-circle mainTagAdd"></i>' + element.tag_name +'</div><li>');
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