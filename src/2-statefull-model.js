function makeWithdraw(initialBalance) {
  let balance = initialBalance;
  return (amount) => {    
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      throw new Error(`You do not have enough balance, Current balance is ${balance}`);
    }
  }
}
const withdraw = makeWithdraw(100);
console.log(withdraw(10));
try {
  console.log(withdraw(100));
} catch (e){
  console.error(e);
}
