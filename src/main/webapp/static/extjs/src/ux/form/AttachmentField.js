/**
 * HtmlEdit 附件上传组建
 */

Ext.define('Ext.ux.form.AttachmentField', {
	extend: 'Ext.form.field.HtmlEditor',
	alias: 'widget.attachmentField',
	fieldLabel : '附件',
	/*enableAlignments: false,
	enableColors: false, 
	enableFont: false,
	enableFontSize: false,
	enableFormat: false,
	enableLinks: false,
	enableLists: false, 
	enableSourceEdit: false,*/
	plugins:[
		Ext.create('Ext.ux.form.HtmlEditorAttachment')
	]
});