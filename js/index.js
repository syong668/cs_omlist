$(document).ready(function(){

	if( $(".message-count").text() != 0)
	{
		$(".message-count").show();
	}
	else
	{
		$(".message-count").hide();
	}

	if( $(".message-count").text() >= 10)
	{
		$(".message-count").empty();
		$(".message-count").append("9+");
	}

	//------------------------------------------------//

	const mySideNav = document.querySelector('#mySidenav');
	const mask = document.querySelector('.mask');
	mask.addEventListener('click',(e)=>{
	  mask.style.display="none";
	  closeNav();
	});

	openNav = function() {
	  mySideNav.classList.add('mobile-open');
	  mask.style.display="block";
	}

	closeNav = function() {
	    mySideNav.classList.remove('mobile-open');
	    mask.style.display="none";
    
    	const DD = document.querySelectorAll('.d .d-content');
	    for(let i = 0; i < DD.length; i++){
	      if(DD[i].classList.contains('open')){
	        DD[i].classList.remove('open');
	      }
	    }
	}

	//------------------------------------------------//

	enquire.register("screen and (max-width: 768px)", {
    setup: function() {
        // JavaScript here
        // 網頁載入時執行一次
    },
    match: function() {
        // $(".d-div").click(function(){
        // 		$(this).next().toggle();
        // });
    
	    const dDiv = document.querySelectorAll('.d-div');
	    
	    for(let i = 0; i<dDiv.length;i++){
	      dDiv[i].addEventListener('click',()=>{
	        const nextNode = dDiv[i].nextElementSibling;
	        if(nextNode.classList.contains('open')){
	          nextNode.classList.remove('open');
	        }else{
	          nextNode.classList.add('open');
	        }
	      })
	    }

        // JavaScript here
        // 當CSS media query計算的視窗寬度小於769px時執行
        // 網頁載入時執行一次
        // 之後每次改變視窗時會再執行一次
    },
    unmatch: function() {
        mySideNav.classList.remove('mobile-open');
        mask.style.display="none";
        // JavaScript here
        // 當CSS media query計算的視窗寬度大於等於769px時執行
        // 網頁載入時不會執行
        // 之後每次改變視窗時會再執行一次
    }
	});

});//document ready


