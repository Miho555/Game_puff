//section 1
//APIのキー：Google
var KEY = 'APIKey'
var url = 'https://vision.googleapis.com/v1/images:annotate?key='
var api_url = url + KEY
//APIのキー：Azure
var subscriptionKey = 'APIKey'
var uriBase = 'https://ENDPOINT/face/v1.0/detect'


//section 2
//画面の表示内容をクリアする処理
function clear(){
    if($("#chartArea div").length){
        $("#chartArea div").remove();
    }
    if($("#chartArea2 div").length){
        $("#chartArea2 div").remove();
    }
}

//section 3
//画像がアップロードされた時点で呼び出される処理
$("#uploader").change(function(evt){
    console.time('timerG');
    getImageInfo(evt);
    console.time('timerM');
    processImage(evt);
    clear();
    $(".resultArea").removeClass("hidden")
})

//section 4
//画像ファイルを読み込み、APIを利用するためのURLを組み立てる
function getImageInfo(evt){
    var file = evt.target.files;
    var reader = new FileReader();
    var dataUrl = "";
    reader.readAsDataURL(file[0]);
    reader.onload = function(){
        dataUrl = reader.result;
        $("#showPic").html("<img src='" + dataUrl + "'>");
        makeRequest(dataUrl,getAPIInfo);
    }
}

//section 5
//APIへのリクエストに組み込むJsonの組み立て
function makeRequest(dataUrl,callback){
    var end = dataUrl.indexOf(",")
    //var request = "{'requests': [{'image': {'content': '" + dataUrl.slice(end + 1) + "'},'features': [{'type': 'LABEL_DETECTION','maxResults': 10,},{'type': 'FACE_DETECTION',},{'type':'TEXT_DETECTION','maxResults': 20,}]}]}"
    var request = "{'requests': [{'image': {'content': '" + dataUrl.slice(end + 1) + "'},'features': [{'type': 'FACE_DETECTION',}]}]}"
    callback(request)
}

//section 6
//通信を行う
function getAPIInfo(request){
    $.ajax({
        url : api_url,
        type : 'POST',       
        async : true,        
        cashe : false,
        data: request, 
        dataType : 'json', 
        contentType: 'application/json',   
    }).done(function(result){
        console.timeEnd('timerG'); 
        showResult(result);
    }).fail(function(result){
        alert('failed to load the info');
    });  
}

//section 7
//得られた結果を画面に表示する
function showResult(result){
    //表情分析の結果の表示
    if(result.responses[0].faceAnnotations){
        //この変数に、表情のlikelihoodの値を配列として保持する
        var facialExpression = [];
        var vison = [];
        facialExpression.push(result.responses[0].faceAnnotations[0].joyLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].sorrowLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].angerLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].surpriseLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].headwearLikelihood);
        for (var k = 0; k < facialExpression.length; k++){
            if (facialExpression[k] == 'UNKNOWN'){
                facialExpression[k] = 0;
            }else if (facialExpression[k] == 'VERY_UNLIKELY'){
                facialExpression[k] = 2;
            }else if (facialExpression[k] == 'UNLIKELY'){
                facialExpression[k] = 4;
            }else if (facialExpression[k] == 'POSSIBLE'){
                facialExpression[k] = 6;
            }else if (facialExpression[k] == 'LIKELY'){
                facialExpression[k] = 8;
            }else if (facialExpression[k] == 'VERY_LIKELY'){
                facialExpression[k] = 10;
            }
            vison[k] = facialExpression[k] / 10.0;
        }
        console.log(vison);
        //チャート描画の処理
        $("#chartArea").highcharts({
            chart: {
                polar: true,
                type: 'line'
            },
            title: {
                text: 'Cloud Vision API : Google',
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: ['joy', 'sorrow', 'anger', 'surprise','headwear'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max:10,
                min: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            series: [{
                name: 'likelihood',
                data: facialExpression,
                pointPlacement: 'on'
            }]
        })
    }else{
        //表情に関する結果が得られなかった場合、表示欄にはその旨を記す文字列を表示
        $("#chartArea").append("<div><b>No person can be found in the picture</b></div>");
    }
}

// Section 8 Azure
//APIを利用するためのURLを組み立て,通信を行う
function processImage(evt){
        var file2 = evt.target.files;
        var file3 = file2[0];
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "emotion",
        };

        var reader2 = new FileReader();

        reader2.readAsDataURL(file3);
        //通信を行う
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKey);
            },
            type: "POST",
            data: file3,
            processData: false,
        })
        .done(function(data) {
            console.timeEnd('timerM'); 
            showResult_M(data);
    })
    .fail(function() {
        alert("error");
    });
    
}

//section 9
//得られた結果を画面に表示する
function showResult_M(result){
    //表情分析の結果の表示
    if(result[0].faceAttributes.emotion){
        console.log(result[0].faceAttributes.emotion);
        //この変数に、表情のlikelihoodの値を配列として保持する
        var facialExpression = [];
        //怒り
        facialExpression.push(result[0].faceAttributes.emotion.anger);
        //軽蔑
        facialExpression.push(result[0].faceAttributes.emotion.contempt);
        //嫌悪
        facialExpression.push(result[0].faceAttributes.emotion.disgust);
        //恐れ
        facialExpression.push(result[0].faceAttributes.emotion.fear);
        //幸福
        facialExpression.push(result[0].faceAttributes.emotion.happiness);
        //中性
        facialExpression.push(result[0].faceAttributes.emotion.neutral);
        //悲しみ
        facialExpression.push(result[0].faceAttributes.emotion.sadness);
        //驚き
        facialExpression.push(result[0].faceAttributes.emotion.surprise);
        for (var k = 0; k < facialExpression.length; k++){
            facialExpression[k] = facialExpression[k] * 10.0;
            if (facialExpression[k] == 0){
                facialExpression[k] = 2;
            }else if (facialExpression[k] > 0 && facialExpression[k] < 1.25){
                facialExpression[k] = 3;
            }else if (facialExpression[k] >= 1.25 && facialExpression[k] < 2.5){
                facialExpression[k] = 4;
            }else if (facialExpression[k] >= 2.5 && facialExpression[k] < 3.75){
                facialExpression[k] = 5;
            }else if (facialExpression[k] >= 3.75 && facialExpression[k] < 5.0){
                facialExpression[k] = 6;
            }else if (facialExpression[k] >= 5.0 && facialExpression[k] < 6.25){
                facialExpression[k] = 7;
            }else if (facialExpression[k] >= 6.25 && facialExpression[k] < 7.5){
                facialExpression[k] = 8;
            }else if (facialExpression[k] >= 7.5 && facialExpression[k] < 8.75){
                facialExpression[k] = 9;
            }else if (facialExpression[k] >= 8.75){
                facialExpression[k] = 10;
            }
        }
        //チャート描画の処理
        $("#chartArea2").highcharts({
            chart: {
                polar: true,
                type: 'line'
            },
            title: {
                text: 'FACE API : Azure',
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max:10,
                min: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            series: [{
                name: 'likelihood',
                data: facialExpression,
                pointPlacement: 'on'
            }]
        })
    }else{
        //表情に関する結果が得られなかった場合、表示欄にはその旨を記す文字列を表示
        $("#chartArea").append("<div><b>No person can be found in the picture</b></div>");
    }
}