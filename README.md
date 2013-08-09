##Summary

json2htmlform is a simple program to take a well formed JSON document and convert it into an HTML5 form

The following form tags are currently supported;
<ul>
<b>
<li>input</li>
<li>select</li>
<li>button</li>
<li>textarea</li>
</b>
</ul>

Every form must have the following mandatory tags;
<ol>
<li><b>name</b></li>
A string

<li><b>action</b></li>
the form action URL

<li><b>method</b></li>
post, get, put or delete

<li><b>html</b></li>
An array of javascript objects that define a supported tag (see below)

<li><b>enctype</b></li>
A string e.g. "multipart/form-data"

</ol>

##Tag definitions

Only supported attributes can be used.  For all tags, you must define a tag attribute.  All other attributes are optional.  Using attributes not defined here will cause the conversion to fail.

<b>INPUT</b>

If a label attribute is defined, a label tag will be prepended to the html above the tag.

Supported attributes;
<ul>
<b>
<li>tag</li>
<li>type</li>
<li>name</li>
<li>id</li>
<li>placeholder</li>
<li>value</li>
<li>label</li>
<li>class</li>
</b>
</ul>

Examples;

    {
			"type": "text",
			"name": "wibble",
			"id": "wibble",
			"tag": "input",
			"placeholder": "wibble",
			 "label":"text box"
    }, {
			"type": "checkbox",
			"name": "bike",
			"id": "bikecb",
			"tag": "input",
			"value": "bike",
			"label": "Bike"
		}, {
			"type": "checkbox",
			"name": "car",
			"id": "carcb",
			"tag": "input",
			"value": "car",
			"label": "Car"
    }
    
<b>SELECT</b>

optgroups and options attributes can not be combined in a single select.

If a label attribute is defined, a label tag will be prepended to the html above the tag.


Supported attributes;
<ul>
<b>
<li>tag</li>
<li>optgroups</li>
<li>options</li>
<li>id</li>
<li>label</li>
<li>class</li>
</b>
</ul>

Examples;  

    {
			"tag": "select",
			"optgroups": [
				{
					"label": "Swedish Cars",
					"options": ["volvo", "saab"]
				}, {
					"label": "German Cars",
					"options": ["mercedes", "bmw", "audi"]
				}
			],
			"label": "select a car by country",
			"id": "selectcarbycountry"
		}, {
			"tag": "select",
			"options": ["mercedes", "bmw", "audi", "volvo", "saab"],
			"label": "select a car",
			"id": "selectcar"
		}
   
<b>BUTTON</b>

Supported attributes;
<ul>
<b>
<li>tag</li>
<li>type</li>
<li>name</li>
<li>id</li>
<li>text</li>
<li>class</li>
</b>
</ul>

Examples;

    {
			"type": "button",
			"name": "button",
			"id": "buttonbutton",
			"tag": "button",
			"text": "button"
		} , {
			"type": "reset",
			"name": "reset",
			"id": "resetbutton",
			"tag": "button",
			"text": "reset"
		}, {
			"type": "submit",
			"name": "submit",
			"id": "submitbutton",
			"tag": "button",
			"text": "submit"
		}
		
<b>TEXTAREA</b>

Supported attributes;

<ul>
<b>
<li>tag</li>
<li>placeholder</li>
<li>name</li>
<li>id</li>
<li>label</li>
<li>class</li>
</b>
</ul>

Example;

    {
			"name": "txtarea",
			"id": "mytextarea",
			"tag": "textarea",
			"placeholder": "wibble",
			"label": "this is a text area"
		}
		
##Usage

from the command prompt / terminal type

    node main.js --source file --target file
    
or type

    node main.js --help

to display usage instructions

##Full Example

run

    node main.js --source testdata/example.json --target example.html

to see a worked example.  The JSON used is reproduced below

    {
	"name": "Example Form",
	"action": "example.html",
	"method": "post",
	"html": [
		{
			"type": "text",
			"name": "wibble",
			"id": "wibble",
			"tag": "input",
			"placeholder": "wibble",
			 "label":"text box"
		} , {
			"type": "text",
			"name": "wobble",
			"id": "wobble",
			"tag": "input",
			"placeholder": "wobble"
		}, {
			"type": "checkbox",
			"name": "bike",
			"id": "bikecb",
			"tag": "input",
			"value": "bike",
			"label": "Bike"
		}, {
			"type": "checkbox",
			"name": "car",
			"id": "carcb",
			"tag": "input",
			"value": "car",
			"label": "Car"
		}, {
			"type": "radio",
			"name": "sex",
			"id": "secm",
			"tag": "input",
			"value": "male",
			"label": "Male"
		}, {
			"type": "radio",
			"name": "sex",
			"id": "secf",
			"tag": "input",
			"value": "female",
			"label": "Female"
		}, {
			"type": "password",
			"name": "mypassword",
			"id": "password",
			"tag": "input",
			"placeholder": "password"
		}, {
			"tag": "select",
			"optgroups": [
				{
					"label": "Swedish Cars",
					"options": ["volvo", "saab"]
				}, {
					"label": "German Cars",
					"options": ["mercedes", "bmw", "audi"]
				}
			],
			"label": "select a car by country",
			"id": "selectcarbycountry"
		}, {
			"tag": "select",
			"options": ["mercedes", "bmw", "audi", "volvo", "saab"],
			"label": "select a car",
			"id": "selectcar"
		}, {
			"name": "txtarea",
			"id": "mytextarea",
			"tag": "textarea",
			"placeholder": "wibble",
			"label": "this is a text area"
		}, {
			"type": "button",
			"name": "button",
			"id": "buttonbutton",
			"tag": "button",
			"text": "button"
		} , {
			"type": "reset",
			"name": "reset",
			"id": "resetbutton",
			"tag": "button",
			"text": "reset"
		}
	],
	"enctype": "multipart/form-data"
    }



