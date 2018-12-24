(function() {
  "use strict";

  window.addEventListener("load", initialize);
  let TOTAL = 2;

  function initialize() {
    let addItem = qs("#add-item");
    addItem.addEventListener("mouseenter", prompt);
    qs(".pop-up").addEventListener("mouseenter", prompt);
    addItem.addEventListener("mouseleave", hide_prompt);
    qs(".pop-up").addEventListener("mouseleave", hide_prompt);
    qs("input[type=checkbox]").addEventListener("change", remove_item);
    qs("#reset-list").addEventListener("click", reset_list);
    window.addEventListener("keypress", submit_item);
  }

  function reset_list() {
    let list = qs("#item-list");
    while (list.firstChild) {
      list.firstChild.remove();
    }
    TOTAL = 1;
  }

  function prompt() {
    qs(".pop-up").classList.toggle("hidden", false);
    qs("#input-item").focus();
  }

  function hide_prompt() {
    qs(".pop-up").classList.toggle("hidden", true);
  }

  function submit_item(e) {
    let keyPressed = e.keyCode;
    let popUp = qs(".pop-up");
    if (keyPressed == 13 && !popUp.classList.contains("hidden")) {
      let item = qs("#input-item").value;
      qs("#input-item").value = "";
      add_item(item);

    }
  }

  function add_item(content) {
    let list = qs("#item-list");
    let id = TOTAL.toString();
    let newItem = document.createElement("li");
    newItem.id = id;
    let newLabel = document.createElement("label");
    let text = document.createTextNode(content);
    newLabel.htmlfor = id;
    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.name = id;
    newCheckbox.id = id;
    newItem.appendChild(newLabel);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(text);
    TOTAL += 1;
    list.appendChild(newItem);
    newCheckbox.addEventListener("change", remove_item);
  }

  function remove_item() {
    TOTAL -= 1;
    this.parentNode.remove();
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
