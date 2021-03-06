function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function logInPageTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug":"div(class='log-in-page', hidden)\n    h2 Log In Page\n    form(class=\"log-in-page__form\")\n        span Login\n        br\n        input(type=\"text\", spellcheck =\"false\", autocomplete=\"off\", maxlength=\"10\", class=\"form__login-input-field\", placeholder=\"Maxim\")\n        div(class=\"vertical-space\")\n        span Password\n        br\n        input(type=\"password\", spellcheck=\"false\", autocomplete =\"off\", maxlength =\"10\", class=\"form__password-input-field\", placeholder=\"secret123\")\n        div(class =\"vertical-space\")\n        input(type=\"button\", value=\"Log In\", class=\"form__log-in-button\")\n        div(class=\"vertical-space\")\n    span(class=\"log-in-page__link-to-sign-up-page\") Sign Up Page\n    div(class=\"vertical-space\")\n    div(class=\"log-in-page__message-box\")\n    div(class=\"vertical-space\")"};
;pug_debug_line = 1;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"log-in-page\""+pug_attr("hidden", true, false, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "Log In Page\u003C\u002Fh2\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cform class=\"log-in-page__form\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "Login\u003C\u002Fspan\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cbr\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__login-input-field\" type=\"text\" spellcheck=\"false\" autocomplete=\"off\" maxlength=\"10\" placeholder=\"Maxim\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "Password\u003C\u002Fspan\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cbr\u002F\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__password-input-field\" type=\"password\" spellcheck=\"false\" autocomplete=\"off\" maxlength=\"10\" placeholder=\"secret123\"\u002F\u003E";
;pug_debug_line = 11;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cinput class=\"form__log-in-button\" type=\"button\" value=\"Log In\"\u002F\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 14;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cspan class=\"log-in-page__link-to-sign-up-page\"\u003E";
;pug_debug_line = 14;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "Sign Up Page\u003C\u002Fspan\u003E";
;pug_debug_line = 15;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"log-in-page__message-box\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Flog-in-page\u002Flog-in-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}