class DomSelector{
	construct(targeted){
		// this.targeted = targeted;
	}

	/*This is used to select a given element making reference to their id.*/
	id(element_id){
		return document.getElementById(element_id);
	}

	class(element_class){
		return document.getElementsByClassName(element_class);
	}

	cssSelector(selector){
		return document.querySelector(selector);
	}

	cssSelectorAll(selector){
		return document.querySelectorAll(selector);
	}
}

//instantiating the class now
const _ = new DomSelector;