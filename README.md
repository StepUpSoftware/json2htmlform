##Summary

json2htmlform is a simple program to take a well formed JSON document and convert it into an HTML5 form

The following tags are currently supported;
<ul>
<b>
<li>input</li>
<li>select</li>
<li>button</li>
<li>option (with select)</li>
<li>optgroup (with select)</li>
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

##tag definitions

<b>input</b>