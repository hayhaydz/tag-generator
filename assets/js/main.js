$(function() {
 // FRONTEND

    // $("#createCustomTag").click(function() {
    //     $('.createTagInterface').toggleClass('createTagInterface-a');
    //     $('.createTagInterface-a').removeClass('createTagInterface');
    // });

    // Date Tag
    document.getElementById('tagDate').valueAsDate = new Date();

    // Set date in tag to todays date
    let dateVal = new Date().toLocaleDateString();
    let currentInputVal = $('#tagRow').val();
    let inputValArr = currentInputVal.split(',');
    let tagRowDateLoc = inputValArr.length - 3;
    let newInputValArr = inputValArr.splice(tagRowDateLoc, 1, dateVal);
    let inputVal = inputValArr.join();
    $('.mainTagRow').val(inputVal);

    // Main Tag Row
    let tagRow = $('#tagRow');

    function initTagsInput() {
        tagRow.tagsinput({});
        $('.bootstrap-tagsinput > input').remove();
        // Disable removing certain tags
        let mainTags = $('.tag');
        mainTags[0].children[0].remove();
        mainTags[1].children[0].remove();
        mainTags[mainTags.length - 1].children[0].remove();
        mainTags[mainTags.length - 2].children[0].remove();
        mainTags[mainTags.length - 3].children[0].remove();
    }
    initTagsInput();

    // Adding tags to main tag row
    // Version tag for main tag row
    let tagName = $('#tagBrandName');
    tagName.on('input', function() {
        let tagNameVal = tagName.val();
        if (tagNameVal !== "") {
            let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (!specialChars.test(tagNameVal)) {
                tagRow.tagsinput('destroy');
                let tagName = tagNameVal.replace(/\s/g, '-');
                let currentInputVal = $('#tagRow').val();
                let inputValArr = currentInputVal.split(',');
                let newInputValArr = inputValArr.splice(1, 1, tagName);
                let inputVal = inputValArr.join();
                $('.mainTagRow').val(inputVal);
                initTagsInput();
            } else {
                console.log('special characters in brand name');
            }
        }
        else {
            tagRow.tagsinput('destroy');
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let newInputValArr = inputValArr.splice(1, 1, "Brand-Name");
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
    });

    // Date tag for main tag row
    let tagDate = $('#tagDate');
    tagDate.on('change', function() {
        let tagDateVal = tagDate.val();
        if (tagDateVal !== "") {
            tagRow.tagsinput('destroy');
            let currentDateVal = tagDate.val();
            let dateVal = new Date(currentDateVal).toLocaleDateString();
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let tagRowDateLoc = inputValArr.length - 3;
            let newInputValArr = inputValArr.splice(tagRowDateLoc, 1, dateVal);
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
        else {
            tagRow.tagsinput('destroy');
            let todayDateL = new Date();
            let todayDate = todayDateL.toLocaleDateString();
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let tagRowDateLoc = inputValArr.length - 3;
            let newInputValArr = inputValArr.splice(tagRowDateLoc, 1, todayDate);
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
    });

    // Version tag for main tag row
    let tagVersion = $('#tagVersion');
    tagVersion.on('change', function() {
        let tagVersionVal = tagVersion.val();
        if (tagVersionVal !== "0") {
            tagRow.tagsinput('destroy');
            let currentVersionVal = tagVersion.val();
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let tagRowVersionLoc = inputValArr.length - 2;
            let newInputValArr = inputValArr.splice(tagRowVersionLoc, 1, "v" + currentVersionVal);
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
        else {
            tagRow.tagsinput('destroy');
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let tagRowVersionLoc = inputValArr.length - 2;
            let newInputValArr = inputValArr.splice(tagRowVersionLoc, 1, "V1");
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
    });

    // Variant tag for main tag row
    let tagVariant = $('#tagVariant');
    tagVariant.on('change', function() {
        let tagVariantVal = tagVariant.val();
        if (tagVariantVal !== "0") {
            tagRow.tagsinput('destroy');
            let currentVariantVal = tagVariant.val();
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let tagRowVariantLoc = inputValArr.length - 1;
            let newInputValArr = inputValArr.splice(tagRowVariantLoc, 1, currentVariantVal);
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
        else {
            tagRow.tagsinput('destroy');
            let currentInputVal = $('#tagRow').val();
            let inputValArr = currentInputVal.split(',');
            let tagRowVersionLoc = inputValArr.length - 1;
            let newInputValArr = inputValArr.splice(tagRowVersionLoc, 1, "A");
            let inputVal = inputValArr.join();
            $('.mainTagRow').val(inputVal);
            initTagsInput();
        }
    });

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
                        initTagsInput();
                    });

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
        function copyToClipboard(text) {
            var placeholderTextarea = document.createElement("textarea");
            document.body.appendChild(placeholderTextarea);
            placeholderTextarea.value = text;
            placeholderTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(placeholderTextarea);
        }
        let taglineO = document.getElementById('tagRow').value;
        let tagline = taglineO.replace(/,/g,'-');
        copyToClipboard(tagline);
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

