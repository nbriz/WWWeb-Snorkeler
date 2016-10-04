/*
    scrapped from: http://www.w3schools.com/tags/ref_attributes.asp
    and also: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list
*/
module.exports = {
    accept: {
        elements: ["<form>", "<input>"],
        supported: true,
        nfo: { w3c: "Specifies the types of files that the server accepts (only for type=\"file\").", mdn: "List of types the server accepts, typically a file type."}
    },
    "accept-charset": {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Specifies the character encodings that are to be used for the form submission.", mdn: "List of supported charsets."}
    },
    accesskey: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies a shortcut key to activate/focus an element.", mdn: "Defines a keyboard shortcut to activate or add focus to the element."}
    },
    action: {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Specifies where to send the form-data when a form is submitted.", mdn: "The URI of a program that processes the information submitted via the form."}
    },
    align: {
        elements: ["<applet>", "<caption>", "<col>", "<colgroup>", "<hr>", "<iframe>", "<img>", "<table>", "<tbody>", "<td>", "<tfoot>", "<th>", "<thead>", "<tr>"],
        supported: false,
        nfo: { w3c: "Specifies the alignment according to surrounding elements. Use CSS instead.", mdn: "Specifies the horizontal alignment of the element."}
    },
    alt: {
        elements: ["<applet>", "<area>", "<img>", "<input>"],
        supported: true,
        nfo: { w3c: "Specifies an alternate text when the original element fails to display.", mdn: "Alternative text in case an image can't be displayed."}
    },
    async: {
        elements: ["<script>"],
        supported: true,
        nfo: { w3c: "Specifies that the script is executed asynchronously (only for external scripts).", mdn: "Indicates that the script should be executed asynchronously."}
    },
    autocomplete: {
        elements: ["<form>", "<input>"],
        supported: true,
        nfo: { w3c: "Specifies whether the <form> or the <input> element should have autocomplete enabled.", mdn: "Indicates whether controls in this form can by default have their values automatically completed by the browser."}
    },
    autofocus: {
        elements: ["<button>", "<input>", "<keygen>", "<select>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies that the element should automatically get focus when the page loads.", mdn: "The element should be automatically focused after the page loaded."}
    },
    autoplay: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies that the audio/video will start playing as soon as it is ready", mdn: "The audio or video should play as soon as possible."}
    },
    autosave: {
        elements: ["<input>"],
        supported: true,
        nfo: { w3c: undefined, mdn: "Previous values should persist dropdowns of selectable values across page loads."}
    },
    bgcolor: {
        elements: ["<body>", "<col>", "<colgroup>", "<marquee>", "<table>", "<tbody>", "<tfoot>", "<td>", "<th>", "<tr>"],
        supported: false,
        nfo: { w3c: "Specifies the background color of an element. Use CSS instead.", mdn: "Background color of the element.  Note: This is a legacy attribute. Please use the CSS background-color property instead."}
    },
    border: {
        elements: ["<img>", "<object>", "<table>"],
        supported: false,
        nfo: { w3c: "Specifies the width of the border of an element. Use CSS instead.", mdn: "The border width.  Note: This is a legacy attribute. Please use the CSS border property instead."}
    },
    buffered: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: undefined, mdn: "Contains the time range of already buffered media."}
    },
    challenge: {
        elements: ["<keygen>"],
        supported: true,
        nfo: { w3c: "Specifies that the value of the <keygen> element should be challenged when submitted.", mdn: "A challenge string that is submitted along with the public key."}
    },
    charset: {
        elements: ["<meta>", "<script>"],
        supported: true,
        nfo: { w3c: "Specifies the character encoding.", mdn: "Declares the character encoding of the page or script."}
    },
    checked: {
        elements: ["<command>", "<input>"],
        supported: true,
        nfo: { w3c: "Specifies that an <input> element should be pre-selected when the page loads (for type=\"checkbox\" or type=\"radio\").", mdn: "Indicates whether the element should be checked on page load."}
    },
    cite: {
        elements: ["<blockquote>", "<del>", "<ins>", "<q>"],
        supported: true,
        nfo: { w3c: "Specifies a URL which explains the quote/deleted/inserted text.", mdn: "Contains a URI which points to the source of the quote or change."}
    },
    class: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies one or more classnames for an element (refers to a class in a style sheet).", mdn: "Often used with CSS to style elements with common properties."}
    },
    code: {
        elements: ["<applet>"],
        supported: true,
        nfo: { w3c: undefined, mdn: "Specifies the URL of the applet's class file to be loaded and executed."}
    },
    codebase: {
        elements: ["<applet>"],
        supported: true,
        nfo: { w3c: undefined, mdn: "This attribute gives the absolute or relative URL of the directory where applets' .class files referenced by the code attribute are stored."}
    },
    color: {
        elements: ["<basefont>", "<font>", "<hr>"],
        supported: false,
        nfo: { w3c: "Specifies the text color of an element. Use CSS instead.", mdn: "This attribute sets the text color using either a named color or a color specified in the hexadecimal #RRGGBB format.  Note: This is a legacy attribute. Please use the CSS color property instead."}
    },
    cols: {
        elements: ["<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies the visible width of a text area.", mdn: "Defines the number of columns in a textarea."}
    },
    colspan: {
        elements: ["<td>", "<th>"],
        supported: true,
        nfo: { w3c: "Specifies the number of columns a table cell should span", mdn: "The colspan attribute defines the number of columns a cell should span."}
    },
    content: {
        elements: ["<meta>"],
        supported: true,
        nfo: { w3c: "Gives the value associated with the http-equiv or name attribute", mdn: "A value associated with http-equiv or name depending on the context."}
    },
    contenteditable: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies whether the content of an element is editable or not.", mdn: "Indicates whether the element's content is editable."}
    },
    contextmenu: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies a context menu for an element. The context menu appears when a user right-clicks on the element.", mdn: "Defines the ID of a <menu> element which will serve as the element's context menu."}
    },
    controls: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies that audio/video controls should be displayed (such as a play/pause button etc).", mdn: "Indicates whether the browser should show playback controls to the user."}
    },
    coords: {
        elements: ["<area>"],
        supported: true,
        nfo: { w3c: "Specifies the coordinates of the area.", mdn: "A set of values specifying the coordinates of the hot-spot region."}
    },
    data: {
        elements: ["<object>"],
        supported: true,
        nfo: { w3c: "Specifies the URL of the resource to be used by the object.", mdn: "Specifies the URL of the resource."}
    },
    "data-*": {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Used to store custom data private to the page or application.", mdn: "Lets you attach custom attributes to an HTML element."}
    },
    datetime: {
        elements: ["<del>", "<ins>", "<time>"],
        supported: true,
        nfo: { w3c: "Specifies the date and time.", mdn: "Indicates the date and time associated with the element."}
    },
    default: {
        elements: ["<track>"],
        supported: true,
        nfo: { w3c: "Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate.", mdn: "Indicates that the track should be enabled unless the user's preferences indicate something different."}
    },
    defer: {
        elements: ["<script>"],
        supported: true,
        nfo: { w3c: "Specifies that the script is executed when the page has finished parsing (only for external scripts).", mdn: "Indicates that the script should be executed after the page has been parsed."}
    },
    dir: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies the text direction for the content in an element.", mdn: "Defines the text direction. Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left)"}
    },
    dirname: {
        elements: ["<input>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies that the text direction will be submitted.", mdn: " "}
    },
    disabled: {
        elements: ["<button>", "<command>", "<fieldset>", "<input>", "<keygen>", "<optgroup>", "<option>", "<select>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies that a the specified element/group of elements should be disabled.", mdn: "Indicates whether the user can interact with the element."}
    },
    download: {
        elements: ["<a>", "<area>"],
        supported: true,
        nfo: { w3c: "Specifies that the target will be downloaded when a user clicks on the hyperlink.", mdn: "Indicates that the hyperlink is to be used for downloading a resource."}
    },
    draggable: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies whether an element is draggable or not.", mdn: "Defines whether the element can be dragged."}
    },
    dropzone: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies whether the dragged data is copied, moved, or linked, when dropped.", mdn: "Indicates that the element accept the dropping of content on it."}
    },
    enctype: {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Specifies how the form-data should be encoded when submitting it to the server (only for method=\"post\").", mdn: "Defines the content type of the form date when the method is POST."}
    },
    for: {
        elements: ["<label>", "<output>"],
        supported: true,
        nfo: { w3c: "Specifies which form element(s) a label/calculation is bound to.", mdn: "Describes elements which belongs to this one."}
    },
    form: {
        elements: ["<button>", "<fieldset>", "<input>", "<keygen>", "<label>", "<meter>", "<object>", "<output>", "<progress>", "<select>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies the name of the form the element belongs to", mdn: "Indicates the form that is the owner of the element."}
    },
    formaction: {
        elements: ["<input>", "<button>"],
        supported: true,
        nfo: { w3c: "Specifies where to send the form-data when a form is submitted. Only for type=\"submit\".", mdn: "Indicates the action of the element, overriding the action defined in the <form>."}
    },
    headers: {
        elements: ["<td>", "<th>"],
        supported: true,
        nfo: { w3c: "Specifies one or more headers cells a cell is related to.", mdn: "IDs of the <th> elements which applies to this element."}
    },
    height: {
        elements: ["<canvas>", "<embed>", "<iframe>", "<img>", "<input>", "<object>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies the height of the element.", mdn: "Specifies the height of elements listed here. For all other elements, use the CSS height property.  Note: In some instances, such as <div>, this is a legacy attribute, in which case the CSS height property should be used instead."}
    },
    hidden: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies that an element is not yet, or is no longer, relevant.", mdn: "Prevents rendering of given element, while keeping child elements, e.g. script elements, active."}
    },
    high: {
        elements: ["<meter>"],
        supported: true,
        nfo: { w3c: "Specifies the range that is considered to be a high value.", mdn: "Indicates the lower bound of the upper range."}
    },
    href: {
        elements: ["<a>", "<area>", "<base>", "<link>"],
        supported: true,
        nfo: { w3c: "Specifies the URL of the page the link goes to.", mdn: " The URL of a linked resource."}
    },
    hreflang: {
        elements: ["<a>", "<area>", "<link>"],
        supported: true,
        nfo: { w3c: "Specifies the language of the linked document.", mdn: "Specifies the language of the linked resource."}
    },
    "http-equiv": {
        elements: ["<meta>"],
        supported: true,
        nfo: { w3c: "Provides an HTTP header for the information/value of the content attribute.", mdn: " "}
    },
    icon: {
        elements: ["<command>"],
        supported: true,
        nfo: { w3c: undefined, mdn: "Specifies a picture which represents the command."}
    },
    id: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies a unique id for an element.", mdn: "Often used with CSS to style a specific element. The value of this attribute must be unique."}
    },
    ismap: {
        elements: ["<img>"],
        supported: true,
        nfo: { w3c: "Specifies an image as a server-side image-map.", mdn: "Indicates that the image is part of a server-side image map."}
    },
    itemprop: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: undefined, mdn: " "}
    },
    keytype: {
        elements: ["<keygen>"],
        supported: true,
        nfo: { w3c: "Specifies the security algorithm of the key.", mdn: "Specifies the type of key generated."}
    },
    kind: {
        elements: ["<track>"],
        supported: true,
        nfo: { w3c: "Specifies the kind of text track.", mdn: "Specifies the kind of text track."}
    },
    label: {
        elements: ["<track>"],
        supported: true,
        nfo: { w3c: "Specifies the title of the text track.", mdn: "Specifies a user-readable title of the text track."}
    },
    lang: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies the language of the element's content.", mdn: "Defines the language used in the element."}
    },
    language: {
        elements: ["<script>"],
        supported: true,
        nfo: { w3c: undefined, mdn: "Defines the script language used in the element."}
    },
    list: {
        elements: ["<input>"],
        supported: true,
        nfo: { w3c: "Refers to a <datalist> element that contains pre-defined options for an <input> element.", mdn: "Identifies a list of pre-defined options to suggest to the user."}
    },
    loop: {
        elements: ["<audio>", "<bgsound>", "<marquee>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies that the audio/video will start over again, every time it is finished.", mdn: "Indicates whether the media should start playing from the start when it's finished."}
    },
    low: {
        elements: ["<meter>"],
        supported: true,
        nfo: { w3c: "Specifies the range that is considered to be a low value.", mdn: "Indicates the upper bound of the lower range."}
    },
    manifest: {
        elements: ["<html>"],
        supported: true,
        nfo: { w3c: "Specifies the address of the document's cache manifest (for offline browsing).", mdn: "Specifies the URL of the document's cache manifest."}
    },
    max: {
        elements: ["<input>", "<meter>", "<progress>"],
        supported: true,
        nfo: { w3c: "Specifies the maximum value.", mdn: "Indicates the maximum value allowed."}
    },
    maxlength: {
        elements: ["<input>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies the maximum number of characters allowed in an element.", mdn: "Defines the maximum number of characters allowed in the element."}
    },
    media: {
        elements: ["<a>", "<area>", "<link>", "<source>", "<style>"],
        supported: true,
        nfo: { w3c: "Specifies what media/device the linked document is optimized for.", mdn: "Specifies a hint of the media for which the linked resource was designed."}
    },
    method: {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Specifies the HTTP method to use when sending form-data.", mdn: "Defines which HTTP method to use when submitting the form. Can be GET (default) or POST."}
    },
    min: {
        elements: ["<input>", "<meter>"],
        supported: true,
        nfo: { w3c: "Specifies a minimum value.", mdn: "Indicates the minimum value allowed."}
    },
    multiple: {
        elements: ["<input>", "<select>"],
        supported: true,
        nfo: { w3c: "Specifies that a user can enter more than one value.", mdn: "Indicates whether multiple values can be entered in an input of the type email or file."}
    },
    muted: {
        elements: ["<video>"],
        supported: true,
        nfo: { w3c: "Specifies that the audio output of the video should be muted.", mdn: "Indicates whether the audio will be initially silenced on page load."}
    },
    name: {
        elements: ["<button>", "<form>", "<fieldset>", "<iframe>", "<input>", "<keygen>", "<object>", "<output>", "<select>", "<textarea>", "<map>", "<meta>", "<param>"],
        supported: true,
        nfo: { w3c: "Specifies the name of the element.", mdn: "Name of the element. For example used by the server to identify the fields in form submits."}
    },
    novalidate: {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Specifies that the form should not be validated when submitted.", mdn: "This attribute indicates that the form shouldn't be validated when submitted."}
    },
    open: {
        elements: ["<details>"],
        supported: true,
        nfo: { w3c: "Specifies that the details should be visible (open) to the user", mdn: "Indicates whether the details will be shown on page load."}
    },
    optimum: {
        elements: ["<meter>"],
        supported: true,
        nfo: { w3c: "Specifies what value is the optimal value for the gauge.", mdn: "Indicates the optimal numeric value."}
    },
    pattern: {
        elements: ["<input>"],
        supported: true,
        nfo: { w3c: "Specifies a regular expression that an <input> element's value is checked against.", mdn: "Defines a regular expression which the element's value will be validated against."}
    },
    ping: {
        elements: ["<a>", "<area>"],
        supported: true,
        nfo: { w3c: undefined, mdn: " "}
    },
    placeholder: {
        elements: ["<input>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies a short hint that describes the expected value of the element.", mdn: "Provides a hint to the user of what can be entered in the field."}
    },
    poster: {
        elements: ["<video>"],
        supported: true,
        nfo: { w3c: "Specifies an image to be shown while the video is downloading, or until the user hits the play button.", mdn: "A URL indicating a poster frame to show until the user plays or seeks."}
    },
    preload: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies if and how the author thinks the audio/video should be loaded when the page loads", mdn: "Indicates whether the whole resource, parts of it or nothing should be preloaded."}
    },
    radiogroup: {
        elements: ["<command>"],
        supported: true,
        nfo: { w3c: undefined, mdn: " "}
    },
    readonly: {
        elements: ["<input>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies that the element is read-only", mdn: "Indicates whether the element can be edited."}
    },
    rel: {
        elements: ["<a>", "<area>", "<link>"],
        supported: true,
        nfo: { w3c: "Specifies the relationship between the current document and the linked document.", mdn: "Specifies the relationship of the target object to the link object."}
    },
    required: {
        elements: ["<input>", "<select>", "<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies that the element must be filled out before submitting the form.", mdn: "Indicates whether this element is required to fill out or not."}
    },
    reversed: {
        elements: ["<ol>"],
        supported: true,
        nfo: { w3c: "Specifies that the list order should be descending (9,8,7...).", mdn: "Indicates whether the list should be displayed in a descending order instead of a ascending."}
    },
    rows: {
        elements: ["<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies the visible number of lines in a text area.", mdn: "Defines the number of rows in a text area."}
    },
    rowspan: {
        elements: ["<td>", "<th>"],
        supported: true,
        nfo: { w3c: "Specifies the number of rows a table cell should span", mdn: "Defines the number of rows a table cell should span over."}
    },
    sandbox: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "Enables an extra set of restrictions for the content in an <iframe>", mdn: " "}
    },
    scope: {
        elements: ["<th>"],
        supported: true,
        nfo: { w3c: "Specifies whether a header cell is a header for a column, row, or group of columns or rows.", mdn: " "}
    },
    scoped: {
        elements: ["<style>"],
        supported: true,
        nfo: { w3c: "Specifies that the styles only apply to this element's parent element and that element's child elements", mdn: " "}
    },
    seamless: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: undefined, mdn: " "}
    },
    selected: {
        elements: ["<option>"],
        supported: true,
        nfo: { w3c: "Specifies that an option should be pre-selected when the page loads.", mdn: "Defines a value which will be selected on page load."}
    },
    shape: {
        elements: ["<a>", "<area>"],
        supported: true,
        nfo: { w3c: "Specifies the shape of the area.", mdn: " "}
    },
    size: {
        elements: ["<input>", "<select>"],
        supported: true,
        nfo: { w3c: "Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>)", mdn: "Defines the width of the element (in pixels). If the element's type attribute is text or password then it's the number of characters."}
    },
    sizes: {
        elements: ["<link>", "<img>", "<source>"],
        supported: true,
        nfo: { w3c: "Specifies the size of the linked resource.", mdn: " "}
    },
    span: {
        elements: ["<col>", "<colgroup>"],
        supported: true,
        nfo: { w3c: "Specifies the number of columns to span.", mdn: " "}
    },
    spellcheck: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies whether the element is to have its spelling and grammar checked or not.", mdn: "Indicates whether spell checking is allowed for the element."}
    },
    src: {
        elements: ["<audio>", "<embed>", "<iframe>", "<img>", "<input>", "<script>", "<source>", "<track>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies the URL of the media file.", mdn: "The URL of the embeddable content."}
    },
    srcdoc: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "Specifies the HTML content of the page to show in the <iframe>.", mdn: " "}
    },
    srclang: {
        elements: ["<track>"],
        supported: true,
        nfo: { w3c: "Specifies the language of the track text data (required if kind=\"subtitles\").", mdn: " "}
    },
    srcset: {
        elements: ["<img>"],
        supported: true,
        nfo: { w3c: undefined, mdn: " "}
    },
    start: {
        elements: ["<ol>"],
        supported: true,
        nfo: { w3c: "Specifies the start value of an ordered list.", mdn: "Defines the first number if other than 1."}
    },
    step: {
        elements: ["<input>"],
        supported: true,
        nfo: { w3c: "Specifies the legal number intervals for an input field.", mdn: " "}
    },
    style: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies an inline CSS style for an element.", mdn: "Defines CSS styles which will override styles previously set."}
    },
    summary: {
        elements: ["<table>"],
        supported: true,
        nfo: { w3c: undefined, mdn: " "}
    },
    tabindex: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies the tabbing order of an element.", mdn: "Overrides the browser's default tab order and follows the one specified instead."}
    },
    target: {
        elements: ["<a>", "<area>", "<base>", "<form>"],
        supported: true,
        nfo: { w3c: "Specifies the target for where to open the linked document or where to submit the form.", mdn: " "}
    },
    title: {
        elements: ["Global attribute"],
        supported: true,
        nfo: { w3c: "Specifies extra information about an element.", mdn: "Text to be displayed in a tooltip when hovering over the element."}
    },
    type: {
        elements: ["<button>", "<input>", "<command>", "<embed>", "<object>", "<script>", "<source>", "<style>", "<menu>","<link>"],
        supported: true,
        nfo: { w3c: "Specifies the type of element.", mdn: "Defines the type of the element."}
    },
    usemap: {
        elements: ["<img>", "<input>", "<object>"],
        supported: true,
        nfo: { w3c: "Specifies an image as a client-side image-map.", mdn: " "}
    },
    value: {
        elements: ["<button>", "<option>", "<input>", "<li>", "<meter>", "<progress>", "<param>"],
        supported: true,
        nfo: { w3c: "Specifies the value of the element.", mdn: "Defines a default value which will be displayed in the element on page load."}
    },
    width: {
        elements: ["<canvas>", "<embed>", "<iframe>", "<img>", "<input>", "<object>", "<video>"],
        supported: true,
        nfo: { w3c: "Specifies the width of the element.", mdn: "For the elements listed here, this establishes the element's width.  Note: For all other instances, such as <div>, this is a legacy attribute, in which case the CSS width property should be used instead."}
    },
    wrap: {
        elements: ["<textarea>"],
        supported: true,
        nfo: { w3c: "Specifies how the text in a text area is to be wrapped when submitted in a form.", mdn: "Indicates whether the text should be wrapped."}
    },
    onabort: {
        elements: ["<audio>", "<embed>", "<img>", "<object>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run on abort.", mdn: undefined}
    },
    onafterprint: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run after the document is printed.", mdn: undefined}
    },
    onbeforeprint: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run before the document is printed", mdn: undefined}
    },
    onbeforeunload: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when the document is about to be unloaded.", mdn: undefined}
    },
    onblur: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element loses focus.", mdn: undefined}
    },
    oncanplay: {
        elements: ["<audio>", "<embed>", "<object>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when a file is ready to start playing (when it has buffered enough to begin).", mdn: undefined}
    },
    oncanplaythrough: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when a file can be played all the way to the end without pausing for buffering.", mdn: undefined}
    },
    onchange: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the value of the element is changed.", mdn: undefined}
    },
    onclick: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element is being clicked.", mdn: undefined}
    },
    oncontextmenu: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a context menu is triggered", mdn: undefined}
    },
    oncopy: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the content of the element is being copied.", mdn: undefined}
    },
    oncuechange: {
        elements: ["<track>"],
        supported: true,
        nfo: { w3c: "Script to be run when the cue changes in a <track> element", mdn: undefined}
    },
    oncut: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the content of the element is being cut.", mdn: undefined}
    },
    ondblclick: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element is being double-clicked.", mdn: undefined}
    },
    ondrag: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run at the end of a drag operation.", mdn: undefined}
    },
    ondragend: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run at the end of a drag operation.", mdn: undefined}
    },
    ondragenter: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when an element has been dragged to a valid drop target.", mdn: undefined}
    },
    ondragleave: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when an element leaves a valid drop target", mdn: undefined}
    },
    ondragover: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when an element is being dragged over a valid drop target.", mdn: undefined}
    },
    ondragstart: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run at the start of a drag operation.", mdn: undefined}
    },
    ondrop: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when dragged element is being dropped.", mdn: undefined}
    },
    ondurationchange: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the length of the media changes", mdn: undefined}
    },
    onemptied: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects).", mdn: undefined}
    },
    onended: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the media has reach the end (a useful event for messages like \"thanks for listening\")", mdn: undefined}
    },
    onerror: {
        elements: ["<audio>", "<body>", "<embed>", "<img>", "<object>", "<script>", "<style>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when an error occurs.", mdn: undefined}
    },
    onfocus: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element gets focus.", mdn: undefined}
    },
    onhashchange: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when there has been changes to the anchor part of the a URL.", mdn: undefined}
    },
    oninput: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element gets user input.", mdn: undefined}
    },
    oninvalid: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element is invalid.", mdn: undefined}
    },
    onkeydown: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a user is pressing a key.", mdn: undefined}
    },
    onkeypress: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a user presses a key.", mdn: undefined}
    },
    onkeyup: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a user releases a key.", mdn: undefined}
    },
    onload: {
        elements: ["<body>", "<iframe>", "<img>", "<input>", "<link>", "<script>", "<style>"],
        supported: true,
        nfo: { w3c: "Script to be run when the element is finished loading.", mdn: undefined}
    },
    onloadeddata: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when media data is loaded", mdn: undefined}
    },
    onloadedmetadata: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when meta data (like dimensions and duration) are loaded.", mdn: undefined}
    },
    onloadstart: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run just as the file begins to load before anything is actually loaded.", mdn: undefined}
    },
    onmousedown: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a mouse button is pressed down on an element.", mdn: undefined}
    },
    onmousemove: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run as long as the  mouse pointer is moving over an element.", mdn: undefined}
    },
    onmouseout: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a mouse pointer moves ot of an element.", mdn: undefined}
    },
    onmouseover: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a mouse pointer moves over an element.", mdn: undefined}
    },
    onmouseup: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a mouse button is released over an element.", mdn: undefined}
    },
    onmousewheel: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when a mouse wheel is being scrolled over an element.", mdn: undefined}
    },
    onoffline: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when the browser starts to work offline", mdn: undefined}
    },
    ononline: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when the browser starts to work online", mdn: undefined}
    },
    onpagehide: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when a user navigates away from a page.", mdn: undefined}
    },
    onpageshow: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when a user navigates to a page", mdn: undefined}
    },
    onpaste: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the user pastes som content in an elements", mdn: undefined}
    },
    onpause: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the media is paused either by the user or programmatically.", mdn: undefined}
    },
    onplay: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the media is ready to start playing.", mdn: undefined}
    },
    onplaying: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the media actually has started playing.", mdn: undefined}
    },
    onpopstate: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when the window's history changes.", mdn: undefined}
    },
    onprogress: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the browser is in the process of getting the media data", mdn: undefined}
    },
    onratechange: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode).", mdn: undefined}
    },
    onreset: {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Script to be run when a reset button in a form is clicked.", mdn: undefined}
    },
    onresize: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when the browser window is being resized.", mdn: undefined}
    },
    onscroll: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when an element's scrollbar is being scrolled.", mdn: undefined}
    },
    onsearch: {
        elements: ["<input>"],
        supported: true,
        nfo: { w3c: "Script to be run when the user writes something in a search field (for <input=\"search\">).", mdn: undefined}
    },
    onseeked: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the seeking attribute is set to false indicating that seeking has ended.", mdn: undefined}
    },
    onseeking: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the seeking attribute is set to true indicating that seeking is active", mdn: undefined}
    },
    onselect: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the element gets selected.", mdn: undefined}
    },
    onshow: {
        elements: ["<menu>"],
        supported: true,
        nfo: { w3c: "Script to be run when a <menu> element is shown as a context menu", mdn: undefined}
    },
    onstalled: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the browser is unable to fetch the media data for whatever reason.", mdn: undefined}
    },
    onstorage: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when a Web Storage area is updated.", mdn: undefined}
    },
    onsubmit: {
        elements: ["<form>"],
        supported: true,
        nfo: { w3c: "Script to be run when a for is submitted.", mdn: undefined}
    },
    onsuspend: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason.", mdn: undefined}
    },
    ontimeupdate: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)", mdn: undefined}
    },
    ontoggle: {
        elements: ["<details>"],
        supported: true,
        nfo: { w3c: "Script to be run when the user opens or closes the <details> element.", mdn: undefined}
    },
    onunload: {
        elements: ["<body>"],
        supported: true,
        nfo: { w3c: "Script to be run when a page has unloaded (or the browser window has been closed)", mdn: undefined}
    },
    onvolumechange: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run each time the volume is changed which (includes setting the volume to \"mute\").", mdn: undefined}
    },
    onwaiting: {
        elements: ["<audio>", "<video>"],
        supported: true,
        nfo: { w3c: "Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data).", mdn: undefined}
    },
    onwheel: {
        elements: ["All visible elements."],
        supported: true,
        nfo: { w3c: "Script to be run when the mouse wheel rolls up or down over an element.", mdn: undefined}
    },
    translate: {
        elements: ["Global Attributes"],
        supported: true,
        nfo: { w3c: "Specifies whether the content of an element should be translated or not.", mdn: undefined}
    },
    // manually added attributes that aren't in w3c/mdn for some reason
    allowfullscreen: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "This attribute can be set to true if the frame is allowed to be placed into full screen mode by calling its Element.requestFullScreen() method. If this isn't set, the element can't be placed into full screen mode.", mdn: "This attribute can be set to true if the frame is allowed to be placed into full screen mode by calling its Element.requestFullScreen() method. If this isn't set, the element can't be placed into full screen mode."}        
    },
    frameborder: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "The value 1 (the default) tells the browser to draw a border between this frame and every other frame. The value 0 tells the browser not to draw a border between this frame and other frames. (HTML 4)", mdn: "The value 1 (the default) tells the browser to draw a border between this frame and every other frame. The value 0 tells the browser not to draw a border between this frame and other frames. (HTML 4)"}        
    },
    marginheight: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "The amount of space in pixels between the frame's content and its top and bottom margins. (html4)", mdn: "The amount of space in pixels between the frame's content and its top and bottom margins. (html4)"}        
    }, 
    marginwidth: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "The amount of space in pixels between the frame's content and its left and right margins. (html4)", mdn: "The amount of space in pixels between the frame's content and its left and right margins. (html4)"}        
    }, 
    longdesc: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "A URI of a long description of the frame. Due to widespread misuse, this is not helpful for non-visual browsers. (html4)", mdn: "A URI of a long description of the frame. Due to widespread misuse, this is not helpful for non-visual browsers. (html4)"}        
    }, 
    scrolling: {
        elements: ["<iframe>"],
        supported: true,
        nfo: { w3c: "Enumerated attribute indicating when the browser should provide a scroll bar (or other scrolling device) for the frame: auto (Only when needed), yes (Always provide a scroll bar), no (Never provide a scroll bar). (html4)", mdn: "Enumerated attribute indicating when the browser should provide a scroll bar (or other scrolling device) for the frame: auto (Only when needed), yes (Always provide a scroll bar), no (Never provide a scroll bar). (html4)"}        
    },
    profile: {
        elements: ["<head>"],
        supported: false,
        nfo: { w3c: "Specifies a URL to a document that contains a set of rules. The rules can be read by browsers to clearly understand the information in the <meta> tag's content attribute", mdn: undefined}
    },
};


