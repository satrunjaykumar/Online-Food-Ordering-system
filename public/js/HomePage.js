$(document).ready(function(){
  $("#bt2").click(function(){
     var x="<li>"+$("#comment").val() +"</li>";
	 $("#head3").after(x);
	 $("#contact li").css({"line-height":"130%","text-align":"left","color":"white"});
	 $("#comment").val("");
	 $("#box").height("+=30px");
  });


  $("#ab0").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });


  $("#ab1").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });


  $("#ab2").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });

  $("#ab3").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });


  $("#ab1").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });


  $("#ab4").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });


  $("#ab5").hover(function(){
	  $(this).css({"backgroundColor":"rgb(213,249,243)"});
  },
  function(){
	  $(this).css({"backgroundColor":"white"});
  });


  var x=0;
  $(".image").hide();
  $(".image").eq(x).css("display","inline-block");
  function slider(x){
	  $(".image").hide();
	  $(".image").eq(x).css("display","inline-block");
  }
  var t=setInterval(function(){
	  x+=1;
	  x=x%4;
	  slider(x);},15000);
  $(".loginbox").hide();
  
  $("#ab1").click(function(){
	  $("#div1,#miss,#info,#main,#aboutus,#contact,#footer1").addClass("fade1");
      $(".loginbox").eq(0).css("display","inline-block");
  });

  $("#close").click(function(){
      $(".loginbox").eq(0).hide();
	  $("#main,#aboutus,#contact,#footer1,#div1,#miss,#info").removeClass("fade1");
  });

  $("#subt").click(function(){
	  
  });
});