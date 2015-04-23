var ignore = false;
var theme = "neo";
var delay = 0;

/**
* SET UP THE <select> TO CHOOSE THEMES
**/

var select_html = "";
for(var i = 0; i < default_themes.length; i++){
  var opt = "<option value=\"" + default_themes[i] + "\">" + default_themes[i] + "</option>";
  select_html += opt;
}
$("#defaults").html(select_html);
$("#defaults").val("neo"); //default
$("#defaults").change(function(){
  setDefaults($("#defaults").val());
});

/**
* SET UP THE <select> TO CHOOSE LANGUAGES
**/

$("#lang").change(function(){
  setLang($("#lang option[value='"+$("#lang").val()+"']").text(), $("#lang").val());
});

/**
* SET UP THE EDITOR
**/

var editor = CodeMirror(document.getElementById("container"),{
    lineNumbers: true,
    mode: "javascript",
    theme: "neo",
    lineWrapping: true,
    indentUnit: 4,
    indentWithTabs: true
});
editor.refresh(); //adjust to fit <div>
editor.on("change",function(cm,change){
    window.setTimeout(function(){ //in order for this to take effect, must first wait for CodeMirror to do its thing
      for(var i = 0; i < values.length; i++){ //otherwise, changes will be overridden by CodeMirror
        $(values[i].name.split(":")[0].replace("?",theme)).css(values[i].name.split(":")[1], values[i].val);
      }
    }, delay); //even a 0 delay is fine
});

function setDefaults(theme_name){
  theme = theme_name;
  ignore = true; //when you set the defaults, don't trigger anything

  values = []; //reset all custom values
  var current_theme = editor.getOption("theme");
  $("#hidden").removeClass("cm-s-" + current_theme);
  $("#hidden").addClass("cm-s-" + theme_name);
  editor.setOption("theme",theme_name);

  for(var i = 0; i < params.length; i++){
    for(var j = 0; j < params[i].attr.length; j++){
      var name = params[i].elem[0] + ":" + params[i].attr[j];
      var val = $(params[i].elem[0].replace("?",theme_name)).css(params[i].attr[j]);
      if(val !== undefined && (typeof val) !== (typeof undefined)){
        if(val === ''){
        }
        else if(val.indexOf("rgba") !== -1){
          //rgba
          var array = val.replace("rgba(","").replace(")","").split(",");
          val = rgbToHex(parseInt(array[0]),parseInt(array[1]),parseInt(array[2]));
          $("input[type='color'][data-color='"+name+"']").val(val);
          //also insert alpha
          var alpha = parseFloat(array[3]);
          $("input.alpha[type='text'][data-color='"+name+"']").val(alpha);

        }
        else{
          //rgb
          var array = val.replace("rgb(","").replace(")","").split(",");
          val = rgbToHex(parseInt(array[0]),parseInt(array[1]),parseInt(array[2]));
          $("input[type='color'][data-color='"+name+"']").val(val);

          $("input.alpha[type='text'][data-color='"+name+"']").val(1);
        }
      }
      else{
      }
    }
  }

  ignore = false; //ok, all good
}

function setLang(name, mime){
  editor.setOption("mode", mime);
  editor.setValue(intro[name]);
}

var values = []; //custom values

var html = "";
for(var i = 0; i < params.length; i++){
  for(var j = 0; j < params[i].attr.length; j++){
    var name = params[i].elem[0] + ":" + params[i].attr[j];
    html += "<div><p data-color=\""+name+"\">" + name.replace(".cm-s-?","") + "</p><input type=\"color\" data-color=\""+name+"\">";
    html += "<small data-color='"+name+"'>opacity</small><input class='alpha' type='text' value='1' data-color='"+name+"'></div>";
  }
  //add element to hidden
  var query = params[i].elem[0];
  var array = query.split(" ");
  if(array.length === 2){
    //has something...
    var info = array[1];
    var tag = "span";
    var _class = "";
    if(info[0] === "."){
      _class = info.replace(".","");
    }
    else if(info[0] !== ":"){ //can't do much about these
      tag = info.split(".")[0];
      _class = info.split(".")[1];
    }

    $("#hidden").append("<" + tag + " class=\"" + _class + "\"></" + tag + ">");
  }
}
$("#sidebar").html(html);

$("input[type='color']").change(function(){
  if(ignore === false){
    var info = $(this).attr("data-color");
    var found = false;
    for(var i = 0; i < values.length; i++){
      if(values[i].name === info){
        found = i;
        break;
      }
    }
    var rgb = hexToRgb($(this).val());
    var color = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + $("input.alpha[type='text'][data-color='"+info+"']").val() + ")";

    if(found === false){
      values.push({name:info,val:color});
    }
    else{
      values[found].val = color;
    }
    $(info.split(":")[0].replace("?",theme)).css(info.split(":")[1],color)
  }
});

$("input[type='text']").change(function(){
  if(ignore === false){
    var info = $(this).attr("data-color");
    var found = false;
    for(var i = 0; i < values.length; i++){
      if(values[i].name === info){
        found = i;
        break;
      }
    }
    var rgb = hexToRgb($("input[type='color'][data-color='"+info+"']").val());
    var color = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + $(this).val() + ")";

    if(found === false){
      values.push({name:info,val:color});
    }
    else{
      values[found].val = color;
    }
    $(info.split(":")[0].replace("?",theme)).css(info.split(":")[1],color)
  }
});

setLang("javascript","javascript");
setDefaults("neo");

function download(){
  //woop! time to export!
  var export_theme = $("#name").val();
  var ok = true;
  for(var i = 0; i < not_allowed.length; i++){
    if(export_theme.indexOf(not_allowed[i]) !== -1){
      ok = false;
    }
  }

  if(ok){

    var text = "/*"+export_theme+"\nCodeMirror theme file created with CodeMirror-Themes\nhttps://github.com/mkaminsky11/codemirror-themes*/\n";
    $("input[type='color']").each(function(index){
      var info = $(this).attr("data-color");
      var rgb = hexToRgb($(this).val());
      var color = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + $("input.alpha[type='text'][data-color='"+info+"']").val() + ")";

      text += info.split(":")[0].replace("?",export_theme) + "{" + info.split(":")[1] + ":" + color + " !important;" + "}\n"
    });

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", text]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = export_theme + ".css";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  else{
    alert("Your theme name contains an illegal character");
  }
}
