 function validateForm()
{
  var name=document.getElementById("name");
  var email=document.getElementById("email");
  var Tempadd=document.getElementById("add");
  var mbno=document.getElementById("mbno");
  var pass=document.getElementById("pass");
  var samepass=document.getElementById("samepass");
  if(validateName(name)){
				  if(validateEmail(email)){
				      if(validatepass(pass)){
					     if(validatesamepass(samepass)){
					       if(validateadd(add)){
							   if(validateMbno(mbno)){
                                 return true;
								 }}}}}}
								  
  return false;						 
}
function validateName(name){
	var txt=/^[a-z A-Z]+$/;
	if (name.value.length==0 || name.value.length>30 )
	{
		alert("Name should be maximum of 30 alphabets and minimum of 1 alphabet.");
     name.focus();
     return false;
    }
	else if(name.value.match(txt)) {
		
		return true;}
		else{
			alert("Name contains only Alphabets. ");
     name.focus();
     return false;
		}
}
function validatepass(pass){
	var txt=/^.+$/;
	if (pass.value.length<8 )
	{
		alert("Password Section cannot be less than 8 words. ");
     pass.focus();
     return false;
    }
	else if(pass.value.match(txt)) {
		
		return true;}
}
function validateEmail(email){
	var txt=/^[a-z A-Z 0-9]+@[a-z A-Z]+.com$/
	if (email.value.length==0 )
	{
		alert("Email cannot be Empty.");
     email.focus();
     return false;
    }
	else if(email.value.match(txt)) {
		
		return true;}
		else{
		alert("Enter a valid Email.");
     email.focus();
     return false;
		}
}
function validateadd(add){
	
	if (add.value.length==0 )
	{
		alert("addresss cannot be empty. ");
     add.focus();
     return false;
    }
		else{
     return true;
		}
}
function validateMbno(mbno){
	var txt=/^[0-9]+$/
	if (mbno.value.length!=10  )
	{alert("Mobile Number should contain 10 digis.");
     mbno.focus();
     return false;
    }
	else if(mbno.value.match(txt)){return true;}
	else{
		alert("Enter exactly 10 digit number");
		mbno.focus();
		return false;
	}
}
function validatesamepass(samepass){
	var pass=document.getElementById("pass");
	if(samepass.value==pass.value)
     {
	    return true;
	 }
	 else{alert(" confirm Password doesnot match ") ;
	      return false;
	 }
}
