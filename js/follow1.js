//date range
$(function () {
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: "Clear",
        },
        autoApply: true, //(true/false) 隱藏應用和取消按鈕，並在單擊兩個日期後自動應用新的日期範圍。
    });

    $('input[name="datefilter"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
            $(this).val(
                picker.startDate.format("YYYY/MM/DD") +
                    " - " +
                    picker.endDate.format("YYYY/MM/DD")
            );
        }
    );

    $('input[name="datefilter"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
            $(this).val("");
        }
    );
});

//調用lightbox方法
//官網:https://lokeshdhakar.com/projects/lightbox2/#getting-started
lightbox.option({
    fadeDuration: 0, //淡出持續時間
    imageFadeDuration: 0, //圖像加載後淡入所需的時間
    resizeDuration: 0, //調整大小持續時間
});

//撈取事件case，並逐一列出
$(function () {
    $.ajax({
        url: "js/NewData.json",
        type: "GET",

        //成功的話資料會傳到data變數
        success: function (data) {
            console.log(data.data);
            console.log(data.data.length);

            //跑事件的迴圈
            for (let i = 0; i < data.data.length; i++) {

              //利用map取得值，組好留言內容的html，append塞進去
              const MESSAGE = data.data[i].MESSAGE.map((el) => {
                return `<div class="process explain border-bottom">
                  <div class="rename">
                    <h3 class="textbold">${el.ACCOUNT}</h3>
                  </div>
      
                  <p>
                  ${el.CONTENT}
                  </p>
      
                  <div class="recorder text-black-50">${el.Time}</div>
                </div>`
              }).join('');


              $("#followlist").append(
                `  
                  <!--單則事件區塊(case)-->
                  <div class="case bg">

                    <div class="status border-bottom">
    
                      <div class="left">
                        <h2 class="titlesize textbold">${data.data[i]["status"]}</h2>
                        <span class="titlesize">${data.data[i]["START_TIME"]} - ${data.data[i]["END_TIME"]}</span>
                      </div>
        
                      <div class="right">
                        <img class="btn" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" src="img/menu.svg" alt="">
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editcase">編輯</a></li>
                          <li><a class="dropdown-item" href="#">上傳圖檔</a></li>
                          <li><a class="dropdown-item" href="#">刪除</a></li>
                        </ul>
                      </div>

                    </div>
    
                    <div class="tag">
                      <span class="badge rounded-pill tag-bg">${data.data[i]["product"]}</span>
                    </div>
    
                    <div class="explain">
                      ${data.data[i]["description"]}
                    </div>
    
                    <div class="recorder p-25 border-bottom text-black-50">
                      <span>by ${data.data[i]["recorder"]}</span>
                    </div>
    

                    <!-- 連結 -->
                    <div class="link explain">
                    <a data-lightbox="image-1" data-title="圖片" href="https://i.imgur.com/hbmLmYGl.jpg">圖片1</a>
                    <a data-lightbox="image-2" data-title="圖片" href="https://i.imgur.com/pTmtqJOl.jpg">圖片2</a>
                    <a href="${data.data[i]["url"]}" target="_blank">Teams連結</a>
                    </div>
    

                    <!-- 展開/隱藏整個 detail -->
                    <div class="detail-btn p-25">
                      <span class="btn-content"></span>
                    </div>
    
                    <!-- 留言區 + 回覆輸入區 -->
                    <div class="detail">
                
                      <!-- 留言區 -->
                      <div class="process-block">
                        ${MESSAGE}
                      </div>
                
                
                      <!-- 回覆輸入區 -->
                      <div class="reply">
                
                        <textarea class="form-control" rows="3"></textarea>
                
                        <div class="recorder">
                          <input class="submit-btn" type="button" value="回覆">
                        </div>
                
                      </div>
                    </div><!-- detail end -->
                  </div><!--case end-->
                  `
              );

            }

            //status文字樣式顯示原則
            $(function () {
              //狀態為：未結案、已結案(持續追蹤)、未結案(持續追蹤)，添加字體顏色為紅色
              const h2Tag = document.querySelectorAll("h2");

              for (let i = 0; i < h2Tag.length; i++) {
                  if (
                      h2Tag[i].textContent == "未結案" ||
                      h2Tag[i].textContent == "已結案(持續追蹤)" ||
                      h2Tag[i].textContent == "未結案(持續追蹤)"
                  ) {
                      h2Tag[i].classList.add("h2color");
                  } else {
                      h2Tag[i].classList.remove("h2color");
                  }
              }
            });

            //tag 標籤顯示原則
            $(function () {
              // 標籤內容為空值or無影響 隱藏標籤；否則 顯示標籤
              const tag = document.querySelectorAll(".tag > span");
          
              for (let i = 0; i < tag.length; i++) {
                  if (tag[i].textContent == "") {
                      tag[i].style.display = "none";
                  } else if (tag[i].textContent == "無") {
                      tag[i].style.display = "none";
                  } else {
                      tag[i].style.display = "block";
                  }
              }
            });

            // 回覆按鈕的click收合
            $(function () {
              $(".detail-btn").click(function () {
                  $(this).next().toggle();
              });
            });
            
            // 留言回覆區的顯示原則
            $(function () {
              //找到共有幾個 .process-block
              //計算不同的 .process-block，底下的.process個別有幾個
              //判斷留言的數量(.process) 並且在 .btn-content顯示對應文字
              const pro = document.querySelectorAll(".process-block");

              for (let i = 0; i < pro.length; i++) {
                  const p = pro[i].querySelectorAll(".process"); //算第i個 .process-block 底下的process有幾個

                  const btn = document.querySelectorAll(".btn-content"); //全部的.btn-content

                  for (let j = 0; j < btn.length; j++) {
                      if (p.length == 0) {
                          btn[i].textContent = "補充說明";
                      } else {
                          btn[i].textContent = p.length + "則回覆";
                      }
                  }
              }
            });            



        },
    });
});

//載入編輯回覆頁面
$("#edit-reply").load("edit-reply.html");

//載入編輯事件頁面
$("#edit-case").load("edit-case.html", function () {
    //已結案按鈕顯示原則
    $(".end-input").change(function () {
        //當已結案被勾選後，出現填寫日期時間的input
        if ($(".end-input").prop("checked") == true) {
            $(".form-endtime").show();
        } else {
            $(".form-endtime").hide();
            $(".form-endtime").val(""); //取消已結案 => 結案時間清空
        }
    });

    //for編輯事件
    //若datetime-local內value不為空，則顯示。
    //且已結案也要是勾選的狀態
    if ($(".form-endtime").val() != "") {
        $(".form-endtime").show();
        $(".end-input").prop("checked", "true");
    }
});

//載入新增事件頁面
$("#add-case").load("add-case.html", function () {
    //已結案按鈕顯示原則
    $(".end-input2").change(function () {
        //當已結案被勾選後，出現填寫日期時間的input
        if ($(".end-input2").prop("checked") == true) {
            $(".form-endtime2").show();
        } else {
            $(".form-endtime2").hide();
            $(".form-endtime2").val(""); //取消已結案 => 結案時間清空
        }
    });
});
