var __export_count = 1;		//출고번호 기본값
var content_header_title = getElementByXpath('//*[@id="__layout"]/div/main/div/section/header/h1');
var console = window.console || {log:function(){}};

function setCookie(cookie_name, value, days) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + days);
	exdate.setHours(0,0,0);					//자정에 데이터만료
	var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
	document.cookie = cookie_name + '=' + cookie_value;
}
function getExportCount(){
	// test 변수에 쿠키값 저장
	const test = document.cookie;
	// test 변수의 값인 string 을 '; '로 split 해준다
	// 세미콜론 뒤에 공백이 있는 이유는 쿠키값이 저렇게 생겨서이다
	arr1 = test.split('; ');
	// 배열을 하나 생성해주고
	arr2 = [];
	// arr1 배열의 값을 돌면서 '=' 로 한 번 더 split 해준다
	// arr2 배열은 배열 안에 배열이 들어있는 형태가 된다
	for (let i = 0; i < arr1.length; i++) {
		arr2.push(arr1[i].split('='));
	}
	// arr2 배열에서 nested 된 배열의 첫 번째 값이 "export_count" 인 값의 두 번째 값을 반환한다.
	for (let i = 0; i < arr2.length; i++) {
		if (arr2[i][0] === "export_count") {
			__export_count = Number(arr2[i][1]); //배열의 값을 현재 출고번호로 적용합니다.
			return __export_count;
		}
	}
	//만약 해당 쿠키가 존재하지 않는다면 "export_count":__export_count 쿠키를 기록합니다.
	setCookie("export_count", String(__export_count), 1);
}
function getElementByXpath(path) { 
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function click_juso(){
	if(content_header_title.innerText.indexOf('거래처 관리') != -1){
		console.log("juso.go.kr 모달 열림");
		let juso_input = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[13]/div/div/div[2]/div/div/div[2]/div/div/fieldset/input'); // input 태그 취득
		if(juso_input != null){
			juso_input.focus();
		}
	}
}
function click_submit(){
	console.log("단건입력 모달 열림");
	if(content_header_title.innerText.indexOf('출력자료등록') != -1){
		let today = new Date();
		let year = today.getFullYear();
		let month = ('0' + (today.getMonth() + 1)).slice(-2);
		let day = ('0' + today.getDate()).slice(-2);
		__export_value = year+month+day+"-"+__export_count;		//20220624-01 과 같은 형식으로 출고번호를 만듭니다.
		__export_count = __export_count + 1;					//출고번호 +1
		setCookie("export_count", String(__export_count), 1); 	//현재까지의 출고번호를 쿠키에 저장합니다.
		
		let item_name_input = getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[1]/dl[1]/dd/div/input'); // input 태그 취득
		item_name_input.value="반건조생선,건어물 냉동보관필수 당일배송 부탁드립니다."; // input 태그 취득
		item_name_input.dispatchEvent(new Event('input'));
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[2]/dl/dd/div/div[1]/input').value="반건조생선"; 				//내품명
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[2]/dl/dd/div/div[3]/input').value="1";      				//내품수량
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[3]/dl[1]/dd/div/div/input').value= __export_value;			//출고번호
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[3]/dl[2]/dd/div/input').value= "냉동보관이 필요한 상품입니다.";			//특이사항
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[2]/div[2]/div/div[1]/div[3]/dl[1]/dd/div/div/input').focus();
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[2]/dl/dd/div/div[1]/input').dispatchEvent(new Event('input'));
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[2]/dl/dd/div/div[3]/input').dispatchEvent(new Event('input'));
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[2]/div[2]/div/div[1]/div[3]/dl[1]/dd/div/div/input').dispatchEvent(new Event('input'));
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[3]/dl[1]/dd/div/div/input').dispatchEvent(new Event('input'));
		getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[6]/div/div[2]/div[1]/div/div[4]/div[2]/div/div/div[3]/dl[2]/dd/div/input').dispatchEvent(new Event('input'));
	}
}
function number_autocopy(){
	let local_num_input = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[9]/div/div/input');
	let phone_num_input = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[11]/div/div/input');
	phone_num_input.value = local_num_input.value;
	phone_num_input.dispatchEvent(new Event('input'));
	
}
function new_row_autofocus(){
	let toprow_namw_input = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[7]/div/div/input');
	toprow_namw_input.focus();
}
function check_header_title(){
	content_header_title = getElementByXpath('/html/body/div[1]/div/div/main/div/section/header/h1');
	if(content_header_title != null){
		console.log("타이틀 >> " + content_header_title);
		phone_num_autocopy()
		//client_juso_autofocus()
		data_regist_autoinput()
		management_number_listen()
		phone_num_tab_listen()
		new_rowbtn_listen()
		//submit_juso_enter()
	}
}

//Listner 선언부분
function management_number_listen(){
	if(content_header_title.innerText.indexOf('거래처 관리') != -1){
		var management_number_input = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[6]/div/div/input');
		if(management_number_input != null){
			let today = new Date();
			let year = today.getFullYear();
			let month = ('0' + (today.getMonth() + 1)).slice(-2);
			let day = ('0' + today.getDate()).slice(-2);
			let hours = ('0' + today.getHours()).slice(-2);
			management_number_input.value = year+month+day+hours;
			management_number_input.dispatchEvent(new Event('input'));
		}
	}
}
function data_regist_autoinput(){
	if(content_header_title.innerText.indexOf('출력자료등록') != -1){
		const $submit_input_listen = getElementByXpath('/html/body/div/div/div/main/div/section/div[1]/div[1]/button');
		$submit_input_listen.addEventListener('click', click_submit);
		reset_btn_listen = getElementByXpath('/html/body/div[2]/div/div[3]/button');
		reset_btn_listen2 = getElementByXpath('/html/body/div[2]/div/div[3]/button[2]');
		reset_btn_listen.addEventListener('click', click_submit);
		reset_btn_listen2.addEventListener('click', click_submit);
	}
}
function phone_num_autocopy(){
	if(content_header_title.innerText.indexOf('거래처 관리') != -1){
		let local_num_input = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[9]/div/div/input');
		if(local_num_input != null){
			local_num_input.addEventListener('input', number_autocopy);
		}
	}
}
function phone_num_tab_listen(){
	if(content_header_title.innerText.indexOf('거래처 관리') != -1){
		let phone_num_input = getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[12]/div/div/input');
		if(phone_num_input != null){
			phone_num_input.addEventListener('keydown',function(event){
				if(event.keyCode == 9){
					event.preventDefault();
					let juso_input_listen = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr/td[13]/div/div/div[2]/button');
					juso_input_listen.click();
					click_juso();
				}
			});
		}
	}
}
function new_rowbtn_listen(){
	if(content_header_title.innerText.indexOf('거래처 관리') != -1){
		let new_rowbtn = getElementByXpath('//*[@id="__layout"]/div/main/div/section/div[2]/div[1]/div[2]/button[1]');
		if(new_rowbtn != null){
			new_rowbtn.addEventListener('click', new_row_autofocus);
		}
	}
}
function submit_juso_enter(){
	if(content_header_title.innerText.indexOf('거래처 관리') != -1){
		let address_input = getElementByXpath('//*[@id="rtAddrDetail"]');
		if(address_input != null){
			address_input.addEventListener('keyup',function(event){
				if(event.keyCode == 13){
					event.preventDefault();
					let juso_submit_btn = getElementByXpath('/html/body/div[1]/div/div/main/div/section/div[2]/div[2]/div[1]/div[3]/table/tbody/tr/td[13]/div/div/div[2]/div/div/div[2]/div/section/div[3]/div[2]/div[2]/div[3]/button');
					juso_submit_btn.dispatchEvent(new KeyboardEvent('keydown', {key: 'e'}));
				}
			});
		}
	}
}
function main_listner_create(){
	const $body_listen = getElementByXpath('/html/body');
	$body_listen.addEventListener('mouseover', check_header_title);
}

/*메인실행부분*/
getExportCount();
main_listner_create();
/*메인실행부분*/

if (document.addEventListener) {
	document.addEventListener("onreadystatechange", function () {
        if (document.readyState === "complete") {
            document.removeEventListener("onreadystatechange", arguments.callee, false);
            domReady();
        }
	}, false);
}
function domReady () {
	var footer_element = document.evaluate('//*[@id="footer"]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(footer_element != null){
      var footer_text = footer_element.innerText;
    }
	if(footer_element === null || footer_text.indexOf('CUSTOM MODE ENABLED') < 0){
		location.reload(true);
	}
}