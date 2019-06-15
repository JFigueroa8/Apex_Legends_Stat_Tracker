$(function() {
    let submitBtn = $('#submit');
    let platformDropDownBtn = $('#platform a');
    let platformUserIdentifier = $('#platformUserIdentifier');
    let results = $('#results');

    // default values
    let dropDownValue = 'xbl';

    submitBtn.click(function() {
        let data = {};
        data.platformUserIdentifier = platformUserIdentifier.val();
        data.dropDownValue = dropDownValue.toLowerCase();
        $.ajax({
            type: "POST",
            url: '/',
            dataType: 'json',
            data: data,
            success: function(data) {
                data = JSON.parse(data);
                // console.log(data);
                displayData(data);
            }
        });
        resetResult();
    });

    platformDropDownBtn.click(function() {
        dropDownValue = $(this).text();
    });

    function resetResult() {
        results.html('');
        platformUserIdentifier.val('');
    }

    function displayData(data) {
        // console.log(data)
        data = data.data;
        let legendsList = data.children;
        let platformUserHandle = data.metadata.platformUserHandle;
        let totalKills = 0;

        legendsList.forEach(legend => {
            totalKills += legend.stats[0].value;
        });

        let template = `<div class="card text-center"> 
                            <h5 class="card-header">${platformUserHandle}</h5>
                            <h5 class="card-header">Total Kills - ${totalKills}</h5>
                        </div>`;

        legendsList.forEach(legend => {
            // console.log(legend);
            template += `<div class="card text-center">
                            <img src=${legend.metadata.icon} alt=""> 
                            <h5 class="card-header">${legend.metadata.legendName}</h5>
                            <div class="card-body"> 
                                <h5 class="card-title">Kills - ${legend.stats[0].value}</h5>
                                <p class="card-text"></p>
                            </div>
                        </div>`;
        })
        // console.log(legendsList);
        // let list =  `<ul class="list-group"> 
        //                 <li class="list-group-item">Solo:  ${data.stats.p2.top1.value} --- Kills: ${data.stats.p2.kills.value}</li>
        //                 <li class="list-group-item">Duos:  ${data.stats.p10.top1.value} --- Kills: ${data.stats.p10.kills.value}</li>
        //                 <li class="list-group-item">Teams:  ${data.stats.p9.top1.value} --- Kills: ${data.stats.p9.kills.value}</li>
        //             </ul>`;

        // let template = `<div class="card text-center"> 
        //                     <h5 class="card-header">${platformUserHandle}</h5>
        //                     <div class="card-body"> 
        //                         <h5 class="card-title">Wins</h5>
        //                         <p class="card-text"></p>
        //                     </div>
        //                 </div>`;

        results.html(template);
    }
});