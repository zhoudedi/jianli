var context={fontsize:$("#field-list").attr("fontsize")||"15px",fontcolor:$("#field-list").attr("fontcolor")||"666666",fontfamily:$("#field-list").attr("fontfamily")||"Helvetica Neue",linespace:$("#field-list").attr("linespace")||"1.6em",blockspace:$("#field-list").attr("blockspace")||"20px",resumeMd5:null,coverMd5:null,letterMd5:null,autoSaveHandle:null,timeDownHandle:null,hasSavedToServer:true,saveTimeDown:30,saveToServerLoading:function(){$(".header-top-center i.layui-icon-saved").hide();$(".header-top-center i.layui-anim-loop").css("display","inline-block");$(".header-top-center .resume-autosave").text("正在保存...");$(".header-top-center #operate-save").css("display","none");clearInterval(this.timeDownHandle);clearTimeout(this.autoSaveHandle);this.saveTimeDown=30},savedToServer:function(a){if(!context.user){layer.msg("请先登录");return false}if("boolean"!==typeof a){layer.msg("保存失败");return false}if(a){if(!this.hasSavedToServer){$(".header-top-center .resume-status").hide();$(".header-top-center i.layui-icon-saved").show();$(".header-top-center i.layui-anim-loop").hide();$(".header-top-center .resume-autosave").text(context.now()+" 已保存");$(".header-top-center #operate-save").css("display","none");this.hasSavedToServer=true}$("#page-info .resume-typing").hide()}else{$(".header-top-center .resume-status").show();$(".header-top-center i.layui-icon-saved").hide();$(".header-top-center i.layui-anim-loop").hide();$(".header-top-center .resume-autosave").text("30s 后自动保存");$(".header-top-center #operate-save").css("display","inline-block");this.hasSavedToServer=false;$("#page-info .resume-typing").show();if(this.timeDownHandle){clearTimeout(this.timeDownHandle);this.saveTimeDown=30}this.timeDownHandle=setInterval(function(){context.saveTimeDown--;if(0==context.saveTimeDown){clearInterval(this.timeDownHandle)}$(".header-top-center .resume-autosave").text(context.saveTimeDown+"s 后自动保存")},1500);if(this.autoSaveHandle){clearTimeout(this.autoSaveHandle)}this.autoSaveHandle=setTimeout(function(){if(context.user&&!context.hasSavedToServer){var b=context.getResumeContent();var c=$.md5(b||"");if(context.resumeMd5!=c){context.saveResumeData(b,function(){context.resumeMd5=c})}else{context.saveToServerLoading();context.savedToServer(true)}}},30*1500)}},historyBakArr:[],historyBak:function(a){a.time=this.now();a.cancel=false;this.historyBakArr.push(a);historyPanelRender();$("#resume-his span.layui-badge").text(this.historyBakArr.length).show()},print:function(b,a){if(window.opera){this.createPrintWindow(b,a);return}this.gPrintFrame=this.createPrintIframe(b,a);var c=this;this.gPrintFrame.onload=function(){c.gPrintFrame.contentWindow.focus();c.gPrintFrame.contentWindow.print()}},gPrintFrame:null,createPrintIframe:function(content,style){var iframe=document.getElementById("print-iframe");if(!iframe){iframe=document.createElement("iframe");iframe.id="print-iframe";with(iframe.style){position="absolute";left="-10000px";top="-10000px"}document.body.appendChild(iframe)}var html="";html+="<!DOCTYPE html><html><head>";html+=style;html+="</head><body>";html+=content;html+="</body></html>";var doc=iframe.contentWindow.document;doc.open();doc.write(html);doc.close();return iframe},createPrintWindow:function(c,b){var e=window.open("");var a="";a+="<!DOCTYPE html><html><head>";a+=b;a+='</head><body onload="window.print(); window.opener=self; self.close();">';a+=c;a+="</body></html>";var d=e.document;d.open();d.write(a);d.close();return e},now:function(){var b=new Date();var e=b.getFullYear();var f=b.getMonth()+1<10?"0"+(b.getMonth()+1):b.getMonth()+1;var d=b.getDate()<10?"0"+b.getDate():b.getDate();var a=b.getHours()<10?"0"+b.getHours():b.getHours();var g=b.getMinutes()<10?"0"+b.getMinutes():b.getMinutes();var c=b.getSeconds()<10?"0"+b.getSeconds():b.getSeconds();return a+":"+g},cookie:{set:function(c,d,a){var b=new Date();b.setTime(b.getTime()+a*24*3600*1000);document.cookie=c+"="+d+((a==null)?"":";expires="+b.toGMTString())+";path=/"},get:function(e){var c=document.cookie.replace(/[ ]/g,"");var f=c.split(";");var b;for(var d=0;d<f.length;d++){var a=f[d].split("=");if(e==a[0]){b=a[1];break}}return b},del:function(b){var a=new Date();a.setTime(a.getTime()-10000);document.cookie=b+"=v;expires="+a.toGMTString()}},blocktitle:{zh:{cvtitle:"个人简历",baseinfo:"基本信息",intention:"求职意向",education:"教育背景",work:"工作经历",practice:"实践经历",project:"项目经历",honer:"荣誉奖项",hobby:"兴趣爱好",ability:"专业技能",skill:"技能水平",evaluation:"自我评价"},en:{cvtitle:"Resume",baseinfo:"Summary",intention:"Intention",education:"Education",work:"Careers",practice:"Practices",project:"Projects",honer:"Honors",hobby:"Hobbies",ability:"Skills&Cert",skill:"Skills",evaluation:"Evaluation"}},skilllevel:{zh:{average:"了解",good:"掌握",advanced:"熟练",expert:"精通"},en:{average:"Average",good:"Good",advanced:"Advanced",expert:"Expert"}},trace:function(b){if(b&&("undefined"!=typeof _hmt)){var a=b.split("-");if(a.length>=3){console.log("trace=>"+b);_hmt.push(["_trackEvent",a[0],a[1],a[2]])}}},pv:function(a){if(a&&("undefined"!=typeof _hmt)){console.log("pv=>"+a);_hmt.push(["_trackPageview",a])}},err:function(a){$.get(context.host+"common/errorlog",{msg:a},function(b){})}};window.console=window.console||(function(){var a={};a.log=a.warn=a.debug=a.info=a.error=a.time=a.dir=a.profile=a.clear=a.exception=a.trace=a.assert=function(){};return a})();$("body").on("click",".jlb-btn-login",function(){if($(this).attr("data-uid")){location.href=context.host+"profile";return false}var c='<div id="login-left" class="jlb-bg-b" style="position:relative;width:350px;height:500px;float:left;">';c+='<div class="login-banner" style="position:absolute;width:100%;height:100%;left:0px;top:0px;background:url('+context.res+'images/jlbbg_login.png) center center /350px no-repeat;"></div>';c+='<div class="login-logo" style="position:absolute;left:20px;top:0px;width:100%;"><img src="'+context.res+'images/logo.png" width="120"><span style="color:#fff;float:right;margin:22px 40px 0 0;font-size:13px;opacity:0.5;">一个专门写简历的网站</span></div>';c+="</div>";c+='<div id="login-right" style="width:400px;height:500px;float:right;position:relative;">';c+='<div id="login-weixin">';c+='<div class="login-header" style="position: relative;height: 50px;line-height: 50px;text-align: left;font-size: 20px;padding: 10px 30px;background: url(/static/images/jlbico_loginph.png) right top no-repeat;">微信扫码登录';c+='<a href="javascript:void(0);" style="position: absolute;right: 0px;top: 0px;padding: 10px 50px;font-size: 13px;color: #667CFF;"><i class="layui-icon" style="font-size: 13px;">&#xe678;</i> 手机账号登录</a>';c+="</div>";c+='<div class="login-body" style="text-align: center;padding-top:40px;">';c+='<div class="login-qrcode" style="width:220px;height:220px;margin:18px auto;background:url('+context.res+'lib/layui/css/modules/layer/default/loading-2.gif) center center no-repeat;border:1px #f0f0f0 solid;"></div>';c+='<span style="display: block; margin-top: -12px; font-size: 12px; color: #999;">可在电脑和微信同步编辑简历</span>';c+="</div>";c+="</div>";c+='<div id="login-phone" style="display: none;">';c+='<div class="login-header" style="position: relative;height: 50px;line-height: 50px;text-align: left;font-size: 20px;padding: 10px 30px;background: url(/static/images/jlbico_loginqr.png) right top no-repeat;">手机账号登录';c+='<a href="javascript:void(0);" style="position: absolute;right: 0px;top: 0px;padding: 10px 50px;font-size: 13px;color: #667CFF;"><i class="layui-icon" style="font-size: 14px;">&#xe677;</i> 微信扫码登录</a>';c+="</div>";c+='<div class="login-body" style="text-align: center;padding-top:80px;">';c+='<form class="layui-form" lay-filter="cvoptions" action="">';c+='<div class="layui-inline" style="margin:10px 0px;">';c+='<div class="layui-input-inline" style="margin:0px;width:280px">';c+='<input type="text" name="login_phone" lay-verify="limit" placeholder="输入手机号" class="layui-input" style="background:url('+context.res+'images/ico_login_phone.png) 5px center no-repeat; background-size: 18px; padding-left: 35px;">';c+="</div>";c+="</div>";c+='<div class="layui-inline" style="margin:10px 0px;">';c+='<div class="layui-input-inline" style="margin:0px;width:280px">';c+='<input type="text" name="login_code" lay-verify="limit" placeholder="短信验证码" class="layui-input" style="background:url('+context.res+'images/ico_login_code.png) 5px center no-repeat; background-size: 18px; padding-left: 35px;">';c+="</div>";c+='<label class="layui-form-label" style="border:none;background:none;position:absolute;right:0px;top:0px;cursor:pointer;width:95px;font-size:13px;">发送验证码</label>';c+="</div>";c+="</form>";c+='<button class="layui-btn layui-btn-normal jlb-bg-b" style="width:280px;margin-top:20px;height:42px;line-height:42px;">登录</button>';c+="</div>";c+="</div>";c+='<div class="login-footer" style="background:#F5F7FA;color:#999;position: absolute;left:0;right:0;bottom:0;text-align:center;height:50px;line-height:50px;font-size: 12px;">微博/QQ老用户登录后在「个人中心 &gt; 账号设置」绑定老账号</div>';c+="</div>";var b=null;var g=null;var a=60;var f=0.5;var e=true;var d=2;if(-1!=location.href.indexOf("account/login")){f=0;e=false;d=0}layer.open({type:1,title:"",content:c,anim:d,shade:f,shadeClose:e,area:["750px","500px"],closeBtn:false,success:function(k,i){k.find(".layui-layer-content").css("overflow","hidden").css("padding","0").css("height","500px").css("border-radius","5px");context.cts=new Date().getTime()/1000;$.post(context.host+"weixin/getqrcode",{},function(l){try{l=$.parseJSON(l);if(0==l.retCode){k.find(".login-qrcode").html("<img src="+l.data.qrcode+' style="width:100%;height:100%;">');k.find("#login-weixin").data("scene_id",l.data.scene_id);b=setInterval(h,1200)}else{layer.msg("二维码加载失败")}}catch(m){layer.msg("二维码加载失败")}}).error(function(){layer.msg("网络请求异常");var l="readyState:"+err.readyState+", status:"+err.status+", statusText:"+err.statusText+", responseText:"+err.responseText;context.err("/getqrcode：userId="+context.user+"&errText="+l+"&cts="+context.cts+"&sts="+(new Date().getTime()/1000));layer.close(i)});function h(){context.cts=new Date().getTime()/1000;$.post(context.host+"account/wxmplogin",{scene_id:k.find("#login-weixin").data("scene_id"),redirect:!context.redirect?"":context.redirect},function(l){try{l=$.parseJSON(l);if(0==l.retCode){layer.msg("登录成功");clearInterval(b);setTimeout(function(){if(!context.redirect){location.reload()}else{location.href=context.redirect}},1000)}else{if(-1==l.retCode){layer.msg("登录失败")}else{if(-2==l.retCode){layer.msg("请重新扫码")}}}}catch(m){layer.msg("登录失败")}}).error(function(m){layer.msg("网络请求异常");var l="readyState:"+m.readyState+", status:"+m.status+", statusText:"+m.statusText+", responseText:"+m.responseText;context.err("/wxmplogin：userId="+context.user+"&errText="+l+"&cts="+context.cts+"&sts="+(new Date().getTime()/1000));layer.close(i)})}if(-1==location.href.indexOf("account/login")){setTimeout(function(){clearInterval(b);layer.close(i)},3*60*1000)}k.find("#login-weixin .login-header a").click(function(){$("#login-weixin").slideUp(200);$("#login-phone").slideDown(200);if(b){clearInterval(b)}});k.find("#login-phone .login-header a").click(function(){$("#login-phone").slideUp(200);$("#login-weixin").slideDown(200);if(k.find("#login-weixin").data("scene_id")){b=setInterval(h,1200)}});k.find("#login-phone .layui-form label").click(function(){$this=$(this);var l=k.find('input[name="login_phone"]').val();if($this.data("sended")){return false}if(!(/^1[3456789]\d{9}$/.test(l))){layer.msg("手机格式不正确");return false}$this.data("sended",true);$this.html('<font color="#666">60s后重新发送</font>');$this.css("cursor","auto");g=setInterval(function(){a--;if(0==a){$this.data("sended","");$this.html("发送验证码");$this.css("cursor","pointer");a=60;clearInterval(g)}else{$this.html('<font color="#666">'+a+"s后重新发送</font>")}},1200);$.post(context.host+"account/sendcode",{phone:l},function(m){try{m=$.parseJSON(m);if(0==m.retCode){}else{layer.msg(m.retText)}}catch(n){layer.msg("发送失败")}}).error(function(){layer.msg("发送失败")})});k.find("#login-phone .login-body button").click(function(){j()});k.find('input[name="login_code"]').keyup(function(l){if(l.keyCode==13){j()}});function j(){var m=k.find('input[name="login_phone"]').val();var l=k.find('input[name="login_code"]').val();if(!(/^1[3456789]\d{9}$/.test(m))){layer.msg("手机格式不正确");return false}if(!(/^\d{6}$/.test(l))){layer.msg("验证码格式不正确");return false}$.post(context.host+"account/smslogin",{phone:m,code:l,redirect:!context.redirect?"":context.redirect},function(n){try{n=$.parseJSON(n);if(0==n.retCode){layer.msg("登录成功");setTimeout(function(){if(!context.redirect){location.reload()}else{location.href=context.redirect}},1000)}else{layer.msg(n.retText)}}catch(o){layer.msg("登录失败")}}).error(function(){layer.msg("登录失败")})}},end:function(){clearInterval(b);clearTimeout(g);a=60}});context.trace("common-login-loginopen")});$("body").on("click","#vip-btn, #vip-link, #jlb-vip-btn",function(){if(!context.user){layer.msg("请先登录");return false}if("vip-life"==context.vip){layer.msg("您已是终身VIP");return false}layer.open({type:1,title:"升级VIP",content:$("#vip-panel"),shadeClose:true,area:"900px",success:function(b,a){context.pv("/vip/vipopen")},});if(/MicroMessenger/.test(navigator.userAgent)){$('#vip-panel form[name="vipForm"]').attr("method","get")}});$("#vip-panel .vip-box-btn .pay-btn-ali").click(function(){layer.closeAll();layer.open({type:1,title:false,closeBtn:false,area:"300px",shade:0.7,resize:false,btn:["支付完成"],btnAlign:"c",content:'<p style="text-align:center;">支付成功后可在<a href="'+context.host+'profile#t=order" style="color:#667CFF;text-decoration:underline;">个人中心</a>查看支付记录</p>',success:function(b,a){context.pv("/vip/vipalipay")},yes:function(){context.pv("/vip/vipalipaysucc");location.reload()}});$('#vip-panel form[name="vipForm"]').submit()});$("#vip-panel .vip-box-btn .pay-btn-wx").click(function(){var c="";var e="";var d=layer.open({type:1,title:"微信支付",content:"",shadeClose:true,btnAlign:"c",area:["400px","360px"],success:function(g,f){g.find(".layui-layer-title").css("border-bottom","none");g.find(".layui-layer-content").css("background","url("+context.res+"lib/layui/css/modules/layer/default/loading-2.gif) center 110px no-repeat");$.ajax({type:"post",url:"/payment/wxpay",data:$('#vip-panel form[name="vipForm"]').serialize(),async:true,dataType:"json",success:function(i){g.find(".layui-layer-content").css("background","");if(i.retCode==0){c=i.data.qr;e=i.data.order_id;var h='<img style="width:200px;height:200px;display:block;margin:0 auto;border:1px #f0f0f0 solid;" src="'+c+'"></img><p style="text-align:center;margin-top:10px;">微信扫码支付：￥<font color="#FF832B" style="font-size:18px;"><b>'+i.data.amount+"</b></font></p>";g.find(".layui-layer-content").html(h)}else{layer.msg(i.retText);setTimeout(function(){layer.close(f);clearInterval(b)},1000)}},error:function(){layer.msg("支付失败，服务器异常")}});context.pv("/vip/vipwxpay")},end:function(f,g){clearInterval(b)}});var a=0;var b=setInterval(function(){a++;$.ajax({type:"post",url:"/payment/queryorderstate",data:{order_id:e},async:false,dataType:"json",success:function(f){if(f.retCode==0){clearInterval(b);layer.msg("支付成功，页面刷新后生效",{time:0,btn:["立即刷新"],btnAlign:"c",shade:0.5,btn1:function(g,h){layer.close(g);location.reload()}})}}});if(a>100){clearInterval(b);layer.msg("二维码已经过期，请重新支付",{time:0,btn:["知道了"],btnAlign:"c",shade:0.5,btn1:function(f,g){layer.close(f);layer.close(d)}})}},1500)});var vip={"vip-day":{title:"简历本基础VIP",amount:"9.9"},"vip-month":{title:"简历本基础VIP",amount:"9.9"},"vip-year":{title:"简历本包年VIP",amount:"19.9"},"vip-life":{title:"简历本终身VIP",amount:"39.9"}};$("#vip-panel .vip-item").click(function(){var a=$(this).attr("id");if(a=="vip-free"){return false}$("#vip-panel .vip-item").removeClass("vip-item-curr");$(this).addClass("vip-item-curr");var b=$(this).attr("expire");var d=vip[a]["amount"];var c=vip[a]["title"];b=!b?"":"（"+b+"到期）";$("#vip-panel .vip-box-amount span").html('合计金额：<font size="6" color="#FF832B"><b>'+d+'</b></font> 元 &nbsp;<font color="#888">'+b+"</font>");$('#vip-panel input[name="amount"]').val(d);$('#vip-panel input[name="title"]').val(c);$('#vip-panel input[name="itemId"]').val(a)});if("undefined"!=typeof layui&&(layui.device().ie||/Edg/.test(navigator.userAgent))){var _browserName="Edge";if(layui.device().ie){_browserName="IE"}else{if(/Edg/.test(navigator.userAgent)){_browserName="Edge"}}layui.use("layer",function(){if(layui.device().ie&&layui.device().ie<9){layui.use("layer",function(){layer.alert("您正在使用低版本IE浏览器，将严重影响操作体验，推荐使用Chrome、Firefox、360等更优秀的浏览器",{title:"提示",closeBtn:false,shade:0.7,zIndex:19999999},function(){location.href=context.host+"error/ie"})})}else{try{if(!sessionStorage.getItem("useEdge")){layer.confirm("您正在使用"+_browserName+"浏览器，Windows自带IE、Edge浏览器经常存在不可描述的问题，推荐使用Chrome、Firefox、360等更优秀的浏览器",{title:"提示",btn:["更换浏览器","继续使用"],closeBtn:false,shade:0.7,zIndex:19999999},function(){location.href=context.host+"error/ie"},function(){sessionStorage.setItem("useEdge","true")})}}catch(a){console.log(a)}}})}if("undefined"!=typeof layui){layui.use("util",function(){layui.util.fixbar({bar1:"&#xe63a;",bgcolor:"#AAA",click:function(a){if(a==="bar1"){window.open("/feedback")}}})})}$("body").on("click",".jlb-search-btn",function(){context.trace("common-search-search");var c=$(this).prev().val();if(!c){layer.msg("请输入搜索内容");return false}else{var b=/[^\u4e00-\u9fa5a-zA-Z]/g;c=c.replace(b,"");if(!c){layer.msg("请输入搜索内容");return false}if(c.length>30){c=c.substring(0,30)}}var a=location.protocol+"//"+location.host;if(-1!=location.href.indexOf("/search/")){location.href=a+"/search/?kw="+c}else{window.open(a+"/search/?kw="+c)}});$("body").on("keyup",'input[name="jlb-search-input"]',function(a){var b=a||window.event;if(b.keyCode==13){$(".jlb-search-btn").click()}});$("body").on("mousedown","*[data-trace]",function(){context.trace($(this).attr("data-trace"))});$("body").on("click",".jlb-btn-makecv",function(){var d=$(this).attr("tplkey")||context.tplkey;var b=$(this).attr("tplcon")&&$(this).attr("tplcon")>1000?("&c="+$(this).attr("tplcon")):"";var c=-1!=location.href.indexOf("english")||$(this).attr("tpllang")?"&l=en":"";var a=context.host+"editor/?t="+d+b+c;if($(this).attr("covid")){a=a+"#cover"}location.href=a});$("body").on("click",".jlb-btn-downtpl",function(){if(!context.user){$(".jlb-btn-login").click();return false}var c=$(this).attr("tplkey")||context.tplkey;var b=$(this).attr("tplcon")?("&c="+$(this).attr("tplcon")):"";var a=context.host+"editor/?t="+c+b+"#down";if($(this).attr("covid")){a=a+"#cover"}location.href=a});$(".mycv-link").click(function(){if(context.user){location.href=context.host+"profile"}else{$(".jlb-btn-login").click()}});(function(){var b=["/muban/makecv/","/advisor/"];for(var a=1;a<=4;a++){if(-1!=location.href.indexOf(b[a-1])){$(".jlb-header .jlb-nav .layui-nav-item:eq("+a+")").addClass("layui-this");break}}})();$(".jlb-friendlinks-more").toggle(function(){$(this).parent().css("height","45px");$(this).html("展开▾")},function(){$(this).parent().css("height","auto");$(this).html("收起▴")});if("/"==location.pathname){var _banner_index=1;var _banner_slogan=["简历本，一个专门写简历的网站","专业简历模板，标准简历就长这样","智能简历编辑，大大节省排版时间","随时随地使用，手机同步编辑下载"];var _banner_size=["480px","400px","420px","400px"];setInterval(function(){_banner_index++;_banner_index=_banner_index>4?1:_banner_index;$(".jlb-banner-image").fadeOut(0,function(){$(".jlb-banner-image").css({"background-image":"url("+context.res+"images/jlbbg_index"+_banner_index+".png)","background-size":_banner_size[_banner_index-1]}).fadeIn(200)});$(".jlb-banner-slogan h1").fadeOut(0,function(){$(".jlb-banner-slogan h1").html(_banner_slogan[_banner_index-1]).fadeIn(10)});if(_banner_index%2==0){$(".jlb-header").addClass("jlb-bg-p")}else{$(".jlb-header").removeClass("jlb-bg-p")}},4000);$(".jlb-btn-start").click(function(){var a=layer.open({type:1,title:false,closeBtn:false,area:"300px",shade:false,resize:false,content:'<a class="jlb-case-close" href="javascript:void(0);" style="position: absolute;top:0px;right:0px;background:rgba(0,0,0,0.5);color:#fff;font-size:24px;border-radius:0px 0px 0px 100%;box-sizing:border-box;width:50px;height:50px;text-align:right;padding:8px 10px;">X</a>',success:function(c,b){c.css({"border-radius":"0px","background-color":"#f5f7fa"});c.find(".layui-layer-setwin").css({right:"25px",top:"25px"});c.find(".layui-layer-content").css({padding:"30px 0px",background:"url("+context.res+"lib/layui/css/modules/layer/default/loading-0.gif) center center no-repeat"});c.on("click","a.jlb-case-close",function(){layer.close(b)});$.post(context.host+"index/panel",{},function(d){try{c.find(".layui-layer-content").html(d)}catch(f){layer.msg("模板加载失败");layer.close(b)}}).error(function(){layer.msg("网络请求异常");layer.close(b)})},});layer.full(a)})};
