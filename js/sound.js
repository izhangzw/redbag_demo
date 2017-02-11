var sndloaded=false;
var sndobj=null;
var initplayed=false;



function InitSnd(){
    if(sndobj==null){
        initplayed=false;
        $("#btnmusic").removeClass("on");
        sndobj=new Audio();
        sndobj.preload=true;
        sndobj.autoplay=true;
        sndobj.loop=true;
        sndobj.addEventListener("playing",function(){
            initplayed=true;
            $("#btnmusic").addClass("on");
        });
        sndobj.addEventListener("pause",function(){
            $("#btnmusic").removeClass("on");
        });
        sndobj.addEventListener("waiting",function(){
            $("#btnmusic").removeClass("on");
        });
        sndobj.src="../js/music.mp3";
        sndloaded=true;
        sndobj.play();
    }else{
        if(initplayed==false){
            sndobj.play();
            initplayed=true;
        }
    }
/*
    $("#btnmusic").unbind("touchend").bind("touchend",function(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if($(this).hasClass("on")){
            sndobj.pause();
            $(this).removeClass("on");
        }else{
            sndobj.play();
            $(this).addClass("on");
        }
        return false;
    });*/
	$(document).on('click','#btnmusic', function(){
		var $o = $(this);
		var isPlaying = $o.hasClass('on');
		if(isPlaying){
			sndobj.pause();
            $(this).removeClass("on");
		}else{
			sndobj.play();
            $(this).addClass("on");
		}
	})
}
InitSnd()