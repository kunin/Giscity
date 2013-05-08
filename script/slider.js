var getElements = function () {
	
	//if root elemen not defined, start search of entire document
	//if it string find the object
	if (!root) root = document;
	else if (typeof root === "string") {
		root = document.getElementById(root);
	}
	//if name of tag not defined, find without the tag name
	if (!tagname) tagname = "*";

	//search elements, nested within root and having defined name of tag
	var all = root.getElementsByTagName(tagname);

	//if name of class not define, return all tag without the name classes
	if (!classname) return all;

	//otherwise select elements by class name
	var elements = [];
	for (var i = 0; i < all.length; i += 1) {
		var element = all[i];
		if (isMember(element, classname))
		elements.push(element);
	}
	
	return elements;

	//
	var isMember = function () {
		var classes = element.className;
		if (!classes) return false;
		if (classes == classname) return true;

		
