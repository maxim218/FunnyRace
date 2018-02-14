function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function mainMenuPageTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug":"div(class='main-menu-page', hidden)\n    h2 Main Menu Page\n    form(class=\"main-menu-page__form\")\n        input(type=\"button\", value=\"Single player\", class=\"form__single-player-game-button\")\n        div(class=\"vertical-space\")\n        input(type=\"button\", value=\"Multiplayer\", class=\"form__multiplayer-game-button\")\n        div(class=\"vertical-space\")\n        input(type=\"button\", value=\"Game rules\", class=\"form__game-rules-button\")\n        div(class=\"vertical-space\")\n        input(type=\"button\", value=\"About authors\", class=\"form__about-authors-button\")\n        div(class=\"vertical-space\")"};
;pug_debug_line = 1;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"main-menu-page\""+pug_attr("hidden", true, false, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "Main Menu Page\u003C\u002Fh2\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cform class=\"main-menu-page__form\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__single-player-game-button\" type=\"button\" value=\"Single player\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__multiplayer-game-button\" type=\"button\" value=\"Multiplayer\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__game-rules-button\" type=\"button\" value=\"Game rules\"\u002F\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__about-authors-button\" type=\"button\" value=\"About authors\"\u002F\u003E";
;pug_debug_line = 11;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Fmain-menu-page\u002Fmain-menu-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}