/*************************************
*     Document Syntax Definition
*************************************/
FCSyntaxDef ["DOC"] = {
	name		: "Document",
	delimiters	: "~!%^&*()-+=|\\/{}[]:;\"'<>,.?�򣭡�������",
	comments	: "----- *****",
	cmtcolor	: "#008080",
	blocks		: {
		Title : {
			name	: "����",
			color	: "#A80000",
			style	: "bu",
			begin	: "��",
			end		: "��"
		},
		Title2 : {
			name	: "2������",
			color	: "#006600",
			style	: "b",
			begin	: "��",
			end		: "��"
		},
		Title3 : {
			name	: "3������",
			color	: "#5050A0",
			begin	: "��",
			end		: "��"
		},
		Explanation : {
			name	: "���ӽ�˵",
			color	: "#800080",
			begin	: "��",
			end		: "��",
			lines	: true
		},
		CodeBlock : {
			name	: "�����",
			color	: "#0000FF",
			begin	: "//--code",
			end		: "//--code",
			lines	: true
		},
		HttpLink : {
			name	: "Http����",
			color	: "#0080C0",
			begin	: "://",
			end		: " "
		},
		FtpLink : {
			name	: "Ftp����",
			color	: "#0080C0",
			begin	: "ftp://",
			end		: " "
		},
		EmailLink : {
			name	: "�����ʼ�����",
			color	: "#804000",
			begin	: "mailto:",
			end		: " "
		}
	}
};
//--------------------------------------------------------------
FCCheckSyntaxDef("DOC");