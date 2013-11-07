
$(document).ready(function(){
	
	var funds, income, debts, endingBalance;
	var expenses = [ "#inputRent", "#inputElectric", "#inputWater", "#inputPropTax", "#inputHomeInsur", "#inputHomeRepair", "#inputCarPmt", "#inputCarInsur", "#inputCarRepair", "#inputHealthInsur", "#inputGas", "#inputGrocery", "#inputCable", "#inputInternet", "#inputPhone", "#inputEducation", "#inputVet", "#inputEntertain", "#inputRestaurant", "#inputMisc"];
	var expensesSpendingError = [];
	var totExpense;
	var monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var endMonthOptions = ["#January", "#February", "#March", "#April", "#May", "#June", "#July", "#August", "#September", "#October", "#November", "#December"];
	var endYearOptions = ["#2013", "#2014", "#2015", "#2016", "#2017", "#2018", "#2019", "#2020"];
 	var startOverBool = "false";
	
	function checkIfMonetary(selector){
		if(!$(selector).val().match(/^\d+(\.\d+)?$/)){
			if($(selector).val() === ""){
				alert("Please enter a value.");
			}
			else{
				alert("The value you entered was not monetary value.");
			}
			$(selector).val("");
			return "-1";
		}else{
			return parseFloat($(selector).val());
		}
	}
	
	function checkIfSpendMonetary(selector){
		if(!$(selector).val().match(/^\d+(\.\d+)?$/)){
			if($(selector).val() !== ""){
				alert("The value you entered was not monetary value.");
			}
			$(selector).val("");
			return 0;
		}else{
			return parseFloat($(selector).val());
		}
	}
	
	 $(function () {
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
			buttons: {
				"Yes": function() {
					$( this ).dialog( "close" );
					$(':input').not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected').not(':checkbox, :radio, select').val('');
					$("#initialFunds").show();
					$("#currDebts").hide();
					$("#monthlySpending").hide();
					$("#monthlyIncome").hide();
					$("#timeFrame").hide();
					$("#displayEndingBalance").hide();
					$("#recalculateButton").hide();
					$("#startOverButton").hide();
					$("#backDateButton").show();
					$("#nextDateButton").show();
					$("#nextIncomeButton").show();
					$("#backIncomeButton").show();
					$("#nextSpendButton").show();
					$("#backSpendButton").show();
					$("#nextDebtsButton").show();
					$("#backDebtsButton").show();
					$("#initFundsButton").show();
					$("#divBorder1").hide();
					$("#divBorder2").hide();
					$("#divBorder3").hide();
					$("#divBorder4").hide();
					$("#divBorder5").hide();
				},
				"No": function() {
					$( this ).dialog( "close" );	
				}
			}
        });
    });
	
	function checkExpensesMonetary(i){
		if(!$(expenses[i]).val().match(/^\d+(\.\d+)?$/)){
			if($(expenses[i]).val() === ""){
				expensesSpendingError[i] = 0;
				return 0;
			}
			else{
				$(expenses[i]).css("color", "red");
				expensesSpendingError[i] = 1;
			}
			$(expenses[i]).val("");
			return 0;
		}else{
			expensesSpendingError[i] = 0;
			return parseFloat($(expenses[i]).val());
		}
	}
	
	function calculateEndBalance(){
	
		var months = 0;
		if(parseInt($("#startYear").val()) < parseInt($("#endYear").val())){
			months += 12 - parseInt($("#startMonth").val());
			//alert("The months is " + months);
			months += (parseInt($("#endYear").val()) - (parseInt($("#startYear").val())+1))*12;
			months += parseInt($("#endMonth").val())+1;
		}
		else if(parseInt($("#startYear").val()) == parseInt($("#endYear").val())){
			months = parseInt($("#endMonth").val()) + 1 - parseInt($("#startMonth").val());
		}
		//alert("The months is " + months);
		var gainLossPerMonth = income - totExpense;
		//alert("The gainLossPerMonth is " + gainLossPerMonth);
		endingBalance = funds - debts + (gainLossPerMonth*months);
		//alert("The endingBalance is " + endingBalance);
		$("#endingBalance").text("Your end balance from " + monthString[parseInt($("#startMonth").val())] + " " + $("#startYear").val() + " to " + monthString[parseInt($("#endMonth").val())] + " " + $("#endYear").val() + " will be $" + endingBalance + ".");
	}
	
	$("#initFundsButton").click(function(){
		funds = checkIfMonetary("#inputFunds");
		if(funds >= 0){
			$("#initialFunds").hide();
			$("#currDebts").show();
		}
		//$("#change_me").text("I have been changed!");
        //$("#change_me").css("background-color","red");
    
    });
	
	$("#backDebtsButton").click(function(){
		$("#currDebts").hide();
		$("#initialFunds").show();
	});

	$("#nextDebtsButton").click(function(){
		debts = checkIfMonetary("#inputDebts");
		if(debts > 0){
			$("#currDebts").hide();
			$("#monthlySpending").show();
			$("html, body").scrollTop(0);
		}
	});
	
	$("#backSpendButton").click(function(){
		$("#monthlySpending").hide();
		$("#currDebts").show();
	});
	
	$("#nextSpendButton").click(function(){
		totExpense = 0;
		//alert("The totExpense is " + totExpense);
		for(var i = 0; i < 20; i++){
			totExpense += checkIfSpendMonetary(expenses[i]);
		}
		//alert("The totExpense is " + totExpense);
		$("#monthlySpending").hide();
		$("#monthlyIncome").show();
	});
	
	$(":input").blur(function(){
		for(var i = 0; i < 20; i++){
			if($(this).is($(expenses[i]))){
				checkIfSpendMonetary(expenses[i]);
			}
		}
		if($(this).is($("#inputDebts"))){
			debts = checkIfMonetary("#inputDebts");
		}
		if($(this).is($("#inputFunds"))){
			funds = checkIfMonetary("#inputFunds");
		}
		if($(this).is($("#inputIncome"))){
			income = checkIfMonetary("#inputIncome");
		}
	});
	
	$("#backIncomeButton").click(function(){
		$("#monthlyIncome").hide();
		$("#monthlySpending").show();
		$("html, body").scrollTop(0);
	});
	
	$("#nextIncomeButton").click(function(){
		income = checkIfMonetary("#inputIncome");
		if(income > 0){
			$("#monthlyIncome").hide();
			$("#timeFrame").show();
			
			var CurrentDate=new Date();
			$("#startYear").val(CurrentDate.getFullYear());
			$("#startMonth").val(CurrentDate.getMonth());
			$("#endMonth").val(CurrentDate.getMonth()%11 + 1);
			if(CurrentDate.getMonth() == 11){
				$("#endYear").val(CurrentDate.getFullYear()+1);
			}else{
				$("#endYear").val(CurrentDate.getFullYear());
			}
		}
	});
	
	$("#backDateButton").click(function(){
		$("#timeFrame").hide();
		$("#monthlyIncome").show();
	});
	
	$("#nextDateButton").click(function(){
		if(parseInt($("#startYear").val()) > parseInt($("#endYear").val())){
			alert("You cannot start from " + monthString[parseInt($("#startMonth").val())] + " " + parseInt($("#startYear").val()) + " and go to " + monthString[parseInt($("#endMonth").val())] + " " + parseInt($("#endYear").val()));
			$("#endMonth").val((parseInt($("#startMonth").val())+1)%11);
			if(parseInt($("#startMonth").val()) == 11){
				$("#endYear").val(parseInt($("#startYear").val())+1);
			}else{
				$("#endYear").val(parseInt($("#startYear").val()));
			}
		}
		else if(parseInt($("#startYear").val()) == parseInt($("#endYear").val()) && parseInt($("#startMonth").val()) > parseInt($("#endMonth").val())){
			alert("You cannot start from " + monthString[parseInt($("#startMonth").val())] + " " + parseInt($("#startYear").val()) + " and go to " + monthString[parseInt($("#endMonth").val())] + " " + parseInt($("#endYear").val()));
			$("#endMonth").val((parseInt($("#startMonth").val())+1)%11);
			if(parseInt($("#startMonth").val()) == 11){
				$("#endYear").val(parseInt($("#startYear").val())+1);
			}else{
				$("#endYear").val(parseInt($("#startYear").val()));
			}
		}
		else{
		calculateEndBalance();
		$("#initialFunds").show();
		$("#currDebts").show();
		$("#monthlySpending").show();
		$("#monthlyIncome").show();
		$("#timeFrame").show();
		$("#displayEndingBalance").show();
		$("#recalculateButton").show();
		$("#startOverButton").show();
		$("#backDateButton").hide();
		$("#nextDateButton").hide();
		$("#nextIncomeButton").hide();
		$("#backIncomeButton").hide();
		$("#nextSpendButton").hide();
		$("#backSpendButton").hide();
		$("#nextDebtsButton").hide();
		$("#backDebtsButton").hide();
		$("#initFundsButton").hide();
		$("#divBorder1").show();
		$("#divBorder2").show();
		$("#divBorder3").show();
		$("#divBorder4").show();
		$("#divBorder5").show();
		$("html, body").scrollTop(0);
		}
	});
	
	$("#recalculateButton").click(function(){
		if(parseInt($("#startYear").val()) > parseInt($("#endYear").val())){
			alert("You cannot start from " + monthString[parseInt($("#startMonth").val())] + " " + parseInt($("#startYear").val()) + " and go to " + monthString[parseInt($("#endMonth").val())] + " " + parseInt($("#endYear").val()));
			$("#endMonth").val((parseInt($("#startMonth").val())+1)%11);
			if(parseInt($("#startMonth").val()) == 11){
				$("#endYear").val(parseInt($("#startYear").val())+1);
			}else{
				$("#endYear").val(parseInt($("#startYear").val()));
			}
		}
		else if(parseInt($("#startYear").val()) == parseInt($("#endYear").val()) && parseInt($("#startMonth").val()) > parseInt($("#endMonth").val())){
			alert("You cannot start from " + monthString[parseInt($("#startMonth").val())] + " " + parseInt($("#startYear").val()) + " and go to " + monthString[parseInt($("#endMonth").val())] + " " + parseInt($("#endYear").val()));
			$("#endMonth").val((parseInt($("#startMonth").val())+1)%11);
			if(parseInt($("#startMonth").val()) == 11){
				$("#endYear").val(parseInt($("#startYear").val())+1);
			}else{
				$("#endYear").val(parseInt($("#startYear").val()));
			}
		}
		else{
		debts = checkIfMonetary("#inputDebts");
		//alert("The debts is " + debts);
		funds = checkIfMonetary("#inputFunds");
		income = checkIfMonetary("#inputIncome");
		//alert("The debts is " + debts);
		totExpense = 0;
		for(var i = 0; i < 20; i++){
			totExpense += checkIfSpendMonetary(expenses[i]);
		}
		calculateEndBalance();
		$("html, body").scrollTop(0);
		}
	});
	
	$("#startOverButton").click(function(){
		$("#dialog").dialog("open");
	});
	
});

