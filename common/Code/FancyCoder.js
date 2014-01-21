/***********************************************
*      ����JS�� - FancyCoder for JavaScript
*              version 1.0 beta
***********************************************/

//����﷨���������壬������Ӧ����
//lang: ��Ϊ0����������ID���ֱ��ʾ������Ҫ�������ԣ������д���ʾ�������
function FCCheckSyntaxDef(/*lang, ...*/) {
	//�趨�����б�
	if (arguments.length > 0) {
		var langList = {};
		for (var i = arguments.length - 1; i >= 0; i--) {
			if (FCSyntaxDef[arguments[i]] != null) langList[arguments[i]] = true;
		}
	} else {
		var langList = FCSyntaxDef;
	}
	//���μ���������
	for (var lang in langList) {
		var syntax = FCSyntaxDef[lang];
		//�����ͨ�ı�����
		if (syntax.color == null) syntax.color = "#000000";
		if (syntax.style == null) syntax.style = "";
		else syntax.sytle = syntax.style.toLowerCase();
		//���ʶ��������
		var delim = syntax.delimiters;
		if (delim == null) {
			syntax.delimiters = "~!@%^&*()-+=|\\/{}[]:;\"'<>,.? \t";
		} else if (delim.indexOf(" \t") < 0) {
			syntax.delimiters += " \t";
		}
		//���ע������
		if (syntax.comments != null) {
			if (typeof(syntax.comments) == "string") syntax.comments = syntax.comments.split(" ");
			if (syntax.cmtcolor == null) syntax.cmtcolor = "#00ff00";
			if (syntax.cmtstyle == null) syntax.cmtstyle = "";
			else syntax.cmtsytle = syntax.cmtstyle.toLowerCase();
		} else {
			syntax.comments = [];
		}
		//��������
		var blocks = syntax.blocks;
		for (var classid in blocks) {
			var block = blocks[classid];
			if (block.color == null) block.color = "#00ffff";
			if (block.style == null) block.style = "";
			else block.style = block.style.toLowerCase();
			block.lines = block.lines == true;
		}
		//���ؼ�������
		var keywords = syntax.keywords;
		for (var classid in keywords) {
			var group = keywords[classid];
			if (group.color == null) group.color = "#0000ff";
			if (group.style == null) group.style = "";
			else group.style = group.style.toLowerCase();
			group.list = (" " + (group.list instanceof Array ? group.list.join(" ")
				: group.list) + " ").replace(/  +/g, " ");
		}
	}
}
//--------------------------------------------------------------

//����CSS��ʽ��
//classid: CSS��ʽ��ID
//font: ����
//size: �����С
//color: ������ɫ
//style: ������
function FCMakeCSSClass(classid, color, style, font, size) {
	return "." + classid + " {\r\n\tcolor: " + color + ";\r\n"
		+ (style.indexOf("b") < 0 ? "" : "\tfont-weight: bold;\r\n")
		+ (style.indexOf("i") < 0 ? "" : "\tfont-style: italic;\r\n")
		+ (style.indexOf("u") < 0 ? "" : "\ttext-decoration: underline;\r\n")
		+ (font == null ? "" : "\tfont-family: " + font + ";\r\n")
		+ (size == null ? "" : "\tfont-size: " + size + ";\r\n")
		+ "}\r\n";
}
//--------------------------------------------------------------

//����ָ�����Ե�CSS��ʽ������ת���õ�CSS���룬������Բ������򷵻�null
//lang: �﷨�������������ID
//font: �������壬���Ϊ���󣬾���ÿ�������Ա��Ӧ��Ӧ��classid
//size: ��������Ĵ�С�����Ϊ���󣬾���ÿ�������Ա��Ӧ��Ӧ��classid
function FCMakeCSS(lang, font, size) {
	var syntax = FCSyntaxDef[lang];
	if (syntax == null) return null;
	var fontList = font instanceof Object;
	var sizeList = size instanceof Object;
	//������ͨ�ı���ʽ
	var css = FCMakeCSSClass(lang + "_Default", syntax.color, syntax.style,
		fontList ? font.comment : font, sizeList ? size.comment : size);
	//����ע����ʽ
	if (syntax.comments.length > 0) {
		css += FCMakeCSSClass(lang + "_Comments", syntax.cmtcolor, syntax.cmtstyle,
			fontList ? font.comment : font, sizeList ? size.comment : size);
	}
	//�������ʽ
	for (var classid in syntax.blocks) {
		var block = syntax.blocks[classid];
		css += FCMakeCSSClass(lang + "_" + classid, block.color, block.style,
			fontList ? font[classid] : font, sizeList ? size[classid] : size);
	}
	//����ؼ�����ʽ
	for (var classid in syntax.keywords) {
		var group = syntax.keywords[classid];
		css += FCMakeCSSClass(lang + "_" + classid, group.color, group.style,
			fontList ? font[classid] : font, sizeList ? size[classid] : size);
	}
	return css;
}
//--------------------------------------------------------------

//������׺�����ش�׺����{prefix:ǰ׺,suffix:��׺}
//mode: ת��ģʽ��0��<font>ģʽ��1��<span>ģʽ��2��<span>ģʽ��css��3:[UBB]ģʽ��Ĭ��0��
//classid: �������ID
//color: ������ɫ
//style: ������
function FCMakeAffix(mode, classid, color, style) {
	if (mode == 1 || mode == 2) {
		return {
			prefix : "<SPAN class='" + classid + "'>",
			suffix : "</SPAN>"
		};
	} else if (mode == 3) {
		var nb = style.indexOf("b") >= 0;
		var ni = style.indexOf("i") >= 0;
		var nu = style.indexOf("u") >= 0;
		return {
			prefix : "[color=" + color + "]" + (nb?"[b]":"") + (ni?"[i]":"") + (nu?"[u]":""),
			suffix : (nu?"[/u]":"") + (ni?"[/i]":"") + (nb?"[/b]":"") + "[/color]"
		};
	} else {
		var nb = style.indexOf("b") >= 0;
		var ni = style.indexOf("i") >= 0;
		var nu = style.indexOf("u") >= 0;
		return {
			prefix : "<FONT color='" + color + "'>" + (nb?"<B>":"") + (ni?"<I>":"") + (nu?"<U>":""),
			suffix : (nu?"</U>":"") + (ni?"</I>":"") + (nb?"</B>":"") + "</FONT>"
		};
	}
}
//--------------------------------------------------------------

//�Ը����ַ�������HTML����
//str: Ҫ��������ַ���
function FCHtmlEncode(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
//--------------------------------------------------------------

//�Ը����ַ�������UBB����
//str: Ҫ��������ַ���
function FCUbbEncode(str) {
	return str.replace(/\[/g, "[").replace(/\]/g, "]");
}
//--------------------------------------------------------------

//ת��Դ���뵽HTML�������룬����ת������룬������Բ������򷵻�null
//srcCode: ��Ҫ��ת����Դ����
//lang: ת�����õ��﷨�������������ID
//mode: ת��ģʽ��Ĭ��0��
function FCTranslate(srcCode, lang, mode) {
	var syntax = FCSyntaxDef[lang];
	if (syntax == null) return null;
	var src = srcCode.split("\r\n");
	var encode = mode == 3 ? FCUbbEncode : FCHtmlEncode;
	//������ͨ�ı�������׺
	var affix = FCMakeAffix(mode, lang + "_Default", syntax.color, syntax.style);
	var defPref = affix.prefix, defSuff = affix.suffix;
	//����ע�ͼ�����׺
	var comments = syntax.comments;
	if (comments.length > 0) {
		var affix = FCMakeAffix(mode, lang + "_Comments", syntax.cmtcolor, syntax.cmtstyle);
		var cmtPref = affix.prefix, cmtSuff = affix.suffix;
	}
	//����������׺
	var blkBegin = [], blkEnd = [], blkEsc = [], blkLines = [], blkPref = [], blkSuff = [];
	for (var classid in syntax.blocks) {
		var block = syntax.blocks[classid];
		blkBegin.push(block.begin);
		blkEnd.push(block.end);
		blkEsc.push(block.escape);
		blkLines.push(block.lines);
		var affix = FCMakeAffix(mode, lang + "_" + classid, block.color, block.style);
		blkPref.push(affix.prefix);
		blkSuff.push(affix.suffix);
	}
	//����ؼ��ʼ�����׺��
	var keywords = [], kwPref = [], kwSuff = [];
	for (var classid in syntax.keywords) {
		var group = syntax.keywords[classid];
		keywords.push(group.list);
		var affix = FCMakeAffix(mode, lang + "_" + classid, group.color, group.style);
		kwPref.push(affix.prefix);
		kwSuff.push(affix.suffix);
	}
	//�ϴ�ת��
	var delim = syntax.delimiters;
	for (var index = 0, index2 = 0; index < src.length; index++, index2++) {
		var code = src[index];
		var htmlCode = "";
		for (var pos1 = 0, pos2 = 0, ch = null, flag = 0; ch != ""; pos2++) {
			ch = code.substr(pos2, 1);
			if (ch != "" && flag == 0 && delim.indexOf(ch) < 0) continue;
			//���Ϊ�����ı������������ضϣ�flag��0�ı���1�ո�2��㣩
			if (pos2 <= pos1) {
				flag = ch.match(/s/g) ? 1 : 2;
				continue;
			}
			var word = code.substr(pos1, pos2 - pos1); //��ȡ��
			if (flag == 1) { //�ո�
				htmlCode += word;
			} else {
				if (flag == 2) { //���
					//�б�ע��
					for (var i in comments) {
						if (code.substr(pos1, comments[i].length) != comments[i]) continue;
						htmlCode += cmtPref + encode(code.substr(pos1)) + cmtSuff;
						word = "";
						break;
					}
					if (word == "") break;
					//�б��
					for (var i in blkBegin) {
						if (code.substr(pos1, blkBegin[i].length) != blkBegin[i]) continue;
						var end = blkEnd[i], esc = blkEsc[i];
						for (pos2 = pos1 + blkBegin[i].length; pos2 = code.indexOf(end, pos2);) {
							if (pos2 < 0) {
								if (blkLines[i] && index < src.length - 1) {
									pos2 = code.length + 2;
									code += "\r\n" + src[++index];
									continue;
								}
								htmlCode += blkPref[i] + encode(code.substr(pos1)) + blkSuff[i];
								word = "";
								break;
							} else if (esc == null || code.substr(pos2 - esc.length, esc.length) != esc) {
								pos2 += end.length;
								break;
							}
							pos2 += end.length;
						}
						if (pos2 >= 0) {
							htmlCode += blkPref[i] + encode(code.substr(pos1, pos2 - pos1)) + blkSuff[i];
							flag = 0;
							pos1 = pos2;
							pos2--;
							word = "0";
						}
						break;
					}
					if (word == "") break;
					else if (word == "0") continue;
				}
				//�ؼ��ּ���
				var w = encode(word);
				for (var i in keywords) {
					if (keywords[i].indexOf(" " + word + " ") < 0) continue;
					htmlCode += kwPref[i] + w + kwSuff[i];
					word = "";
					break;
				}
				if (word != "") htmlCode += w;
			}
			flag = delim.indexOf(ch) < 0 ? 0 : ch.match(/s/g) ? 1 : 2;
			pos1 = pos2;
		}
		src[index2] = htmlCode;
	}
	src.splice(index2, src.length);
	return defPref + src.join("\r\n") + defSuff;
}
//--------------------------------------------------------------

//��ԭHTML�������뵽Դ���룬���ػ�ԭ��Ĵ���
//htmlCode: ��Ҫ����ԭ��HTML����
function FCRevert(htmlCode) {
}
//--------------------------------------------------------------

//����Ԥ�����ڲ�������Ļ��ʾ
//title: ���ڱ���
//content: Ԥ����HTML�ı�����
//wndWidth: ���ڿ�ȣ�Ĭ��640��
//wndHeight: ���ڸ߶ȣ�Ĭ��480��
function FCPreview(title, content, wndWidth, wndHeight) {
	if (!(wndWidth > 0)) wndWidth = 640;
	if (!(wndHeight > 0)) wndHeight = 480;
	var left = screen.width/2 - wndWidth/2;
	var top = screen.height/2 - wndHeight/2;
	var previewWnd = window.open("", "FCPreviewWnd", "scrollbars=yes,resizable=yes,menubar=yes,"
		+ "width=" + wndWidth + ",height=" + wndHeight + ",left=" + left + ",top=" + top
		+ ",screenX=" + left + ",screenY=" + top);
	previewWnd.document.write("<HTML><HEAD><TITLE>" + title + "</TITLE></HEAD>\r\n<BODY leftmargin='0'"
		+ " topmargin='0' marginwidth='0' marginheight='0'><TABLE width='200'><TR><TD><PRE>\r\n"
		+ content + "\r\n</PRE></TD></TR></TABLE></BODY></HTML>");
}
//--------------------------------------------------------------

//�����﷨���������ѡ���б�
//selectLang: Ĭ��ѡ�е�����ID��Ĭ��ѡ�е�һ�
function FCSyntaxOptions(selectLang) {
	for (var i in FCSyntaxDef) {
		if (selectLang == null) selectLang == i;
		document.write('<OPTION value="' + i + '"' + (selectLang == i ? ' selected' : '')
			+ '>' + FCSyntaxDef[i].name + '</OPTION>');
	}
}
//--------------------------------------------------------------

//����﷨���������弯��
if (typeof(FCSyntaxDef) == "undefined") {
	FCSyntaxDef = {};
} else {
	FCCheckSyntaxDef();
}
//--------------------------------------------------------------
