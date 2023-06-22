
  //1.input จะต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร เช่น
  function validatePinCode1(pinCode) {
    const regex = /^\d{6,}$/;
  
    if (regex.test(pinCode)) {
      return true;
    }
    return false
  }
  console.log(validatePinCode1('172')); // false
  console.log(validatePinCode1('1725465')); // true


  //2. input จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว
  function validatePinCode2(pinCode) {
    const consecutiveRegex = /(.)\1{2}/;
  
    if (consecutiveRegex.test(pinCode)) {
      return false;
    }
  
    return true;
  }
  console.log(validatePinCode2('111822')); // false
  console.log(validatePinCode2('1112762')); // true
