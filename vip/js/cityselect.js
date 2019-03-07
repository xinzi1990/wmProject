/*
Ajax 二级省市联动
http://code.ciaoca.cn/
日期：2011-11-16

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
------------------------------ */
(function($){
	$.fn.citySelect=function(settings){
		if(this.length<1){return;};

		// 默认值
		var FF = (navigator.userAgent.indexOf("Firefox")!=-1);
		var js = document.scripts;
		if(FF){
			js = document.getElementsByTagName("script");
		}
		var jsPath;
		if(js){
			for(var i=0;i<js.length;i++)
			{
				if(js[i].src.indexOf("cityselect.js")>-1)
				{
					jsPath = js[i].src.substring(0,js[i].src.lastIndexOf("/")+1);
				}
			}
		}
		//console.log("cityselect path: " + jsPath);
		var url = jsPath + "city.js";
		settings=$.extend({
			url:url,
			prov:null,
			city:null
		},settings);

		var box_obj=this;
		var prov_obj=box_obj.find(".prov");
		var city_obj=box_obj.find(".city");
		var prov_val=settings.prov;
		var city_val=settings.city;
		var city_json,temp_html;

		// 赋值市级函数
		var cityStart=function(){
			var prov_id=prov_obj.get(0).selectedIndex-1;
			city_obj.empty().attr("disabled",true);
			
			if(prov_id==-1||typeof(city_json.citylist[prov_id].c)=="undefined"){return;}
			
			// 遍历赋值市级下拉列表
			temp_html="";
			$.each(city_json.citylist[prov_id].c,function(i,city){
				temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";
			});
			city_obj.html(temp_html).attr("disabled",false);
		};

		// 请求省市json数据
		$.getJSON(settings.url,function(json){
			city_json=json;

			// 遍历赋值省份下拉列表
			temp_html="";
			$.each(city_json.citylist,function(i,prov){
				temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
			});
			prov_obj.append(temp_html);

			// 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
			setTimeout(function(){
				if(settings.prov!=null){
					prov_obj.val(settings.prov);
					cityStart();
					setTimeout(function(){
						if(settings.city!=null){city_obj.val(settings.city);}
					},1);
				};
			},1);
		});

		// 选择省份事件
		prov_obj.bind("change",function(){
			cityStart();
		});
	};
})(jQuery);