/*
"Imports" from other application modules
  object-helper.js:
   - objectHelper

  language.js:
   - JavaScript
   - Ruby
*/

// interface layer
var initialValues = {
  jsonObjects: objectHelper.randomObjects(),
  languages: [new JavaScript(), new Ruby()]
}

// single object holding the whole state of the UI
// including operation changing state
var ui = {
  // get hold of ui elements in order to avoid duplication
  defaultObjectBox: $('#obj'),
  objectsList: $("#objects"),
  addObject: $('#add-object'),
  snippet: $('#snippet'),
  selectLanguage: $('#language'),
  // don't prefetch, always use current value
  textareasSelector: '.json-object',

  jsonObjects: initialValues.jsonObjects,
  availableLanguages: initialValues.languages,
  currentLanguage: initialValues.languages[0],
  // rendered (ui) objects
  objectsCount: 0,
}

ui.init = function() {
  // allow sorting of objects
  ui.objectsList.sortable({
    // re-render when order changed
    update:  ui.onReorder,
    cursor: 'move',
    connectWith: '#objects'
    //axis: 'x',
    // placeholder: true,
  });
  ui.objectsList.disableSelection();

  // allow to add objects
  ui.addObject.click(ui.onAddObject);

  ui.selectLanguage.change(ui.onLanguageChange);

  // TODO: allow to remove object
}

/* EVENTS  prefixed with 'on' */

ui.onAddObject = function() {
  var jsonObject = {};
  // chain object with a previous one, if any
  if (ui.jsonObjects.length) {
    Object.setPrototypeOf(jsonObject, ui.jsonObjects[ui.objectsCount - 1]);
  }
  ui.jsonObjects.push(jsonObject);
  ui.newObject(jsonObject, ui.objectsCount, ui.jsonObjects.length);
  ui.renderSnippet();
}

ui.onLanguageChange = function () {
  ui.currentLanguage = ui.availableLanguages[Number(ui.selectLanguage.val())];
  ui.snippet.prop('class', ui.currentLanguage.getName().toLowerCase());
  ui.renderSnippet();
}

ui.onTextareaChange = function (textarea, index) {
  try {
    ui.jsonObjects[index] = JSON.parse(textarea.val());
    ui.renderSnippet();
  }
  catch(err) {
    alert("Invalid textarea: " + err);
  }
}

ui.onReorder = function() {
  // reset
  ui.objectsCount = 0;
  ui.jsonObjects = [];
  var textareas = $(ui.textareasSelector);
  textareas.each(function(index, item) {
    try {
      ui.jsonObjects.push(JSON.parse(item.val()));
      ui.renderSnippet();
    }
    catch(err) {
      alert("Reorder error: " + err);
    }
  });
};

ui.onPrototypeChange = function (data, handler) {
  console.log(data, handler);
}


ui.render = function() {
  ui.renderObjects();
  ui.renderSnippet();
}

ui.renderObjects = function() {
  objectHelper.chainObjects(ui.jsonObjects);
  for (var i = 0, l = ui.jsonObjects.length; i < l; i ++) {
    ui.newObject(ui.jsonObjects[i], i, l);
  }
};

ui.renderSnippet = function() {
  ui.snippet.text(ui.currentLanguage.snippet(ui.jsonObjects));
  ui.snippet.each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

// creates new ui object
ui.newObject = function(jsonObject, index, length) {
  ui.objectsCount ++;
  newObject = ui.defaultObjectBox.clone();
  newObject.prop('id', 'obj' + ui.objectsCount);
  newObject
    .find('.label')
    .text('Object '+ ui.objectsCount);
  newObject
    .find('.prototype-placeholder')
    .append(ui.prototypeSelect(index, length));
  newObject
    .find('.accessible-properties')
    .text(JSON.stringify(objectHelper.deepCopy(jsonObject)));
  ui.initTextarea(newObject.find('.default-json-object'), index, jsonObject);
  ui.objectsList.append(newObject);
}

ui.prototypeSelect = function(ignoreIndex, length) {
  var select = $('<select>'),
    options = [],
    selectedIndex = ignoreIndex - 1;

  for (var i = -1; i < length; i ++) {
    if (i == ignoreIndex) {
      continue;
    }
    option = $('<option>').attr('value', i).text('Object ' + (i + 1));
    if (i == selectedIndex) {
      option.attr('selected', 'selected');
    }
    options.push(option);
  }
  options[0].text('None (Object)');
  select.append(options);

  select.change(ui.onPrototypeChange);

  return select;
}

ui.initTextarea = function(textarea, index, jsonObject) {
  textarea.prop('name', 'obj' + ui.objectsCount);
  textarea.prop('class', 'json-object');
  textarea.val(JSON.stringify(jsonObject));
  textarea.change(function () {
    ui.onTextareaChange(textarea, index)
  });
}

// document ready
$(function() {
  ui.init();
  ui.render();
});
