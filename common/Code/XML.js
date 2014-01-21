/*************************************
*       XML Syntax Definition
*************************************/
FCSyntaxDef ["XML"] = {
	name		: "XML",
	delimiters	: "<?/>!=\"",
	blocks		: {
		BlockComment : {
			name	: "��ע��",
			color	: "#008080",
			begin	: "<!--",
			end		: "-->",
			lines	: true
		},
		BlockText : {
			name	: "���ı�",
			color	: "#808080",
			begin	: "<![CDATA[",
			end		: "]]>",
			lines	: true
		},
/*		TagHead : {
			name	: "��ǩͷ",
			color	: "#0000ff",
			style	: "b",
			begin	: "<",
			end		: " "
		},
		TagHead2 : {
			name	: "��ǩͷ",
			color	: "#0000ff",
			style	: "b",
			begin	: "<",
			end		: "\t"
		},*/
		String : {
			name	: "�ַ���",
			color	: "#ff00ff",
			begin	: "\"",
			end		: "\""
		}
	},
	keywords	: {
		Tag : {
			name	: "��ǩ",
			color	: "#0000ff",
			style	: "b",
			list	: "< > ? / :"
		},
		Attribute : {
			name	: "����",
			color	: "#008000",
			list	: "="
		}
	}
};
//--------------------------------------------------------------
FCCheckSyntaxDef("XML");