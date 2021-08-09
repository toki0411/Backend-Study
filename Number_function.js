let integar = prompt("정수를 입력하시오","0");
let actual = prompt("실수를 입력하시오","0");
let sum = Number(integar) + Number(Number(actual).toFixed(2));
console.log(Number(integar)+" + "+Number(actual)+" = "+sum);