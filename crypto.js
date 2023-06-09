var log = console.log;
function op(e) {
	return document.querySelector(e);
}
function opp(e) {
	return document.querySelectorAll(e);
}

var inBox = op(".pan.p1 textarea");
var outBox = op(".pan.p2 textarea");
var kundi = op(".kundi");

[inBox, outBox].forEach((val) => {
	val.onkeydown = () => {
		kundi.style.transform = "rotate(15deg)";
	};
	val.onkeyup = () => {
		kundi.style.transform = "rotate(0deg)";
	};
});

function encode() {
	outBox.value = encrypt(inBox.value);
}

function decode() {
	inBox.value = decrypt(outBox.value);
}

var enc =
		",t$j)Y[ ZR(M@I'Bha*H+]<:E4nKk;^P8G/52boT?-q#|levcJ\"sg&NuAxzy170LUFfwW=.Dd9O{pXS>}m!_C%Q3Vri6",
	raw =
		"! @#$%^&*()_+1234567890-=qwertyuiop[]|}{POIUYTREWQasdfghjkl;'\":LKJHGFDSAzxcvbnm,./?><MNBVCXZ";

enc = enc.split("");
raw = raw.split("");

function encrypt(txt) {
	var encd = "";
	txt = getMixed(txt);
	for (let val of txt) {
		var i = raw.indexOf(val),
			c = i >= 0 ? enc[i] : val;
		encd = c + encd;
	}
	return encd;
}

function decrypt(txt) {
	var dec = "";
	for (let val of txt) {
		var i = enc.indexOf(val),
			c = i >= 0 ? raw[i] : val;
		dec = c + dec;
	}
	dec = getFixed(dec);
	log(dec);
	return dec;
}

function getMixed(txt) {
	txt = txt.split("");
	var encd = "",
		l = txt.length;
	for (let i = 0; i < l; i++) {
		encd += txt[i % 2 == 0 ? "pop" : "shift"]();
	}
	return encd;
}

function getFixed(txt) {
	var p1 = "",
		p2 = "",
		l = txt.length;
	for (let i = 0; i <= l; i++) {
		if (i % 2 == 0) {
			p2 = txt.charAt(i) + p2;
		} else {
			p1 = p1 + txt.charAt(i);
		}
	}
	return p1 + p2;
}

function sendEmail() {
	var email = op("#recipientEmail").value;
	var encryptedText = outBox.value;

	var subject = encodeURIComponent("Encrypted Text");
	var body = encodeURIComponent(encryptedText);
	var mailtoLink = "mailto:" + email + "?subject=" + subject + "&body=" + body;

	window.open(mailtoLink);
}
