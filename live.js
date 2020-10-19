function w() {
    if(window.jQuery && $("liveroot").length != 0) {
      window.history.replaceState({ "name": $("liveroot").attr("name"), "id": 0 }, document.title);
      window.onpopstate = function(e) {
      if(!liveAnimationRunning) {
        if($("liveroot").attr("name") != e.state.name) {
          currentStateId = window.history.state.id;
          liveTag = $("liveroot").find("[from='" + $("liveroot").attr("name") + "'][to='" + e.state.name + "']");
          if(liveTag.length == 1) {
            animationTags = liveTag.children();
            liveAnimationRunning = true;
            last = 0;
            for(i = 0; i < animationTags.length; i++) {
              (function(t) {
                window.setTimeout(function() {
                  eval(t.prop('nodeName'))(t);
                }, t.attr("start"));
              })($(animationTags[i]));
              if(Number($(animationTags[i]).attr("start")) + Number($(animationTags[i]).attr("duration") || 0) > last) last = Number($(animationTags[i]).attr("start")) + Number($(animationTags[i]).attr("duration") || 0);
            }
            window.setTimeout(function() {
              liveAnimationRunning = false;
              $("liveroot").attr("name", e.state.name);
              document.title = liveTag.attr("title");
            }, last);
          } else console.error("LiveHTML: No live tag found for " + "[from='" +  $("liveroot").attr("name") + "'][to='" + e.state.name + "']!");
        }
      } else if(currentStateId - window.history.state.id != 0) window.history.go(currentStateId - window.history.state.id);
    }
  } else window.setTimeout(w, 50);
}
w();

currentStateId = 0;
liveAnimationRunning = false;

function live(name) {
  if(!liveAnimationRunning) {
    if($("liveroot").attr("name") != name) {
      liveTag = $("liveroot").find("[from='" + $("liveroot").attr("name") + "'][to='" + name + "']");
      if(liveTag.length == 1) {
        animationTags = liveTag.children();
        liveAnimationRunning = true;
        last = 0;
        for(i = 0; i < animationTags.length; i++) {
          (function(t) {
            window.setTimeout(function() {
              eval(t.prop('nodeName'))(t);
            }, t.attr("start"));
          })($(animationTags[i]));
          if(Number($(animationTags[i]).attr("start")) + Number($(animationTags[i]).attr("duration") || 0) > last) last = Number($(animationTags[i]).attr("start")) + Number($(animationTags[i]).attr("duration") || 0);
        }
        window.setTimeout(function() {
          liveAnimationRunning = false;
          $("liveroot").attr("name", name);
          window.history.pushState({"name": name, "id": window.history.state.id + 1 }, liveTag.attr("title"), liveTag.attr("url"));
          document.title = liveTag.attr("title");
          currentStateId = window.history.state.id;
        }, last);
      } else console.error("LiveHTML: No live tag found for " + "[from='" +  $("liveroot").attr("name") + "'][to='" + name + "']!");
    } else console.warn("LiveHTML: Attempted to switch to self!");
  }
}

function playanim(selector, name, duration, timingfunction) {
  $(selector).css("animation-name", name);
  $(selector).css("animation-duration", duration + "ms");
  $(selector).css("animation-timing-function", timingfunction);
}
function clearanim(selector) {
  $(selector).css("animation-name", "");
  $(selector).css("animation-duration", "");
  $(selector).css("animation-timing-function", "");
}

function FADEIN(tag) {
  $(tag.attr("selector")).css("display", "");
  playanim(tag.attr("selector"), "fade-in", tag.attr("duration"), "linear");
  window.setTimeout(function() {
    clearanim(tag.attr("selector"));
  }, tag.attr("duration") - 10);
}
function FADEINLEFT(tag) {
  $(tag.attr("selector")).css("display", "");
  playanim(tag.attr("selector"), "fade-in-left", tag.attr("duration"), "ease-out");
  window.setTimeout(function() {
    clearanim(tag.attr("selector"));
  }, tag.attr("duration") - 10);
}
function FADEINRIGHT(tag) {
  $(tag.attr("selector")).css("display", "");
  playanim(tag.attr("selector"), "fade-in-right", tag.attr("duration"), "ease-out");
  window.setTimeout(function() {
    clearanim(tag.attr("selector"));
  }, tag.attr("duration") - 10);
}
function FADEOUT(tag) {
  playanim(tag.attr("selector"), "fade-out", tag.attr("duration"), "linear");
  window.setTimeout(function() {
    $(tag.attr("selector")).css("display", "none");
    clearanim(tag.attr("selector"));
  }, tag.attr("duration") - 10);
}
function FADEOUTLEFT(tag) {
  playanim(tag.attr("selector"), "fade-out-left", tag.attr("duration"), "ease-out");
  window.setTimeout(function() {
    $(tag.attr("selector")).css("display", "none");
    clearanim(tag.attr("selector"));
  }, tag.attr("duration") - 10);
}
function FADEOUTRIGHT(tag) {
  playanim(tag.attr("selector"), "fade-out-right", tag.attr("duration"), "ease-out");
  window.setTimeout(function() {
    $(tag.attr("selector")).css("display", "none");
    clearanim(tag.attr("selector"));
  }, tag.attr("duration") - 10);
}
function ADDCLASS(tag) {
  $(tag.attr("selector")).addClass(tag.attr("class"));
}
function REMOVECLASS(tag) {
  $(tag.attr("selector")).removeClass(tag.attr("class"));
}
function CUSTOMJS(tag) {
  eval(tag.attr("content"));
}
