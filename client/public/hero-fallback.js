/**
 * Hero Fallback — hides the static hero placeholder once React mounts.
 * Runs synchronously (no defer/async) so it observes the #root element
 * before React's first paint, preventing FOUC.
 */
new MutationObserver(function (mutations, observer) {
  for (var i = 0; i < mutations.length; i++) {
    var addedNodes = mutations[i].addedNodes;
    for (var j = 0; j < addedNodes.length; j++) {
      var node = addedNodes[j];
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent && node.textContent.trim())) {
        var fallback = document.getElementById("hero-fallback");
        if (fallback) {
          fallback.style.display = "none";
        }
        observer.disconnect();
        return;
      }
    }
  }
}).observe(document.getElementById("root"), { childList: true });
