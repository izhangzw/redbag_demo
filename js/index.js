function countDown(time_end,time_now,id){
	var hour_elem = $(id).find('.hour');
	var minute_elem = $(id).find('.minute');
	var second_elem = $(id).find('.second');
	
	sys_second = (time_end-time_now)/1000;
	sys_second = parseInt(sys_second);
	
	var timer = setInterval(function(){
		if (sys_second > 0) {
			sys_second -= 1;
			var hour = Math.floor(sys_second / 3600);
			var minute = Math.floor((sys_second / 60) % 60);
			var second = Math.floor(sys_second % 60);
			$(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
			$(minute_elem).text(minute<10?"0"+minute:minute);//计算分钟
			$(second_elem).text(second<10?"0"+second:second);//计算秒
		}else{
			clearInterval(timer);
			$('.redEtxt').html('猛戳发光点')
			$('#colockbox').remove();
			$('.letsGo').removeClass('hidden').addClass('able')
		}
	}, 1000);	
}	

$(document).on('click', '.letsGo.able', function(){
	console.log('Let\'s GO !')
	window.location.href="./game.html";
})
$(function() {	
	var htmlHeight=$(document.body).height();
	var winHeight=$(window).height();
	if(winHeight < htmlHeight){
		$(".cloudImg").removeClass("fixed");
	}
	
	
	var time_end = +new Date()+ 1000;
	var time_now = +new Date();
	countDown(time_end,time_now,"#colockbox");
	
});