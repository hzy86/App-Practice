/**
 * @author: Ziyi Huang
 * @daate:  12/24/2018
 * This is the JS to implement the UI and behaviors for my to-do list app.
 * Adds/removes items in a to-do list.
 */
(function() {
  "use strict";

  window.addEventListener("load", initialize);
  let ID = 1;

  function initialize() {
    qs("#add-item").addEventListener("click", add_item);
  }

  /**
   * add a new item to the top of the list area. DOM objects to be added include a container. a
   * check button, and a text area.
   */
  function add_item() {
    let container = qs(".do-list");
    push_item_down();
    let item = new_item(1);
    let check = new_check_button(1);
    let input = new_input();
    check.addEventListener("click", function() {
      remove_item(check);
      setTimeout(function() {
        check.parentNode.remove();
      }, 300);
    });
    container.appendChild(item);
    item.appendChild(check);
    item.appendChild(input);
    ID += 1;
  }

  /**
   * Shift all the list item down by one to give space for a new item.
   */
  function push_item_down() {
    let items = qsa(".list-item");
    for (let i = 0; i < items.length; i++) {
      let oldPos = items[i].classList[1];
      let newPos = get_pos(items[i]) + 1;
      items[i].classList.remove(oldPos);
      items[i].classList.add("item-" + newPos);
    }
  }

  /**
   * remove an item from the list body with animation
   * @param {object} node - the DOM button where the corresponding item is to be removed
   */
  function remove_item(node) {
    let item = node.parentNode;
    node.classList.add("removing");
    item.classList.add("removing");
    let current = get_pos(item);
    pull_item_up(current);
  }

  /**
   * Shift all the items below the current item up by one to make up for its departure
   * @param {int} current - the position of the item to be removed
   */
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

  /**
   * return the position of the item in the list
   * @param {object} node - the DOM button of interest
   * @return {int} - the position
   */
  function get_pos(node) {
    return parseInt(node.classList[1].split("-")[1]);
  }

  /**
   * return a new item container
   * @param {int} pos - the position of the new item
   * @return {object} - a DOM div that has correct class and itemID
   */
  function new_item(pos) {
    let item = document.createElement("div");
    item.classList.add("list-item");
    item.classList.add("item-" + pos);
    item.id = "itemID-" + ID;
    return item;
  }

  /**
   * return a new input text element
   * @return {object} - a DOM input that has correct class and type
   */
  function new_input() {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("list-content");
    return input;
  }

  /**
   * return a new check button
   * @param {int} pos - the position of the new button
   * @return {object} - a DOM div that has correct class and checkID
   */
  function new_check_button(pos) {
    let item = document.createElement("div");
    item.classList.add("check-item");
    item.id = "checkID-" + ID;
    return item;
  }

  /**
   * return a DOM result of the query
   * @param {string} query - a CSS statement
   * @return {object} - a DOM result of the query
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * return all DOM results of the query
   * @param {string} query - a CSS statement
   * @return {object} - an array of DOM results of the query
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
