window.luckNum = 1;

var $chTxt = $('.ch.txt');
var $enTxt = $('.en.txt');
var data_ch = { 
	loop: false,
	in:{
		effect: "fadeInDownBig",
		shuffle: true,
		callback: function(){
			
		}
	}
};
var data_en = { 
	loop: false,
	in:{
		effect: "flip",
		shuffle: true,
		callback: function(){
			setTimeout(function(){
				$('.txtWrapper').fadeOut(1000)
				countDown(4,init);
			},1000)
		}
	}
};
//$chTxt.textillate(data_ch)
//$enTxt.textillate(data_en)

// 3,2,1倒计时
var timer = 0;
function countDown(value,callback){
	var value = parseInt(value);
	var $count = $('.count');
	timer = setInterval(function(){
		var vvvvv = value;
		var removeObj = $('.count'+(vvvvv+1));
		if(removeObj) removeObj.remove()
		if(value>0){
			value--;
			$($count[value]).removeClass('hidden');
		}else{
			callback()
			clearInterval(timer)
		}
	}, 1000)
}


const NUMBER_OF_LEAVES = 50;
 
function init(){
	var container = document.getElementById('leafContainer');
	for (var i = 0; i < NUMBER_OF_LEAVES; i++){
		//var flg = /^.?$|^(..+?)\1+$/.test(i);
		//console.log(i+'===='+flg)
	    container.appendChild(createALeaf(i));
	}
}
function randomInteger(low, high){
    return low + Math.floor(Math.random() * (high - low));
}
function randomFloat(low, high){
    return low + Math.random() * (high - low);
}
function pixelValue(value){
    return value + 'px';
}
function durationValue(value){
    return value + 's';
}
function createALeaf(i){
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    image.src ='../img/snow.png';
    leafDiv.style.top = "-50px";
    leafDiv.style.left = pixelValue(randomInteger(0, 1000));
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    leafDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;
    var fadeAndDropDuration = durationValue(randomFloat(5, 11));
    var spinDuration = durationValue(randomFloat(4, 8));
    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
    image.style.webkitAnimationDuration = spinDuration;
    image.className="mocha";
    $(image).attr('data-id',i);
    leafDiv.appendChild(image);
    return leafDiv;
}

function isPrimeNumber(num){
	var flag = false;
	for( i =2 ; i <= Math.sqrt(num) ; i++){
		if(num % i == 0){
			flag=false;
			break;
		}else{
			flag=true;
		}
	}
	return flag;
}
function getLook(name){
	var gif = '<img src="../img/gif/10'+name+'.gif"/>';
	return gif;
}
$(document).on('click', '.mocha', function(){
	var $o = $(this);
	var i = $o.attr('data-id');
	if(isPrimeNumber(i)){
		var msg = '中奖啦！';
		var look = '';//表情
		if(window.luckNum==1){
			msg = window.luckNum+'次就捉到红包君，简直是火眼金睛啊';
			msg += getLook('0')
		}else if(window.luckNum>1 && window.luckNum<=3){
			msg = window.luckNum+'次尝试就抢到大红包，开挂了吧~少侠';
			msg += getLook('0')
		}else if(window.luckNum>3 && window.luckNum<=5){
			msg = '看你骨骼惊奇，我这有一本《抢不到》密集你要不要.只有点到'+window.luckNum+'次空包的人，我才会卖给他';
			msg += getLook('3')
		}else if(window.luckNum>5 && window.luckNum<=10){
			msg = 'duang~~ 加了'+window.luckNum+'次特技，红包终于出现了';
			msg += getLook('6')
		}else if(window.luckNum>10 && window.luckNum<=20){
			msg = '抢了'+window.luckNum+'次才抢到有钱的，你是故意的吧';
			msg += getLook('5')
		}else if(window.luckNum>20 && window.luckNum<=30){
			msg = '我知道红包很调皮，但也不至于点了'+window.luckNum+'次吧';
			msg += getLook('5')
		}else{
			msg = '有梦想就有希望，你是一个坚持不懈的人，为了红包屏幕都快戳坏了吧...<br/>我很敬佩你的运气，'+window.luckNum+'次空不是盖的';
			msg += getLook('1')
		}
		
		$('#leafContainer').remove();
		$('.step3').find('.msg').html(msg);
		$('.step3').removeClass('hidden');
	}else{
		window.luckNum++;
		var empty = '';
		switch(window.luckNum){
			case 1: empty = '空';break;
			case 2: empty = '空的';break;
			case 3: empty = '空空空';break;
			case 4: empty = 'Ke ong';break;
			case 5: empty = '还是空的';break;
			case 6: empty = '依然是空的';break;
			case 7: empty = '空的阿阿阿阿';break;
			case 8: empty = '你可以的，还是空';break;
			case 9: empty = '泥嚎，我姓空，苍井空的空';break;
			case 10: empty = '刚才我旁边的就是个土豪，你不点';break;
			case 11: empty = '今天我来教大家一个汉字：“空”';break;
			case 12: empty = '莫非阁下就是当年大抢空包的孙悟空!?';break;
			case 13: empty = '悟空~~陪为师去西天取经吧';break;
			case 14: empty = '悟空！你个逆徒，竟然把为师的话当耳旁风';break;
			case 15: empty = '你个泼猴，别以为你化作人形我就认不出你';break;
			case 16: empty = '啊~啊~啊~五环，你又拿到一空的~';break;
			case 17: empty = '别理我，烦';break;
			default: empty= '空的！';
		}
		toastr.warning(empty)
	}
})


var goonTimer = '';
$(document).on('click', '.goOn.able', function(){
	$('.goOn').removeClass('able')
	sessionStorage.already = 1;
	goonTimer = setInterval(function(){
		$('.goOn').addClass('able')
		clearInterval(goonTimer)
	}, 3000)
	window.location.href="./gameOver.html";
});
$(function(){
	if(!sessionStorage.already){
		$chTxt.textillate(data_ch)
		$enTxt.textillate(data_en)
	}else{
		$('.goOn').trigger('click')
	}
})