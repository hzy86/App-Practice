(function() {
  "use strict";

  window.addEventListener("load", initialize);
  let ID = 1;

  function initialize() {
    qs("#add-item").addEventListener("click", add_item);
  }

  function add_item() {
    let container = qs(".do-list");
    push_item_down();
    let item = new_item(1);
    let check = new_check_button(1);
    let input = new_input();
    check.addEventListener("click", function() {
      check.classList.add("clicked");
      setTimeout(function() {
        remove_item(check);
      }, 200);
      setTimeout(function() {
        check.parentNode.remove();
      }, 300);
    });
    container.appendChild(item);
    item.appendChild(check);
    item.appendChild(input);
    ID += 1;
  }

  function push_item_down() {
    let items = qsa(".list-item");
    for (let i = 0; i < items.length; i++) {
      let oldPos = items[i].classList[1];
      let newPos = parseInt(oldPos.split("-")[1]) + 1;
      items[i].classList.remove(oldPos);
      items[i].classList.add("item-" + newPos);
    }
  }

  function remove_item(node) {
    let item = node.parentNode;
    node.classList.add("removing");
    item.classList.add("removing");
    let current = get_pos(item);
    pull_item_up(current);
  }

  function pull_item_up(current) {
    let items = qsa(".list-item");
    for (let i = 0; i < items.length; i++) {
      let pos = get_pos(items[i]);
      if (pos > current) {
        items[i].classList.remove("item-" + pos);
        items[i].classList.add("item-" + --pos);
      }
    }
  }

  // ----------------- helper functions ---------------

  function get_pos(node) {
    return parseInt(node.classList[1].split("-")[1]);
  }

  function new_item(pos) {
    let item = document.createElement("div");
    item.classList.add("list-item");
    item.classList.add("item-" + pos);
    item.id = "itemID-" + ID;
    return item;
  }

  function new_input() {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("list-content");
    return input;
  }

  function new_check_button(pos) {
    let item = document.createElement("div");
    item.classList.add("check-item");
    item.id = "checkID-" + ID;
    return item;
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
